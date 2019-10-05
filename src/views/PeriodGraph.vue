<template>
  <v-app>
    <v-content>
      <v-container>
        <v-alert v-if="hasSyntaxError" type="error">
          <p>[Syntax Error] The URL queries have some syntax errors.</p>
          <p>{{ url }}</p>
        </v-alert>
        <v-row v-else justify="end">
          <v-col cols="12">
            <v-card>
              <v-card-title>{{ title }}</v-card-title>
              <v-card-text>
                <vue-apex-chart width="100%" type="line" :options="options" :series="series" />
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="auto">
            <v-dialog v-model="isShowDialog" width="500">
              <template v-slot:activator="{ on }">
                <v-btn large icon v-on="on">
                  <v-icon large>share</v-icon>
                </v-btn>
              </template>
              <v-card>
                <v-card-title v-if="copyButtonStatus === 'copied'">Copied!!</v-card-title>
                <v-card-title v-else>Let's share!</v-card-title>
                <v-card-text>
                  <v-row>
                    <v-col cols="12">You can share this chart by URL.</v-col>
                    <v-col>{{ url }}</v-col>
                  </v-row>
                </v-card-text>
                <v-card-actions v-if="isCopyable">
                  <v-row justify="end" no-gutters>
                    <v-btn icon @click="copy">
                      <v-icon>file_copy</v-icon>
                    </v-btn>
                  </v-row>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import VueApexCharts from "vue-apexcharts";
import { ApexOptions } from "apexcharts";
import { yyyymmdd2date, isString, isCopyable } from "@/utils";

type Line = {
  plots?: [string, number][];
  legend?: string;
};

const line2series = (
  line: Line
): { name: string; data: { x: Date; y: number }[] } => ({
  name: line.legend || "",
  data: line.plots
    ? line.plots.map(plot => ({
        x: yyyymmdd2date(plot[0]),
        y: plot[1]
      }))
    : []
});

export default Vue.extend({
  name: "PriodGraph",
  components: { ["vue-apex-chart"]: VueApexCharts },
  data: (): {
    copyButtonStatus: "default" | "copied";
    hasSyntaxError: boolean;
    isShowDialog: boolean;
    options: ApexOptions;
    series: ApexAxisChartSeries;
    title?: string;
  } => ({
    copyButtonStatus: "default",
    hasSyntaxError: false,
    isShowDialog: false,
    options: {
      chart: {},
      markers: { size: 5 },
      xaxis: {
        type: "datetime"
      }
    },
    series: [],
    title: ""
  }),
  computed: {
    isCopyable,
    url: function(): string {
      return `${window.location.origin}/#${this.$route.path}?title=${this.$route.query.title}&linesJson=${this.$route.query.linesJson}`;
    }
  },
  methods: {
    copy: function() {
      navigator.clipboard.writeText(this.url).then(() => {
        this.copyButtonStatus = "copied";
        setTimeout(() => {
          this.copyButtonStatus = "default";
        }, 1500);
      });
    }
  },
  watch: {
    ["$route.query"]: {
      handler: function() {
        const { title, linesJson } = this.$route.query;
        if (isString(title)) {
          this.title = title;
        }
        try {
          const lines: Line[] = JSON.parse(this.$route.query
            .linesJson as string);
          this.series = lines.map(line => line2series(line));
        } catch (error) {
          console.error(`SyntaxError: ${this.url}`);
          this.hasSyntaxError = true;
        }
      },
      deep: true,
      immediate: true
    }
  }
});
</script>
