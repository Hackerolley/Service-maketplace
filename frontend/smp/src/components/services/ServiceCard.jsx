export default function ServiceCard({ service }) {
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white hover:shadow-md transition duration-300 group">

      {/* Image */}
      <div className="relative h-48 bg-gray-100 overflow-hidden">
        <img
          src={service.images?.[0] || "https://via.placeholder.com/300"}
          alt={service.title}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />

        {/* Availability badge */}
        <span className={`absolute top-3 left-3 text-[10px] px-2 py-1 rounded-full ${
          service.availability ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"
        }`}>
          {service.availability ? "Available" : "Unavailable"}
        </span>
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">

        {/* Title */}
        <h3 className="text-sm font-semibold text-gray-900 line-clamp-1">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-xs text-gray-500 line-clamp-2">
          {service.description}
        </p>

        {/* Category + Rating */}
        <div className="flex items-center justify-between text-xs text-gray-500 mt-2">

          <span className="bg-gray-100 px-2 py-1 rounded-full text-[10px]">
            {service.category?.name || "General"}
          </span>

          <span>
            ⭐ {service.rating || 0} ({service.reviewsCount || 0})
          </span>

        </div>

        {/* Bottom row */}
        <div className="flex items-center justify-between pt-2">

          {/* Price */}
          <p className="text-sm font-bold text-gray-900">
            ₦{service.price}
          </p>

          {/* Provider */}
          <p className="text-[11px] text-gray-500">
            {service.provider?.name || "Unknown provider"}
          </p>

        </div>

        {/* Button */}
        <button className="w-full mt-3 text-xs font-medium border border-gray-300 rounded-lg py-2 hover:bg-black hover:text-white transition">
          View Details
        </button>

      </div>
    </div>
  );
}