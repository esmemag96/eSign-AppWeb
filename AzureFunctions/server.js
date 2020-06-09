const mongoose = require('mongoose');
const User = require('./models/modelUser.js');
const Document = require('./models/modelDocument.js');
const uuidv1 = require('uuid/v1');
const { BlobServiceClient } = require('@azure/storage-blob');
const fileUpload = require('express-fileupload')
const passport = require('passport');
const jwt = require('jsonwebtoken');
const AZURE_STORAGE_CONNECTION_STRING = process.env.AzureWebJobsStorage;
var stripe = require('stripe')(process.env.StripeSecret);
var express = require('express');
var app = express();
app.use(express.json());
app.use(fileUpload())
require('./db');

const port = process.env.FUNCTIONS_HTTPWORKER_PORT;
app.all('/stripe', function (req, res) {
   var qs = require('querystring');
   var post = qs.parse(req.body);
   stripe.plans.create(
      {
          name: "Basic Plan",
          id: "basic-monthly",
          interval: "month",
          currency: "usd",
          amount: 0,
          }, 
      function(err, plan) {
          err; // null if no error occurred
          plan; // the created plan object
      });
  
  //create and subscribe customer to plan
      stripe.customers.create(
      { email: post.stripeEmail, source: post.stripeToken, plan: "basic-monthly"},
      function(err, customer) {
          err; // null if no error occurred
          customer; // the created customer object        	
      }
      );
  res.json({
   status: 302,
   body: null
});
 
  


})
 app.all('/UploadFile', async function (req, res) {

    var filedata = req.files.file.data;         // Image buffer data
    var filename = req.files.file.name;     // testImage.png

    const blobServiceClient = await BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);

    // Create a unique name for the container
    const containerName = 'documentos';

    console.log('\nCreating container...');

    // Get a reference to a container
    const containerClient = await blobServiceClient.getContainerClient(containerName);

    // Create a unique name for the blob
    const blobName = filename+ uuidv1() + '.pdf';

    // Get a block blob client
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    const url = "https://storageaccountapren80cf.blob.core.windows.net/documentos/"+blobName
    try {
        await blockBlobClient.upload(filedata,filedata.length);
        res.json({
         status: 200,
         body: {url,blobName}
         });
      } catch (err) {
        return res.status(500).send({message: "Error could store file"});

      }

})

app.all('/UpdateByID', function (req, res) {
   var DocumentsId = req.query.id;//Creamos una variable que guarde los parámetros del body
   var update = req.body;
   connectToDatabase()
   .then(() => {
      Document.findByIdAndUpdate(DocumentsId,update,(err, user) => {
        if(err){
           return res.status(500).send({message: 'Error en la petición'});
         }
         else{
            if(!user) {
               return res.status(404).send({message: 'not found'});
           }else {
            res.status(200).send({user: user});
            }
         }
      });
   });
})
 app.all('/GetById', function (req, res) {
   const username = req.body.username
   console.log(username)
   connectToDatabase()
   .then(() => {
      User.getUserByUsername(username, (err, user) => {   
      if (err || user == null) {
         return res.status(400).send({message: "Not found"});
      } else {
         res.json({
            success: true,
            body: user._id
         });
      }
      });
   });
})
 app.all('/CreateDocument', function (req, res) {
    if (req.body) { 
       const userid = req.body.userID;
       const url = req.body.url;
       const hash = req.body.hash;
       const users = req.body.users;
       const paymentAmount = req.body.paymentAmount;
       const paymentDone = req.body.paymentDone;
       const nameBlob = req.body.nameBlob;
       const finalData = {
           userid:userid,
           url: url,
           hash: hash,
           users: users,
           paymentAmount: paymentAmount,
           paymentDone: paymentDone,
           nameBlob: nameBlob,
       }
       var document = (new Document(finalData));
       connectToDatabase()
          .then(() => {
             document.save((err, docs) => {
             if(err){
                return res.status(500).send({message: 'Error en la petición'});
                }
                   User.findOneAndUpdate({ _id:userid },{ $push: { documents : document._id }},{ upsert: true, new: true },(err, user1) => {
                      if(err){
                         return res.status(500).send({message: 'Error en la petición'});
                         }
                            User.updateMany({ _id: { $in: users } },{ $push: { documentsInvitation : document._id }},{ upsert: true, new: true },(err, user) => {
                               if(err){
                                  return res.status(500).send({message: 'Error en la petición'});
                                  }
                                     res.status(200).send({user: docs}); 
                               });
                      });
             });
          });
    } else {
       res.json({
             status: 400,
             body: "Please pass a name on the query string or in the request body"
          });
    }
})
app.all('/DocumentsById', function (req, res) {
   const userId = req.body.id
   connectToDatabase()
   .then(() => {
      User.getUserBydocs(userId,(err, user) => {
         if(err){
            return res.status(500).send({message: 'Error en la petición'});
          }
          else{
             if(!user) {
                return res.status(404).send({message: 'not found'});
            }else {
             res.status(200).send({documents: user});
             }
          }
       });
    });
})

app.all('/DocumentsInvById', function (req, res) {
   const userId = req.body.id
   connectToDatabase()
   .then(() => {
      User.findById(userId, (err, user) => {
        if(err){
           return res.status(500).send({message: 'Error en la petición'});
         }
         else{
            Document.find({'_id': { $in:user.documentsInvitation }}, function(err, docs){
               if (err) {
                  return res.status(500).send({message: 'Error en la petición'});
               }
               res.json({
                  status: 200,
                  body: docs
               });
           });
         }
      });
    });
})

app.all('/InvitationsDocumets', function (req, res) {
   const iduser = req.body.idUser
   const iddoc =  mongoose.Types.ObjectId(req.body.documentsInvitation)
   connectToDatabase()
   .then(() => {
      if (req.body.response) 
      {
         User.update({ _id: iduser },{ $pull: { documentsInvitation : iddoc }}, (err, user) => {
         if(err){
            return res.status(500).send({message: 'Error en la petición'});
            }
            else{
               User.update({ _id: iduser },{ $push: { documents : iddoc }}, (err, user) => {
                  if(err){
                     return res.status(500).send({message: 'Error en la petición'});
                  }
                  else{
                     res.json({
                        status: 200,
                        body: "Accepted"
                     });
                  }
               });
            }
         });
      }
      else{
         User.update({ _id: iduser },{ $pull: { documentsInvitation : iddoc }}, (err, user) => {
            if(err){
               return res.status(500).send({message: 'Error en la petición'});
               }
               else{
                  res.json({
                     status: 200,
                     body: "Accepted"
                  });
               }
            });
      }
    });
})

app.all('/DeleteDocuments',async function (req, res) {
   const DocsId = req.body.idDocument;//Creamos una variable que guarde los parámetros del body
   const Userid =req.body.idUser;
   var userarr
   var idobj
   var idUser
   var blobName 
   const blobServiceClient =  await BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
   const containerName = 'documentos';
   const containerClient = await  blobServiceClient.getContainerClient(containerName);
   connectToDatabase()
   .then(() => {
      Document.findById(DocsId, (err, docs) => {
        if(err){
           return res.status(500).send({message: 'Error en la petición'});
         }
         else{
            userarr = docs.users 
            idobj = docs._id
            blobName = docs.nameBlob;
            idUser = docs.userid
            if (Userid != idUser)
            {
               return res.status(404).send({message: 'No tienes permisos para borrar este documento'});
            }
            else{
               const blockBlobClient = containerClient.getBlockBlobClient(blobName);
               try {
                   blockBlobClient.delete();
                  console.log("Delete Done");
               } catch (err) {
                  res.json({
                     status: 400,
                     body: err
                  });
               }
            }
            Document.findByIdAndRemove(DocsId, (err, doc) => {
               if(err){
                  return res.status(500).send({message: 'Error en la petición'});
                }
                else{
                  if(!doc) {
                     return res.status(404).send({message: 'El servicio no ha sido actualizado'});
                  }else 
                  {
                     User.updateMany({ _id: { $in: userarr} },
                        { $pull: { documents : idobj }}, (err, user) => {
                        if(err){
                           return res.status(500).send({message: 'Error en la petición'});
                         }
                         else{
                            User.updateMany({ _id: { $in: userarr} },
                              { $pull: { documentsInvitation : idobj }}, (err, us) => {
                              if(err){
                                 return res.status(500).send({message: 'Error en la petición'});
                              }
                              else{
                                 res.status(200).send({body: us});
                              }
                           });
                         }
                      });
                  }
                }
             });
         }
      });
    });
})

app.all('/register', (req, res, next) => {
   // Create a new user with the information that they subscribed
   let newUser = new User({
     name: req.body.name,
     username: req.body.username,
     email: req.body.email,
     password: req.body.password,
     documents: [],
     documentsInvitation: []
   });
   connectToDatabase()
   .then(() => {
      User.addUser(newUser, (err, user) => {
      if (err) {
         res.json({
            success: false,
            msg: 'El usuario no pudo ser registrado'
         });
      } else {
         res.json({
            success: true,
            msg: 'Usuario registrado'
         });
      }
      });
   });
 });

 app.all('/authenticate', (req, res, next) => {
  // We just need to authenticate the username and the password
  const username = req.body.username;
  const password = req.body.password;

   connectToDatabase()
   .then(() => {
  // Get user by username and then compare the password
  User.getUserByUsername(username, (err, user) => {
     
   if (!user || err) {
      return res.status(400).send({message: "Not found"});
   }
   
   User.comparePassword(password, user.password, (err, isMatch) => {
     if (err) throw err;
     if (isMatch) {
       res.json({
         success: true,
         user: {
           id: user._id,
           name: user.name,
           username: user.username
         }
       });
     } else {
       return res.json({
         success: false,
         msg: 'Password erroneo'
       });
     }
   });
 });
   });
 });

var server = app.listen(port, 'localhost', function () {
   console.log(`Your port is ${process.env.FUNCTIONS_HTTPWORKER_PORT}`);
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})