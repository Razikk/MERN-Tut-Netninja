const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

/*  Comment from tutorial video:
//  You could have an user that got a token, and later is deleted. And the token will still be valid. However, the jwt tokens should be stateless, so it should not need to check the db on every request. That check should be made in the controller when needed ( like for ex, if an user was deleted, but the token is still available, when he tries to see his workouts, the id will not be present in the db, so it doesn't really matter if you don't check the user on every request )
//  Usually, you not check the user in the db on every request, and introduce a refresh token. And you check the user when you refresh the token. Also, you need to keep the accessToken lifetime kind of low, so if it is compromised ( or user deleted for ex ), it will still be available for a maximum of 15 minutes for example ( until it tries to refresh the token and the user doesn't exist anymore ).
*/

async function requireAuth(req, res, next) {
  // verify authentication
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required." });
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);

    req.user = await User.findOne({ _id }).select({ _id });
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request not authorized." });
  }
}

module.exports = requireAuth;