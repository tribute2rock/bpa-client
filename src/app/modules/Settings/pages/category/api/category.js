import { server } from '../../../../../../config/server';

const url = '/categories';

export const getCategories = (params, callback) => {
  server
    .get(`${url}`, { params })
    .then(res => {
      callback(null, res.data);
    })
    .catch(err => {
      callback(err);
    });
};

export const addCategory = (body, callback) => {
  server
    .post(`${url}`, body, {
      headers: {
        'content-Type': 'multipart/form-data'
      }
    })
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

export const getSingleCategory = (id, callback) => {
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

export const updateCategory = (id, body, callback) => {
  server
    // .put(`${url}/${category.id}`, {
    //   name: category.name
    // })
    .put(`${url}/${id}`, body, {
      headers: {
        'content-Type': 'multipart/form-data'
      }
    })
    .then(res => callback(null, res.data))
    .catch(err => {
      callback(err);
    });
};

export const deleteCategory = (id, callback) => {
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

export const updateStatus = (id, callback) => {
  server
    .put(`${url}/${id}/status`)
    .then(res => {
      callback(null, res.data);
    })
    .catch(err => {
      callback(err, null);
    });
};
