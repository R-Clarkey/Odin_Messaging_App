import { Request, Response } from 'express'
import * as userService from "../services/userService"
import { asyncHandler } from "../middleware/asyncHandler"

const getUsers = asyncHandler(async (req: Request, res: Response) => {
	const users = await userService.getUsers()
	res.status(200).json(users)
})

const getUser = asyncHandler(async (req: Request, res: Response) => {
	const userId = req.params.id as string
	const user = await userService.getUser(userId)
	res.status(200).json(user)
})

const updateUser = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.params.id as string
    const { username, bio, avatarUrl} = req.body
    const user = await userService.updateUser(userId, { username, bio, avatarUrl})
    res.status(200).json(user)
})

const deleteUser = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.params.id as string
    const user = await userService.deleteUser(userId)
    res.status(200).json(user)
})

export {
	getUsers,
	getUser,
    updateUser,
    deleteUser
}
