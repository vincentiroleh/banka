import dateTime from 'date-time';
import faker from 'faker';
import account from '../models/accountModel';

class AccountController {
  // @Client create an account
  static createAccount(req, res) {
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
      accountNumber: faker.finance.account(10),
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

  // @Admin activate or deactivate banka account
  static updateAccount(req, res) {
    const accountNumber = parseInt(req.params.accountNumber, 10);
    if (!accountNumber) {
      return res.status(400).send({
        status: 400,
        error: 'accountNumber not found',
      });
    }
    if (!req.body.status) {
      return res.status(400).send({
        status: 400,
        error: 'update status',
      });
    }

    let accountFound;
    let itemIndex;
    account.map((Account, index) => {
      if (Account.accountNumber === accountNumber) {
        accountFound = Account;
        itemIndex = index;
      }
    });
    if (accountFound) {
      const updatedAccount = {
        id: accountFound.id,
        accountNumber: req.body.accountNumber || accountFound.accountNumber,
        status: req.body.status || accountFound.status,
        openingBalance: req.body.openingBalance || accountFound.openingBalance,
      };

      account.splice(itemIndex, 1, updatedAccount);

      return res.status(201).send({
        status: 201,
        message: 'Status of Acccount updated successfully',
        updatedAccount,
      });
    }

    if (!accountFound) {
      return res.status(404).send({
        success: 'false',
        message: 'Account not found',
      });
    }
  }

  static deleteAccount(req, res) {
    const accountNumber = parseInt(req.params.accountNumber, 10);
    let accountFound;
    let itemIndex;
    account.map((Account, index) => {
      if (Account.accountNumber === accountNumber) {
        accountFound = Account;
        itemIndex = index;
      }
    });
    if (accountFound) {
      account.splice(itemIndex, 3);
      return res.status(200).send({
        status: 200,
        message: 'Account deleted successfully',
      });
    }

    if (!accountFound) {
      return res.status(404).send({
        status: 404,
        message: 'Account not found',
      });
    }
  }

  // @Admin get all accounts
  static getAllAccount(req, res) {
    return res.status(200).send({
      status: 200,
      message: 'Accounts retrieved successfully',
      data: account,
    });
  }

  // @Admin get a specific account
  static getAccount(req, res) {
    const accountNumber = parseInt(req.params.accountNumber, 10);
    account.map((Account) => {
      if (Account.accountNumber === accountNumber) {
        return res.status(200).send({
          status: 200,
          message: 'Account retrieved successfully',
          Account,
        });
      }
    });
    return res.status(404).send({
      status: 404,
      message: 'Account does not exist',
    });
  }
}

export default AccountController;
