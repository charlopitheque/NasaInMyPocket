import axios from 'axios'
import router from '../router'

let defaultUrl = "https://images-api.nasa.gov"
let apiKey = "jPWRlpQgLK5hkqhuLfUaj9cDLVKeonDkggk5cavM"

export default {

  getConfig (token) {
    return {
      headers: {
        'content-type': 'application/json',
      }
    }
  },
  searchByIndexedMetadata (payload) {
    let url = defaultUrl+`/search?q=${payload.search}`
    let config = this.getConfig()
    return axios.get(url, config)
  },
  getMediaAssets(payload){
    let url = defaultUrl+`/asset/${payload.id}`
    let config = this.getConfig()
    return axios.get(url, config)
  }
}
