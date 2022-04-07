<template>
  <div class="logs">
    <h5>Table <span class="title-bold">Logs</span></h5>
    <div class="logs-table">
      <table>
        <tr>
          <th class="ta-center">#</th>
          <th>Lighting</th>
          <th>Issue Date</th>
          <th class="ta-center">Fixed</th>
          <th>Fixed Date</th>
        </tr>
        <tr v-for="(data, index) in logs" :key="data._id">
          <td class="ta-center">{{ (pages - 1) * limit + (index + 1) }}</td>
          <td>Magazzini Alimentari Riuniti</td>
          <td>12/10/2021</td>
          <td class="ta-center"><button @click="confirm()">CONFIRM</button></td>
          <td>16/11/2021</td>
        </tr>
      </table>
    </div>
    <div class="bottom-logs">
      <div class="bottom-logs_export">
        <button class="bottom-logs_export-button">
          <img src="~@/assets/images/description.svg" alt="" />
          <span>PDF</span>
        </button>
        <button class="bottom-logs_export-button">
          <img src="~@/assets/images/spreadsheet.svg" alt="" />
          <span>SPREADSHEET</span>
        </button>
      </div>
      <div class="pagination">
        <div
          v-if="pages !== 1"
          @click="getDataPage(previous)"
          class="pagination-item"
        >
          <span>&#60;</span>
        </div>
        <template v-for="n in total_pages">
          <template v-if="(n > pages - 3) & (n < pages + 3)">
            <div
              v-if="n !== pages"
              @click="getDataPage(n)"
              class="pagination-item"
              :key="n"
            >
              {{ n }}
            </div>
            <div v-else class="pagination-item" :key="n">
              <span style="color: white">{{ n }}</span>
            </div>
          </template>
        </template>
        <div
          v-if="pages !== total_pages"
          @click="getDataPage(next)"
          class="pagination-item"
        >
          <span>&#62;</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import API_ENDPOINT from "../globals/api-endpoint";
import axios from "axios";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      pages: 1,
      total_pages: 0,
      next: 0,
      previous: 0,
      limit: 7,
      logs: [],
    };
  },
  mounted() {
    this.getDataPage(this.pages);
  },
  methods: {
    getDataPage(page) {
      axios
        .get(`${API_ENDPOINT.PROBLEM_LOGS}?page=${page}&limit=${this.limit}`)
        .then((response) => {
          // let response = {data: {"total_pages":5,"next":2,"results":[{"_id":"62189ad79328d6a81d1a07e0","lighting":"621724a710507ec2ab646f7b","problem":"lighting error","solvedId":null,"timestamp":"2022-02-25T08:50:07.199Z","__v":0},{"_id":"6218a11e124fcc9aa0becee7","lighting":"6218a11e124fcc9aa0becee1","problem":"lighting error","solvedId":null,"timestamp":"2022-02-25T09:21:00.053Z","__v":0},{"_id":"6218a1c5124fcc9aa0becf0d","lighting":"6218a1c5124fcc9aa0becf07","problem":"lighting error","solvedId":null,"timestamp":"2022-02-25T09:21:00.053Z","__v":0},{"_id":"6218a1d6124fcc9aa0becf1b","lighting":"6218a11e124fcc9aa0becee1","problem":"lighting error","solvedId":null,"timestamp":"2022-02-25T09:21:00.053Z","__v":0},{"_id":"6218a286124fcc9aa0becf24","lighting":"6218a11e124fcc9aa0becee1","problem":"lighting error","solvedId":null,"timestamp":"2022-02-25T09:21:00.053Z","__v":0},{"_id":"6218a2cae50141d057c46ccd","lighting":"6218a11e124fcc9aa0becee1","problem":"lighting error","solvedId":null,"timestamp":"2022-02-25T09:35:04.924Z","__v":0},{"_id":"6218a32be50141d057c46cdc","lighting":"621724a710507ec2ab646f7b","problem":"lighting error","solvedId":null,"timestamp":"2022-02-25T09:35:04.924Z","__v":0}]}}
          this.pages = page;
          this.total_pages = response.data.total_pages;
          this.next = response.data.next || {};
          this.previous = response.data.previous || {};
          this.logs = response.data.results;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    confirm: function () {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.logs {
  // width: fit-content;
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

.pagination {
  display: flex;
  padding: 2px;
  border-radius: 3px;
  gap: 2px;  
  &-item {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 25px;
    height: 25px;
    background-color: #dddddd;
    border-radius: 3px;
    cursor: pointer;
  }
}

button {
  cursor: pointer;
}

.bottom-logs {
  display: flex;
  justify-content: space-between;
  align-items: center;

  &_export {
    display: flex;
    gap: 10px;
    &-button {
      display: flex;
      align-items: center;
      gap: 3px;
    }
  }
}

@media screen and (max-width: 768px) {
  .logs {
    width: 100%;
    height: fit-content;
    border-radius: 10px;
    background-color: $dark-violet;
    padding: 15px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 15px;

    &-table {
      overflow-x: auto;
    }

    &-item {
      display: flex;
      gap: 10px;
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
    font-size: 18px;
    color: rgba(244, 244, 245, 0.6);
    font-weight: 300;
  }

  td,
  th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
    font-weight: 300;
    font-size: 13px;
  }

  th {
    font-weight: 400;
  }

  .ta-center {
    text-align: center;
  }

  .title-bold {
    font-size: 18px;
    font-weight: 400;
    color: rgb(244, 244, 245, 1);
  }

  .pagination {
    display: flex;
    padding: 2px;
    border-radius: 3px;
    gap: 2px;    
    &-item {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 20px;
      height: 20px;
      background-color: #dddddd;
      border-radius: 3px;
      cursor: pointer;
      font-size: 13px;
    }
  }

  button {
    cursor: pointer;
    width: 100%;
    font-size: 10px;
  }

  .bottom-logs {
    display: flex;
    flex-direction: column;
    gap: 10px;

    &_export {
      display: flex;
      gap: 10px;
      &-button {
        display: flex;
        align-items: center;
        gap: 3px;

        & img{
          max-width: 20px;
        }

        & span {
          font-size: 11px;
        }
      }
    }
  }
}
</style>
