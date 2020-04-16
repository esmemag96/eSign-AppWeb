<template>
  <section id="home">
    <Header></Header>
    <!-- Styled -->
    <div class="row text-center textHeader">
      <h2 class="col">Subir Contratos</h2>
      <br />
    </div>
    <div class="row selectFile">
      <div class="col-md-6 col-sm-12">
        <label for>Por favor seleccione el archivo</label>
        <b-form-file
          accept=".pdf, .doc, .docx"
          v-model="file"
          :state="Boolean(file)"
          placeholder="Seleccione un archivo"
          drop-placeholder="Drop file here..."
        ></b-form-file>
        <div class="mt-3">Selected file: {{ file ? file.name : '' }}</div>
      </div>
    </div>
    <div class="row text-right">
      <div class="col-6">
        <!-- <router-link to="bastanteo">     
        <b-button variant="primary">Aceptar</b-button>-->
        <b-button variant="primary" @click="sendFileFunction(file)">Aceptar</b-button>
        <!-- </router-link> -->
      </div>
    </div>
    <h3 class="text-center cargando" v-if="loading">Cargando documento</h3>
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
    <footer>
      <div class="copyright py-4 text-center text-white">
        <div class="container">
          <small>Copyright &copy; IBM México 2019</small>
        </div>
      </div>
    </footer>
  </section>
</template>

<script>
import { sendFile } from "../api/index.js";
import Header from "./Header.vue";
// import { log } from "util";
export default {
  components: { Header },
  data() {
    return {
      id: "",
      loading: false,
      file: null,
      bastanteos: []
    };
  },
  created() {
    // getData().then(data => {
    //   for (var i = 0; i < data.data.response.result.results.length; i++) {
    //     this.bastanteos.push(data.data.response.result.results[i])
    //   }
    //   console.log(this.bastanteos);
    //   console.log(data);
    // });
  },
  methods: {
    // goToBastanteo(id) {
    //   this.$router.push({ name: "bastanteo", params: { id } });
    // },
    sendFileFunction(file) {
      this.loading = true;
      sendFile(file).then(response => {
        console.log(response.data.results.document_id);
        this.id = response.data.results.document_id;
        this.refreshStatus(this.id);
      });
      // .catch(e => {
      //   alert("Parece que hubo un problema, por favor intentelo de nuevo.");
      // });
    }
    //     refreshStatus(id) {
    //       console.log('si entró');
    //       const self = this;
    //       checkStatus(this.id).then(response => {
    //         let doc_id = this.id;
    //         if (
    //           response.data.results.status === "available" ||
    //           response.data.results.status === "available with notices"
    //         ) {
    //           console.log("listo");
    //           console.log(doc_id);
    //           this.$router.push({ name:'bastanteo' , params:{id: doc_id}})
    //         }
    //         else if(response.data.results.status === "failed"){
    //           alert("Parece que hubo un problema, por favor intentelo de nuevo.");
    //         }
    //         else {
    //           setTimeout(function() {
    //             console.log('aun no');
    //             self.refreshStatus(doc_id);
    //           }, 5000);
    //         }
    //       });
    //     },
    //   }
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
  border-color: #2b3e50;
  border: 2px solid;
  border-radius: 21px;
}
.custom-file-input.is-valid ~ .custom-file-label {
  border-color: #76c788;
  border: 2px solid;
  border-radius: 21px;
}
#home {
  font-family: "Montserrat", sans-serif;
  color: black;
}

.textHeader {
  margin-bottom: 5em;
}
.cargando {
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
  background: #fff;
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
