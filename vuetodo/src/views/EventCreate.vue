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
          <ul>
            <li v-for="(user,index) in newEvent.user" :key="index" :value="user[index]">
            <div class="form-group">
              <label>User ID:</label>
              <input
                type="text"
                class="form-control"
                v-model="user.userid" 
              />
            </div>
            <div class="form-group">
              <label>User Name:</label>
              <input
                type="text"
                class="form-control"
                v-model="user.username"
              />
            </div>
            </li>
          </ul>
          <div class="form-group">
            <input type="submit" class="btn btn-primary" value="Save" />
            <input type="submit"  v-on:click="cancelEvent" class="btn btn-primary" value="Cancel" />
            
          </div>
         
             
        
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { db } from "../config/db";
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
        time:"",
        title: "",
        user:[{
          userid: "",
          username: ""
        }]
      }
    };
  },
   created() {
      if(this.$route.name!="event-create"){
        db.ref("events/" + this.$route.params.id)
            .once("value")
            .then(data => {
              if (data.exists()) {
                var obj = JSON.parse(JSON.stringify(data));
                this.newEvent=obj;
                            
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
    addEvent:function() {
      let postData = {
        id: this.newEvent.id,
        category: this.newEvent.category,
        date: this.newEvent.date,
        description: this.newEvent.description,
        location: this.newEvent.location,
        organizer: this.newEvent.organizer,
        time: this.newEvent.time,
        title: this.newEvent.title,
        user:this.newEvent.user
        
      };
      if(this.$route.name=="event-create")
      {
        db.ref("events").push(JSON.parse(JSON.stringify(postData)));
        this.$router.push("/");
      }
      else{
        var eid=this.$route.params.id;  
        db.ref("events/" + eid).update(JSON.parse(JSON.stringify(postData)));
        this.$router.push({ name: 'event-show', params: { id:eid }});
      }
      
    },
    cancelEvent:function()
    {
      this.$router.push("/");
    }
  }
};
</script>

<style lang="scss" scoped></style>
