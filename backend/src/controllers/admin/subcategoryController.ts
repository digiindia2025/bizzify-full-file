import { Request, Response } from "express";
import Subcategory from "../../models/Subcategory";

export const createSubcategory = async (req: Request, res: Response) => {
  try {
    const {
      name,
      status,
      category,
    } = req.body;

    const mainSubCategories = [];

    if (req.body["mainSubCategories[0][name]"]) {
      for (let i = 0; ; i++) {
        const subName = req.body[`mainSubCategories[${i}][name]`];
        if (!subName) break;

        const subBanner = req.files?.[`mainSubCategories[${i}][banner]`] as Express.Multer.File[];
        mainSubCategories.push({
          name: subName,
          banner: subBanner?.[0]?.filename || null,
        });
      }
    }

    const imageFile = req.files?.["image"]?.[0];
    const bannerFile = req.files?.["banner"]?.[0];

    const subcategory = new Subcategory({
      name,
      status,
      category,
      image: imageFile?.filename,
      banner: bannerFile?.filename,
      mainSubCategories,
    });

    await subcategory.save();
    res.status(201).json(subcategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create subcategory" });
  }
};

export const getAllSubcategories = async (req: Request, res: Response) => {
  try {
    const subcategories = await Subcategory.find().populate("category");
    res.status(200).json(subcategories);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch subcategories" });
  }
};
