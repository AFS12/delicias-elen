<template>
  <v-container>
    <h1>Lista de Produtos</h1>
    <h3>
      Adicione os produtos que serão vendidos. Informe o nome, sabor e valor
      para criar ou atualizar um produto.
    </h3>
    <br /><br />
    <v-row>
      <v-spacer></v-spacer>
      <v-col cols="4">
        <v-text-field
          outlined
          label="Pesquisar Produto"
          v-model="pesquisa"
        ></v-text-field>
      </v-col>
      <v-col cols="4">
        <v-btn
          block
          color="blue"
          x-large
          height="56"
          outlined
          @click="createEdit = !createEdit"
        >
          Criar Novo Produto
        </v-btn>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
    <v-row>
      <v-spacer></v-spacer>
      <v-col cols="8">
        <v-data-table :headers="headers" :items="items" :search="pesquisa">
          <template v-slot:item.value="{ item }">
            R$ {{ item.value }}
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon class="mr-2" @click="editProduct(item)" color="blue">
              mdi-pencil
            </v-icon>
            <v-icon @click="preDeleteProduct(item)" color="red">
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
    <v-dialog v-model="createEdit" width="800" persistent>
      <v-card height="250">
        <v-card-title primary-title> Criar Produto </v-card-title>
        <v-card-text>
          <v-row>
            <v-col>
              <v-text-field
                outlined
                label="Nome"
                v-model="product.name"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                outlined
                label="Sabor"
                v-model="product.taste"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                outlined
                label="Valor"
                type="number"
                v-model="product.value"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-row>
            <v-col cols="4">
              <v-btn
                block
                color="red"
                x-large
                height="56"
                outlined
                @click="closeDialog"
              >
                Cancelar
              </v-btn>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="4" v-show="editing == '' || editing == null">
              <v-btn
                block
                color="green"
                x-large
                height="56"
                outlined
                @click="confirm = !confirm"
              >
                Criar Produto
              </v-btn>
            </v-col>
            <v-col cols="4" v-show="editing != '' && editing != null">
              <v-btn
                block
                color="blue"
                x-large
                height="56"
                outlined
                @click="confirm = !confirm"
              >
                Atualizar Produto
              </v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="confirm" width="300">
      <v-card>
        <v-card-title primary-title> Deseja Salvar? </v-card-title>
        <br />
        <v-card-actions>
          <v-btn color="red" dark @click="confirm = !confirm"> Cancelar</v-btn>
          <v-spacer></v-spacer>
          <v-btn
            color="green"
            dark
            @click="createProduct"
            v-show="editing == '' || editing == null"
            >Salvar
          </v-btn>
          <v-btn
            color="blue"
            dark
            @click="updateProduct"
            v-show="editing != '' && editing != null"
            >Salvar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="confirmDelete" width="300">
      <v-card>
        <v-card-title primary-title>
          Deseja Deletar {{ product.name }}?
        </v-card-title>
        <br />
        <v-card-actions>
          <v-btn color="grey" dark @click="confirmDelete = !confirmDelete">
            Cancelar
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="red" dark @click="deleteProduct(editing)">
            Deletar
          </v-btn>
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
      headers: [
        {
          text: "Nome do Produto",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Sabor", value: "taste" },
        { text: "Valor", value: "value" },
        { text: "Ações", value: "actions" },
      ],
      pesquisa: "",
      items: [],
      editing: "",
      product: {
        name: "",
        taste: "",
        value: Number,
      },
      createEdit: false,
      snackbar: false,
      timeout: 2000,
      alertText: "Compra salva com sucesso",
      alertColor: "green",
      confirm: false,
      confirmDelete: false,
    };
  },

  created() {
    firebase.db.collection("products").onSnapshot((snapshotChange) => {
      this.items = [];
      snapshotChange.forEach((doc) => {
        this.items.push({
          id: doc.id,
          name: doc.data().name,
          value: doc.data().value,
          taste: doc.data().taste,
          //   sellDate: doc.data().sellDate.toDate().toLocaleDateString(),
        });
      });
    });
  },

  methods: {
    deleteProduct(id) {
      firebase.db
        .collection("products")
        .doc(id)
        .delete()
        .then(() => {
          this.alertSuccess("Produto deletado com sucesso!", "green");
          this.closeDialogDelete()
          console.log("Document deleted!");
        })
        .catch((error) => {
          this.alertFail();
          console.error(error);
        });
    },
    editProduct(item) {
      this.editing = item.id;
      this.product.name = item.name;
      this.product.taste = item.taste;
      this.product.value = item.value;
      this.createEdit = true;
    },
    preDeleteProduct(item) {
      this.editing = item.id;
      this.product.name = item.name;
      this.product.taste = item.taste;
      this.product.value = item.value;
      this.confirmDelete = true;
    },
    createProduct() {
      firebase.db
        .collection("products")
        .add(this.product)
        .then(() => {
          this.alertSuccess("Produto salvo com sucesso!", "green");
          this.closeDialog();
        })
        .catch((error) => {
          this.alertFail();
          console.log(error);
        });
    },
    updateProduct() {
      firebase.db
        .collection("products")
        .doc(this.editing)
        .update(this.product)
        .then(() => {
          this.alertSuccess("Produto atualizado com sucesso!", "blue");
          this.closeDialog();
        })
        .catch((error) => {
          this.alertFail();
          console.log(error);
        });
    },
    closeDialog() {
      this.editing = "";
      this.product.name = "";
      this.product.taste = "";
      this.product.value = Number;
      this.createEdit = false;
    },
    closeDialogDelete() {
      this.editing = "";
      this.product.name = "";
      this.product.taste = "";
      this.product.value = Number;
      this.confirmDelete = false;
    },
    alertSuccess(text, color) {
      this.confirm = false;
      this.snackbar = true;
      setTimeout(() => {
        this.snackbar = false;
      }, this.timeout);
      this.alertText = text;
      this.alertColor = color;
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