import { server } from '../../../../../../../config/server';

const url = '/users';
const statusUrl = '/userss';
const lDapUrl = '/ldap-users';
// const lDapUrl = '/GetAllUsers';
const province = '/ldap-provinces';

export const getUsers = (params, callback) => {
  server
    .get(`${url}`, { params })
    .then(res => {
      callback(null, res.data.data);
    })
    .catch(err => {
      callback(err);
    });
};

export const getUsersWithoutPagination = (params, callback) => {
  server
    .get(`${'/all-users'}`, { params })
    .then(res => {
      callback(null, res.data.data);
    })
    .catch(err => {
      callback(err);
    });
};

export const addUsers = (body, callback) => {
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
export const getSingleUser = (id, callback) => {
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
export const getLdapUsers = callback => {
  server
    .get(`${lDapUrl}`)
    .then(res => {
      callback(null, res.data.data);
    })
    .catch(err => {
      callback(err);
    });
};
export const getProvinces = callback => {
  server
    .get(`${province}`)
    .then(res => {
      callback(null, res.data.data);
    })
    .catch(err => {
      callback(err);
    });
};

export const editUser = (body, callback) => {
  server
    .put(`${url}/${body.userId}`, body.userData)
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

export const updateUserStatus = (data, callback) => {
  server
    .put(`${statusUrl}/${data.id}`, {
      isActive: data.isActive
    })
    .then(res => callback(null, res))
    .catch(err => {
      callback(err);
    });
};

export const deleteUser = (userId, callback) => {
  server
    .delete(`${url}/${userId}`)
    .then(res => {
      callback(null, res.data);
    })
    .catch(err => {
      callback(err);
    });
};
