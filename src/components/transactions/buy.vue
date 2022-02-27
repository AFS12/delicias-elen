<template>
  <v-container>
    <h1>Registar Compras</h1>
    <h3>
      Adicione as compras que foram feitas. Informe a descrição e o valor da
      compra.
    </h3>
    <br /><br /><br />
    <v-row>
      <v-spacer></v-spacer>
      <v-col cols="8">
        <v-textarea
          outlined
          auto-grow
          label="Descrição"
          placeholder="Exemplo: Ingredientes da sopa, Estoque refrigerante, Concertos..."
          v-model="buyForm.description"
        ></v-textarea>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
    <v-row>
      <v-spacer></v-spacer>
      <v-col cols="4">
        <v-text-field
          type="Number"
          label="Valor"
          outlined
          v-model="buyForm.buyValue"
        ></v-text-field>
      </v-col>
      <v-col cols="4">
        <v-btn color="green" x-large block outlined @click="confirm = !confirm">
          Salvar Compra
        </v-btn>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
    <v-dialog v-model="confirm" width="300">
      <v-card>
        <v-card-title primary-title> Deseja Salvar? </v-card-title>
        <br />
        <v-card-actions>
          <v-btn color="red" dark @click="confirm = !confirm"> Cancelar</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="green" dark @click="buySave">Salvar </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <alert
      :snackbar="snackbar"
      :timeout="timeout"
      :text="alertText"
      :status="alertColor"
    ></alert>
  </v-container>
</template>

<script>
const firebase = require("../../firebaseDb.js");
import alert from "../alert.vue";
export default {
  components: {
    alert,
  },

  data() {
    return {
      buyForm: {
        description: "",
        buyValue: 0,
      },
      snackbar: false,
      timeout: 2000,
      alertText: "Compra salva com sucesso",
      alertColor: "green",
      confirm: false,
    };
  },

  methods: {
    buySave() {
      this.confirm = false;
      firebase.db
        .collection("buy")
        .add(this.buyForm)
        .then(() => {
          this.alertSuccess("Compra salva com sucesso!");
          this.buyForm.description = "";
          this.buyForm.buyValue = 0;
        })
        .catch((error) => {
          this.alertFail();
          console.log(error);
        });
    },
    alertSuccess(text) {
      this.confirm = false;
      this.snackbar = true;
      setTimeout(() => {
        this.snackbar = false;
      }, this.timeout);
      this.alertText = text;
      this.alertColor = "green";
    },
    alertFail() {
      this.confirm = false;
      this.snackbar = true;
      setTimeout(() => {
        this.snackbar = false;
      }, this.timeout);
      this.alertText = "Aconteceu algum erro!";
      this.alertColor = "red";
    },
  },
};
</script>

<style>
</style>