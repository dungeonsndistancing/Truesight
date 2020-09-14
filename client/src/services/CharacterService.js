import authService from './AuthenticationService'
import Character from '../../../shared/classes/character'
export default {
    getCharacters: async function() {
        const url = '/characters/list'
        const result = await authService.authenticateRequest(url,"get",'');
        if(result.data != 'disconnected') {
            var characters = []
            for(let i = 0; i < result.data.length; i++) {
                characters.push(Character.from(result.data[i]));
            }
            return characters
            
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
    makeCharacter: async function(character) {
        let url = '/characters/create'
        try{
            await authService.authenticateRequest(url,"post",{character:character})
        } catch(err) {
            return err.response.status
        }
    }
}