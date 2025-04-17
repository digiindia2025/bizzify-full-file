// import { Request, Response } from "express";
// import City from "../../models/advertisecity";

// export const createCity = async (req: Request, res: Response) => {
//   try {
//     const { name, link } = req.body;

//     if (!name || !link) {
//       return res.status(400).json({ error: "Name and link are required" });
//     }

//     const city = new City({ name, link });
//     await city.save();
//     res.status(201).json({ message: "City created successfully", city });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to create city" });
//   }
// };

// export const getAllCities = async (req: Request, res: Response) => {
//   try {
//     const cities = await City.find();
//     res.status(200).json(cities);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch cities" });
//   }
// };


// controllers/admin/cityController.ts

import { Request, Response } from "express";
import AdvertiseCity from "../../models/advertisecity";

export const addMultipleCities = async (req: Request, res: Response) => {
  try {
    const cities = req.body; // expecting an array of city objects
    if (!Array.isArray(cities) || cities.length === 0) {
      return res.status(400).json({ message: "No cities provided" });
    }

    const insertedCities = await AdvertiseCity.insertMany(cities);

    res.status(201).json({
      success: true,
      message: "Cities added successfully",
      data: insertedCities,
    });
  } catch (error) {
    console.error("Error adding cities:", error);
    res.status(500).json({ message: "Failed to add cities" });
  }
};
