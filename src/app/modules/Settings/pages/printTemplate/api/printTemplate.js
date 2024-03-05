import { server } from '../../../../../../config/server';
const url = '/printTemp';

export const getPrintTemplate = (params, callback) => {
  server
    .get(`${url}`, { params })
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

export const addPrintTemplate = (body, callback) => {
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

export const getSinglePrintTemplate = (id, callback) => {
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

export const updatePrintTemplate = (printTemplate, callback) => {
  server
    .put(`${url}/${printTemplate.id}`, {
      printTemplate
    })
    .then(res => callback(null, res.data))
    .catch(err => {
      callback(err);
    });
};

export const deletePrintTemplate = (id, callback) => {
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
