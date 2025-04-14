import { Request, Response } from 'express';
import BusinessUpgrade from '../../models/businessUpgradeModel';

export const upgradeBusiness = async (req: Request, res: Response) => {
  try {
    const { direction, website, facebook, instagram, linkedin, twitter } = req.body;

    // Create a new business upgrade document
    const newBusinessUpgrade = new BusinessUpgrade({
      direction,
      website,
      facebook,
      instagram,
      linkedin,
      twitter,
    });

    // Save the document to MongoDB
    await newBusinessUpgrade.save();

    return res.status(201).json({
      message: 'Business upgrade saved successfully!',
      data: newBusinessUpgrade,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error saving business upgrade' });
  }
};
