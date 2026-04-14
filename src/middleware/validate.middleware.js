export const validate = (schema) => (req, res, next) => {
  const errors = [];

  Object.entries(schema).forEach(([field, rules]) => {
    const value = req.body[field];

    if (rules.required && !value) {
      errors.push(`${field} es obligatorio`);
    }

    if (rules.minLength && value && value.length < rules.minLength) {
      errors.push(`${field} debe tener al menos ${rules.minLength} caracteres`);
    }

    if (rules.isEmail && value && !/\S+@\S+\.\S+/.test(value)) {
      errors.push(`${field} no es válido`);
    }
  });

  if (errors.length) {
    return res.status(400).json({
      success: false,
      errors,
    });
  }

  next();
};