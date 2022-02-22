import axios from 'axios'

const Axios = axios.create({
        baseURL:"http://localhost:3010"
})
export default Axios