<template>
  <v-layout row wrap>
    <template v-for="task in tasks">
      <v-flex xs12 sm12 md12 :key="task.gid">
        <v-card :color="getStyleByTask(task).color" class="white--text">
          <v-card-title primary-title>
            <div class="headline">{{getFileName(task.files[0].path)}}</div>
            <status-chip v-if="task" :status="task.status" :style-obj="getStyleByTask(task)"></status-chip>
          </v-card-title>
          <v-card-text>
            <size-chip :size="task.totalLength" :color="getStyleByTask(task).color + ' darken-1'" icon="inbox"></size-chip>
            <speed-chip :speed="task.downloadSpeed" :color="getStyleByTask(task).color + ' darken-1'" icon="file_download"></speed-chip>
            <icon-text-chip :text="task.connections" :color="getStyleByTask(task).color + ' darken-1'" icon="bluetooth"></icon-text-chip>
          </v-card-text>
          <v-card-actions>
            <template v-if="task.status !== 'complete' && task.status !== 'removed'">
              <v-btn @click="doPauseOrContinue(task)" outline small dark>
                <v-icon>{{(task.status === 'paused' || task.status === 'waiting') ? 'play_arrow' : 'pause'}}</v-icon>
              </v-btn>
            </template>
            <v-btn @click="doDelete(task)" outline small dark>
              <v-icon>delete</v-icon>
            </v-btn>
            <template v-if="task.status === 'removed'">
              <v-btn @click="doRestart(task)" outline small dark>
                <v-icon>replay</v-icon>
              </v-btn>
            </template>
          </v-card-actions>
          <v-tooltip top>
            <v-progress-linear slot="activator" :color="getStyleByTask(task).color + ' darken-2'" :value="getPercentage(task)"></v-progress-linear>
            {{getPercentage(task)}}%
          </v-tooltip>
        </v-card>
      </v-flex>
    </template>
  </v-layout>
</template>

<script>
import StatusChip from "./StatusChip";
import SpeedChip from "./SpeedChip";
import SizeChip from "./SizeChip";
import IconTextChip from "./IconTextChip";

export default {
  data() {
    return {};
  },
  components: {
    StatusChip,
    SpeedChip,
    SizeChip,
    IconTextChip
  },
  props: {
    tasks: {
      type: Array,
      default: []
    }
  },
  methods: {
    getStyleByTask(task) {
      if (task.status === "complete") {
        return { color: "green", icon: "check" };
      } else if (task.status === "error") {
        return { color: "red", icon: "clear" };
      } else if (task.status === "paused") {
        return { color: "light-blue", icon: "pause" };
      } else if (task.status === "waiting") {
        return { color: "amber", icon: "autorenew" };
      } else if (task.status === "removed") {
        return { color: "blue-grey", icon: "delete" };
      } else if (task.status === "active") {
        return { color: "teal", icon: "play_arrow" };
      }
    },
    getPercentage(task) {
      return parseInt(task.completedLength) / parseInt(task.totalLength) * 100;
    },
    getFileName(path) {
      return path.substring(path.lastIndexOf("/") + 1, path.length);
    },
    doPauseOrContinue(task) {
      if (task.status === "paused" || task.status === "waiting") {
        this.doAction("unpause", task.gid);
      } else {
        this.doAction("pause", task.gid);
      }
    },
    doDelete(task) {
      if (task.status === 'complete' || task.status === 'error' || task.status === 'removed') {
        this.doAction('removeDownloadResult', task.gid);
      } else {
        this.doAction('remove', task.gid);
      }
    },
    doRestart() {

    },
    doAction(action, gid) {
      var self = this;
      window.aria2.send(action, gid, function(err, res) {
        self.$emit("show-action-message", {
          err: err,
          message: action + " success"
        });
      });
    }
  },
  computed: {},
  name: "task-list"
};
</script>

<style>

</style>
