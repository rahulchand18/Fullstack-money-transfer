import User from "../models/User.js";
import { v4 as uuidv4 } from "uuid";

export async function createAdmin(req, res) {
  try {
    const { email, full_name } = req.body;

    if (!email || !full_name) {
      return res.status(400).json({
        success: false,
        message: "Email and full name are required",
      });
    }

    const existing = await User.query().where({ email }).first();
    if (existing) {
      return res.status(409).json({
        success: false,
        message: "Admin with this email already exists",
      });
    }

    const admin = await User.query().insert({
      id: uuidv4(),
      email,
      full_name,
      is_active: true,
    });

    return res.status(201).json({
      success: true,
      data: admin,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to create admin",
    });
  }
}

export async function getAdmins(req, res) {
  try {
    const admins = await User.query()
      .where({ is_active: true })
      .orderBy("created_at", "desc");

    return res.json({
      success: true,
      data: admins,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch admins",
    });
  }
}

export async function getAdminById(req, res) {
  try {
    const { id } = req.params;

    const admin = await User.query().findById(id);
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    return res.json({
      success: true,
      data: admin,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch admin",
    });
  }
}

export async function updateAdmin(req, res) {
  try {
    const { id } = req.params;
    const { email, full_name, is_active } = req.body;

    const admin = await User.query().findById(id);
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    const updated = await User.query().patchAndFetchById(id, {
      email: email ?? admin.email,
      full_name: full_name ?? admin.full_name,
      is_active: is_active ?? admin.is_active,
      updated_at: new Date(),
    });

    return res.json({
      success: true,
      data: updated,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to update admin",
    });
  }
}

export async function deactivateAdmin(req, res) {
  try {
    const { id } = req.params;

    const admin = await User.query().findById(id);
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    const activeAdminsCount = await User.query()
      .where({ is_active: true })
      .resultSize();

    if (activeAdminsCount <= 1) {
      return res.status(400).json({
        success: false,
        message: "Cannot deactivate the only active admin",
      });
    }

    await User.query().patchAndFetchById(id, {
      is_active: false,
      deactivated_at: new Date().toISOString(),
    });

    return res.json({
      success: true,
      message: "Admin deactivated successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to deactivate admin",
    });
  }
}
