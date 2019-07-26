<template>
  <div>
    <div class="event-header">
      <span class="eyebrow">@{{ event.time }} on {{ event.date }}</span>
      <h1 class="title">{{ event.title }}</h1>
      <h5>Organized by {{ event.organizer }}</h5>
      <h5>Category: {{ event.category }}</h5>
    </div>

    <BaseIcon name="map">
      <h2>Location</h2>
    </BaseIcon>

    <address>{{ event.location }}</address>

    <h2>Event details</h2>
    <p>{{ event.description }}</p>

    <h2>
      Attendees
      <span class="badge -fill-gradient">{{
        event.attendees ? event.attendees.length : 0
      }}</span>
    </h2>
    <ul class="list-group">
      <li
        v-for="(attendee, index) in event.attendees"
        :key="index"
        class="list-item"
      >
        <b>{{ attendee.name }}</b>
      </li>
    </ul>
  </div>
</template>
<script>
//import EventService from "@/services/EventService.js";
import { db } from "@/config/db";
//import { ReverseO2A } from "object-to-array-convert";
export default {
  props: ["id"],
  data() {
    return {
      event: {}
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
  border-bottom: solid 1px #e5e5e5;
}
</style>
