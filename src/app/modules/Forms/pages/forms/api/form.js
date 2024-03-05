const { server } = require('../../../../../../config/server');
const url = '/forms';
const url2 = '/form';
const subFormUrl = '/sub-forms';
const canedit = '/canEdit';

/**
 *  Cloning form for given param id
 * @param {formId} params
 * @param {*} callback
 */
export const cloneForm = (params, callback) => {
  server
    .post(`form-clone/${params}`)
    .then(res => {
      callback(null, res.data);
    })
    .catch(err => {
      callback(err);
    });
};

/**
 *
 * @param params, pass `params = null` if you want to get all list of forms.
 * @param callback
 */
export const getForms = (params, callback) => {
  server
    .get(`${url}`, { params })
    .then(res => {
      callback(null, res.data.data);
    })
    .catch(err => {
      callback(err);
    });
};

export const addForm = (body, callback) => {
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

export const addSubForm = data => {
  return server
    .post(`${subFormUrl}`, data)
    .then(response => response.data)
    .catch(err => {
      return err;
    });
};

export const updateForm = (body, callback) => {
  server
    .put(`${url2}/${body.formId}`, { formData: body.updateData, templateData: body.selectedTemplate })
    .then(res => callback(null, res.data))
    .catch(err => {
      callback(err);
    });
};

export const getFormById = (formId, callback) => {
  server
    .get(`${url}/${formId}`)
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

export const canEdit = (id, callback) => {
  server
    .get(`${canedit}/${id}`)
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

export const updateFormStatus = (data, callback) => {
  server
    .put(`${url}/${data.id}`, {
      isActive: data.isActive
    })
    .then(res => callback(null, res))
    .catch(err => {
      callback(err);
    });
};
export const updateTest = (data,cb) => {
  server
    .put(`forms-test/${data.id}`, {
      testEnabled:true
    })
    .then(res => {
      cb();
    })
    .catch(err => {
      cb(err);
    })
}

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

export const countActiveForm = (formId, callback) => {
  server
    .get(`active-form/${formId}`)
    .then(res => {
      callback(null, res.data);
    })
    .catch(err => {
      callback(err);
    });
};

export const getPrintTemp = (req, callback) => {
  server
    .get('/printTemp')
    .then(templates => {
      callback(null, templates.data.data);
    })
    .catch(err => {
      callback(err);
    });
};

export const updatePrintTemp = (req, res) => {
  server
    .put(`/printTemp/${req.body.tempId}`)
    .then(response => {
      res.send(response);
    })
    .catch(err => {
      res.send(err);
    });
};
