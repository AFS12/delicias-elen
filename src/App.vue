<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-btn color="red" to="/">Add User</v-btn>

      <v-btn color="blue" to="/list">View Users</v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>
