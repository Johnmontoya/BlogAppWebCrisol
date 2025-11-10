export const LogUser = async (req, res, next) => {
  try {
    const user = req.token;
    if (!user) {
      return res.status(200).json({
        valid: "success",
        message: "El usuario no ha iniciado sesión",
      });
    }
    return next()
  } catch (error) {
    next(error);
  }
};
