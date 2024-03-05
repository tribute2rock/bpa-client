import { server } from '../../../../../../../../src/config/server';
const url = '/BgReports';

/**
 * Fetch reporting data from API
 * @param {*} callback
 */
export const getReportingBg = callback => {
  server
    .get(`${url}`)
    .then(res => {
      callback(null, res.data);
    })
    .catch(err => {
      callback(err);
    });
};
