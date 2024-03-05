import { server } from "../../../../../../config/server";
const url = "/ldap-provinces";

export const getProvinces = (callback) => {
  server
    .get(`${url}`)
    .then((res) => {
      callback(null, res.data.data);
    })
    .catch((err) => {
      callback(err);
    });
};
