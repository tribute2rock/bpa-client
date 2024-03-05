const { server } = require('../../../../config/server');
const url = '/sub-forms';

export const getSubForms = (params, callback) => {
  server
    .get(`${url}`, { params })
    .then(res => {
      callback(null, res.data.data);
    })
    .catch(err => {
      callback(err);
    });
};

export const getSubformById = (formId, callback) => {
  server
    .get(`${url}/${formId}`)
    .then(res => {
      callback(null, res.data.data);
    })
    .catch(err => {
      return err;
    });
};

export const deleteForm = (formId, callback) => {
  server
    .delete(`${url}/${formId}`)
    .then(res => {
      callback(null, res.data);
    })
    .catch(err => {
      callback(err);
    });
};
export const updateSubForm = (data, callback) => {
  server
    .put(`${url}/${data.id}`, data)
    .then(res => callback(null, res.data))
    .catch(err => callback(err));
};
