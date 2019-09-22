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
          <v-col cols="12">
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
          <v-col>
            <v-sheet>
              <span>全角カタカナを半角カタカナにします。</span>
            </v-sheet>
          </v-col>
        </v-row>
        <v-snackbar v-model="showSnackbar" :timeout="750" top>Copyed!</v-snackbar>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import { zenkaku2hankaku } from "@/utils/hankaku";

export default Vue.extend({
  name: "Hankaku",
  components: {},
  data: (): { zenkaku: string | null; showSnackbar: boolean } => ({
    zenkaku: "",
    showSnackbar: false
  }),
  computed: {
    hankaku: function() {
      return this.zenkaku ? zenkaku2hankaku(this.zenkaku) : "";
    }
  },
  methods: {
    copy: function() {
      (document.querySelector("#hankaku") as HTMLInputElement).select();
      document.execCommand("copy");
      this.showSnackbar = true;
      (document.querySelector("#zenkaku") as HTMLInputElement).select();
    }
  }
});
</script>
