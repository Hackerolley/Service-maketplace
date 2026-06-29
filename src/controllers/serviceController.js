import Service from "../models/serviceModel.js";

/**
 * CREATE SERVICE
 */
export const createService = async (req, res) => {
  try {
    const service = await Service.create({
      provider: req.user._id, // from auth middleware
      ...req.body,
      
    });
    //validate all fields are provided in req.body (title, description, price, category)
      if (!req.body.title || !req.body.description || !req.body.price || !req.body.category) {
        return res.status(400).json({ message: "All fields are required" });
      }
    res.status(201).json({
      message: "Service created successfully",
      service,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating service",
      error: error.message,
    });
  }
};

/**
 * GET ALL SERVICES
 */
export const getAllServices = async (req, res) => {
  try {
    const services = await Service.find()
      .populate("provider", "name email phone")
      .populate("category", "name");
      

    res.status(200).json({
      count: services.length,
      services,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching services",
      error: error.message,
    });
  }
};

/**
 * GET SINGLE SERVICE
 */
export const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id)
      .populate("provider", "name email phone");

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching service",
      error: error.message,
    });
  }
};

/**
 * UPDATE SERVICE
 */
export const updateService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    // only provider can update their service
    if (service.provider.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Only the provider can update this service" });
    }

    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      message: "Service updated successfully",
      service: updatedService,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating service",
      error: error.message,
    });
  }
};

/**
 * DELETE SERVICE
 */
export const deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    if (service.provider.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Only the provider can delete this service" });
    }

    await service.deleteOne();

    res.status(200).json({
      message: "Service deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting service",
      error: error.message,
    });
  }
};

/**
 * GET SERVICES BY PROVIDER
 */
export const getMyServices = async (req, res) => {
  try {
    const services = await Service.find({ provider: req.user._id });

    res.status(200).json({
      count: services.length,
      services,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching your services",
      error: error.message,
    });
  }
};