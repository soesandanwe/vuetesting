<template>
  <v-toolbar-items class="hidden-sm-and-down">
    <v-btn text>
      <router-link :to="{ name: 'event-list' }">List</router-link>
    </v-btn>

    <v-btn text>
      <router-link :to="{ name: 'event-create' }">Create</router-link>
    </v-btn>
  </v-toolbar-items>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
