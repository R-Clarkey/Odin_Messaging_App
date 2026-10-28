import { prisma } from "../db/prisma";

export async function getConversations(userId: string) {
    const conversations: object = await prisma.conversation.findMany({
        where: {
            participants: {
                some: {
                    id: userId
                }
            }
        },
        include: {
            participants: true,
            messages: {
                orderBy: { createdAt: "desc"},
                take: 1
            }
        },
        orderBy: { updatedAt: "desc"}
    })
    return conversations
}

export async function createConversation(userId: string, name?: string, isGroup?: boolean) {
    const converstation: object = await prisma.conversation.create({
        data: {
            name: name || null,
            isGroup: isGroup || false,
            participants: {
                connect: [{ id: userId}]
            }
        },
        include: {
            participants: true,
            messages: true,
        }
    })
    return converstation
}