<template>
  <v-snackbar v-model="snackbar" :timeout="timeout" :color="status" top>
    <template>
      <v-row>
        <v-col cols="8">
          {{ text }}
        </v-col>
        <v-col cols="4">
          <v-btn color="white" text @click="snackbar = false"> Fechar </v-btn>
        </v-col>
      </v-row>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  props: {
    snackbar: Boolean,
    timeout: Number,
    text: String,
    status: String,
  },
};
</script>

<style>
</style>