import { Request, Response } from "express";
import Advertisement from "../../models/Advertisement";
import path from "path";
import fs from "fs";

// Create Advertisement
export const createAdvertisement = async (req: Request, res: Response) => {
  try {
    const {
      title,
      type,
      businessCategory,
      subCategory,
      childCategory,
      redirectUrl,
      status,
    } = req.body;

    const image = req.file?.filename;

    if (!title || !type || !businessCategory || !status || !image) {
      return res.status(400).json({ error: "Required fields missing" });
    }

    const newAd = new Advertisement({
      title,
      type,
      businessCategory,
      subCategory,
      childCategory,
      redirectUrl,
      status,
      image,
    });

    const savedAd = await newAd.save();
    res.status(201).json(savedAd);
  } catch (err: any) {
    console.error("Error creating advertisement:", err);
    res.status(500).json({ error: "Failed to create advertisement", details: err.message || err });
  }
};

// Get All Advertisements
export const getAllAdvertisements = async (req: Request, res: Response) => {
  try {
    const ads = await Advertisement.find().sort({ createdAt: -1 });
    res.status(200).json(ads);
  } catch (err: any) {
    console.error("Error fetching advertisements:", err);
    res.status(500).json({ error: "Failed to fetch advertisements", details: err.message || err });
  }
};

// Get Advertisement by ID
export const getAdvertisementById = async (req: Request, res: Response) => {
  try {
    const ad = await Advertisement.findById(req.params.id);
    if (!ad) return res.status(404).json({ error: "Advertisement not found" });
    res.status(200).json(ad);
  } catch (err: any) {
    console.error("Error fetching advertisement by ID:", err);
    res.status(500).json({ error: "Failed to fetch advertisement", details: err.message || err });
  }
};

// Update Advertisement
export const updateAdvertisement = async (req: Request, res: Response) => {
  try {
    const {
      title,
      type,
      businessCategory,
      subCategory,
      childCategory,
      redirectUrl,
      status,
    } = req.body;

    const existingAd = await Advertisement.findById(req.params.id);
    if (!existingAd) return res.status(404).json({ error: "Advertisement not found" });

    // If a new image is uploaded, delete old one
    if (req.file?.filename && existingAd.image) {
      const oldImagePath = path.join(__dirname, "../../../uploads", existingAd.image);
      if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
      existingAd.image = req.file.filename;
    }

    // Update fields
    existingAd.title = title ?? existingAd.title;
    existingAd.type = type ?? existingAd.type;
    existingAd.businessCategory = businessCategory ?? existingAd.businessCategory;
    existingAd.subCategory = subCategory ?? existingAd.subCategory;
    existingAd.childCategory = childCategory ?? existingAd.childCategory;
    existingAd.redirectUrl = redirectUrl ?? existingAd.redirectUrl;
    existingAd.status = status ?? existingAd.status;

    const updatedAd = await existingAd.save();
    res.status(200).json(updatedAd);
  } catch (err: any) {
    console.error("Error updating advertisement:", err);
    res.status(500).json({ error: "Failed to update advertisement", details: err.message || err });
  }
};

// Delete Advertisement
export const deleteAdvertisement = async (req: Request, res: Response) => {
  try {
    const ad = await Advertisement.findById(req.params.id);
    if (!ad) return res.status(404).json({ error: "Advertisement not found" });

    // Delete image file
    if (ad.image) {
      const imagePath = path.join(__dirname, "../../../uploads", ad.image);
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    }

    await Advertisement.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Advertisement deleted successfully" });
  } catch (err: any) {
    console.error("Error deleting advertisement:", err);
    res.status(500).json({ error: "Failed to delete advertisement", details: err.message || err });
  }
};
