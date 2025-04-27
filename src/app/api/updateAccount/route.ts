import { NextRequest, NextResponse } from "next/server";
import { getUser } from "../getUser";
import { v4 as uuidv4 } from "uuid"
import { cookies } from "next/headers";
import amqplib from "amqplib";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
    const newDetails = await req.json();
    const user = await getUser();

    const rabbitMQ = await amqplib.connect('amqp://localhost')
    const channel = await rabbitMQ.createChannel()

    await channel.assertQueue('updateAccount', { durable: true })
    const replyQueue = await channel.assertQueue('', { exclusive: true })

    const correlationId = uuidv4()

    channel.sendToQueue('updateAccount', Buffer.from(JSON.stringify({ newDetails, user })), { correlationId: correlationId, replyTo: replyQueue.queue })

    const response = await new Promise(resolve => {
        channel.consume(replyQueue.queue, async (recieved_msg) => {
            if (recieved_msg?.properties.correlationId == correlationId) {
                const reason = JSON.parse(recieved_msg.content.toString())
                
                if (!reason.success && reason.reason == "Internal Server Error") {
                    resolve({ success: false, reason: "Internal Server Error" })
                } else if (!reason.success && reason.reason == "Wrong Format") {
                    resolve({ success: false, reason: reason.issues[0].message })
                } else if (reason.success && reason.reason == "Name Updated Successfully") {
                    resolve({ success: true, profileData: "Name" })
                } else if (reason.success && reason.reason == "Email Updated Successfully") {
                    resolve({ success: true, profileData: "Email" })
                } else if (reason.success && reason.reason == "Phone No Updated Successfully") {
                    resolve({ success: true, profileData: "Phone No" })
                }

                if (reason.success) {
                    const Cookies = await cookies()
                    const token = jwt.sign(reason.user, process.env.SECRET_KEY ?? "")
                    Cookies.set("token", token)
                }

                channel.ack(recieved_msg)
            }
        })
    })

    console.log(response)

    return NextResponse.json(response)
}