<template>
  <v-container>
    <h1>Lista de Produtos</h1>
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
            <v-icon class="mr-2" @click="editProduct(item)">
              mdi-pencil
            </v-icon>
            <v-icon @click="deleteProduct(item.id)"> mdi-delete </v-icon>
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
                @click="createProduct"
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
                @click="updateProduct"
              >
                Atualizar Produto
              </v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
const firebase = require("../../firebaseDb.js");

export default {
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
        value: "",
      },
      createEdit: false,
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
      if (window.confirm("Do you really want to delete?")) {
        firebase.db
          .collection("products")
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
    editProduct(item) {
      this.editing = item.id;
      this.product.name = item.name;
      this.product.taste = item.taste;
      this.product.value = item.value;
      this.createEdit = true;
    },
    createProduct() {
      firebase.db
        .collection("products")
        .add(this.product)
        .then(() => {
          alert("Product successfully created!");
          this.closeDialog()
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updateProduct() {
      firebase.db.collection("products")
        .doc(this.editing)
        .update(this.product)
        .then(() => {
          alert("Product successfully updated!");
          this.closeDialog()
        })
        .catch((error) => {
          console.log(error);
        });
    },
    closeDialog() {
      this.editing = "";
      this.product.name = "";
      this.product.taste = "";
      this.product.value = "";
      this.createEdit = false;
    },
  },
};
</script>

<style>
</style>