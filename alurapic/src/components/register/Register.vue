<template>
  <div>
    <h1 class="center">{{ title }}</h1>
    <h2 class="center"></h2>

    <h2 v-if="photo._id" class="center">Updating</h2>
    <h2 v-else class="center">Including</h2>

    <form @submit.prevent="save()">
      <div class="control">
        <label for="title">TITLE</label>
        <input name="TITLE" v-validate.continues="'required|min:3|max:25'" type="text" v-model.lazy="photo.titulo" id="title" autocomplete="off">
        <ul>
          <li class="error" v-for="(error,i) in errors.collect('TITLE')" :key="i">{{ error }}</li>
        </ul>
      </div>

      <div class="control">
        <label for="url">URL</label>
        <input name="URL" v-validate="'required'" v-model.lazy="photo.url" id="url" autocomplete="off">
        <ul>
          <li class="error" v-for="(error,i) in errors.collect('URL')" :key="i">{{ error }}</li>
        </ul>
        <my-image v-show="photo.url" :url="photo.url" :title="photo.titulo"/>
      </div>

      <div class="control">
        <label for="description">DESCRIPTION</label>
        <textarea v-model="photo.descricao" id="description" autocomplete="off"></textarea>
      </div>

      <div class="center">
        <my-button label="SAVE" type="submit"/>
        <router-link :to="{name: 'home'}">
          <my-button label="BACK" type="button"/>
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import Image from "../shared/imagem-responsiva/Image.vue";
import Button from "../shared/button/Button.vue";
import Photo from "../../domain/photo/Photo";
import PhotoService from "../../domain/photo/PhotoService";

export default {
  components: {
    "my-image": Image,
    "my-button": Button
  },
  data() {
    return {
      title: "Register",
      photo: new Photo(),
      id: this.$route.params.id     //$route get the param added in the url of the route
    };
  },
  methods: {
    save() {

      this.$validator         // VeeValidators's "validator". it checks if all the requirements passed.
        .validateAll()
        .then(success => {

          if (success) {
            this.service.register(this.photo).then(
              () => {
                if (this.id) this.$router.push({ name: "home" });
                this.photo = new Photo();
              },
              error => console.log(error)
      );
          }

        })
      
    }
  },

  created() {
    this.service = new PhotoService(this.$resource);

    if (this.id) {
      this.service.search(this.id).then(foto => (this.photo = foto));
    }
  }
};
</script>

<style scoped>
.center {
  text-align: center;
}
.control {
  font-size: 1.2em;
  margin-bottom: 20px;
}
.control label {
  display: block;
  font-weight: bold;
}

.control label + input,
.control textarea {
  width: 100%;
  font-size: inherit;
  border-radius: 5px;
}

.error {
    color: red;
  }
</style>
