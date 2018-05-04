<template>
  <icon-text-chip :color="color" :icon="icon" :text="getSize"></icon-text-chip>
</template>

<script>
import IconTextChip from "./IconTextChip";
import filesize from 'filesize';

export default {
  data() {
    return {};
  },
  computed: {
    getSize() {
      return filesize(parseInt(this.size));
    }
  },
  props: {
    size: {
      type: String,
      default: "0"
    },
    color: String,
    icon: String
  },
  components: {
    IconTextChip
  },
  name: "size-chip"
};
</script>

<style>

</style>
