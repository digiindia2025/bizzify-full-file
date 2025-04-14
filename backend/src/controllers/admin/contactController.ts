import { Request, Response } from "express";
import { Contact } from "../../models/Contact";

// Get all contacts
export const getAllContacts = async (req: Request, res: Response) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch contacts", error });
  }
};

// Create contact (for Postman or frontend form)
export const createContact = async (req: Request, res: Response) => {
  try {
    const newContact = new Contact(req.body);
    const savedContact = await newContact.save();
    res.status(201).json(savedContact);
  } catch (error) {
    res.status(500).json({ message: "Failed to create contact", error });
  }
};
