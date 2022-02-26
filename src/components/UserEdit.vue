<template>
  <v-container>
    <v-row>
      <v-col>
        <v-text-field label="Nome" v-model="user.name" outlined></v-text-field>
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
        <v-btn color="red" block x-large @click="onUpdateForm">Salvar</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
const firebase = require("../firebaseDb.js");

export default {
  data() {
    return {
      user: {},
    };
  },
  created() {
    let dbRef = firebase.db.collection("users").doc(this.$route.params.id);
    dbRef
      .get()
      .then((doc) => {
        this.user = doc.data();
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    onUpdateForm() {
      firebase.db.collection("users")
        .doc(this.$route.params.id)
        .update(this.user)
        .then(() => {
          console.log("User successfully updated!");
          this.$router.push("/list");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>