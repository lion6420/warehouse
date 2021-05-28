import axios from 'axios'

function get_material_applied_history(PN, applicant) {
  return axios.request({
    url: '/data/material_history_data.json',
    method: 'get',
  })
  .then(
    function fulfilled(value) {
      let result = []
      result = value.data
        .filter(data => !PN || data.PN === PN)
        .filter(data => !applicant || data.applicant === applicant)
      return result
    },
    function rejected(error) {
      console.log(error)
      return []
    }
  )
}

export default {
  get_material_applied_history
}