<template>
  <div class="lighting">
    <p class="lighting-name">{{ name }}</p>
    <line-chart
      :height="150"
      :options="options"
      :chart-data="datacollection"
    ></line-chart>
  </div>
</template>

<script>
import LineChart from "@/components/LineChart.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    LineChart,
  },
  props: {
    _id: String,
    name: String,
    chart: Object,
  },
  data() {
    return {
      nameChart: "",
      datacollection: {},
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    };
  },
  mounted() {
    this.fillData(this.chart);
  },
  methods: {
    fillData({ labels, data }) {
      this.datacollection = {
        labels: labels,
        datasets: [
          {
            label: "Data One",
            backgroundColor: "#f87979",
            borderColor: 'white',
            pointBorderColor: 'black',
            pointBackgroundColor: 'coral',
            data: data,
          },
        ],
      };
    },
    splitChartData() {},
  },
  computed: {
    ...mapGetters(["getAllLighting","getLightingLog"]),
  },
  watch: {
    getAllLighting(newValue, oldValue) {
      this.fillData(this.getLightingLog(this._id));
    },
  },
};
</script>

<style lang="scss">
.lighting {
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 10px;
  width: 100%;
  background-color: rgba(244, 244, 245, 0.8);
  border-radius: 10px;
  box-sizing: border-box;

  &-name {
    color: black;
    background-color: rgba(244, 244, 245, 1);
    padding: 8px;
    border-radius: 8px;
    width: fit-content;
    font-size: 14px;
    margin: 0;
  }
}
</style>