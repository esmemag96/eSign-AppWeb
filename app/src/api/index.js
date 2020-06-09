var axios = require("axios");
// const KEY = "JRHg8AizBk37dEw0eigcZ0aZ/4uPMdTooUXAukfqJN/iKyxhsRKGKQ==";

function sendFile(file) {
  let esmeFile = new FormData()
  esmeFile.set('file', file);

  return axios({
    method: "post",
    // url: 'https://blockchainproye.azurewebsites.net/api/UploadFile?code=TuU9vZ0XdBiV2ZgIVhRdEAaGDoI0/xiN5OIGBAL5kIRkjjJl/X9VBw==',
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
    // url: 'https://blockchainproye.azurewebsites.net/api/CreateDocument?code=opahftLQ3Ga9lZeppZtHJLBFU1RRgTl5iW0gDqqz4wx5LzBZp478IA==',
    url: 'http://localhost:7071/api/CreateDocument',
    data: form,
  }).then((res) => {
    console.log(res);
    return res;
  })
}

function registerUser(form) {
  return axios({
    method: "post",
    // url: 'https://blockchainproye.azurewebsites.net/api/register?code=wjAvT7SVnX0pXA1wIBVkwXhexn9DM13x40tqv4rxNNHIYgAHmyTuzA==',
    url: 'http://localhost:7071/api/register',
    data: form,
  }).then((res) => {
    console.log(res);
    return res;
  })
}
function loginUser(form) {
  return axios({
    method: "post",
    // url: 'https://blockchainproye.azurewebsites.net/api/authenticate?code=3AlJqhBUdQaUWoYWue7UvUNYUTFUBapd8ua4Jyd7WCdoPyQh7O6muQ==',
    url: 'http://localhost:7071/api/authenticate',
    data: form,
  }).then((res) => {
    console.log(res);
    return res;
  })
}

function getDocuments(id) {
  return axios({
    method: "post",
    // url: 'https://blockchainproye.azurewebsites.net/api/authenticate?code=3AlJqhBUdQaUWoYWue7UvUNYUTFUBapd8ua4Jyd7WCdoPyQh7O6muQ==',
    url: 'http://localhost:7071/api/DocumentsById',
    data: { "id": id },
  }).then((res) => {
    console.log(res);
    return res;
  })
}

function getUserID(user) {
  // var body = `{
  //   "username": "`+user+`",
  // }`
  return axios({
    method: "post",
    // url: 'https://blockchainproye.azurewebsites.net/api/GetById?code=Khl4toWT6m/CA/eslr3t4zV3goKEtE9PjeJAZ/XS5ga5uwfXqlWq8A==',
    url: 'http://localhost:7071/api/GetById',
    data: { "username": user }
  }).then((res) => {
    console.log(res);
    return res;
  })
}
function acceptInvitation(userId, response, docId) {
  return axios({
    method: "post",
    // url: 'https://blockchainproye.azurewebsites.net/api/GetById?code=Khl4toWT6m/CA/eslr3t4zV3goKEtE9PjeJAZ/XS5ga5uwfXqlWq8A==',
    url: 'http://localhost:7071/api/InvitationsDocumets',
    data: {
      "idUser": userId,
      "response": response,
      "documentsInvitation": docId
    }
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
  getDocuments,
  getUserID,
  acceptInvitation
}
