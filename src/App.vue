<template>
  <v-app>
    <v-app-bar color="#FFB91D" app>
      <v-toolbar-title><strong>Delicias da Elen</strong></v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-filter</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer color="black" permanent app dark>
      <v-list>
        <v-row>
          <v-spacer></v-spacer>
          <v-col>
            <v-img
              src="./assets/logo.jpeg"
              max-height="110"
              max-width="110"
              class="rounded-pill"
            ></v-img>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
      </v-list>
      <v-divider color="white"></v-divider>
      <v-divider color="white"></v-divider>
      <v-list nav>
        <v-list-item-group v-model="group" active-class="selected">
          <v-list-item to="/produtos">
            <v-icon large>mdi-food-fork-drink</v-icon>
            <v-list-item-title class="items">
              <h1>Produtos</h1>
            </v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-icon large>mdi-currency-usd</v-icon>
            <v-list-item-title class="items">
              <h1>Vendas</h1>
            </v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-icon large>mdi-cart-plus</v-icon>
            <v-list-item-title class="items">
              <h1>Compras</h1>
            </v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    group: null,
  }),

};
</script>

<style>
.selected {
  color: #ffb91d !important;
}
.items {
  margin-left: 10px;
  font-size: 30px;
}
</style>