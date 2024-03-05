const { server } = require('../../../../../../config/server');
const url = '/bibini';

/**
 * 
 * @param {*} callback 
 */
export const getBibiniList =  (paramsX, callback) => {
  server
    .get(`${url}`, {params : paramsX})
    .then(res => {
      callback(null, res.data);
    })
    .catch(err => {
      callback(err);
    });
};

