import { prisma } from "../db/prisma";

export async function getUsers() {
    const users = await prisma.user.findMany()
    return users
}

export async function getUser(userId: string) {
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    })
    if (!user){
        throw new Error("No user found")
    }
    return user
}

export async function updateUser(userId: string, userData: { username?: string, bio?: string, avatarUrl?: string }) {
    const updatedUser = await prisma.user.update({
        where: {
            id: userId
        },
        data: userData
    })
    if (!updatedUser){
        throw new Error("Error updating records")
    }
    return updatedUser
}

export async function deleteUser(userId: string) {
    const deletedUser = await prisma.user.delete({
        where: {
            id: userId
        }
    })
    if (!deletedUser) {
        throw new Error("Error updating records")
    }
    return deleteUser
}