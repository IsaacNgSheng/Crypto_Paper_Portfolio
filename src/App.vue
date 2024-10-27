<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
      <router-link to="/profit">Profit</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
nav {
  background-color: #e91e63;
  padding: 1em;
  display: flex;
  justify-content: space-around;
}

a {
  color: white;
  font-weight: bold;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>
