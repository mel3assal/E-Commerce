export class APIFeatures {
    constructor(mongooseQuery, searchQuery) {
        this.mongooseQuery = mongooseQuery
        this.searchQuery = searchQuery
    }
    pagination() {
        let pageNumber = this.searchQuery.page * 1 || 1
        if (this.searchQuery.page < 1) pageNumber = 1
        let limit = 4
        this.pageNumber = pageNumber
        let skip = parseInt((pageNumber - 1) * limit)
        this.mongooseQuery.skip(skip).limit(5)
        return this
    }
    filter() {
        let filterObj = structuredClone(this.searchQuery)
        filterObj = JSON.stringify(filterObj)
        filterObj = filterObj.replace(/(lt|lte|gt|gte)/g, (value) => '$' + value)
        filterObj = JSON.parse(filterObj)
        let apiFilterExcluded = ['page', 'sort', 'search', 'fields']
        apiFilterExcluded.forEach(value => {
            delete filterObj[value]
        })
        this.mongooseQuery.find(filterObj)
        return this
    }
    sort() {
        if (this.searchQuery.sort) {
            let sortBy = this.searchQuery.sort.split(',').join(' ')
            this.mongooseQuery.sort(sortBy)
        }
        return this
    }
    fields() {
        if (this.searchQuery.fields) {
            let selectedFileds = this.searchQuery.fields.split(',').join(' ')
            this.mongooseQuery.select(selectedFileds)
        }
        return this
    }
    search() {
        if (this.searchQuery.search) {
            this.mongooseQuery.find({
                $or: [
                    { title: { $regex: this.searchQuery.search} },
                    { description: { $regex: this.searchQuery.search} },
                    { slug: { $regex: this.searchQuery.search} },
                    { name: { $regex: this.searchQuery.search} }
                ]
            })
        }
        return this
    }
}