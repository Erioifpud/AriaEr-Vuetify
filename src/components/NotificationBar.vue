<template>
  <v-snackbar v-model="snack" :color="color" :timeout="timeout" bottom right>
    {{text}}
    <v-btn dark flat @click.native="snack = false">
      <v-icon>clear</v-icon>
    </v-btn>
  </v-snackbar>
</template>

<script>
export default {
  data() {
    return {
      snack: false,
      timeout: 2000,
      text: '',
      color: ''
    };
  },
  methods: {
    show(color, text) {
      this.snack = true;
      this.color = color;
      this.text = text;
    }
  },
  name: 'notification-bar'
};
</script>

<style>

</style>
