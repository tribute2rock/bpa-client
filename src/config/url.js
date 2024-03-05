import moment from 'moment';

const Hashids = require('hashids').default;
const dateStamp = moment().format('YYYY-MM-DD');

const hashids = new Hashids(dateStamp, 10, 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890');
const getHash = id => {
  return hashids.encode(id);
};
const getId = hash => {
  return hashids.decode(hash)[0];
};

const linkForTest = new Hashids(
  "",
  10,
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
);
const getHashLink = (id) => {
  return linkForTest.encode(id);
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getHash,
  getId,
  getHashLink
};
