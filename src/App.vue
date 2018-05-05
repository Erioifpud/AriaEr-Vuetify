<template>
  <v-app>
    <v-toolbar fixed app>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <template v-if="options[1]">
        <speed-chip :speed="options[1].uploadSpeed" color="indigo" icon="file_upload"></speed-chip>
        <speed-chip :speed="options[1].downloadSpeed" color="teal" icon="file_download"></speed-chip>
      </template>
      <add-link-button :global-option="options[2]" @show-action-message="showActionMessage"></add-link-button>
      <connection-button @connection-changed="changeServerOption" ref="connectionBtn"></connection-button>
      <v-btn dark>
        <v-icon>info_outline</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-container fluid grid-list-lg>
        <v-slide-y-transition mode="out-in">
          <task-list :tasks="tasks" @show-action-message="showActionMessage"></task-list>
        </v-slide-y-transition>
      </v-container>
      <notification-bar ref="notificationBar"></notification-bar>
    </v-content>
  </v-app>
</template>

<script>
import AddLinkButton from "./components/AddLinkButton";
import ConnectionButton from "./components/ConnectionButton";
import TaskList from "./components/TaskList";
import NotificationBar from "./components/NotificationBar";
import SpeedChip from "./components/SpeedChip";
import Aria2 from "aria2";
import util from "./components/util";
import _ from "lodash";

export default {
  data() {
    return {
      title: "AriaEr",
      connected: false,
      timerId: -1,
      tasks: [],
      options: []
    };
  },
  methods: {
    changeServerOption() {
      var opt = this.$refs.connectionBtn.getAria2Option;
      window.aria2 = new Aria2(opt);
      this.connected = false;
    },
    showConnectMessage(err) {
      if (err) {
        this.$refs.notificationBar.show("error", err.message);
        this.connected = false;
        return;
      }
      if (!this.connected) {
        this.$refs.notificationBar.show("success", "Aria2 connected");
        this.connected = true;
      }
    },
    showMessage(obj) {
      if (obj.err) {
        this.$refs.notificationBar.show("error", obj.err.message);
      } else {
        this.$refs.notificationBar.show("success", obj.message);
      }
    },
    processResponse(err, res) {
      this.showConnectMessage(err);
      this.tasks = _.concat(res[0][0] || [], res[1][0] || [], res[2][0] || []);
      this.options = _.concat(res[3][0] || [], res[4][0] || [], res[5][0] || []);
    },
    refresh() {
      util.multicall(window.aria2, this.processResponse);
    },
    showActionMessage(obj) {
      this.showMessage(obj);
      this.refresh();
    }
  },
  mounted() {
    this.$refs.notificationBar.show("primary", "Trying to connect...");
    clearInterval(this.timerId);
    this.timerId = setInterval(() => {
      if (window.aria2) {
        util.multicall(window.aria2, this.processResponse);
      }
    }, 3000);
  },
  components: {
    AddLinkButton,
    ConnectionButton,
    TaskList,
    NotificationBar,
    SpeedChip
  }
};
</script>
