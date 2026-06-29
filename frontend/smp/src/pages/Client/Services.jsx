import { useEffect, useState } from "react";
import api from "../../api/axios";
import ServiceCard from "../../components/services/ServiceCard";

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await api.get("/services/getallservices");

        console.log("FETCH TEST:", res.data);

        setServices(Array.isArray(res.data?.services) ? res.data.services : []);
      } catch (error) {
        console.log("Error fetching services:", error);
        setServices([]);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-gray-500">
        Loading services...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Header */}
        <h1 className="text-2xl font-semibold mb-6">
          Services
        </h1>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {services.map((service) => (
            <ServiceCard
              key={service._id}
              service={service}
            />
          ))}

        </div>

      </div>
    </div>
  );
}