import { FaBoxes, FaExclamationTriangle, FaTruck, FaArrowLeft } from "react-icons/fa";

export default function AmazonStatusDetail({ item, onClose, onEdit }) {
  const statusIcons = {
    "In Stock": <FaBoxes className="mr-2 text-green-600" size={24} />,
    "Low Stock": <FaExclamationTriangle className="mr-2 text-yellow-600" size={24} />,
    "Replenish": <FaTruck className="mr-2 text-red-600" size={24} />
  };

  const statusColors = {
    "In Stock": "bg-green-100 text-green-800",
    "Low Stock": "bg-yellow-100 text-yellow-800",
    "Replenish": "bg-red-100 text-red-800"
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <button 
          onClick={onClose}
          className="flex items-center text-gray-600 hover:text-gray-800"
        >
          <FaArrowLeft className="mr-2" /> Back to list
        </button>
        <button
          onClick={() => onEdit(item)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Edit Item
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">{item.productName}</h2>
          
          <div className={`inline-flex items-center px-4 py-2 rounded-full mb-6 ${statusColors[item.status]}`}>
            {statusIcons[item.status]}
            <span className="font-semibold">{item.status}</span>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Current Quantity</h3>
              <p className="text-2xl font-bold">{item.quantity} units</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">Last Updated</h3>
              <p className="text-lg">{item.lastUpdated || "Not specified"}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">Supplier Information</h3>
              <p className="text-lg">{item.supplier || "Not specified"}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-medium text-gray-700 mb-3">Additional Details</h3>
          <div className="space-y-3">
            <div>
              <h4 className="text-xs font-medium text-gray-500">SKU</h4>
              <p>{item.sku || "Not specified"}</p>
            </div>
            <div>
              <h4 className="text-xs font-medium text-gray-500">ASIN</h4>
              <p>{item.asin || "Not specified"}</p>
            </div>
            <div>
              <h4 className="text-xs font-medium text-gray-500">Location</h4>
              <p>{item.location || "Not specified"}</p>
            </div>
            <div>
              <h4 className="text-xs font-medium text-gray-500">Notes</h4>
              <p className="whitespace-pre-line">{item.notes || "No notes available"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}