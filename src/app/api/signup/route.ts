import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid"
import amqplib from "amqplib"

export async function POST (req: NextRequest) {
    const { firstName, lastName, email, phone, password, confirmPassword } = await req.json()
    
    const RabbitMQ = await amqplib.connect('amqp://localhost')

    const channel = await RabbitMQ.createChannel()

    await channel.assertQueue("Auth", { durable: true })
    const msg = { firstName, lastName, email, phone, password, confirmPassword }
    
    const replyQueue = await channel.assertQueue('', { exclusive: true })
    
    const correlationId = uuidv4()
    
    channel.sendToQueue("Auth", Buffer.from(JSON.stringify(msg)), { correlationId: correlationId, replyTo: replyQueue.queue })

    const response = await new Promise(resolve => {
        channel.consume(replyQueue.queue, (recieved_msg) => {
            if (recieved_msg?.properties.correlationId == correlationId) {
                const reason = JSON.parse(recieved_msg.content.toString())
    
                if (reason.success && reason.reason == "") {
                    resolve({ success: true, reason: "" })
                } else if (!reason.success && reason.reason == "Internal Server Error"){
                    console.log("E2")
                    resolve({ success: false, reason: "Internal Server Error" })
                } else if (!reason.success && reason.reason == "Email or Phone No is already in use") {
                    console.log("E3")
                    resolve({ success: false, reason: "Email or Phone No is already in use" })
                } else if (!reason.success && reason.reason == "Wrong Format") {
                    console.log("E4")
                    resolve({ success: false, reason: reason.issues[0].message })
                }
            }
        })
    })
    console.log(response)
    return NextResponse.json(response)
}