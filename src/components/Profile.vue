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
              <a href>{{ document.url }}</a>
            </b-list-group-item>
          </b-list-group>
          <b-row class="text-center">
            <b-col md="6" offset-md="3">
              <router-link to="file">
                <b-button
                  type="submit"
                  variant="primary"
                  class="text-center"
                  size="md"
                >Upload New Document</b-button>
              </router-link>
            </b-col>
          </b-row>
        </b-card>
      </div>
    </b-container>
  </div>
</template>

<script>
import Header from "./Header.vue";

export default {
  components: { Header },
  data() {
    return {
      user: {
        id: "",
        name: "John Doe",
        username: "john-doe"
      },
      documents: [
        {
          id: 1,
          url: "documento-prueba1.com"
        },
        {
          id: 2,
          url: "documento-prueba2.com"
        },
        {
          id: 3,
          url: "documento-prueba3.com"
        }
      ]
    };
  },
  created() {
    this.id = this.$route.params.userId;
    this.name = this.$route.params.name;
    this.username = this.$route.params.username;
  }
};
</script>

<style scoped>
</style>