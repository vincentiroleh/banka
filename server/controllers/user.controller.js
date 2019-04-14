import dateTime from 'date-time';
import Auth from '../auth/auth';
import User from '../models/user.model';

class UserController {
  // ===================== signup authentication =====================
  static signUp(req, res) {
    if (!req.body.firstName) {
      return res.status(400).json({
        status: 400,
        error: 'First Name is required',
      });
    }
    if (!req.body.lastName) {
      return res.status(400).json({
        status: 400,
        error: 'Last Name is required',
      });
    }
    if (!req.body.email) {
      return res.status(400).json({
        status: 400,
        error: 'Email is required',
      });
    }
    if (!req.body.password) {
      return res.status(400).json({
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
}
export default UserController;
