import axios from 'axios'

function get_material_list(type) {
  return axios.request({
    url: '/warehouse/data/material_list_data.json',
    method: 'get',
  })
  .then(
    // request fulfilled
    async function fulfilled(value) {
      return new Promise(resolve => {
        // mock the api request delay
        setTimeout(function mock_api() {
          resolve(value.data[type])
        }, 500)
      })
    },
    // server error
    function rejected(error) {
      console.log(error)
      return []
    }
  )
}

function get_material_applied_history(PN, applicant) {
  return axios.request({
    url: '/warehouse/data/material_history_data.json',
    method: 'get',
  })
  .then(
    // request fulfilled
    function fulfilled(value) {
      let result = []
      return new Promise(resolve => {
        // mock the api request delay
        setTimeout(function mock_api() {
          result = value.data
            .filter(data => !PN || data.PN === PN)
            .filter(data => !applicant || data.applicant === applicant)
          resolve(result)
        }, 500)
      })
    },
    // server error
    function rejected(error) {
      console.log(error)
      return []
    }
  )
}

export default {
  get_material_applied_history,
  get_material_list
}