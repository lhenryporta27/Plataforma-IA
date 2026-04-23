import { Router } from "express";
import { login, register } from "../controllers/auth.controller.js";
import { validate } from "../../../middleware/validate.middleware.js";

const router = Router();

router.post(
  "/register",
  validate({
    name: { required: true, minLength: 3 },
    email: { required: true, isEmail: true },
    password: { required: true, minLength: 6 },
  }),
  register
);

router.post("/login", login);

export default router;