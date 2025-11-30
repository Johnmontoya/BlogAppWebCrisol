export const LogUser = async (req, res, next) => {
  try {
    const user = req.token;
    
    // Si NO hay usuario, bloquear el acceso con 401 Unauthorized
    if (!user) {
      return res.status(401).json({
        valid: "error",
        message: "Debes iniciar sesión para acceder a este recurso",
      });
    }
    
    // Si hay usuario, continuar
    return next()
  } catch (error) {
    next(error);
  }
};

export const LogAdmin = async (req, res, next) => {
  try {
    const user = req.token;
    
    // Verificar que el usuario existe
    if (!user) {
      return res.status(401).json({
        valid: "error",
        message: "No estás autenticado",
      });
    }
    
    // Verificar el rol
    if (user.role !== 'Admin') {
      return res.status(403).json({
        valid: "error",
        message: "No tienes permisos para realizar esa acción",
      });
    }
    
    return next()
  } catch (error) {
    next(error);
  }
}