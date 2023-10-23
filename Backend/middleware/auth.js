const jwt =from ('jsonwebtoken');
const User= from  ('../models/user');

exports.authenticate = async (req, res, next) => {
     try {
          const token = req.header('Authorization');
          const decoded = jwt.verify(token, process.env.SECRET_KEY);
          console.log('userId-------->', decoded.userId);
          const user = await User.findById(decoded.userId);
          if (!user) {
               return res.status(401).json({ success: false, message: "User not found" });
          }
          req.user = user;
          next();
     } catch (err) {
          console.error(err);
          return res.status(401).json({ success: false, message: "Invalid token" });
     }
}
