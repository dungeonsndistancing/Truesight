import axios from 'axios'
const ip = process.env.VUE_APP_SERVER_IP;
console.log(ip);
export default {
    login: async function (user, pass) {
        console.log(ip)
        const url = ip + "/user/login";
        console.log(url)
        try{
        const result = await axios.post(url,{email:user, password:pass})
        console.log(result)
        return result
        } catch(err) {
            return "error"
        }
        
    },
    register: async function (name,email,pass) {
        const url = ip + "/user/register";
        try{
            const result = await axios.post(url,{name:name,email:email,password:pass})
            return result
        } catch(err) {
            return "error"
        }
    },
    logout: async function() {
        const url = ip + "/user/logout";
        try{
            const token = localStorage.getItem("token")
            
            const result = await axios.delete(url, {headers: { "token": token } });
            console.log(result)
            return result
        } catch (err) {
            return "error"
        }
    }
}