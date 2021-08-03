const excelUtils = require('../utils/excelUtils')
const paginate = require('../utils/paginateData')

exports.getClaims = async (req,res) => {
    const page_number = req.params.page;
    const limit = req.params.limit;
    let claims = await excelUtils.ReadExcelSheet()
    let showPage = await paginate.Paginate(claims,page_number,limit);
    if(showPage){
       return res.json(showPage) 
    }
    else{
        return res.json({message:"Something went wrong"}).status(500)
    }
    
}