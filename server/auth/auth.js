import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

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
      expiresIn: '7d',
    });
    return token;
  }

  // verify token
  static verifyToken(token) {
    const decoded = jwt.verify(token, SecretKey);
    return decoded;
  }
}
export default Auth;
