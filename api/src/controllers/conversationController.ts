import { Request, Response } from 'express';
import * as conversationService from "../services/conversationService"
import { asyncHandler } from "../middleware/asyncHandler"
import { prisma } from "../db/prisma";

const getConversations = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user?.id) {
    return res.status(401).json({ error: "Not authenticated" })
  }
  const conversations = await conversationService.getConversations(req.user.id)
  res.status(200).json(conversations)
});

const createConversation = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user?.id) {
    return res.status(401).json({ error: "Not authenticated" })
  }
  const conversation = await conversationService.createConversation(req.user.id)
  res.status(201).json(conversation)
})

const getConversation = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id as string
  const conversation = await conversationService.getConversation(id)
  res.status(200).json(conversation)
})

const updateConversation = asyncHandler(async (req: Request, res: Response) => {
  const conversationId = req.params.id as string
  const { name } = req.body
  const conversation = await conversationService.updateConversation(conversationId, name)
  res.status(200).json(conversation)
})

const deleteConversation = asyncHandler(async (req: Request, res: Response) => {
  const conversationId = req.params.id as string
  const conversation = await conversationService.deleteConversation(conversationId)
  res.status(200).json(conversation)
})

const getMembers = asyncHandler(async (req: Request, res: Response) => {
  const conversationId = req.params.id as string
  const members = await conversationService.getMembers(conversationId)
  res.status(200).json(members)
})

const addMember = asyncHandler(async (req: Request, res: Response) => {
  const conversationId = req.params.id as string
  const { userId } = req.body
  const member = await conversationService.addMember(conversationId, userId)
  res.status(200).json(member)
})

const removeMember = asyncHandler(async (req: Request, res: Response) => {
  const conversationId = req.params.id as string
  const userId = req.params.userId as string
  const member = await conversationService.removeMember(conversationId, userId)
  res.status(200).json(member)
})

export{
  getConversations,
  getConversation,
  createConversation,
  updateConversation,
  deleteConversation,
  getMembers,
  addMember,
  removeMember
}
