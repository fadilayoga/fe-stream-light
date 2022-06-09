<template>
  <div class="logs">
    <h5>Table <span class="title-bold">Confirm</span></h5>
    <div class="logs-table">
      <table ref="table_export">
        <thead>
          <tr>
            <th class="ta-center">#</th>
            <th>Lighting</th>
            <th>Problem</th>
            <th>Issue Date</th>
            <th>Fixed</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          <tr
            :class="index % 2 == 0 ? 'even' : 'odd'"
            v-for="(data, index) in logs"
            :key="data._id"
          >
            <td class="ta-center">{{ (pages - 1) * limit + (index + 1) }}</td>
            <td>{{ data.log.lighting.name }}</td>
            <td>{{ data.problem }}</td>
            <td>{{ data.timestamp }}</td>
            <td v-if="!data.solved">
              <button @click="updateStatus(data._id)">CONFIRM</button>
            </td>
            <td v-else>{{ data.solved.confirmed_date }}</td>
            <td>
              <button v-if="getLocation(data)" @click="seeLocation(data)">
                Maps
              </button>
              <span v-else>Unspecified</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="bottom-logs">
      <div class="bottom-logs_export">
        <button class="bottom-logs_export-button" @click="exportCsvFile">
          <span>CSV</span>
        </button>
        <button class="bottom-logs_export-button" @click="exportExcelFile">
          <span>EXCEL</span>
        </button>
        <button class="bottom-logs_export-button" @click="exportPdfFile">
          <span>PDF</span>
        </button>
        <button @click="print" class="bottom-logs_export-button">
          <span>PRINT</span>
        </button>
      </div>
      <div class="pagination">
        <div
          v-if="pages !== 1"
          @click="getDataPage(previous)"
          class="pagination-item-fb"
        >
          <span>Previous</span>
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
          v-if="pages !== total_pages && total_pages != 0"
          @click="getDataPage(next)"
          class="pagination-item-fb"
        >
          <span>Next</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
import Swal from 'sweetalert2'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import print from 'print-js'
import fileDownload from 'js-file-download'

const doc = new jsPDF()

export default {
  data() {
    return {
      pages: 1,
      total_pages: 0,
      next: 0,
      previous: 0,
      limit: 7,
      logs: [],
      export_log: [],
      previewOpenCallback: false,
    }
  },
  mounted() {
    this.getDataPage(this.pages)
  },
  computed: {
    ...mapGetters(['getDate', 'fileName']),
  },
  methods: {
    getDataPage(page) {
      axios
        .get(
          `${process.env.VUE_APP_PROBLEM_LOGS}?page=${page}&limit=${this.limit}`
        )
        .then((response) => {
          this.pages = page
          this.total_pages = response.data.total_pages
          this.next = response.data.next ? response.data.next : null
          this.previous = response.data.previous ? response.data.previous : null
          this.logs = response.data.results
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    seeLocation: async function (data) {
      const { lat, long } = data.log.location
      if (!this.$device.mobile) {
        window.open(
          `https://www.google.com/maps/search/?api=1&query=${lat}%2C${long}`
        )
      } else {
        window.location.href = `geo:${lat},${long}?q=${lat},${long}(lighting)`
      }
    },
    getLocation: function (data) {
      if (data.log && data.log.location) {
        return true
      }
      return false
    },
    updateStatus: async function (id) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, confirm it!',
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const requestResult = await axios.patch(
              `${process.env.VUE_APP_PROBLEM_LOGS}/${id}`
            )
            Swal.fire('Deleted!', 'Your file has been deleted.', 'success')
              .then((result) => {
                if (result.isConfirmed) {
                  const findIndex = this.logs.findIndex(
                    (item) => item._id === id
                  )
                  this.$set(this.logs, findIndex, requestResult.data)
                }
              })
              .catch((err) => {
                console.log(err)
              })
          } catch (err) {
            console.log(err)
          }
        }
      })
    },
    exportCsvFile: async function () {
      try {
        const result = await axios.get(process.env.VUE_APP_EXPORT_FILE_CSV, {
          responseType: 'blob',
        })
        fileDownload(result.data, `Report-${this.fileName}.csv`)
      } catch (err) {
        console.log(err)
      }
    },
    exportExcelFile: async function () {
      try {
        const result = await axios.get(process.env.VUE_APP_EXPORT_FILE_EXCEL, {
          responseType: 'blob',
        })
        fileDownload(result.data, `Report-${this.fileName}.xlsx`)
      } catch (err) {
        console.log(err)
      }
    },
    exportPdfFile: async function () {
      try {
        const result = await axios.get(process.env.VUE_APP_EXPORT_FILE)
        autoTable(doc, {
          body: result.data,
          columns: [
            { header: 'Lighting', dataKey: 'lighting_name' },
            { header: 'Problem', dataKey: 'problem' },
            { header: 'Issue Date', dataKey: 'timestamp' },
            { header: 'Fixed Date', dataKey: 'solved' },
            { header: 'Latitude', dataKey: 'latitude' },
            { header: 'Longtitude', dataKey: 'longtitude' },
          ],
        })
        doc.save('table.pdf')
      } catch (err) {
        console.log(err)
      }
    },
    async print() {
      const result = await axios.get(process.env.VUE_APP_EXPORT_FILE)
      print({
        printable: result.data,
        properties: [
          { field: 'lighting_name', displayName: 'Lighting' },
          { field: 'problem', displayName: 'Problem' },
          { field: 'timestamp', displayName: 'Issue Date' },
          { field: 'solved', displayName: 'Fixed Date' },
          { field: 'latitude', displayName: 'Latitude' },
          { field: 'longtitude', displayName: 'Longtitude' },
        ],
        type: 'json',
      })
    },
  },
}
</script>

<style lang="scss">
.logs {
  height: fit-content;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.24);
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

td {
  color: white;
  text-align: left;
  padding: 8px;
  font-weight: 200;
  font-size: 14px;
  border-bottom: 1px solid 040620;
  padding-bottom: 1rem;
}

th {
  color: white;
  text-align: left;
  padding: 8px;
  font-weight: 300;
  font-size: 15px;
  border-bottom: 1px solid 040620;
}

tr {
  padding: 10px 0;
  border-bottom: 1px solid rgb(4, 6, 32);
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
  align-items: center;
  padding: 2px;
  border-radius: 3px;
  gap: 2px;
  &-item {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 25px;
    height: 25px;
    background-color: #bdbdbd;
    border-radius: 3px;
    cursor: pointer;
    font-weight: 300;

    &:active {
      background-color: rgb(160, 160, 160);
    }

    &-fb {
      cursor: pointer;
      margin: 0 5px;
      color: white;
      font-weight: 300;

      &:active {
        color: rgb(160, 160, 160);
      }
    }
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
    gap: 1px;
    &-button {
      display: flex;
      align-items: center;
      gap: 3px;
      padding: 5px 10px;
      color: white;
      background: #474d84;
      font-weight: 300;

      &:hover {
        color: #fff;
        background-color: #3a3e6b;
      }

      &:active {
        transform: translate(0, 1px);
      }
    }
  }
}

@media only print {
  #export_table {
    display: block;
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

        & img {
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
