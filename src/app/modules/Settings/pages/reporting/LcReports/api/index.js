import { server } from '../../../../../../../../src/config/server';
const url = '/LcReports';

/**
 * Fetch reporting data from API
 * @param {*} callback
 */
export const getReportingLc = callback => {
  server
    .get(`${url}`)
    .then(res => {
      callback(null, res.data);
    })
    .catch(err => {
      callback(err);
    });
};
