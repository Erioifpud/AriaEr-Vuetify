<template>
  <v-chip text-color="white" :color='getDarkenColor' label>
    <v-icon left>{{styleObj.icon}}</v-icon>
    {{status.toUpperCase()}}
  </v-chip>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    getDarkenColor() {
      return this.styleObj.color + " darken-1";
    }
  },
  props: {
    status: String,
    styleObj: Object
  },
  name: "status-chip"
};
</script>

<style>

</style>
