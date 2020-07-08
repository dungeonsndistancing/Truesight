import axios from 'axios'
const ip = process.env.VUE_APP_SERVER_IP;

export default {
    login: async function (user, pass, long) {
        console.log(ip)
        const url = ip + "/user/login";
        console.log(url)
        try{
            const result = await axios.post(url,{email:user, password:pass, long:long})
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
        try{
            const token = localStorage.getItem("token")
            const headers = {headers:{'token':token}}
            switch(type) {
                case "get":
                    console.log("getting")
                    return await axios.get(url, headers)
                case "post":
                    return await axios.post(url,body,headers)
                default:
                    throw new Error("NOT IMPLEMENTED")
            }
        } catch(err) {
            if(err.response.status == '401') {
                const longtoken = localStorage.getItem("longtoken")
                if(longtoken) {
                    console.log("attempting with long token")
                    try{
                        var res = await axios.get(ip + '/user/authenticate', {headers:{'longtoken':longtoken}})
                        localStorage.setItem("token",res.data)
                        console.log(res)
                        return await this.authenticateRequest(url,type,body)
                    } catch(err) {
                        localStorage.removeItem("token")
                        localStorage.removeItem("longtoken")
                        return "disconnect"
                    }
                } else {
                    localStorage.removeItem("token")
                    return "disconnect"
                }
            }
            
        }
    },
}