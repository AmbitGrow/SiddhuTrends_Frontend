import API from "./Api";

// Normalization function to match frontend expectations
export const normalizeProduct = (product) => {
  if (!product) return null;
  const price = product.price || 0;
  const originalPrice = product.mrp || product.price || 0;
  const discount = originalPrice > 0 ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  return {
    id: product._id,
    _id: product._id,
    name: product.name,
    description: product.description || "",
    price: price,
    originalPrice: originalPrice,
    discount: discount,
    age: product.ageGroupId?.label || "",
    reviews: product.numReviews || 0,
    category: product.categoryId?.name || "",
    images: product.images && product.images.length > 0 ? product.images : ["/images/train-set.png"],
    inStock: product.stock > 0,
    stock: product.stock || 0,
    specifications: product.specifications || [],
    isBestSeller: !!product.isBestSeller,
    isOffer: !!product.isOffer,
    slug: product.slug || "",
    subtitle: product.description ? product.description.substring(0, 60) : "",
    howToPlay: "Open the box and enjoy playing!",
    delivery: "Estimated delivery: 3 - 5 working days",
  };
};

export const getProducts = async (params = {}) => {
  const queryParams = {};
  if (params.page) queryParams.page = params.page;
  if (params.limit) queryParams.limit = params.limit;
  if (params.categoryId) queryParams.categoryId = params.categoryId;
  if (params.ageGroupId) queryParams.ageGroupId = params.ageGroupId;
  if (params.search) queryParams.search = params.search;
  
  // Sorting mapping
  if (params.sortBy) {
    if (params.sortBy === "low-high") queryParams.sortBy = "price_asc";
    if (params.sortBy === "high-low") queryParams.sortBy = "price_desc";
  }

  // Range mapping
  if (params.minPrice) queryParams.minPrice = params.minPrice;
  if (params.maxPrice) queryParams.maxPrice = params.maxPrice;

  const response = await API.get("/products", { params: queryParams });
  
  return {
    page: response.page,
    totalPages: response.totalPages,
    totalProducts: response.totalProducts,
    products: (response.products || []).map(normalizeProduct),
  };
};

export const getProductById = async (id) => {
  const response = await API.get(`/products/${id}`);
  return normalizeProduct(response);
};

export const getCategories = async () => {
  return API.get("/categories");
};

export const getAgeGroups = async () => {
  return API.get("/age-groups");
};