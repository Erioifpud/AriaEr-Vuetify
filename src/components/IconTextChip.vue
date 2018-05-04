<template>
  <v-chip :color="color" text-color="white">
    <v-avatar>
      <v-icon>{{icon}}</v-icon>
    </v-avatar>
    {{text}}
  </v-chip>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    text: {
      type: String,
      default: ''
    },
    color: String,
    icon: String
  },
  name: "icon-text-chip"
}
</script>

<style>

</style>
