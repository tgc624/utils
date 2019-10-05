<template>
  <v-app>
    <v-content>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field
              id="zenkaku"
              v-model="zenkaku"
              autofocus
              solo
              clearable
              placeholder="全角カタカナ"
              rounded
            />
          </v-col>
          <v-col v-if="isCopyable" cols="12">
            <v-text-field
              id="hankaku"
              append-outer-icon="file_copy"
              flat
              placeholder="変換結果"
              readonly
              solo
              :value="hankaku"
              @click:append-outer="copy"
            />
          </v-col>
          <v-col v-else cols="12">
            <v-card>
              <v-card-text>{{ hankaku }}</v-card-text>
            </v-card>
          </v-col>
          <v-col>
            <span>全角カタカナを半角カタカナにします。</span>
          </v-col>
        </v-row>
        <v-snackbar v-model="showSnackbar" :timeout="750" top>{{ snackbar.textLabel }}</v-snackbar>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import { zenkaku2hankaku } from "@/utils/hankaku";
import { isCopyable } from "@/utils";

export default Vue.extend({
  name: "Hankaku",
  components: {},
  data: (): {
    zenkaku: string | null;
    snackbar: { textLabel: string; color?: string };
    showSnackbar: boolean;
  } => ({
    zenkaku: "",
    snackbar: { textLabel: "" },
    showSnackbar: false
  }),
  computed: {
    hankaku: function(): string {
      return this.zenkaku ? zenkaku2hankaku(this.zenkaku) : "";
    },
    isCopyable
  },
  methods: {
    copy: function() {
      navigator.clipboard
        .writeText(this.hankaku)
        .then(() => {
          this.snackbar = { textLabel: "Copied!" };
        })
        .catch(reason => {
          this.snackbar = { textLabel: reason, color: "error" };
        })
        .finally(() => {
          this.showSnackbar = true;
        });
    }
  }
});
</script>
