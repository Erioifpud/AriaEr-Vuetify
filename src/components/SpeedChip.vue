<template>
  <icon-text-chip :icon="icon" :color="color" :text="getSpeed + '/s'"></icon-text-chip>
</template>

<script>
import IconTextChip from './IconTextChip';
import filesize from 'filesize';

export default {
  data() {
    return {};
  },
  computed: {
    getSpeed() {
      return filesize(parseInt(this.speed));
    }
  },
  props: {
    speed: {
      type: String,
      default: '0',
    },
    color: String,
    icon: String
  },
  components: {
    IconTextChip
  },
  name: "speed-chip"
};
</script>

<style>

</style>
