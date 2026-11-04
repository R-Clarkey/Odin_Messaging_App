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

export async function getConversation(conversationId: string) {
    const conversation = await prisma.conversation.findUnique({
        where: {
            id: conversationId
        },
        include: {
            participants: true,
            messages: true
        }
    })
    return conversation
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

export async function updateConversation(conversationId: string, name: string) {
    const conversation: object = await prisma.conversation.update({
        where: {
            id: conversationId
        },
        data: {
            name
        }
    })
    return conversation
}

export async function deleteConversation(conversationId: string) {
    const conversation: object = await prisma.conversation.delete({
        where: {
            id: conversationId
        }
    })
    return conversation
}

export async function getMembers(conversationId: string) {
    const members = await prisma.conversation.findUnique({
        where: {
            id: conversationId
        },
        include: {
            participants: true
        }
    })
    return members
}

export async function addMember(conversationId: string, userId: string) {
    const member = await prisma.conversation.update({
        where: {
            id: conversationId
        },
        data: {
            participants: {
                connect: {
                    id: userId
                }
            }
        }
    })
    return member
}

export async function removeMember(conversationId: string, userId: string) {
    const member = await prisma.conversation.update({
        where: {
            id: conversationId
        },
        data: {
            participants: {
                disconnect: {
                    id: userId
                }
            }
        }
    })
    return member
}