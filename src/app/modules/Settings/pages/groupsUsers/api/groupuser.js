import { server } from '../../../../../../config/server';
const url = './groupsUsers';

export const getGroupsUser = callback => {
  server
    .get(`${url}`)
    .then(res => {
      callback(null, res.data.data);
    })
    .catch(err => {
      callback(err);
    });
};

export const addGroupUsers = (body, callback) => {
  server
    .post(`${url}`, body)
    .then(res => {
      return res.data;
    })
    .then(data => {
      callback(null, data);
    })
    .catch(err => {
      console.log(err);
      callback(err);
    });
};

export const deleteGroupUser = (id, callback) => {
  server
    .delete(`${url}/${id}`)
    .then(res => {
      return res.data;
    })
    .then(data => {
      callback(null, data);
    })
    .catch(err => {
      console.log(err);
      callback(err);
    });
};
