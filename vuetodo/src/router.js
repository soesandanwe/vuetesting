import Vue from "vue";
import Router from "vue-router";
import EventList from "./views/EventList.vue";

import EventCreate from "./views/EventCreate.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "event-list",
      component: EventList
    },

    {
      path: "/event/create",
      name: "event-create",
      component: EventCreate
    },
    {
      path: "/event/update/:id",
      name: "event-update",
      component: EventCreate
    }
  ]
});
