import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const loginUserUseCase = async (
  { email, password },
  { userRepository }
) => {

  if (!email || !password) {
    const error = new Error("Email y contraseña son obligatorios");
    error.statusCode = 400;
    throw error;
  }

  const user = await userRepository.findByEmail(email);

  if (!user) {
    const error = new Error("Credenciales inválidas");
    error.statusCode = 401;
    throw error;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    const error = new Error("Credenciales inválidas");
    error.statusCode = 401;
    throw error;
  }

  const token = jwt.sign(
    {
      userId: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    },
  };
};