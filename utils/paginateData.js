exports.Paginate = (data,page_number, limit) => {
    return new Promise(async (resolve, reject) => {
        if(page_number == 0 || page_number == undefined){
            page_number = 1;
        }
        if(limit == 0 || limit == undefined){
            limit = 10;
        }
        let showData = await data.splice((page_number - 1) * limit, page_number * limit)
        resolve(showData)
    })
}