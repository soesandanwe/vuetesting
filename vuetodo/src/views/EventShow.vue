<template>
  <div>
    <v-card width="600" class="mx-auto mt-5">
      <v-card-title>
        <h1 class="title">{{ event.title }}</h1>
      </v-card-title>
      <v-card-text>
        <div class="event-header">
          <h2>Event details</h2>
          <p>{{ event.description }}</p>
          <br />
          <h4>Category: {{ event.category }}</h4>
          <br />
          <h4>Date : {{ event.date }}</h4>
          <br />
          <h4>Time: {{ event.time }}</h4>
          <br />
          <BaseIcon name="map">
            :
            <address>{{ event.location }}</address>
          </BaseIcon>
          <br />
          <h4>Organized by : {{ event.organizer }}</h4>
          <br />
        </div>

        <v-badge :overlap="true">
          <template v-slot:badge>
            {{ event.user ? Object.values(event.user).length : 0 }}
          </template>
          <v-icon large>{{ svgPath }}</v-icon>
        </v-badge>

        <br />
        <ul class="list-group">
          <li
            v-for="(users, index) in event.user"
            :key="index"
            class="list-item"
          >
            <b>{{ users ? users.username : "" }}</b>
          </li>
        </ul>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
//import EventService from "@/services/EventService.js";
import { db } from "@/config/db";
import { mdiAccount } from "@mdi/js";
//import { ReverseO2A } from "object-to-array-convert";
export default {
  props: ["id"],
  data() {
    return {
      event: {},
      svgPath: mdiAccount
    };
  },
  /*created() {
    EventService.getEvent(this.id) // <--- Send the prop id to our EventService
      .then(response => {
        this.event = response.data;
      })
      .catch(error => {
        console.log("There was an error:", error.response);
      });
  }*/
  created() {
    db.ref("events/" + this.id)
      .once("value")
      .then(data => {
        if (data.exists()) {
          var obj = JSON.parse(JSON.stringify(data));
          this.event = obj;
        } else {
          console.log("There is no data" + this.id);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>
<style scoped>
.location {
  margin-bottom: 0;
}
.location > .icon {
  margin-left: 10px;
}
.event-header > .title {
  margin: 0;
}
.list-group {
  margin: 0;
  padding: 0;
  list-style: none;
}
.list-group > .list-item {
  padding: 1em 0;
  border-top: solid 1px #e5e5e5;
}
</style>
