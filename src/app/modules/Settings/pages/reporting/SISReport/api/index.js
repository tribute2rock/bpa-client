import { server } from '../../../../../../../../src/config/server';
const url = '/sis-Reports';

/**
 * Fetch reporting data from API
 * @param {*} callback
 */
export const getReportingSis = callback => {
  server
    .get(`${url}`)
    .then(res => {
      callback(null, res.data);
    })
    .catch(err => {
      callback(err);
    });
};
