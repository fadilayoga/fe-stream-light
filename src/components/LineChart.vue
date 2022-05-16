<script>
import { Line } from 'vue-chartjs'
import 'chartjs-plugin-streaming'
import { mapGetters } from 'vuex'

export default {
  extends: Line,
  props: {
    chartId: String,
    dataCollection: Object,
    options: Object,
    chartData: Array,
  },
  mounted() {
    this.renderChart(this.dataCollection, this.options)
    this._data._chart.data.datasets.forEach((dataset) => {
      dataset.data = this.chartData
    })
    this._data._chart.update()
  },
  computed: {
    ...mapGetters(['getAllLighting', 'getLightingLog', 'getTime']),
  },
  watch: {
    getAllLighting() {
      const data = this.getLightingLog(this.chartId)
      const { logs } = data
      const map = logs.map((result) => ({ x: result.timestamp, y: result.ldr }))
      this._data._chart.data.datasets.forEach(function (dataset) {
        dataset.data.push(map[map.length - 1])
      })
      this._data._chart.update()
    },
  },
}
</script>
