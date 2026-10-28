import "../../types/express"
import { Request, Response } from 'express';
import * as conversationService from "../services/conversationService"
import { asyncHandler } from "../middleware/asyncHandler"

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
  const conversation = await conversationService.getConversation(id)
  res.status(200).json(conversation)
})

export {
    getConversations,
    createConversation
}
