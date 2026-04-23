import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  let token;

  // 🔑 Obtener token del header
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "No autorizado, token requerido",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // guardar info del usuario en request
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Token inválido",
    });
  }
};