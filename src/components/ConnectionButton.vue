<template>
  <v-dialog v-model="dialog" max-width="500px">
    <v-btn color="primary" dark slot="activator">
      <v-icon>settings</v-icon>
    </v-btn>
    <v-card>
      <v-card-title>
        <span class="headline">Connection Setting</span>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12 sm4 md4>
              <v-select 
                :items="['http', 'https']" 
                v-model="ariaerSecure" 
                label="Protocol" 
                return-object
              ></v-select>
            </v-flex>
            <v-flex xs12 sm8 md8>
              <v-text-field label="Host" v-model="ariaerHost" required></v-text-field>
            </v-flex>
            <v-flex xs6 sm6 md6>
              <v-text-field label="Port" v-model="ariaerPort" required></v-text-field>
            </v-flex>
            <v-flex xs6 sm6 md6>
              <v-text-field label="Path" v-model="ariaerPath" required></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field 
                label="Token" 
                v-model="ariaerSecret"
                :append-icon="tokenHidden ? 'visibility' : 'visibility_off'"
                :append-icon-cb="() => (tokenHidden = !tokenHidden)"
                :type="tokenHidden ? 'password' : 'text'"
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
        <v-btn color="blue darken-1" flat @click.native="dialog = false" @click="$emit('connection-changed')">Connect</v-btn><!-- -->
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Aria2 from "aria2";
import util from "./util";

export default {
  data() {
    return {
      dialog: false,
      tokenHidden: true,
      /*
      host: "localhost",
      port: 6800,
      path: "/jsonrpc",
      secret: "",
      protocols: [
        { name: "http", secure: false },
        { name: "https", secure: true }
      ],
      selected: { name: "http", secure: false },
      */
      timerId: -1,
      connected: false
    };
  },
  methods: {
    /*
    saveToStorage() {
      this.$localStorage.set("ariaerSecure", this.selected.secure);
      this.$localStorage.set("ariaerHost", this.host);
      this.$localStorage.set("ariaerPort", this.port);
      this.$localStorage.set("ariaerSecret", this.secret || "");
      this.$localStorage.set("ariaerPath", this.path);

      this.tryConnect();
    },
    loadFromStorage() {
      this.selected = this.$localStorage.get("ariaerSecure")
        ? this.protocols[1]
        : this.protocols[0];
      this.host = this.$localStorage.get("ariaerHost");
      this.port = this.$localStorage.get("ariaerPort");
      this.secret = this.$localStorage.get("ariaerSecret");
      this.path = this.$localStorage.get("ariaerPath");
    },
    */
    /*
    tryConnect() {
      // 移到APP里 建个Stat.vue
      this.connected = false;
      this.__proto__.aria2 = new Aria2(this.getAria2Option);
      clearInterval(this.timerId);
      console.log("removed timer " + this.timerId);
      if (!this.connected) {
        this.timerId = setInterval(() => {
          console.log("trying...", this.aria2);
          util.multicall(this.aria2, function(err, res) {
            if (err) {
              console.log(err);
            } else {
              console.log("success", res);
              this.connected = true;
            }
          });
        }, 3000);
      }
    }
    */
  },
  localStorage: {
    ariaerSecure: {
      type: String,
      default: "http"
    },
    ariaerHost: {
      type: String,
      default: "localhost"
    },
    ariaerPort: {
      type: String,
      default: 6800
    },
    ariaerSecret: {
      type: String,
      default: ""
    },
    ariaerPath: {
      type: String,
      default: "/jsonrpc"
    }
  },
  computed: {
    getAria2Option() {
      return {
        host: this.ariaerHost,
        port: parseInt(this.ariaerPort),
        secure: this.ariaerSecure === "http" ? false : true,
        secret: this.ariaerSecret,
        path: this.ariaerPath
      };
    }
  },
  mounted() {
    this.$emit('connection-changed');
  },
  name: "connection-button"
};
</script>

<style>

</style>
