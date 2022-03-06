<template>
  <v-container>
    <h1>Resumo de Finanças</h1>
    <h3>Aqui tera o resumo das compras e vendas do estabelecimento.</h3>
    <br /><br />
    <v-card class="mx-auto text-center" color="green" dark max-width="800">
      <v-card-text>
        <v-sheet color="rgba(0, 0, 0, .12)">
          <v-sparkline
            :value="valueSparkline"
            color="rgba(255, 255, 255, .7)"
            height="100"
            line-width="2"
            padding="24"
            stroke-linecap="round"
          >
            <template v-slot:label="item"> R${{ item.value }} </template>
          </v-sparkline>
        </v-sheet>
      </v-card-text>

      <v-card-text>
        <div class="text-h4 font-weight-thin">Vendas dos ultimos 7 dias</div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
const firebase = require("../firebaseDb.js");
export default {
  props: {},
  components: {},
  data() {
    return {
      valueSparkline: [0, 0, 0, 0, 0, 0, 0],
      sales: [],
      testing: [],
    };
  },
  computed: {},
  watch: {},
  methods: {
    loadSevenSales() {
      this.sales.forEach((element) => {
        var date = new Date(element.date.seconds * 1000).setHours(0, 0, 0, 0);
        var date2 = new Date().setHours(0, 0, 0, 0);
        var day = null;
        if (date == date2) {
          day = 0;
        } else {
          day = new Date(date2 - date).getDate();
        }
        if (day < 7) {
          this.valueSparkline[day] += element.total;
        }
      });
      this.valueSparkline = this.valueSparkline.reverse();
    },
  },
  created() {
    firebase.db.collection("sales").onSnapshot((snapshotChange) => {
      snapshotChange.forEach((doc) => {
        this.sales.push({
          key: doc.id,
          date: doc.data().date,
          items: doc.data().items,
          total: doc.data().total,
        });
        this.testing.push(
          new Date(doc.data().date.seconds * 1000).toLocaleDateString()
        );
      });
      this.loadSevenSales();
    });
  },
  mounted() {},
};
</script>
