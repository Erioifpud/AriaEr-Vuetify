<template>
  <v-dialog v-model="dialog" max-width="500px">
    <v-btn color="success" dark slot="activator">
      <v-icon>add</v-icon>
    </v-btn>
    <v-card>
      <v-card-title>
        <span class="headline">Add Link</span>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12>
              <v-text-field v-model="linkText" label="Links" textarea required></v-text-field>
            </v-flex>
            <v-flex xs6>
              <!--
              <upload-button title="Torrent" :selectedCallback="updateTorrentFile"></upload-button>
              
              <input type="file" v-on:change="test">
              -->
              <v-text-field v-model="rpath" label="Relative path"></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field v-model="connections" label="Max connections"></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
        <v-btn color="blue darken-1" flat @click.native="dialog = false" @click="doAddLink()">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import UploadButton from "./UploadButton";

export default {
  data() {
    return {
      dialog: false,
      linkText: "",
      torrent: undefined,
      rpath: '/',
      connections: 5
    };
  },
  components: {
    UploadButton
  },
  methods: {
    doAction(action, links, options) {
      var self = this;
      window.aria2.send(action, links, options, function(err, res) {
        self.$emit("show-action-message", {
          err: err,
          message: action + " success"
        });
      });
    },
    doAddLink() {
      var links = this.linkText.split("\n");
      var option = {};
      option['dir'] = this.getAbsolutePath;
      option['max-connection-per-server'] =  this.connections || this.globalOption['max-connection-per-server'];
      this.doAction("addUri", links, option);
      /*
      if (this.torrent) {
        this.doAction('addTorrent', [].concat(this.torrent), option);
        this.torrent = undefined;
      }
      */
    }
  },
  computed: {
    getAbsolutePath() {
      return this.globalOption.dir + this.rpath;
    }
  },
  props: {
    globalOption: {
      required: false,
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  name: "add-link-button"
};
</script>

<style>

</style>
