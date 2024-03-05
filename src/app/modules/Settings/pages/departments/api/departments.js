import { server } from '../../../../../../config/server';
const url = '/departments';

export const getDepartments = callback => {
  server
    .get(`${url}`)
    .then(res => {
      callback(null, res.data.data);
    })
    .catch(err => {
      callback(err);
    });
};

export const addDepartments = (body, callback) => {
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

export const getSingleDepartment = (id, callback) => {
  server
    .get(`${url}/${id}`)
    .then(res => {
      return res.data.data;
    })
    .then(data => {
      callback(null, data);
    })
    .catch(err => {
      callback(err);
    });
};

export const updateDepartment = (department, callback) => {
  server
    .put(`${url}/${department.id}`, {
      name: department.name,
      description: department.description
    })
    .then(res => callback(null, res.data))
    .catch(err => {
      callback(err);
    });
};

export const deleteDepartment = (id, callback) => {
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
