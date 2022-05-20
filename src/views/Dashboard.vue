<template>
  <div class="container">
    <div class="lighting-item">
      <main-chart
        v-for="item in getAllLighting"
        :key="item._id"
        :chart="getChartData(item._id)"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
const MainChart = () => import('../components/MainChart.vue')
export default {
  components: {
    MainChart,
  },
  data() {
    return {
      lightingData: [],
    }
  },
  props: {
    lighting: Array,
  },
  mounted() {
    this.getAllData()
  },
  computed: {
    ...mapGetters(['getAllLighting']),
  },
  methods: {
    generateKey(_id) {
      return _id + Date.now()
    },
    getChartData(_id) {
      let chartData = this.$store.getters.getLightingLog(_id)
      return chartData
    },
    getAllData() {
      axios
        .get(process.env.VUE_APP_LIGHTING_ALL)
        .then((response) => {
          this.setData(response.data)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    setData(payload) {
      this.$store.dispatch({
        type: 'setLighting',
        payload,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: auto;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  gap: 20px;
}

.lighting {
  &-item {
    display: flex;
    flex-direction: column;
    gap: 15px;
    overflow-x: auto;
  }
}

.problem {
  display: flex;
  flex-direction: column;
  gap: 15px;

  &-title {
    display: flex;
    align-items: center;
    justify-content: space-between;

    &_group {
      color: white;
      font-weight: 400;
      font-size: 18px;
      margin: 0;
    }
  }

  &-icon {
    width: 20px;
  }

  &-item {
    height: 40px;
    background-color: rgba(244, 244, 245, 0.2);
    border-radius: 10px;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px;

    &-group {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    &_lighting {
      font-weight: 400;
      font-size: 0.9rem;
    }

    &_timestamp {
      font-weight: 300;
      font-size: 0.8rem;
    }
  }

  &-item p {
    text-align: left;
    margin: 0;
  }
}
</style>
