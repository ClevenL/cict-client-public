import axios from "axios"

export default {
    async getAllArticles(){
        const response = await axios.get(`api/articles/`)
        return response.data
    },
    async getArticleContent(url){
        const response = await axios.get(`api/parser/${url}`)
        return response.data
    },
    async updateArticleRead(item, bool){
        const response = await axios.put(`api/articles/${item._id}`, { read: bool })
        return response.data
    },
    async updateArticleStar(item, bool){
        const response = await axios.put(`api/articles/${item._id}`, { star: bool })
        return response.data
    },
    async updateArticleHide(item, bool){
        const response = await axios.put(`api/articles/${item._id}`, { hide: bool })
        return response.data
    },
    async updateArticleSave(item){
        const response = await axios.put(`api/articles/${item._id}`, item)
        return response.data
    },
    

    async getAllEntries(){
        const response = await axios.get("api/entries/")
        return response.data
    },
    async addEntry(data) {
        const response = await axios.post("api/entries/", data)
        return response.data
    },
    async updateEntry(item, data){
        const response = await axios.put(`api/entries/${item._id}`, data)
        return response.data
    },
    async deleteEntry(item){
        const response = await axios.delete(`api/entries/${item._id}`)
        return response.data
    },


    async getAllSources(){
        const response = await axios.get("api/sources/")
        return response.data
    },
    async addSource(data) {
        const response = await axios.post("api/sources/", data)
        return response.data
    },
    async updateSourceActive(item, bool){
        const response = await axios.put(`api/sources/${item._id}`, { active: bool })
        return response.data
    },


    async getAllCollections(){
        const response = await axios.get("api/collections/")
        return response.data
    },
    async updateCollectionActive(item, bool){
        const response = await axios.put(`api/collections/${item._id}`, { active: bool })
        return response.data
    },
    async addCollection(data) {
        const response = await axios.post("api/collections/", data)
        return response.data
    },
    async updateCollectionData(item, data){
        const response = await axios.put(`api/collections/${item._id}`, data)
        return response.data
    },
    async deleteCollection(item){
        const response = await axios.delete(`api/collections/${item._id}`)
        return response.data
    },
    
    async getAllTemplates(){
        const response = await axios.get("api/templates/")
        return response.data
    },
    async updateTemplate(item, data){
        const response = await axios.put(`api/templates/${item._id}`, data)
        return response.data
    },
    
}