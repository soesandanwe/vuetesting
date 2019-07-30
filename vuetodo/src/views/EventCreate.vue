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
            <textarea class="form-control" v-model="newEvent.description" />
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
          <form @submit.prevent>
            <button @click="add()">Add User</button>
            <div class="form-group" v-for="(item, k) in newEvent.user" :key="k">
              <label>User Name:</label>
              <input type="text" class="form-control" v-model="item.username" />

              <button @click="remove(k)">Delete User</button>
            </div>
          </form>

          <div class="form-group">
            <input type="submit" class="btn btn-primary" value="Save" />
            <input
              type="submit"
              v-on:click="cancelEvent"
              class="btn btn-primary"
              value="Cancel"
            />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { db } from "../config/db";
import { constants } from "crypto";
export default {
  props: ["id"],

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
        user: [
          {
            username: ""
          }
        ]
      }
    };
  },
  created() {
    if (this.$route.name != "event-create") {
      db.ref("events/" + this.$route.params.id)
        .once("value")
        .then(data => {
          if (data.exists()) {
            var obj = data.val();
            this.newEvent = obj;
          } else {
            console.log("There is no data" + this.$route.params.id);
          }
        })
        .catch(error => {
          console.log(error);
        });
      //  console.log("There is no data" + this.$route.params.id);
    }
  },
  methods: {
    addEvent: function() {
      let postData = {
        id: this.newEvent.id,
        category: this.newEvent.category,
        date: this.newEvent.date,
        description: this.newEvent.description,
        location: this.newEvent.location,
        organizer: this.newEvent.organizer,
        time: this.newEvent.time,
        title: this.newEvent.title,
        user: this.newEvent.user
      };
      if (this.$route.name == "event-create") {
        db.ref("events").push(JSON.parse(JSON.stringify(postData)));
        this.$router.push("/");
      } else {
        var eid = this.$route.params.id;
        db.ref("events/" + eid).update(JSON.parse(JSON.stringify(postData)));
        this.$router.push({ name: "event-show", params: { id: eid } });
      }
    },
    cancelEvent: function() {
      this.$router.push("/");
    },

    add: function() {
      this.newEvent.user.push({});
    },
    remove: function(index) {
      //alert(JSON.stringify(this.newEvent.user[index]));
      this.newEvent.user.splice(index, 1);
    }
  }
};
</script>

<style lang="scss" scoped></style>
