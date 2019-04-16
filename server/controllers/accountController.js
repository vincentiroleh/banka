import dateTime from 'date-time';
import faker from 'faker';
import Account from '../models/accountModel';

const accountNumber = faker.finance.account(10);

class AccountController {
  static create(req, res) {
    if (!req.body.type) {
      return res.status(400).send({
        status: 400,
        error: 'Type of account required',
      });
    }
    if (!parseFloat(req.body.openingBalance)) {
      return res.status(400).send({
        status: 400,
        error: 'Opening balance required',
      });
    }
    const data = {
      // id: req.user.id,
      accountNumber,
      createdOn: dateTime(),
      type: req.body.type,
      openingBalance: req.body.openingBalance,
    };
    Account.push(data);
    return res.status(201).send({
      status: 201,
      data,
    });
  }
}
export default AccountController;
