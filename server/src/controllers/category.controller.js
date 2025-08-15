import CategoryService from "../services/category.service.js";

export const getCategories = async (req, res, next) => {
  try {
    const categories = await CategoryService.getAllCategories();
    res.status(200).json(categories);
  } catch (err) {
    next(err);
  }
};
