import { Router } from "express";
import { pingControllers } from "../controllers/index.controllers.js";

const router = Router()

router.get('/ping', pingControllers)

export default router