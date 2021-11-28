const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try{
    const token = req.header.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "Awnkm0akm?##Fetele03017761988%%D3fault100$%%");
    req.userData = { email: decodedToken.email, userId: decodedToken.userId }
    next();
  } catch (error) {
    res.status(401).json({
      message: "Auth failed!"
    });
  }
};
