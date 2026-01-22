import Express from "express";
import {
  createAdmin,
  getAdmins,
  getAdminById,
  updateAdmin,
  deactivateAdmin,
} from "../controllers/user.controller.js";
import { jwtMiddleware } from "../middleware/auth.middleware.js";

const router = Express.Router();

router.use(jwtMiddleware);

router.post("/", createAdmin);

router.get("/", getAdmins);

router.get("/:id", getAdminById);

router.put("/:id", updateAdmin);

router.delete("/:id", deactivateAdmin);

export default router;
