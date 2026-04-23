import bcrypt from "bcrypt";

export const registerUserUseCase = async (
  { name, email, password },
  { userRepository }
) => {

  if (!name || !email || !password) {
    const error = new Error("Nombre, email y contraseña son obligatorios");
    error.statusCode = 400;
    throw error;
  }

  const existingUser = await userRepository.findByEmail(email);

  if (existingUser) {
    const error = new Error("Ya existe un usuario con ese email");
    error.statusCode = 409;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userRepository.create({
    name,
    email,
    password: hashedPassword,
  });

  return user;
};