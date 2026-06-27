import Request from "../models/requestModel.js";
import Service from "../models/serviceModel.js";

/**
 * CREATE REQUEST (Customer sends request to provider)
 */
export const createRequest = async (req, res) => {
  try {
    const { serviceId, message, scheduledDate, budget, deadline } = req.body;

    // 1. Validate service exists
    const service = await Service.findById(serviceId);

    if (!service) {
      return res.status(404).json({
        message: "Service not found",
      });
    }

    // 2. Prevent duplicate request from same customer
    const existingRequest = await Request.findOne({
      service: serviceId,
      customer: req.user._id,
    });

    if (existingRequest) {
      return res.status(400).json({
        message: "You already sent a request for this service",
      });
    }

    // 3. Ensure provider exists
    if (!service.provider) {
      return res.status(400).json({
        message: "This service has no provider assigned",
      });
    }

    // 4. Create request
    const request = await Request.create({
      service: serviceId,
      customer: req.user._id,
      provider: service.provider,
      message,
      scheduledDate,
      budget,
      deadline,
      status: "pending",
    });

    res.status(201).json({
      message: "Request sent successfully",
      request,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating request",
      error: error.message,
    });
  }
};

/**
 * GET MY REQUESTS (Customer view)
 */
export const getMyRequests = async (req, res) => {
  try {
    const requests = await Request.find({ customer: req.user._id })
      .populate("service")
      .populate("provider", "name email");

    res.status(200).json({
      count: requests.length,
      requests,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching requests",
      error: error.message,
    });
  }
};

/**
 * GET PROVIDER REQUESTS
 */
export const getProviderRequests = async (req, res) => {
  try {
    const requests = await Request.find({ provider: req.user._id })
      .populate("service")
      .populate("customer", "name email");

    res.status(200).json({
      count: requests.length,
      requests,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching provider requests",
      error: error.message,
    });
  }
  
};


/**
 * UPDATE REQUEST STATUS (Provider only)
 */
export const updateRequestStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const request = await Request.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    if (request.provider.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    request.status = status;
    await request.save();

    res.status(200).json({
      message: "Request updated successfully",
      request,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating request",
      error: error.message,
    });
  }
};
