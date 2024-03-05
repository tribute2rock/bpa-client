import { server } from '../../../../config/server';
const url = '/categories';
const url2 = '/formss';
const url3 = '/forms';
const urlRequest = '/internal-requests';
const urlDraft = '/draft-request';
const urlCategoryForm = '/categories/forms';
const availableCategories = '/categoryForms';

export const getCategories = callback => {
  server
    .get(`${url}`)
    .then(res => {
      callback(null, res.data);
    })
    .catch(err => {
      callback(err);
    });
};

export const availableCategory = callback => {
  server
    .get(`${availableCategories}`)
    .then(res => {
      callback(null, res.data);
    })
    .catch(err => {
      callback(err);
    });
};

export const getCategoryForms = callback => {
  server
    .get(`${urlCategoryForm}`)
    .then(res => {
      callback(null, res.data);
    })
    .catch(err => {
      callback(err);
    });
};

export const getDataByCategoryId = (id, callback) => {
  server
    .get(`${url}/${id}`)
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

export const getFormsByCatId = (id, callback) => {
  server
    .get(`${url2}/${id}`)
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

export const getFormById = (id, callback) => {
  server
    .get(`${url3}/${id}`)
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

export const addRequest = (data, callback) => {
  server
    .post(`${urlRequest}`, data)
    .then(res => {
      callback(null, res.data);
    })
    .catch(err => {
      callback(err);
    });
};

export const newDynamicRequest = (data, callback) => {
  server
    .post(`${urlRequest}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(res => {
      callback(null, res.data);
    })
    .catch(err => {
      callback(err);
    });
};

export const addDraft = (data, callback) => {
  server
    .post(`${urlDraft}`, data)
    .then(res => {
      callback(null, res.data);
    })
    .catch(err => {
      callback(err);
    });
};

export const newDynamicDraft = (data, callback) => {
  server
    .post(`${urlDraft}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(res => {
      callback(null, res.data);
    })
    .catch(err => {
      callback(err);
    });
};
