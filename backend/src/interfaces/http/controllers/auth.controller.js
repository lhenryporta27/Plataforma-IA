import { PrismaUserRepository } from "../../../infrastructure/repositories/prisma-user.repository.js";

import { registerUserUseCase } from "../../../application/use-cases/auth/register.usecase.js";
import { loginUserUseCase } from "../../../application/use-cases/auth/login.usecase.js";

const userRepository = new PrismaUserRepository();

export const register = async (req, res) => {
  const user = await registerUserUseCase(
    req.body,
    { userRepository }
  );

  res.status(201).json({
    success: true,
    message: "Usuario registrado correctamente",
    data: user,
  });
};

export const login = async (req, res) => {
  const result = await loginUserUseCase(
    req.body,
    { userRepository }
  );

  res.status(200).json({
    success: true,
    message: "Login exitoso",
    data: result,
  });
};