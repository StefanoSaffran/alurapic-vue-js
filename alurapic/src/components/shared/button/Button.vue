<template>
  <button @click="triggersAction()" class="button" :class="buttonStyle" :type="type">{{label}}</button>
</template>
<script>
export default {
  props: {
    type: {
      required: true,
      type: String
    },

    label: {
      required: true,
      type: String
    },

    confirm: {
      required: false,
      default: false,
      type: Boolean
    },

    estilo: {
      required: false,
      default: "standard",
      type: String
    }
  },

  methods: {
    triggersAction() {
      if (this.confirm) {
        if (confirm("Confirma operacao?")) {
          this.$emit("triggeredButton");
        }
        return;
      }
      this.$emit("triggeredButton");
    }
  },

  computed: {
    buttonStyle() {
      if (this.estilo == "standard") return "button-standard";
      if (this.estilo == "danger") return "button-danger";
    }
  }
};
</script>    

<style scoped lang="sass">

    @import './Button.scss';

</style>