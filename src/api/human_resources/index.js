import axios from 'axios'

function get_current_hr() {
  return axios.request({
    url: '/data/hr_data.json',
    method: 'get',
  })
}

export default {
  get_current_hr,
}