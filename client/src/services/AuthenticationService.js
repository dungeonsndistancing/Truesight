import axios from 'axios'
const ip = process.env.VUE_APP_SERVER_IP;
axios.interceptors.response.use(
    response => {
        return response
    },
    async error => {
        if(error.response.status === 401) {
            const longtoken = localStorage.getItem("longtoken")
            if(longtoken) {
                try{
                    var res = await axios.get(ip + '/user/authenticate', {headers:{'longtoken':longtoken}})
                    localStorage.setItem("token",res.data)
                } catch(err) {
                    localStorage.removeItem('token')
                    localStorage.removeItem('longtoken')
                } 
            } else {
                localStorage.removeItem('token')
                throw new Error('disconnected')

            }
            throw new Error('reconnected')

        } else if(error.response.status === 403) {
            throw new Error('forbidden')
        }
        throw error
    }
)
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
        var newurl = ip + url
        try{
            const token = localStorage.getItem("token")
            const headers = {headers:{'token':token}}
            var val = {}
            switch(type) {
                case "get":
                    val = await axios.get(newurl, headers)
                    break
                case "post":
                    val = await axios.post(newurl,body,headers)
                    break
                case "put":
                    val = await axios.put(newurl,body,headers)
                    break
                case "delete":
                    val = await axios.delete(newurl,headers)
                    break
                default:
                    throw new Error("NOT IMPLEMENTED")
            }
            return val
        } catch(err) {
            if(typeof err === 'undefined') {
                console.log('undefined')
                return ''
            }
            if(err.message === 'reconnected') {
                console.log('attempting to re-authorize')
                return await this.authenticateRequest(url,type,body)
            } else if(err.message === 'disconnected') {
                window.location.replace(window.location.origin)
            } else if (err.message === 'forbidden') {
                return
            }
        }
            
    },
}