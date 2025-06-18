const adminMiddleware = async (req, res, next) => {
  try {
    console.log(req.user);
    const adminRole = req.user.isAdmin;

    if (!adminRole) {
      return res.status.json({ message: "Access denied .user is not admin " });
    }
    //res.status(200).json({ msg: req.user.isAdmin });
    next();
  } catch (error) {
    console.log("error in adminMiddleware : ", error);
  }
};

module.exports = adminMiddleware;
