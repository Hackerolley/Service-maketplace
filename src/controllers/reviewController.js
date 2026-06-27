import Review from "../models/reviewModel.js";
import Service from "../models/serviceModel.js";

/**
 * CREATE REVIEW
 */
export const createReview = async (req, res) => {
  try {
    const { serviceId, rating, comment } = req.body;

    // prevent reviewing own service
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    if (service.provider.toString() === req.user._id.toString()) {
      return res.status(403).json({
        message: "You cannot review your own service",
      });
    }

    const review = await Review.create({
      user: req.user._id,
      service: serviceId,
      rating,
      comment,
    });

    // update service rating
    const reviews = await Review.find({ service: serviceId });

    const avgRating =
      reviews.reduce((acc, item) => acc + item.rating, 0) /
      reviews.length;

    service.rating = avgRating;
    service.reviewsCount = reviews.length;

    await service.save();

    res.status(201).json({
      message: "Review added successfully",
      review,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating review",
      error: error.message,
    });
  }
};

/**
 * GET REVIEWS FOR A SERVICE
 */
export const getServiceReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ service: req.params.serviceId })
      .populate("user", "name email");

    res.status(200).json({
      count: reviews.length,
      reviews,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching reviews",
      error: error.message,
    });
  }
};

/**
 * DELETE REVIEW
 */
export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    
    await review.deleteOne();

    res.status(200).json({
      message: "Review deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting review",
      error: error.message,
    });
  }
};