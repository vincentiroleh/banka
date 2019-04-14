import dateTime from 'date-time';
import Auth from '../auth/auth';
import User from '../models/user.model';

class UserController {
  // ===================== signup authentication =====================
  static signUp(req, res) {
    if (!req.body.firstName) {
      return res.status(400).send({
        status: 400,
        error: 'First Name is required',
      });
    }
    if (!req.body.lastName) {
      return res.status(400).send({
        status: 400,
        error: 'Last Name is required',
      });
    }
    if (!req.body.email) {
      return res.status(400).send({
        status: 400,
        error: 'Email is required',
      });
    }
    if (!Auth.checkEmail(req.body.email)) {
      return res.status(400).send({
        status: 400,
        error: 'Invalid Email address',
      });
    }
    if (!req.body.password) {
      return res.status(400).send({
        status: 400,
        error: 'Password is required',
      });
    }

    const hashPassword = Auth.hashPassword(req.body.password);
    const token = Auth.generateToken(req.body.email);

    const data = {
      token,
      id: User.length + 1,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      hashPassword,
      type: 'client',
      isAdmin: false,
      registeredDate: dateTime(),
    };
    User.push(data);
    return res.status(201).send({
      status: 201,
      data,
    });
  }

  // ===================== signin authentication =====================
  static signIn(req, res) {
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({
        status: 400,
        error: 'Email and password is required',
      });
    }
    if (!Auth.checkEmail(req.body.email)) {
      return res.status(400).send({
        status: 400,
        error: 'Invalid Email address',
      });
    }
    const user = User.find(i => i.email === req.body.email
      && i.password === req.body.password); // find user by email

    if (user) {
      // generate a token if user with the registered email is found
      const token = Auth.generateToken(user);
      const data = {
        token,
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      };
      return res.status(200).send({
        status: 200,
        data,
      });
    }
    if (!user) {
      return res.status(401).send({
        status: 401,
        error: 'Invalid credentials. Check your email or password',
      }); // return an error if credentials entered is invalid
    }
  }
}
export default UserController;
