/* eslint-disable no-restricted-globals */
import dateTime from 'date-time';
import faker from 'faker';

const Accounts = [{
  id: 1,
  accountNumber: 234543456,
  createdOn: dateTime(),
  firstName: 'firstName',
  lastName: 'lastName',
  email: 'email@email.com',
  type: 'savings',
  status: 'active',
  openingBalance: 1000.00,
},
{
  id: 2,
  accountNumber: 234567891,
  createdOn: dateTime(),
  firstName: 'Carter',
  lastName: 'Wayne',
  email: 'carter@email.com',
  type: 'current',
  status: 'draft',
  openingBalance: 2000.00,
},
{
  id: 3,
  accountNumber: 853587191,
  createdOn: dateTime(),
  firstName: 'Drake',
  lastName: 'Drizy',
  email: 'drake@email.com',
  type: 'savings',
  status: 'dormant',
  openingBalance: 3000.00,
},
];

export default Accounts;
