import { DollarSign } from "lucide-react";

export function CostBreakdown({ result, formData, distance }) {
  if (!result) return null;

  return (
    <div className="bg-white rounded-3xl p-8 shadow-2xl">
      <div className="flex items-center mb-6 text-indigo-600">
        <DollarSign size={28} />
        <h2 className="text-2xl font-bold ml-3">Cost Breakdown</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-6">
        <div className="bg-gray-50 rounded-2xl p-6 text-center border-l-4 border-indigo-500">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Travel
          </h3>
          <div className="text-2xl font-bold text-gray-900">
            ₹{result.travel?.toLocaleString() || 0}
          </div>
        </div>

        <div className="bg-gray-50 rounded-2xl p-6 text-center border-l-4 border-green-500">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Food
          </h3>
          <div className="text-2xl font-bold text-gray-900">
            ₹{result.food?.toLocaleString() || 0}
          </div>
        </div>

        <div className="bg-gray-50 rounded-2xl p-6 text-center border-l-4 border-blue-500">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Stay
          </h3>
          <div className="text-2xl font-bold text-gray-900">
            ₹{result.stay?.toLocaleString() || 0}
          </div>
        </div>

        <div className="bg-gray-50 rounded-2xl p-6 text-center border-l-4 border-yellow-500">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Miscellaneous
          </h3>
          <div className="text-2xl font-bold text-gray-900">
            ₹{result.misc?.toLocaleString() || 0}
          </div>
        </div>

        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-center text-white">
          <h3 className="text-xs font-semibold uppercase tracking-wider mb-2 text-white/90">
            Total Cost
          </h3>
          <div className="text-3xl font-bold">
            ₹{result.total?.toLocaleString() || 0}
          </div>
        </div>
      </div>

      <div className="text-center text-gray-600 text-sm">
        Cost calculated for {formData.people} people for {formData.days}{" "}
        days via {formData.transport}
        {distance && ` (${distance} km)`}
      </div>
    </div>
  );
}
