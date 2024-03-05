const { server } = require('../../../../../config/server');
const url = '/workflow';
const getWorkflow = (params, callback) => {
  server
    .get(`${url}`, { params })
    .then(res => {
      return res.data;
    })
    .then(res => {
      callback(null, res.data);
    })
    .catch(err => {
      callback(err);
    });
};

const getWorkflowById = (id, callback) => {
  server
    .get(`${url}/${id}`)
    .then(res => {
      return res.data;
    })
    .then(res => {
      callback(res.data);
    })
    .catch(err => {
      callback(err);
    });
};

const addWorkflow = (body, callback) => {
  server
    .post(`${url}`, body)
    .then(res => {
      return res.data;
    })
    .then(res => {
      callback(res.data);
    })
    .catch(err => {
      callback(err);
    });
};

const editWorkflow = (body, callback) => {
  server
    .put(`${url}`, body)
    .then(res => {
      return res.data;
    })
    .then(res => {
      callback(res.data);
    })
    .catch(err => {
      callback(err);
    });
};

const countActiveWorkflow = (workflowId, callback) => {
  server
    .get(`active-workflow/${workflowId}`)
    .then(res => {
      callback(null, res.data);
    })
    .catch(err => {
      callback(err);
    });
};

const deleteWorkflow = (workflowId, callback) => {
  server
    .delete(`${url}/${workflowId}`)
    .then(res => {
      callback(null, res.data);
    })
    .catch(err => {
      callback(err);
    });
};

export { getWorkflow, addWorkflow, getWorkflowById, editWorkflow, deleteWorkflow, countActiveWorkflow };
