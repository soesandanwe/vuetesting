<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <h3>Add Event</h3>
      </div>
      <div class="card-body">
        <form v-on:submit.prevent="addEvent">
          <div class="form-group">
            <label>ID:</label>
            <input type="text" class="form-control" v-model="newEvent.id" />
          </div>
          <div class="form-group">
            <label>Category:</label>
            <input
              type="text"
              class="form-control"
              v-model="newEvent.category"
            />
          </div>
          <div class="form-group">
            <label>Date:</label>
            <input type="text" class="form-control" v-model="newEvent.date" />
          </div>
          <div class="form-group">
            <label>Description:</label>
            <input
              type="text"
              class="form-control"
              v-model="newEvent.description"
            />
          </div>
          <div class="form-group">
            <label>Location:</label>
            <input
              type="text"
              class="form-control"
              v-model="newEvent.location"
            />
          </div>
          <div class="form-group">
            <label>Organizer:</label>
            <input
              type="text"
              class="form-control"
              v-model="newEvent.organizer"
            />
          </div>
          <div class="form-group">
            <label>Time:</label>
            <input type="text" class="form-control" v-model="newEvent.time" />
          </div>
          <div class="form-group">
            <label>Title:</label>
            <input type="text" class="form-control" v-model="newEvent.title" />
          </div>
          <div class="form-group">
            <label>User ID:</label>
            <input
              type="text"
              class="form-control"
              v-model="newEvent.user.id"
            />
          </div>
          <div class="form-group">
            <label>User Name:</label>
            <input
              type="text"
              class="form-control"
              v-model="newEvent.user.name"
            />
          </div>
          <div class="form-group">
            <input type="submit" class="btn btn-primary" value="Add Event" />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { db } from "../config/db";
export default {
  firebase: {
    events: db.ref("events")
  },
  data() {
    return {
      newEvent: {
        category: "",
        date: "",
        description: "",
        id: "",
        location: "",
        organizer: "",
        time: "",
        title: "",
        user: {
          id: "",
          name: ""
        }
      }
    };
  },
  methods: {
    addEvent() {
      this.$firebaseRefs.events.push({
        id: this.newEvent.id,
        category: this.newEvent.category,
        date: this.newEvent.date,
        description: this.newEvent.description,
        location: this.newEvent.location,
        organizer: this.newEvent.organizer,
        time: this.newEvent.time,
        title: this.newEvent.title,
        userid: this.newEvent.user.id,
        username: this.newEvent.user.name
      });
      this.newEvent.description = "";
      this.newEvent.title = "";
      this.$router.push("/index");
    }
  }
};
</script>

<style lang="scss" scoped></style>
