import authService from './AuthenticationService'
export default {
    async getSpells(searchterms,page,editable) {
        var url = "/spells/query"
        url += '?searchterms=' +searchterms  +'&page=' + page + '&editable=' + editable
        const result = await authService.authenticateRequest(url,"get",'')
        return result.data
    },  
    async getCount() {
        var url = "/spells/count"
        const result = await authService.authenticateRequest(url,"get",'')
        return result.data
    },
    async saveSpell(spell) {
        var url = '/spells/add'
        await authService.authenticateRequest(url, "post", {spell:spell})
        return
    },
    async getSpell(id) {
        var url = '/spells/get' + '?id=' + id
        const result = await authService.authenticateRequest(url, "get", '')
        return result.data
    },
    async updateSpell(spell) {
        var url = '/spells/update'
        await authService.authenticateRequest(url,"put",{spell:spell})
        return
    },
    async removeSpell(spell) {
        var url = '/spells/remove' + '?id=' + spell
        await authService.authenticateRequest(url,"delete",'')
    }  
}