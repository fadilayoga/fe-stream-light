<template>
  <div class="logs">
    <h5>Table <span class="title-bold">Logs</span></h5>
    <table>
      <tr>
        <th class="ta-center">#</th>
        <th>Lighting</th>
        <th>Issue Date</th>
        <th class="ta-center">Fixed</th>
        <th>Fixed Date</th>
      </tr>
      <tr v-for="(data, index) in logs" :key="data._id">
        <td class="ta-center">{{ index + 1 }}</td>
        <td>Magazzini Alimentari Riuniti</td>
        <td>12/10/2021</td>
        <td class="ta-center"><button>CONFIRM</button></td>
        <td>16/11/2021</td>
      </tr>
    </table>
  </div>
</template>

<script>
import API_ENDPOINT from "../globals/api-endpoint";
import axios from "axios";

export default {
  data() {
    return {
      logs: []
    }
  },
  mounted() {
    axios
      .get(`${API_ENDPOINT.PROBLEM_LOGS}`)
      .then((response) => {
        this.logs = response.data
      })
      .catch(function (error) {
        console.log(error);
      });
  },
};
</script>

<style lang="scss" scoped>
.logs {
  width: 100%;
  height: fit-content;
  border-radius: 10px;
  background-color: $dark-violet;
  padding: 15px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 20px;

  &-item {
    display: flex;
    gap: 10px;
    // background-color: rgba(244, 244, 245, 0.2);
    border-radius: 15px;
    width: 100%;
    height: 100px;
    padding: 10px;
    box-sizing: border-box;
  }

  &-item div {
    flex-grow: 1;
    background-color: rgba(244, 244, 245, 0.8);
    border-radius: 15px;
  }
}

.logs table {
  width: 100%;
  color: rgba(244, 244, 245, 0.6);
  border-collapse: collapse;
}

.logs h5 {
  margin: 0;
  text-align: left;
  font-size: 20px;
  color: rgba(244, 244, 245, 0.6);
  font-weight: 300;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
  font-weight: 300;
}

th {
  font-weight: 400;
}

.ta-center {
  text-align: center;
}

.title-bold {
  font-size: 20px;
  font-weight: 400;
  color: rgb(244, 244, 245, 1);
}
</style>
