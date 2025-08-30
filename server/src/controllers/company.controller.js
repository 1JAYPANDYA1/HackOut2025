import { createCompanyService } from "../services/company.service.js";

export const createCompany = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    const company = await createCompanyService(req.body);
    res.status(201).json({ message: "Company created successfully", company });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating company", error: error.message });
  }
};
