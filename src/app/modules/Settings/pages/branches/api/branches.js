import { server } from "../../../../../../config/server";
const url = "/ldap-branches";

export const getBranches = (callback) => {
  server
    .get(`${url}`)
    .then((res) => {
      callback(null, res.data.data);
    })
    .catch((err) => {
      callback(err);
    });
};
