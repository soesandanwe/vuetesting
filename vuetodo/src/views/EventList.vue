<template>
  <div id="main">
    <h1>Events Listing</h1>
  
    <div v-for="(event, index) in events" :key="index" :valuekeys="index">
    
    <EventCard
      v-for="(value,index) in event"
      :key="index"
      :event="value"
    />
    </div>
  </div>
</template>
<script>
//import EventService from "@/services/EventService.js";
import EventCard from "@/components/EventCard.vue";
import { db } from "@/config/db";
import { O2A } from "object-to-array-convert";
export default {
  components: { EventCard },
  props: {
    valuekeys: Object
  },
  data() {
    return {
      events: []
    };
  },
  created() {
    db.ref()
      .child("events")
      .once("value")
      .then(data => {
        this.events.push(data.toJSON());
   
      })
      .catch(error => {
        console.log(error);
      });
  }
  /*created() {
    EventService.getEvents()
      .then(response => {
        this.events = response.data; // For now, logs out the response
      })
      .catch(error => {
        console.log("There was an error:", error.response); // Logs out the error
      });
  }*/
};
</script>
