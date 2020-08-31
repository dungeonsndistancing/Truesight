import authService from './AuthenticationService'

export default {
    async getItems(searchterms,page,editable) {
        var url = "/items/query"
        url += '?searchterms=' +searchterms  +'&page=' + page + '&editable=' + editable
        const result = await authService.authenticateRequest(url,"get",'')
        return result.data
    },
    async getCount() {
        var url = "/items/count"
        const result = await authService.authenticateRequest(url,"get",'')
        return result.data
    },
    async saveItem(item) {
        var url = '/items/add'
        await authService.authenticateRequest(url, "post", {item:item})
        return
    },
    async getItem(id) {
        var url = '/items/get' + '?id=' + id
        const result = await authService.authenticateRequest(url, "get", '')
        return result.data
    },
    async updateItem(item) {
        var url = '/items/update'
        await authService.authenticateRequest(url,"put",{item:item})
        return
    },
    async removeItem(item) {
        var url = '/items/remove' + '?id=' + item
        await authService.authenticateRequest(url,"delete",'')
    }  
}