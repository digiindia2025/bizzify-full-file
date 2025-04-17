import { Request, Response } from "express";
import Collection from "../../models/collectionModel";

export const createCollection = async (req: Request, res: Response) => {
  try {
    const { name, link } = req.body;

    if (!name || !link) {
      return res.status(400).json({ error: "Name and link are required" });
    }

    const collection = new Collection({ name, link });
    await collection.save();
    res.status(201).json({ message: "Collection created successfully", collection });
  } catch (error) {
    res.status(500).json({ error: "Failed to create collection" });
  }
};

export const getAllCollections = async (req: Request, res: Response) => {
  try {
    const collections = await Collection.find();
    res.status(200).json(collections);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch collections" });
  }
};
