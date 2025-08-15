import Category from "../models/category.model.js";

export default class CategoryService {
  static async getAllCategories() {
    return await Category.find().sort({ createdAt: -1 });
  }
}
