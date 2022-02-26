<template>
  <v-container>
    <v-row>
      <v-col cols="4" v-for="user in Users" :key="user.key">
        <v-card>
          <v-card-title primary-title>
            {{ user.name }}
          </v-card-title>
          <v-card-text>
            {{ user.phone }}
            <br />
            {{ user.email }}
          </v-card-text>
          <v-card-actions>
            <v-btn :to="{ name: 'edit', params: { id: user.key } }">
              Editar
            </v-btn>
            <v-btn @click.prevent="deleteUser(user.key)" color="red" dark>
              Deletar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
const firebase = require("../firebaseDb.js");

export default {
  data() {
    return {
      Users: [],
    };
  },
  created() {
    firebase.db.collection("users").onSnapshot((snapshotChange) => {
      this.Users = [];
      snapshotChange.forEach((doc) => {
        this.Users.push({
          key: doc.id,
          name: doc.data().name,
          email: doc.data().email,
          phone: doc.data().phone,
        });
      });
    });
  },
  methods: {
    deleteUser(id) {
      if (window.confirm("Do you really want to delete?")) {
        firebase.db
          .collection("users")
          .doc(id)
          .delete()
          .then(() => {
            console.log("Document deleted!");
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
  },
};
</script>

<style>
</style>