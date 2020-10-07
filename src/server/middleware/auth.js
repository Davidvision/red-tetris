const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (req, res, next) => {
  try {
    console.log("hello");
    const token = req.header("Authorization").replace("Bearer ", "");
    //if no token is provided, replace will throw an error as header is undefined
    //that's exactly what we want, error 401 is returned
    const decoded = jwt.verify(token, "key2Secure");
    //here we decode our token, is succed we get the object we sent initially which is {_id: <user _id>, iat: <timestamp>}
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token
    });
    //here, we use findOne and not findById because we also want to check that
    //the user still has the given token in its tokens array
    if (!user) {
      throw new Error();
    }
    req.token = token;
    req.user = user;
    //here we store the user in the request so that the next function will access to it and doesn't have to fetch it again
    next();
  } catch (e) {
    console.log(e);
    res.status(401).send({ error: "please authenticate" });
  }
};

module.exports = auth;
