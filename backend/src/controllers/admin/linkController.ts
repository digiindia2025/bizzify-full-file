import { Request, Response } from "express";
import { Link } from "../../models/Link";

// Get all links
export const getAllLinks = async (req: Request, res: Response) => {
  try {
    const links = await Link.find();
    res.status(200).json(links);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch links", error });
  }
};

// Create a link
export const createLink = async (req: Request, res: Response) => {
  try {
    const { link, title } = req.body;
    const newLink = new Link({ link, title });
    await newLink.save();
    res.status(201).json(newLink);
  } catch (error) {
    res.status(500).json({ message: "Failed to create link", error });
  }
};

// Update a link
export const updateLink = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updated = await Link.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update link", error });
  }
};

// Delete a link
export const deleteLink = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Link.findByIdAndDelete(id);
    res.status(200).json({ message: "Link deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete link", error });
  }
};
