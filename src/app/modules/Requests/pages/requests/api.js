import axios from 'axios';
const { server } = require('../../../../../config/server');
const { getAuthorizationToken } = require('../../../../../config/apiHelper');
let bearerToken = getAuthorizationToken();
const url = '/draft-requestId';
const corporate_register_url = '/register-corporate-customer';
const updateDraftUrl = '/draft-request';
// const urlFormData = '/lc';

// export const getFormData = (reqId, callback) => {
//   server
//     .get(`${urlFormData}/${reqId}`)
//     .then(res => {
//       callback(null, res.data.data);
//     })
//     .catch(err => {
//       return err;
//     });
// };
export const getBranchLists = callback => {
  server

    .get('/branch')

    .then(res => {
      callback(null, res.data);
    })

    .catch(err => {
      callback(err);
    });
};

const createAndDownloadPdf = async (requestId, templateId) => {
  return await server.get(`/preview-request/${requestId}/${templateId}?action=view`);
};

const getRequests = (data, callback, source) => {
  server
    .get(`/requests`, { params: data, cancelToken: source.token })
    .then(res => {
      return res.data;
    })
    .then(data => {
      callback(null, data.data);
    })
    .catch(err => {
      callback(err);
    });
};

const getReferGroups = (params, callback) => {
  server
    .get(`/refer-groups`, { params: params })
    .then(res => {
      return res.data;
    })
    .then(data => {
      callback(null, data.data);
    })
    .catch(err => {
      callback(err);
    });
};

const getOneRequest = (id, callback) => {
  server
    .get(`/requests/${id}`, { params: { id } })
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

const submitRequestAction = (requestId, formData, callback) => {
  server
    .post(`requests/${requestId}/action`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
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

const getActions = (requestId, callback) => {
  server
    .get(`/requests/${requestId}/available-actions`)
    .then(res => {
      return res.data;
    })
    .then(data => {
      callback(null, data.data);
    })
    .catch(err => {
      callback(err);
    });
};

const getReturnUsers = (params, callback) => {
  server
    .get(`return-users`, { params: params })
    .then(res => {
      return res.data;
    })
    .then(data => {
      callback(null, data.data);
    })
    .catch(err => {
      callback(err);
    });
};

const getReturnGroups = (params, callback) => {
  server
    .get(`return-groups`, { params: params })
    .then(res => {
      return res.data;
    })
    .then(data => {
      callback(null, data.data);
    })
    .catch(err => {
      callback(err);
    });
};

const getRequestsSubmitted = (tabName, callback) => {
  server
    .get(`/requests`, { params: { tab: tabName } })
    .then(res => {
      return res.data;
    })
    .then(data => {
      callback(null, data.data);
    })
    .catch(err => {
      callback(err);
    });
};

const getDraftRequestSubmitted = (tabName, callback) => {
  server
    .get('/draft-request', { params: { tab: tabName } })
    .then(res => {
      return res.data;
    })
    .then(data => {
      callback(null, data.data);
    })
    .catch(err => {
      console.log(err);
    });
};

const getDraftFormsByRequestId = (id, callback) => {
  server
    .get(`${url}`, { params: { id: id } })
    .then(response => {
      callback(response.data.data, null);
    })
    .catch(err => {
      callback(null, err);
    });
};

const editDraftRequest = (data, callback) => {
  server
    .post(`${updateDraftUrl}/${data.id}`, {
      data: data
    })
    .then(res => callback(null, res.data))
    .catch(err => callback(err));
};

const getSubform = (requestId, callback) => {
  server
    .get(`/requests/${requestId}/subform`)
    .then(response => {
      callback(null, response.data.data[0][0].subformId);
    })
    .catch(err => {
      callback(err, null);
    });
};

const newSubformRequest = (data, callback) => {
  server
    .post(`/subrequests`, data, {
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

const getOneSubRequest = (id, callback) => {
  server
    .get(`/subrequests/${id}`, { params: { id } })
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

const getRequestTemplate = (id, callback) => {
  server
    .get(`/request/${id}/getPrintTemplate`)
    .then(res => {
      callback(null, res.data.data);
    })
    .catch(err => {
      callback(err);
    });
};

// counting requests

const getRequestsCount = callback => {
  server
    .get(`/requests-count`)
    .then(res => {
      callback(null, res.data.data);
    })
    .catch(err => {
      callback(err);
    });
};

const getInternalCount = callback => {
  server
    .get('/internal-count')
    .then(res => {
      callback(null, res.data.data);
    })
    .catch(err => {
      callback(err);
    });
};

const getCorporateInternalCount = callback => {
  server
    .get('/corporate-internal-count')
    .then(res => {
      callback(null, res.data.data);
    })
    .catch(err => {
      callback(err);
    });
};

const getCorporateExternalCount = callback => {
  server
    .get('/corporate-external-count')
    .then(res => {
      callback(null, res.data.data);
    })
    .catch(err => {
      callback(err);
    });
};

const deleteDraftRequest = (id, callback) => {
  server
    .delete(`${updateDraftUrl}/${id}`)
    .then(res => {
      callback(null, res.data);
    })
    .catch(err => {
      callback(err);
    });
};

const internalRequest = async () => {
  return await server
    .get(`/internal-requests`)
    .then(res => res.data)
    .catch(err => err);
};

const sendTokenForInternalRequest = async (url, token, callback) => {
  // console.log(server.token);
  await axios
    .post(url, {
      url,
      token,
      headers: {
        'Content-Type': 'multipart/form-data',
        bearerToken
      }
    })
    .then(
      res => {
        // Other Way:
        // server.get('/handle-access-token', { params: { access: res.data.token } });
        callback(null, res.data);
        console.log(res.data.message);
      },
      error => {
        console.log(error);
      }
    );
};

const customerRegistration = async body => {
  try {
    const result = await server.post(`${corporate_register_url}`, body);
    return result;
  } catch (e) {}
};
// Update: Signature & Swift upload verification done through 'action'
const verifyRequestItem = async (id, item) => {
  const result = await server.put(`requests-verification?item=${item}&id=${id}`);
  return result.data;
};

const getNotifications = callback => {
  server
    .get(`/getNotifications`)
    .then(res => {
      callback(null, res.data);
    })
    .catch(err => {
      callback(err);
    });
};

const getSendMail = (id, templateIds, requestTimeline, user, cb) => {
  // console.log('Template IIds==>', templateIds, requestTimeline);
  server
    .post(`/send-mail-temp/${id}`, { templateIds, requestTimeline, user })
    .then(val => cb(null, val))
    .catch(err => {
      cb(err);
    });
};

const downloadEdited = temp => {
  server.post(`/download-request-edited`, { template: temp }).then(response => {
    const SERVER_URL = process.env.REACT_APP_SERVER_URL;
    const downloadLink = SERVER_URL + '/download-request-edited/' + response.data.filename;
    const link = document.createElement('a');
    link.style.display = 'none';
    link.href = downloadLink;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
};
export {
  getRequests,
  getOneRequest,
  getActions,
  getReturnUsers,
  submitRequestAction,
  getRequestsSubmitted,
  getDraftRequestSubmitted,
  getDraftFormsByRequestId,
  editDraftRequest,
  getReferGroups,
  getSubform,
  newSubformRequest,
  getReturnGroups,
  createAndDownloadPdf,
  getRequestTemplate,
  getRequestsCount,
  deleteDraftRequest,
  internalRequest,
  sendTokenForInternalRequest,
  getInternalCount,
  customerRegistration,
  verifyRequestItem,
  getNotifications,
  getSendMail,
  downloadEdited,
  getCorporateExternalCount,
  getCorporateInternalCount
};
