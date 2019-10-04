import Vue from "vue";
import Router from "vue-router";
import Top from "@/views/Top.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "top",
      component: Top
    },
    {
      path: "/hankaku",
      name: "hankaku",
      component: () =>
        import(/* webpackChunkName: "hankaku" */ "@/views/Hankaku.vue")
    },
    {
      path: "/period-graph",
      name: "period-graph",
      component: () =>
        import(/* webpackChunkName: "period-graph" */ "@/views/PeriodGraph.vue")
    }
  ]
});
