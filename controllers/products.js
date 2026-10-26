
const Product = require("../models/product");

const getAllProducts = async (req, res) => {
  try {
    const { company, name, features, sort, select } = req.query;

    const queryObject = {};

    if (company) {
      queryObject.company = company;
    }

    if (name) {
      queryObject.name = {
        $regex: name,
        $options: "i",
      };
    }

    if (features !== undefined) {
      queryObject.features = features === "true";
    }

    // Build the database query
    let apiData = Product.find(queryObject);

    // Sorting
    if (sort) {
      const sortFix = sort.split(",").join(" ");
      apiData = apiData.sort(sortFix);
    }

    // Select specific fields
    if (select) {
      const selectFix = select.split(",").join(" ");
      apiData = apiData.select(selectFix);
    }

    // Pagination
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(
      50,
      Math.max(1, Number(req.query.limit) || 10)
    );

    const skip = (page - 1) * limit;

    // Count all matching products, not just this page
    const totalProducts = await Product.countDocuments(queryObject);

    apiData = apiData.skip(skip).limit(limit);

    const productData = await apiData;

    res.status(200).json({
      productData,
      nbHits: totalProducts,
      page,
      limit,
      totalPages: Math.ceil(totalProducts / limit),
    });
  } catch (error) {
    console.error("getAllProducts error:", error);

    res.status(500).json({
      message: "Failed to fetch products",
    });
  }
};

const getAllProductsTesting = async (req, res) => {
  try {
    const productData = await Product.find(req.query)
      .select("name price");

    res.status(200).json({ productData });
  } catch (error) {
    console.error("getAllProductsTesting error:", error);

    res.status(500).json({
      message: "Failed to fetch test products",
    });
  }
};

module.exports = {
  getAllProducts,
  getAllProductsTesting,
};
