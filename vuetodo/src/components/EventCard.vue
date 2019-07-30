<template>
  <v-layout justify-center>
    <v-card
      width="450"
      class="mx-auto mt-5"
      :elevation="15"
      @click.stop="show = true"
    >
      <v-card-title>
        <h2 class="title">{{ event.title }}</h2>
      </v-card-title>
      <v-card-text>
        <h4>{{ event.date }} {{ event.time }}</h4>

        <BaseIcon name="evtloc">
          <v-icon medium slot="images">mdi-account-group</v-icon>
          <v-spacer></v-spacer>
          <h3 slot="texts">
            {{ event.user ? Object.values(event.user).length : 0 }}
            <span>attending</span>
          </h3>
        </BaseIcon>
      </v-card-text>

      <v-dialog v-model="show" max-width="600">
        <EventDetails :event="event" />
      </v-dialog>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn color="error" @click.stop="dialog = true">Remove</v-btn>

        <v-btn color="success" v-on:click="editItem">Edit</v-btn>
        <v-dialog v-model="dialog" persistent max-width="300">
          <v-card>
            <v-card-title class="headline">Remove Event</v-card-title>
            <v-card-text>
              Are you sure you want to remove this event :
              {{ event.title }} ?
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click.stop="dialog = false">No</v-btn>
              <v-btn color="primary" text @click.stop="deleteItem">Yes</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card-actions>
    </v-card>
  </v-layout>
</template>

<script>
import { db } from "@/config/db";
import EventDetails from "@/components/EventDetails.vue";
export default {
  components: { EventDetails },
  props: {
    event: Object
  },
  data() {
    return {
      show: false,
      dialog: false
    };
  },
  methods: {
    deleteItem: function() {
      db.ref("events/" + this.$vnode.key).remove();
      window.location.reload();
    },
    editItem: function() {
      var eid = this.$vnode.key;
      this.$router.push({ name: "event-update", params: { id: eid } });
    }
  }
};
</script>

<style scoped>
h2 {
  color: blueviolet;
}
h4 {
  color: blueviolet;
}
</style>
