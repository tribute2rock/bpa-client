const { server } = require('../../../../../../config/server');
const url = '/assign-form'
export const assignFormsPost = (body, callback) => {
    server
        .post(`${url}`,body)
        .then(res => res.data)
        .then(data => {
            callback(null, data);
        })
        .catch(err => {
            callback(err, null);
        })
} 