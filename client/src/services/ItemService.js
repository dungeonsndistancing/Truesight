import authService from './AuthenticationService'

export default {
    getItems: async function(searchterms,page) {
        var url = "/items/query"
        console.log('searchterms:' + searchterms)
        url += '?searchterms=' +searchterms  +'&page=' + page
        const result = await authService.authenticateRequest(url,"get",'')
        return result.data
    },
    getCount: async function() {
        var url = "/items/count"
        const result = await authService.authenticateRequest(url,"get",'')
        return result.data
    }
}