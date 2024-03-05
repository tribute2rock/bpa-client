import { server } from '../../../../../../config/server';
const url = '/branch';

export const getBranches = (params, callback) => {
  server
    .get(`${url}`, { params })
    .then(res => {
      callback(null, res.data.data);
    })
    .catch(err => {
      callback(err);
    });
};

export const getSingleBranch = (id, callback) => {
  server
    .get(`${url}/${id}`)
    .then(res => {
      callback(null, res.data.data);
    })
    .catch(err => {
      callback(err);
    });
};

export const createBranch = (body, callback) => {
  server
    .post(`${url}`, body)
    .then(res => {
      return res.data;
    })
    .then(data => {
      callback(null, data);
    })
    .catch(err => {
      callback(err);
    });
};

export const deleteBranch = (id, callback) => {
  server
    .delete(`${url}/${id}`)
    .then(res => {
      return res.data;
    })
    .then(data => {
      callback(null, data);
    })
    .catch(err => {
      callback(err);
    });
};

export const updateBranch = (data, callback) => {
  server
    .put(`${url}/${data.id}`, data)
    .then(res => callback(null, res.data))
    .catch(err => callback(err));
};
