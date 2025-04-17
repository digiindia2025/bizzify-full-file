import { Request, Response } from "express";
import City from "../../models/City";

export const createCity = async (req: Request, res: Response) => {
  try {
    const { name, country, imageUrl, color } = req.body;

    const newCity = new City({ name, country, imageUrl, color });
    await newCity.save();

    res.status(201).json({ message: "City created successfully", data: newCity });
  } catch (error) {
    res.status(500).json({ message: "Error creating city", error });
  }
};

export const getAllCities = async (_req: Request, res: Response) => {
  try {
    const cities = await City.find();
    res.status(200).json(cities);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cities", error });
  }
};
