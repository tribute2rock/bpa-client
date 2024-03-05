import { server } from '../../../../../../config/server';
const url = './groups';

//created this url for manual list of group
const manualGroup = './manualGroups';

export const getGroups = callback => {
  server
    .get(`${url}`)
    .then(res => {
      callback(null, res.data.data);
    })
    .catch(err => {
      callback(err);
    });
};

export const getManualGroups = (params, callback) => {
  server
    .get(`${manualGroup}`, { params })
    .then(res => {
      callback(null, res.data.data);
    })
    .catch(err => {
      callback(err);
    });
};

export const addGroups = (body, callback) => {
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

export const getSingleGroup = (id, callback) => {
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

export const updateGroup = (group, callback) => {
  server
    .put(`${url}/${group.id}`, {
      name: group.name,
      description: group.description,
      users: group.userList
    })
    .then(res => callback(null, res.data))
    .catch(err => {
      callback(err);
    });
};

export const deleteGroup = (id, callback) => {
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
