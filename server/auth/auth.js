import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import validator from 'validator';

dotenv.config();

const SecretKey = process.env.SECRET;

class Auth {
  //  * Hash Password Method
  static hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  }

  // compare password
  static verifyPassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  }

  // generate token
  static generateToken(id) {
    const token = jwt.sign({
      userId: id,
    },
    SecretKey, {
      expiresIn: '1hr',
    });
    return token;
  }

  // verify token
  static verifyToken(req, res, next) {
    // check header or url parms for access token
    const token = req.headers['x-access-token'];
    if (!token) {
      return res.status(403).send({
        auth: false,
        error: 'No token provided.',
      });
    }
    // verify the token and expire
    jwt.verify(token, SecretKey, (err, decoded) => {
      if (err) {
        return res.status(500).send({
          auth: false,
          message: 'Failed to authenticate token.',
        });
      }
      // req.userId = decoded.id;
      req.user = { id: decoded.userId };
      // return res.status(200).send(decoded);
    });
    next();
  }

  // verify valid email
  static checkEmail(email) {
    return validator.isEmail(email);
  }
}
export default Auth;
