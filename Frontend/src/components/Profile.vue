<template>
  <div>
    <Header></Header>
    <b-container class="bv-example-row">
      <div>
        <b-card
          title="My Documents"
          img-src="https://commercebank.com/-/media/cb/articles/personal/2018/social-media_financial-documents_what-to-keep-and-what-to-toss---hero.jpg"
          img-alt="Image"
          img-top
          tag="article"
          style="max-width: 100%;"
          class="mb-2"
        >
          <b-card-text>Info and urls of your documents</b-card-text>
          <b-list-group flush v-for="document of documents" v-bind:key="document.id">
            <b-list-group-item>
              <b-card-sub-title class="mb-2" variant="primary">Name</b-card-sub-title>
              <b-card-text>{{ document.nameBlob }}</b-card-text>
              <b-card-sub-title class="mb-2">Document Url</b-card-sub-title>
              <b-card-text>
                <a :href="document.url"> {{ document.url }} </a>
              </b-card-text>
            </b-list-group-item>
          </b-list-group>
          <b-row class="text-center">
            <b-col md="6" offset-md="3">
              <router-link :to="{ name: 'file', params: { id, name, username}}">
                <b-button
                  type="submit"
                  variant="primary"
                  class="text-center"
                  size="md"
                >Create New Document</b-button>
              </router-link>
            </b-col>
          </b-row>
        </b-card>
        <b-card title="Document Invites" tag="article" style="max-width: 100%;" class="mb-2">
          <b-card-text>Invitations for documents</b-card-text>
          <b-list-group flush v-for="invite of invitations" v-bind:key="invite.id">
            <b-list-group-item>
              <b-card-sub-title class="mb-2" variant="primary">User Invite</b-card-sub-title>
              <b-card-text>{{ userInvite }}</b-card-text>
              <b-card-sub-title class="mb-2" variant="primary">Name</b-card-sub-title>
              <b-card-text>{{ invite.nameBlob }}</b-card-text>
              <b-card-sub-title class="mb-2">Url</b-card-sub-title>
              <b-card-text>
                <a href>{{ invite.url }}</a>
              </b-card-text>
              <b-row offset-md="9">
                <b-col sm="1">
                  <b-button variant="primary" size="sm" @click="acceptInvite(true)">Accept</b-button>
                </b-col>
                <b-col sm="1">
                  <b-button variant="primary" size="sm" @click="acceptInvite(false)">Decline</b-button>
                </b-col>
              </b-row>
            </b-list-group-item>
          </b-list-group>
        </b-card>
      </div>
    </b-container>
  </div>
</template>

<script>
import Header from "./Header.vue";
import { getDocuments, acceptInvitation } from "../api/index.js";
export default {
  components: { Header },
  data() {
    return {
      user: {
        id: "",
        name: "",
        username: ""
      },
      userInvite: "lira97",
      documents: [],
      invitations: []
    };
  },
  created() {
    this.id = this.$route.params.userId;
    this.name = this.$route.params.name;
    this.username = this.$route.params.username;

    getDocuments(this.id).then(response => {
      console.log(response);
      this.documents = response.data.documents;
      this.invitations = response.data.documentsInvitation;
    });
  },
  methods: {
    methodThatForcesUpdate() {
      this.$forceUpdate();  
    },
    acceptInvite(res) {
      acceptInvitation(this.id, res, this.invitations[0]._id).then(response => {
        console.log(response);
      });
      getDocuments(this.id).then(response => {
        console.log(response);
        this.documents = response.data.documents;
        this.invitations = response.data.documentsInvitation;
        this.methodThatForcesUpdate();
      });
    }
  }
};
</script>

<style scoped>
</style>