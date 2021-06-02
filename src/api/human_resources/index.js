import axios from 'axios'

function get_current_hr() {
  return axios.request({
    url: '/warehouse/data/hr_data.json',
    method: 'get',
  })
  .then(
    // request fulfilled
    function fulfilled(value) {
      return new Promise(resolve => {
        // mock the api request delay
        setTimeout(function mock_api() {
          resolve(value.data)
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
  get_current_hr,
}