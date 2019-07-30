<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <router-link to="/">
          <span class="font-weight-light">Real World Events</span>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <NavBar />
    </v-app-bar>

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
//import HelloWorld from "./components/HelloWorld";
import NavBar from "./components/NavBar";

export default {
  name: "App",
  components: {
    NavBar
  },
  data: () => ({
    //
  })
};
</script>
