<template>
  <div id="app">
    <div class="menu">
      <router-link to="/home">Home</router-link> |
      <router-link to="/antd">About</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {}
}
</script>

<style>
.menu {
  position: absolute;
  top: 8px;
  left: 19px;
  font-weight: bold;
  font-size: 25px;
}
</style>
