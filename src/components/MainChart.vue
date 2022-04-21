<template>
  <div class="lighting">
    <p class="lighting-name">{{ chartName }}</p>
    <line-chart
      :height="150"
      :options="options"
      :chart-data="datacollection"
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
      chartId: this.chart.result[0]._id,
      chartName: this.chart.result[0].name,
      datacollection: {},
      options: {
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
        },
      },
    }
  },
  mounted() {
    const labels = this.chart.logs.map(({ timestamp }) => this.getTime(timestamp))
    const data = this.chart.logs.map(({ ldr }) => ldr)
    this.fillData({ labels, data })
  },
  methods: {
    fillData({ labels, data }) {
      this.datacollection = {
        labels: labels,
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#f87979',
            borderColor: 'white',
            pointBorderColor: 'black',
            pointBackgroundColor: 'coral',
            data: data,
          },
        ],
      }
    },
    onUpdateChart(newChartData) {
      const labels = newChartData.logs.map(({ timestamp }) => this.getTime(timestamp))
      const data = newChartData.logs.map(({ ldr }) => ldr)
      this.fillData({ labels, data })
    },
  },
  computed: {
    ...mapGetters(['getAllLighting', 'getLightingLog', 'getTime']),
  },
  watch: {
    getAllLighting(newValue, oldValue) {
      const data = this.getLightingLog(this.chartId)
      this.onUpdateChart(data)
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
