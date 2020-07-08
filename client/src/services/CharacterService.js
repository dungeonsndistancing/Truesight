import axios from 'axios'
import authService from './AuthenticationService'
const ip = process.env.VUE_APP_SERVER_IP;

export default {
    getCharacters: async function() {
        const url = ip + '/characters/list'
        const result = await authService.authenticateRequest(url,"get",'');
        return result;

    },
    getCharacter: async function(id) {
        let url = ip + '/characters/single'
        url += "?id=" + id 
        try{
            const token = localStorage.getItem("token")
            console.log("getting character")
            console.log('id:'+id)
            const result = await axios.get(url,{headers: {"token": token}}) 
            return result.data
        } catch(err) {
            console.log(err)
            return {error: err}
        }
    }
}