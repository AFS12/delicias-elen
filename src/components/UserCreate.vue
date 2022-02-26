<template>
  <v-container>
      <v-row>
        <v-col>
          <v-text-field
            label="Nome"
            v-model="user.name"
            outlined
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            label="Telefone"
            v-model="user.phone"
            outlined
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            label="E-mail"
            v-model="user.email"
            outlined
          ></v-text-field>
        </v-col>
        <v-col>
          <v-btn color="red" block x-large @click="onFormSubmit">Salvar</v-btn>
        </v-col>
      </v-row>
  </v-container>
</template>

<script>
const firebase = require('../firebaseDb.js');
export default {
  data() {
    return {
      user: {
        name: "",
        email: "",
        phone: "",
      },
    };
  },
  methods: {
    onFormSubmit() {
      firebase.db.collection("users")
        .add(this.user)
        .then(() => {
          alert("User successfully created!");
          this.user.name = "";
          this.user.email = "";
          this.user.phone = "";
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style>
</style>