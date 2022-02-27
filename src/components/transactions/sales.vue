<template>
  <v-container>
    <h1>Registar Vendas</h1>
    <h3>
      Adicione os produtos que foram vendidos. Informe a quantidade e salve a
      venda
    </h3>
    <br /><br /><br />
    <v-row>
      <v-spacer></v-spacer>
      <v-col cols="4">
        <v-select
          color
          v-model="selecionados"
          name="selecionados"
          :items="selectDescription"
          item-text="name"
          item-value="id"
          chips
          outlined
          multiple
          filled
          label="Produtos"
        >
          <template v-slot:selection="{ item }">
            <v-chip>
              <span>{{ item.name }}</span>
            </v-chip>
          </template>
        </v-select>
      </v-col>
      <v-col cols="4">
        <v-btn
          color="blue"
          x-large
          block
          height="68"
          outlined
          @click="gerarLista"
        >
          Adcionar Produto A venda
        </v-btn>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
    <v-row v-for="(item, i) in selectData" :key="i">
      <v-spacer></v-spacer>
      <v-col cols="4">
        <v-text-field
          disabled
          outlined
          label="Produto"
          v-model="item.name"
        ></v-text-field>
      </v-col>
      <v-col cols="2">
        <v-text-field
          disabled
          outlined
          label="Valor"
          type="number"
          v-model="item.value"
        ></v-text-field>
      </v-col>
      <v-col cols="2">
        <v-text-field
          outlined
          label="Quantidade"
          type="number"
          v-model="item.quantity"
          @change="calculate"
        ></v-text-field>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
    <v-row v-show="selectData != '' && selectData != null">
      <v-spacer></v-spacer>
      <v-col cols="4">
        <v-text-field
          outlined
          type="number"
          disabled
          label="Valor Final"
          v-model="finalValue"
        ></v-text-field>
      </v-col>
      <v-col cols="4">
        <v-btn
          color="green"
          x-large
          block
          height="56"
          outlined
          @click="confirm = !confirm"
        >
          Salvar venda
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
          <v-btn color="green" dark @click="sell">Salvar </v-btn>
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
      produtos: [],
      selectData: [],
      selecionados: [],
      selectDescription: [],
      finalValue: 0,
      sale: {
        date: new Date(),
        total: Number,
        items: [],
      },
      snackbar: false,
      timeout: 2000,
      alertText: "Compra salva com sucesso",
      alertColor: "green",
      confirm: false,
    };
  },

  created() {
    firebase.db.collection("products").onSnapshot((snapshotChange) => {
      this.produtos = [];
      snapshotChange.forEach((doc) => {
        this.produtos.push({
          id: doc.id,
          name: doc.data().name,
          value: doc.data().value,
          taste: doc.data().taste,
          quantity: 0,
          //   sellDate: doc.data().sellDate.toDate().toLocaleDateString(),
        });
        this.selectDescription.push({
          name: doc.data().name + " - " + doc.data().taste,
          id: doc.id,
        });
      });
    });
    console.log(this.selectDescription);
  },

  methods: {
    gerarLista() {
      this.selectData = [];
      this.selecionados.forEach((element) => {
        this.produtos.forEach((product) => {
          product.quantity = 0;
          this.finalValue = 0;
          if (product.id == element) {
            this.selectData.push(product);
          }
        });
      });
    },
    calculate() {
      this.finalValue = 0;
      this.selectData.forEach((element) => {
        this.finalValue =
          this.finalValue +
          element.value *
            (element.quantity > 0
              ? element.quantity
              : (element.quantity = element.quantity * -1));
      });
    },
    sell() {
      this.sale.total = this.finalValue;
      this.sale.items = this.selectData;
      firebase.db
        .collection("sales")
        .add(this.sale)
        .then(() => {
          this.alertSuccess("Venda salva com sucesso!");
          this.selecionados = [];
          this.gerarLista();
          this.sale = {
            date: new Date(),
            items: [],
          };
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