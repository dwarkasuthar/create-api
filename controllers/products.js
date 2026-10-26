const Product = require("../models/product")
const getAllProducts = async (req, res) => {

    const { company, name, features, sort, select } = req.query;
    const queryObject = {};

    if (company) {
        queryObject.company = company;
        console.log(queryObject.company)
    }

    if (name) {
        queryObject.name = { $regex: name, $options: "i" };
    }
    console.log(queryObject)

    if (features) {
        queryObject.features = features;
    }

    let apiData = Product.find(queryObject)

    if (sort) {
        let sortFix = sort.split(",").join(" ");
        apiData = apiData.sort(sortFix)
    }


    if (select) {
        // let selectFix = select.replace(",", " ")
        let selectFix = select.split(",").join(" ")
        apiData = apiData.select(selectFix)
    }

    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 10;
    let skip = (page-1) * limit;

    apiData = apiData.skip(skip).limit(limit);

    const products = await apiData;
    // console.log("getAllProducts : ",req.query)

    res.status(200).json({ products, nbHits:products.length })
};
const getAllProductsTesting = async (req, res) => {
    const productData = await Product.find(req.query).select();
    console.log("getAllProductsTesting : ", req.query);
    res.status(200).json({ productData })
};


module.exports = { getAllProducts, getAllProductsTesting }