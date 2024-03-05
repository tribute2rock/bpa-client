const { server } = require('../../../../config/server');

export const getExportForms = (params, callback) => {
  server
    .get(`/export-form`, { params })
    .then(res => {
      callback(null, res.data.data);
    })
    .catch(err => {
      callback(err);
    });
};
