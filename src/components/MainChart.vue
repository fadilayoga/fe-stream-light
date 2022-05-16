<template>
  <div class="lighting">
    <p class="lighting-name">{{ chartName }}</p>
    <line-chart
      :height="150"
      :chartId="chartId"
      :chartData="getData()"
      :options="options()"
      :dataCollection="dataCollection()"
    ></line-chart>
  </div>
</template>

<script>
import LineChart from '@/components/LineChart.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    LineChart,
  },
  props: {
    chart: Object,
  },
  data() {
    return {
      chartId: this.chart._id,
      chartName: this.chart.result[0].name,
      chartData: this.chart.logs,
      chartDataClean: [],
    }
  },
  computed: {
    ...mapGetters(['getAllLighting', 'getLightingLog', 'getTime']),
  },
  methods: {
    getData() {
      const map = this.chartData.map((result) => ({
        x: result.timestamp,
        y: result.ldr,
      }))
      return map
    },
    dataCollection() {
      return {
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#f87979',
            borderColor: 'white',
            pointBorderColor: 'black',
            pointBackgroundColor: 'coral',
            data: [],
          },
        ],
      }
    },
    options() {
      return {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
          xAxes: [
            {
              type: 'realtime',
              realtime: {
                duration: 20000,
                refresh: 1000,
                delay: 2000,
              },
            },
          ],
        },
      }
    },
  },
}
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
