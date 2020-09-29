import axios from 'axios'
const ip = process.env.VUE_APP_SERVER_IP;

export default {
    login: async function (user, pass, long) {
        const url = ip + "/user/login";
        try{
            const result = await axios.post(url,{email:user, password:pass, long:long})
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
            const longtoken = localStorage.getItem("longtoken")
            if(longtoken) {
             await axios.delete(url, {headers: { "token": token, "longtoken":longtoken} });

            } else {
             await axios.delete(url, {headers: { "token": token } });
            }
            localStorage.removeItem('token')
            localStorage.removeItem('longtoken')
            return "success"
        } catch (err) {
            localStorage.removeItem('token')
            localStorage.removeItem('longtoken')
            return "error"
        }
    },
    authenticateRequest: async function(url,type,body) {
        url = ip + url
        try{
            const token = localStorage.getItem("token")
            const headers = {headers:{'token':token}}
            var val = {}
            switch(type) {
                case "get":
                    val = await axios.get(url, headers)
                    break
                case "post":
                    val = await axios.post(url,body,headers)
                    break
                case "put":
                    val = await axios.put(url,body,headers)
                    break
                case "delete":
                    val = await axios.delete(url,headers)
                    break
                default:
                    throw new Error("NOT IMPLEMENTED")
            }
            return val
        } catch(err) {
            console.log('error found')
            if(typeof err.response == 'undefined') {
                return ''
            }
            if(err.response.status == '401') {
                const longtoken = localStorage.getItem("longtoken")
                if(longtoken) {
                    try{
                        var res = await axios.get(ip + '/user/authenticate', {headers:{'longtoken':longtoken}})
                        localStorage.setItem("token",res.data)
                        return await this.authenticateRequest(url,type,body)
                    } catch(err) {
                        localStorage.removeItem("token")
                        localStorage.removeItem("longtoken")
                        window.location.href = 'http://' + new URL(window.location.href).hostname + ":" + new URL(window.location.href).port
                        return "disconnect"
                    }
                } else {
                    localStorage.removeItem("token")
                    console.log('NO LONGER CONNECTED')
                    window.location.href = 'http://' + new URL(window.location.href).hostname + ":" + new URL(window.location.href).port
                    return "disconnect"
                }
            }
            
        }
    },
}