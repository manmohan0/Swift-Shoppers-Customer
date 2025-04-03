import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid"
import { cookies } from "next/headers";
import amqplib from "amqplib"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

export async function POST(req: NextRequest) {
    const msg = await req.json()
    const correlationId = uuidv4()

    const RabbitMQ = await amqplib.connect('amqp://localhost')

    const channel = await RabbitMQ.createChannel()

    const replyQueue = await channel.assertQueue('', { exclusive: true })
    channel.assertQueue("SignIn", { durable: true })

    channel.sendToQueue("SignIn", Buffer.from(JSON.stringify(msg)), { replyTo: replyQueue.queue, correlationId: correlationId })

    const response = await new Promise(resolve => {
        channel.consume(replyQueue.queue, async (recieved_msg) => {
            if (recieved_msg?.properties.correlationId === correlationId) {
                const reason = JSON.parse(recieved_msg.content.toString())

                if (reason.success && reason.reason == "") {
                    const Cookies = await cookies()
                    const token = jwt.sign(JSON.stringify(reason.user), process.env.SECRET_KEY ?? "")
                    Cookies.set("token", token)

                    resolve({ success: true, reason: "" })
                } else if (!reason.success && reason.reason == "Internal Server Error") {
                    resolve({ success: false, reason: "Internal Server Error" })
                } else if (!reason.success && reason.reason == "User Not Found") {
                    resolve({ success: false, reason: "User does not exist" })
                } else if (!reason.success && reason.reason == "Incorrect Password") {
                    resolve({ success: false, reason: "Incorrect Password"})
                } else if (!reason.success && reason.reason == "Wrong Format") {
                    resolve({ success: false, reason: "Wrong Format", issue: reason.issues[0].message })
                }
            }
        })
    })

    return NextResponse.json(response)
}