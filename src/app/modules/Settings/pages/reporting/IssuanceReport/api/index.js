import { server } from '../../../../../../config/server';
const url = '/reportingApi';

/**
 * Fetch reporting data from API
 * @param {*} callback
 */
export const getReporting = callback => {
  server
    .get(`${url}`)
    .then(res => {
      callback(null, res.data);
    })
    .catch(err => {
      callback(err);
    });
};
