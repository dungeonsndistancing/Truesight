import authService from './AuthenticationService'
import Character from '../../../shared/classes/character'
export default {
    getCharacters: async function() {
        const url = '/characters/list'
        const result = await authService.authenticateRequest(url,"get",'');
        if(result.data != 'disconnected') {
            return result.data
            
        }
        

    },
    getCharacter: async function(id) {
        let url = '/characters/single'
        url += "?id=" + id 
        try{
            const result = await authService.authenticateRequest(url,"get",'')
            return Character.from(result.data)
        } catch(err) {
            return err.response.status
        }
    },
    updateCharacter: async function(character) {
        let url = '/characters/update'
        try{
            await authService.authenticateRequest(url,'put',{character:character})
        } catch(err) {
            return err.response.status
        }
    },
    makeCharacter: async function(character) {
        let url = '/characters/create'
        try{
            await authService.authenticateRequest(url,"post",{character:character})
        } catch(err) {
            return err.response.status
        }
    }
}