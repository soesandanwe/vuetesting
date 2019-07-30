<template>
  <v-card width="400" class="mx-auto mt-5">
    <router-link
      class="event-link"
      :to="{ name: 'event-show', params: { id: this.$vnode.key } }"
    >
      <v-card-title>
        <h2 class="title">{{ event.title }}</h2>
      </v-card-title>
      <v-card-text>
        <h4>{{ event.date }} {{ event.time }}</h4>
        <div>
          <BaseIcon name="users">
            {{ event.user ? Object.values(event.user).length : 0 }}
            attending
          </BaseIcon>
        </div>
      </v-card-text>
    </router-link>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn color="error" v-on:click="deleteItem">Delete</v-btn>
      <v-spacer></v-spacer>
      <v-btn color="success" v-on:click="editItem">Edit</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { db } from "@/config/db";
export default {
  props: {
    event: Object
  },
  methods: {
    deleteItem: function() {
      if (confirm("Are you sure you want to delete this event?")) {
        db.ref("events/" + this.$vnode.key).remove();
        window.location.reload();
      }
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
.event-card {
  padding: 20px;
  margin-bottom: 24px;
  transition: all 0.2s linear;
  cursor: pointer;
}
.event-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2), 0 1px 15px 0 rgba(0, 0, 0, 0.19);
}
.event-card > .title {
  margin: 0;
}

.event-link {
  color: black;
  text-decoration: none;
  font-weight: 100;
}
</style>
