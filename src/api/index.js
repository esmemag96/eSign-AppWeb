var axios = require("axios");

function sendFile(file){
  let esmeFile = new FormData()
  esmeFile.set('file', file);

  return axios({
    method: "post",
    url: 'http://DESKTOP-0ODSDIV.mexico.ibm.com:8080/api/upload',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: esmeFile,
  }).then((res)=>{
      console.log(res);
      return res;
  }).catch((err) => {
    console.log(err);
    return err;
  })
}
function checkStatus(id){
  return axios({
    method: "get",
    url: 'http://DESKTOP-0ODSDIV.mexico.ibm.com:8080/api/document/status?document_id='+id+'',
  }).then((res)=>{
      console.log(res);
      return res;
  }).catch((err) => {
    console.log(err);
    return err;
  })
}
function getResult(id){
  return axios({
    method: "get",
    url: 'http://DESKTOP-0ODSDIV.mexico.ibm.com:8080/api/document/query?document_id='+id+'',
  }).then((res)=>{
      console.log(res);
      return res;
  })
}

function deleteFile(id){
  return axios({
    method: "delete",
    url: 'http://DESKTOP-0ODSDIV.mexico.ibm.com:8080/api/document',
    data:{
      "document_id": id
    }
  }).then((res)=>{
      console.log(res);
      return res;
  }).catch((err) => {
    console.log(err);
    return err;
  })
}
export { sendFile,checkStatus, getResult, deleteFile }
