<template>
  <div class="home-container">
    <!-- novo elemento para exibir mensagens para o usuário -->
    <p v-show="message" class="center">{{ message }}</p>
    <input
      type="search"
      class="filtro"
      @input="filter = $event.target.value"
      placeholder="filtre pelo título da foto"
    >

    <ul class="photos-list">
      <li class="photos-list-item" v-for="(photo, i) of filteredPhotos" :key="i">
        <my-panel :title="photo.titulo">
          <my-image v-my-transform:scale.animate="1.2" :src="photo.url" :alt="photo.titulo"></my-image>
          <router-link :to="{ name: 'update', params: { id: photo._id } }">
            <my-button
              type="button"
              label="UPDATE"
            />
          </router-link>
          <my-button
            type="button"
            label="DELETE"
            @triggeredButton="remove(photo)"
            :confirm="true"
            estilo="danger"
          />
        </my-panel>
      </li>
    </ul>
  </div>
</template>

<script>
import Panel from "../shared/panel/Panel.vue";
import Image from "../shared/imagem-responsiva/Image.vue";
import Button from "../shared/button/Button.vue";
import transform from "../../directives/Transform";
import PhotoService from '../../domain/photo/PhotoService';
const SpecialCharsRegExp = /[-[\]{}()*+?.,\\^$|#\s]/g;

export default {
  components: {
    "my-panel": Panel,
    "my-image": Image,
    "my-button": Button
  },

  directives: {
    "my-transform": transform
  },

  name: "app",

  data() {
    return {
      photos: [],
      filter: "",
      message: ""
    };
  },

  computed: {
    filteredPhotos() {
      if (!this.filter) return this.photos;

      let exp = new RegExp(
        this.filter.trim().replace(SpecialCharsRegExp, "\\$&"),
        "i"
      );

      return this.photos.filter(photo => exp.test(photo.titulo));
    }
  },

  methods: {

    remove(photo) {

       this.service
        .delete(photo._id)
        .then(
          () => {
            let index = this.photos.indexOf(photo);
            this.photos.splice(index, 1);
            this.message = "Foto removida com sucesso";
          },
          error => this.message = error.message 
        )
    }
  },

  created() {

    this.service = new PhotoService(this.$resource);

    this.service
      .list()
      .then(fotos => this.photos = fotos, error => this.message = error.message);
  }
};
</script>

<style>
.home-container {
  width: 92%;
  margin: 0 auto;
}

.center {
  text-align: center;
}

.photos-list {
  list-style: none;
}

.photos-list .photos-list-item {
  display: inline-block;
  vertical-align: top;
  
}

a {
  color: #42b983;
}

.rotate {
  transform: rotate(90);
}

.filtro {
  display: block;
  width: 80%;
  margin: 10px auto;
  font-size: 1.15em;
  border-radius: 5px;
}
</style>
