<template>
  <div id="app">
    <div class="header">
      <div class="menu">
        <router-link to="/home">
          <a class="item" href="javascript:;">主页</a>
        </router-link>|
        <router-link to="/about">
          <a class="item" href="javascript:;">About</a>
        </router-link>
      </div>
      <a class="source" href="https://github.com/sudh-17/ant-design-todomvc" target="_blank">
        <img src="./assets/github.png" alt srcset />
      </a>
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

<style lang="less" scoped>
.header {
  position: fixed;
  top: 0px;
  font-size: 20px;
  font-weight: bold;
  width: 100%;
  background: #1f1f1f;
  padding: 3px 0;
  .menu {
    height: 27px;
    display: inline-block;
    width: 186px;
    padding-left: 32px;
    position: relative;
    top: 0px;
  }
  .item {
    color: aliceblue;
  }
  a {
    text-decoration: none !important;
  }
  img {
    width: 28px;
    height: 28px;
  }
  .source {
    position: relative;
    top: 0px;
  }
}
</style>
