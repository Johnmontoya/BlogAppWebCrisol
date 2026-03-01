import jwt from "jsonwebtoken";
import "dotenv/config";

const verify = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (error) {
    throw error;
  }
};

const Authenticate = async (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;
    let token = bearerToken;

    if (bearerToken && bearerToken.startsWith("Bearer ")) {
      token = bearerToken.substring(7);
    }

    if (!token) return next();

    const { decoded, expired, valid } = verify(token);
    
    if (valid && !expired) {
      req.token = decoded;
      return next();
    } else {
      return res.status(403).json({
        error: true,
      });
    }
  } catch (error) {
    // Si el token es inválido o está mal formado, retornar 403 en lugar de 500
    return res.status(403).json({
      error: true,
      message: "Token inválido o expirado"
    });
  }
};

export default Authenticate;
