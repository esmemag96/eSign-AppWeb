<template>
  <section id="home">
    <Header></Header>
    <!-- Styled -->
    <div class="row text-center textHeader">
      <h2 class="col">Create New Document</h2>
      <br />
    </div>
    <b-row>
      <b-col md="6" class="fileCol">
        <b-container fluid="sm">
          <b-card no-body overlay>
            <b-card-body title="Step1: Add File">
              <label for>Please select a file (PDF only)</label>
              <b-form-file
                accept=".pdf"
                v-model="file"
                :state="Boolean(file)"
                placeholder="Seleccione un archivo"
                drop-placeholder="Drop file here..."
              ></b-form-file>
              <div class="mt-3">Selected file: {{ file ? file.name : '' }}</div>
            </b-card-body>
          </b-card>
        </b-container>
      </b-col>
      <b-col md="6">
        <b-container fluid="sm">
          <b-card no-body class="overflow-hidden" style="max-width: 540px;">
            <b-row no-gutters>
              <b-col md="11">
                <b-card-body title="Step 2: Add Users">
                  <b-card-text>Add users to invite them to this document</b-card-text>
                  <b-row class="my-1">
                    <b-col sm="2">
                      <label for="input-small">User:</label>
                    </b-col>
                    <b-col sm="10">
                      <b-form-input
                        v-model="text"
                        id="input-small"
                        size="sm"
                        placeholder="Enter username"
                      ></b-form-input>
                    </b-col>
                  </b-row>
                  <b-row class="text-right">
                    <b-col sm="12">
                      <b-button variant="primary" size="sm" @click="addUser(text)">Add</b-button>
                    </b-col>
                  </b-row>
                </b-card-body>
              </b-col>
            </b-row>
          </b-card>
        </b-container>
        <b-container fluid="sm">
          <b-card no-body class="overflow-hidden" style="max-width: 540px;">
            <b-row no-gutters>
              <b-col md="11">
                <b-card-body title="Step 3: Add Signees">
                  <b-card-text>Add signee</b-card-text>
                  <b-row class="my-1">
                    <b-col sm="2">
                      <label for="input-small">Signee:</label>
                    </b-col>
                    <b-col sm="10">
                      <b-form-input
                        v-model="signee"
                        id="input-small"
                        size="sm"
                        placeholder="Enter signee"
                      ></b-form-input>
                    </b-col>
                  </b-row>
                  <b-row class="text-right">
                    <b-col sm="12">
                      <b-button
                        variant="primary"
                        size="sm"
                        @click="uploadDocument(signee)"
                      >Add</b-button>
                    </b-col>
                  </b-row>
                </b-card-body>
              </b-col>
            </b-row>
          </b-card>
        </b-container>
      </b-col>
    </b-row>
    <h3 class="text-center cargando" v-if="loading">Loading</h3>
    <br />
    <div class="loading" v-if="loading">
      <div class="lds-default">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
    <b-row>
      <b-col md="11" class="text-center">
        <b-button variant="primary" size="lg" @click="createDocument()">Create Document</b-button>
      </b-col>
    </b-row>
  </section>
</template>

<script>
import { sendFile, getUserID, createDocument } from "../api/index.js";
import { handleUploadDocument } from "../api/blockchain.js";

import Header from "./Header.vue";
// import { log } from "util";
export default {
  components: { Header },
  data() {
    return {
      user: {
        id: "",
        name: "",
        username: ""
      },
      id: "",
      loading: false,
      file: null,
      users: [],
      text: "",
      signee: "",
      url: "",
      blob: ""
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.name = this.$route.params.name;
    this.username = this.$route.params.username;
  },
  methods: {
    addUser(user) {
      getUserID(user).then(response => {
        this.users.push(response.data.body);
        this.text = "";
        this.makeToast();
        return this.users;
      });
    },
    uploadDocument(signee) {
      handleUploadDocument(signee).then(response => {
        console.log(response);
      });
      this.makeToast();
    },
    makeToast(append = false) {
      this.$bvToast.toast(`User added`, {
        title: "Send",
        autoHideDelay: 5000,
        appendToast: append
      });
    },
    createDocument() {
      sendFile(this.file).then(response => {
        console.log(response);
        this.url = response.data.body.url;
        this.blob = response.data.body.blobName;
        let body = {
          userID: this.id,
          hash: "seerefedsz",
          url: response.data.body.url,
          users: this.users,
          paymentAmount: 200,
          paymentDone: false,
          nameBlob: response.data.body.blobName
        };
        this.loading = true;
        setTimeout(function() {
          createDocument(body).then(response => {
            console.log(response);
            alert("Document created!");
          });
        }, 5000);
        this.loading = false;
      });
    }
  }
};
</script>

<style lang="css">
.selectFile {
  font-size: 18px;
  color: black;
  margin-left: 1em;
}

.custom-file-input.is-invalid ~ .custom-file-label {
  border-color: #76c788;
  border: 1px solid;
}
.custom-file-input.is-valid ~ .custom-file-label {
  border-color: #76c788;
  border: 1px solid;
}
#home {
  font-family: "Montserrat", sans-serif;
  color: black;
}

.textHeader {
  margin-bottom: 5em;
}
.cargando {
  color: #76c788;
  margin-top: 1em;
  font-weight: 600;
}
.loading {
  margin-left: 48%;
}
.lds-default {
  display: inline-block;
  position: relative;
  width: 64px;
  height: 64px;
}
.lds-default div {
  position: absolute;
  width: 5px;
  height: 5px;
  background: #76c788;
  border-radius: 50%;
  animation: lds-default 1.2s linear infinite;
}
.lds-default div:nth-child(1) {
  animation-delay: 0s;
  top: 29px;
  left: 53px;
}
.lds-default div:nth-child(2) {
  animation-delay: -0.1s;
  top: 18px;
  left: 50px;
}
.lds-default div:nth-child(3) {
  animation-delay: -0.2s;
  top: 9px;
  left: 41px;
}
.lds-default div:nth-child(4) {
  animation-delay: -0.3s;
  top: 6px;
  left: 29px;
}
.lds-default div:nth-child(5) {
  animation-delay: -0.4s;
  top: 9px;
  left: 18px;
}
.lds-default div:nth-child(6) {
  animation-delay: -0.5s;
  top: 18px;
  left: 9px;
}
.lds-default div:nth-child(7) {
  animation-delay: -0.6s;
  top: 29px;
  left: 6px;
}
.lds-default div:nth-child(8) {
  animation-delay: -0.7s;
  top: 41px;
  left: 9px;
}
.lds-default div:nth-child(9) {
  animation-delay: -0.8s;
  top: 50px;
  left: 18px;
}
.lds-default div:nth-child(10) {
  animation-delay: -0.9s;
  top: 53px;
  left: 29px;
}
.lds-default div:nth-child(11) {
  animation-delay: -1s;
  top: 50px;
  left: 41px;
}
.lds-default div:nth-child(12) {
  animation-delay: -1.1s;
  top: 41px;
  left: 50px;
}
@keyframes lds-default {
  0%,
  20%,
  80%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
}
</style>
