import { Request, Response } from "express";
import { Membership } from "../../models/membershipModel";

// Get all memberships
export const getAllMemberships = async (req: Request, res: Response) => {
  try {
    const memberships = await Membership.find().sort({ _id: -1 });
    res.status(200).json(memberships);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch memberships" });
  }
};

// Create a membership (for testing via Postman)
export const createMembership = async (req: Request, res: Response) => {
  try {
    const membership = new Membership(req.body);
    await membership.save();
    res.status(201).json(membership);
  } catch (err) {
    res.status(500).json({ error: "Failed to create membership" });
  }
};

// Update membership status/payment status
export const updateMembership = async (req: Request, res: Response) => {
  try {
    const updated = await Membership.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update membership" });
  }
};

// Delete a membership
// Delete membership
export const deleteMembership = async (req: Request, res: Response) => {
  try {
    const deletedMembership = await Membership.findByIdAndDelete(req.params.id);
    
    if (!deletedMembership) {
      return res.status(404).json({ error: "Membership not found" });
    }

    res.status(200).json({ message: "Membership deleted successfully", id: req.params.id });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete membership" });
  }
};

