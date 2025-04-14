// controller/admin/contactPersonController.ts
import { Request, Response } from "express";
import ContactPerson from "../../models/ContactPerson";

export const createContactPerson = async (req: Request, res: Response) => {
  try {
    const {
      title,
      firstName,
      lastName,
      contactNumber,
      alternateNumbers,
      whatsappNumber,
      email,
    } = req.body;

    const newContact = new ContactPerson({
      title,
      firstName,
      lastName,
      contactNumber,
      alternateNumbers,
      whatsappNumber,
      email,
    });

    const saved = await newContact.save();
    res.status(201).json({ message: "Contact saved successfully", data: saved });
  } catch (error) {
    res.status(500).json({ message: "Error saving contact", error });
  }
};
