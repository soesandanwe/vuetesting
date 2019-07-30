<template>
  <v-card width="600" class="mx-auto mt-5">
    <v-card-title>Event Details</v-card-title>
    <v-spacer></v-spacer>
    <v-card-text>
      <div class="event-header">
        <h1>{{ event.title }}</h1>
        <br />

        <p>{{ event.description }}</p>

        <h4>Category: {{ event.category }}</h4>
        <br />
        <h4>Organized by : {{ event.organizer }}</h4>
        <br />
        <BaseIcon name="evtdate">
          <v-icon medium slot="images">event</v-icon>
          <h4 slot="texts">{{ event.date }}</h4>
        </BaseIcon>
        <br />
        <BaseIcon name="evttime">
          <v-icon medium slot="images">access_time</v-icon>
          <h4 slot="texts">{{ event.time }}</h4>
        </BaseIcon>
        <v-spacer></v-spacer>
        <BaseIcon name="evtloc">
          <v-icon medium slot="images">place</v-icon>
          <h4 slot="texts">{{ event.location }}</h4>
        </BaseIcon>
        <v-spacer></v-spacer>
      </div>

      <v-badge :overlap="true">
        <template v-slot:badge>
          {{ event.user ? Object.values(event.user).length : 0 }}
        </template>
        <v-icon medium>mdi-account</v-icon>
      </v-badge>

      <br />
      <ul class="list-group">
        <li v-for="(users, index) in event.user" :key="index" class="list-item">
          <b>{{ users ? users.username : "" }}</b>
        </li>
      </ul>
    </v-card-text>
  </v-card>
</template>
<script>
import { db } from "@/config/db";
export default {
  props: {
    event: Object
  },
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
<style lang="scss" scoped></style>
