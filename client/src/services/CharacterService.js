import authService from './AuthenticationService'

export default {
    getCharacters: async function() {
        const url = '/characters/list'
        const result = await authService.authenticateRequest(url,"get",'');
        return result;

    },
    getCharacter: async function(id) {
        let url = '/characters/single'
        url += "?id=" + id 
        try{
            const result = await authService.authenticateRequest(url,"get",'')
            return result.data
        } catch(err) {
            return err.response.status
        }
    }
}