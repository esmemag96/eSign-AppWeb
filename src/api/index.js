var axios = require("axios");
const KEY = "JRHg8AizBk37dEw0eigcZ0aZ/4uPMdTooUXAukfqJN/iKyxhsRKGKQ==";

function sendFile(file) {
  let esmeFile = new FormData()
  esmeFile.set('file', file);

  return axios({
    method: "post",
    url: 'http://localhost:7071/api/UploadFile',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: esmeFile,
  }).then((res) => {
    console.log(res);
    return res;
  }).catch((err) => {
    console.log(err);
    return err;
  })
}

function createDocument(form) {
  return axios({
    method: "post",
    url: 'http://blockchainproye.azurewebsites.net/api/register',
    headers: {
      'x-functions-key': KEY
    },
    data: form,
  }).then((res) => {
    console.log(res);
    return res;
  })
}

function registerUser(form) {
  return axios({
    method: "post",
    url: 'http://blockchainproye.azurewebsites.net/api/register',
    data: form,
  }).then((res) => {
    console.log(res);
    return res;
  })
}
function loginUser(form) {
  return axios({
    method: "post",
    url: 'http://localhost:7071/api/authenticate',
    data: form,
  }).then((res) => {
    console.log(res);
    return res;
  })
}
function getUserID(user) {
  var body = `{
    "username": "`+user+`",
  }`
  return axios({
    method: "get",
    url: 'http://blockchainproye.azurewebsites.net/api/getId',
    headers: {
      'x-functions-key': KEY
    },
    data: body
  }).then((res) => {
    console.log(res);
    return res;
  })
}
export {
  sendFile,
  createDocument,
  registerUser,
  loginUser,
  getUserID
}
