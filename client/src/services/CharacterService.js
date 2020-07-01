import axios from 'axios'
const ip = process.env.VUE_APP_SERVER_IP;
console.log(ip);

export default {
    getCharacters: async function() {
        const url = ip + '/characters/list'
        try{
            const token = localStorage.getItem("token")
            const result = await axios.get(url,{headers: {"token": token}})
            console.log(result)
            return result.data

        } catch(err) {
            console.log(err)
            return {error: err}
        }
    },
    getCharacter: async function(id) {
        let url = ip + '/characters/single'
        url += "?id=" + id 
        console.log(url)
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