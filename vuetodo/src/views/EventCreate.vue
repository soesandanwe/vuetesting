<template>
  <v-layout wrap justify-left>
    <v-card width="800" class="mx-auto mt-5" :elevation="15">
      <v-card-title>
        <h3>Event</h3>
      </v-card-title>
      <v-spacer></v-spacer>
      <v-card-text>
        <v-form v-on:submit.prevent="addEvent">
          <v-flex xs12 sm6 md12>
            <v-text-field
              label="Title"
              outlined
              clearable
              persistentHint
              v-model="newEvent.title"
              :rules="[rules.required]"
            ></v-text-field>
          </v-flex>

          <v-flex xs12 sm6 md12>
            <v-text-field
              label="Category"
              outlined
              clearable
              persistentHint
              v-model="newEvent.category"
            ></v-text-field>
          </v-flex>

          <v-flex xs12 sm6 md12>
            <v-textarea
              label="Description"
              outlined
              clearable
              persistentHint
              v-model="newEvent.description"
            ></v-textarea>
          </v-flex>

          <v-flex xs12 sm6 md12>
            <v-text-field
              label="Organizer"
              outlined
              clearable
              persistentHint
              v-model="newEvent.organizer"
            ></v-text-field>
          </v-flex>

          <v-flex xs12 sm6 md12>
            <v-menu
              v-model="menu2"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="newEvent.date"
                  label="Event Date"
                  prepend-inner-icon="event"
                  readonly
                  outlined
                  clearable
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="newEvent.date" :show-current="false" @input="menu2 = false"></v-date-picker>
            </v-menu>
          </v-flex>

          <v-flex xs12 sm6 md12>
            <v-dialog
              ref="dialog"
              v-model="modal2"
              :return-value.sync="newEvent.time"
              persistent
              full-width
              width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="newEvent.time"
                  label="Event Time"
                  prepend-inner-icon="access_time"
                  readonly
                  outlined
                  clearable
                  persistentHint
                  :rules="[rules.required]"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-time-picker v-if="modal2" v-model="newEvent.time" :ampmInTitle="true" full-width>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="modal2 = false">Cancel</v-btn>
                <v-btn text color="primary" @click="$refs.dialog.save(newEvent.time)">OK</v-btn>
              </v-time-picker>
            </v-dialog>
          </v-flex>

          <v-flex xs12 sm6 md12>
            <v-text-field
              label="Location"
              outlined
              clearable
              persistentHint
              prepend-inner-icon="place"
              v-model="newEvent.location"
            ></v-text-field>
          </v-flex>
          <v-btn color="primary" @click="add()">Add Attendee</v-btn>
          <v-form @submit.prevent>
            <br />
            <v-flex xs12 sm6 md12 v-for="(item, k) in newEvent.user" :key="k">
              <v-text-field
                label="Attendee"
                outlined
                clearable
                persistentHint
                prepend-inner-icon="mdi-account"
                append-icon="mdi-minus-circle"
                v-model="item.username"
                @click:append="remove(k)"
              ></v-text-field>
            </v-flex>
          </v-form>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="success" v-on:click="addEvent">Save</v-btn>
        <v-btn v-on:click="cancelEvent">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-layout>
</template>
<script>
import { db } from '../config/db'
import { event } from '@mdi/js'
export default {
  props: ['id'],

  data() {
    return {
      newEvent: {
        category: '',
        date: '',
        description: '',
        location: '',
        organizer: '',
        time: '',
        title: '',
        user: [
          {
            username: ''
          }
        ]
      },
      rules: {
        required: value => !!value || 'Required.'
      },
      svgPath: event,
      menu2: false,
      modal2: false
    }
  },
  created() {
    if (this.$route.name != 'event-create') {
      db.ref('events/' + this.$route.params.id)
        .once('value')
        .then(data => {
          if (data.exists()) {
            var obj = data.val()
            this.newEvent = obj
          } else {
            console.log('There is no data' + this.$route.params.id)
          }
        })
        .catch(error => {
          console.log(error)
        })
      //  console.log("There is no data" + this.$route.params.id);
    }
  },
  methods: {
    addEvent: function() {
      let postData = {
        category: this.newEvent.category,
        date: this.newEvent.date,
        description: this.newEvent.description,
        location: this.newEvent.location,
        organizer: this.newEvent.organizer,
        time: this.newEvent.time,
        title: this.newEvent.title,
        user: this.newEvent.user
      }
      if (this.$route.name == 'event-create') {
        db.ref('events').push(JSON.parse(JSON.stringify(postData)))
        this.$router.push('/')
      } else {
        db.ref('events/' + this.$route.params.id).update(
          JSON.parse(JSON.stringify(postData))
        )
        this.$router.push('/')
      }
    },
    cancelEvent: function() {
      this.$router.push('/')
    },

    add: function() {
      this.newEvent.user.push({})
    },
    remove: function(index) {
      //alert(JSON.stringify(this.newEvent.user[index]));
      this.newEvent.user.splice(index, 1)
    }
  }
}
</script>

<style lang="scss" scoped></style>
