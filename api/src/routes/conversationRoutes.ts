import { Router } from "express";
import * as conversationController from "../controllers/conversationController";

const router: Router = Router()

router.get("/", conversationController.getConversations)
router.post("/", conversationController.createConversation)

router.get("/:id", conversationController.getConversation)
router.patch("/:id", conversationController.updateConversation)
router.delete("/:id", conversationController.deleteConversation)

router.get("/:id/members", conversationController.getMembers)
router.post("/:id/members", conversationController.addMember)
router.post("/:id/members/:userId", conversationController.removeMember)

export default router
