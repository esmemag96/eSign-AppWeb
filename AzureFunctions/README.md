## Getting Started
- Must login with your azure account
- `git clone https://github.com/Lira97/FunctionsBlockchain`
- `cd FunctionsBlockchain`
- `npm install`
- `func host start`

# Azure Functions custom handler in JavaScript

The samples available in this folder demonstrate how to implement a in JavaScript.

Example functions featured in this repo include:

| Name | Trigger |
|------|---------|
| [authenticate](authenticate) | HTTP
| [CreateDocument](CreateDocument) | HTTP
| [DeleteDocuments](DeleteDocuments) | HTTP
| [DocumentsById](DocumentsById) | HTTP
| [DocumentsInvById](DocumentsInvById) | HTTP
| [getId](getId) | HTTP
| [InvitationsDocumets](InvitationsDocumets) | HTTP
| [register](register) | HTTP
| [UpdateByID](UpdateByID) | HTTP
| [UploadFile](UploadFile) | HTTP

# Azure Functions inputs examples 'Body'

[authenticate](authenticate) 
```json
{
	"username":"esme",
	"password":"password"
}
```
[CreateDocument](CreateDocument)
```json
 {
 	"userID":"5e9e6ddd27fd64588e24cafe",
    "hash": "seerefedsz",
    "url": "https://storageaccountapren8dfe.blob.core.windows.net/documentos/Medicalchain-Whitepaper-EN.pdf1999db20-979b-11ea-8d66-cb7a86a8f2a6.pdf",
    "users": ["5ebb8a421ac1502e58848503","5ebb4b27361040f2b2785b12"],
    "paymentAmount": 200, 
    "paymentDone": false,
    "nameBlob":"us-blockchain-opportunities-for-health-care.pdf"
  }
```
[DeleteDocuments](DeleteDocuments)
```json
{
	"idDocument":"5ec344b0cef7045753deb615",
	"idUser":"5e9e6ddd27fd64588e24cafe"
}

```
[DocumentsById](DocumentsById)
```json
{
	"id":"5ebb4b27361040f2b2785b12"
}
```
[DocumentsInvById](DocumentsInvById)
```json
{
	"id":"5ebb4b27361040f2b2785b12"
}
```
[getId](getId)
```json
{
	"name": "Esmeralda",
    "username": "esme",
    "email": "esme.mag@gmail.com",
    "password": "password"
}
```
[InvitationsDocumets](InvitationsDocumets)
```json
{
	"idUser":"5ebb4b27361040f2b2785b12",
	"response":false,
	"documentsInvitation":"5ec30021da59141538945ab8"
}
```
[register](register)
```json
{
	"name": "Esmeralda",
    "username": "esme",
    "email": "esme.mag@gmail.com",
    "password": "password"
}
```
[UpdateByID](UpdateByID) Need to send 'id' in params
```json
{
	"id":"5ec34911e815b958abac69a7"
}
{
	"paymentDone":true
}
```
[UploadFile](UploadFile)
```json
{
  "File": "File.PDF",
}
```
## Configuration

The *local.settings-example.json* is provided to show what values the app is expecting to read from environment variables. Make a copy of *local.settings-example.json* and rename it *local.settings.json* and replace any values that begin with "**YOUR_**" with your values.

PS sorry esme todas las request son posts y gets jejeje