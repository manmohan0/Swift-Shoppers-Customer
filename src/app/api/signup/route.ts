import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid"
import amqplib from "amqplib"

export async function POST (req: NextRequest) {
    const msg = await req.json()
    
    const RabbitMQ = await amqplib.connect('amqp://localhost')

    const channel = await RabbitMQ.createChannel()

    await channel.assertQueue("SignUp", { durable: true })
    const replyQueue = await channel.assertQueue('', { exclusive: true })
    
    const correlationId = uuidv4()

    channel.sendToQueue("SignUp", Buffer.from(JSON.stringify(msg)), { correlationId: correlationId, replyTo: replyQueue.queue })

    const response = await new Promise(resolve => {
        channel.consume(replyQueue.queue, (recieved_msg) => {
            if (recieved_msg?.properties.correlationId == correlationId) {
                const reason = JSON.parse(recieved_msg.content.toString())
    
                if (reason.success && reason.reason == "") {
                    resolve({ success: true, reason: "" })
                } else if (!reason.success && reason.reason == "Internal Server Error"){
                    resolve({ success: false, reason: "Internal Server Error" })
                } else if (!reason.success && reason.reason == "Email or Phone No is already in use") {
                    resolve({ success: false, reason: "Email or Phone No is already in use" })
                } else if (!reason.success && reason.reason == "Wrong Format") {
                    resolve({ success: false, reason: reason.issues[0].message })
                }
                channel.ack(recieved_msg)
            }

        })
    })
        
    return NextResponse.json(response)
}