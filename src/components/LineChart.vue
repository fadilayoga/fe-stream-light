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
  },
  mounted() {
    this.renderChart(this.dataCollection, this.options)
  },
  computed: {
    ...mapGetters(['getAllLighting', 'getLightingLog', 'getTime']),
  },
  watch: {
    getAllLighting(newValue, oldValue) {
      const data = this.getLightingLog(this.chartId)
      const { logs, ...other } = data
      const map = logs.map((result) => ({ x: result.timestamp, y: result.ldr }))
      this._data._chart.data.datasets.forEach(function (dataset) {
        dataset.data.push(...map)
      })      
      this._data._chart.update()
    },
  },
}
</script>
