<template>
  <div id="main">
    <h1>Events Listing</h1>

    <ul id="link-list">
      <li v-for="item in items" v-bind:key="item.value">
        <router-link :to="{ name: 'event-show', params: { id: item } }"
          >Show Event #{{ item }}</router-link
        >
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  el: "#link-list",
  data: function() {
    return {
      items: [0, 1, 2]
    };
  }
};
</script>
