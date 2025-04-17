import { Request, Response } from "express";
import Deal from "../../models/dealModel";

export const createDeal = async (req: Request, res: Response) => {
  try {
    const deal = new Deal(req.body);
    await deal.save();
    res.status(201).json({ message: "Deal created", deal });
  } catch (error) {
    res.status(500).json({ error: "Error creating deal" });
  }
};

export const getAllDeals = async (req: Request, res: Response) => {
  try {
    const deals = await Deal.find();
    res.json(deals);
  } catch (error) {
    res.status(500).json({ error: "Error fetching deals" });
  }
};
