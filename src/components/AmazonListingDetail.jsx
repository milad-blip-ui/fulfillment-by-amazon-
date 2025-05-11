import { FaBox, FaWeightHanging, FaSearchDollar, FaSpinner, FaCheckCircle,FaFlag,FaPaperPlane,FaFileAlt } from "react-icons/fa";

import { MdOutlineDescription, MdAttachMoney } from "react-icons/md";
import { RiProductHuntLine } from "react-icons/ri";



const statusConfig = {
  "In Draft": {
    color: "bg-gray-100 text-gray-800",
    icon: <FaFileAlt className="mr-1" />
  },
  "Content Ready": {
    color: "bg-blue-100 text-blue-800",
    icon: <FaCheckCircle className="mr-1" />
  },
  "Submitted": {
    color: "bg-purple-100 text-purple-800",
    icon: <FaPaperPlane className="mr-1" />
  },
  "Live": {
    color: "bg-green-100 text-green-800",
    icon: <FaCheckCircle className="mr-1" />
  },
  "Flagged": {
    color: "bg-red-100 text-red-800",
    icon: <FaFlag className="mr-1" />
  }
};

const sizeColors = {
  "Small": "bg-purple-100 text-purple-800",
  "Medium": "bg-amber-100 text-amber-800",
  "Large": "bg-sky-100 text-sky-800"
};

export default function AmazonListingDetail({ listing, onClose, onEdit }) {
  if (!listing) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-screen overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{listing.name}</h2>
              <p className="text-gray-600">{listing.sku}</p>
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={() => onEdit(listing)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Edit
              </button>
              <button 
                onClick={onClose}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Close
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Product Information */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-3 flex items-center">
                <RiProductHuntLine className="mr-2" />
                Product Information
              </h3>
              <div className="space-y-2">
                <div>
                  <p className="text-sm text-gray-500">Product Name</p>
                  <p className="font-medium">{listing.productName || listing.name || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Size</p>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${sizeColors[listing.size] || 'bg-gray-100'}`}>
                    {listing.size || "N/A"}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Weight</p>
                  <p className="font-medium flex items-center">
                    <FaWeightHanging className="mr-1" />
                    {listing.weight || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Color</p>
                  <p className="font-medium">{listing.color || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Material</p>
                  <p className="font-medium">{listing.material || "N/A"}</p>
                </div>
              </div>
            </div>

            {/* Pricing & Status */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-3 flex items-center">
                <MdAttachMoney className="mr-2" />
                Pricing & Status
              </h3>
              <div className="space-y-2">
                <div>
                  <p className="text-sm text-gray-500">Base Price</p>
                  <p className="font-medium">${listing.basePrice || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Current Status</p>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusConfig[listing.status]?.color || 'bg-gray-100'}`}>
                    {statusConfig[listing.status]?.icon}
                    {listing.status || "N/A"}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">ASIN</p>
                  <p className="font-medium">{listing.asin || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">FBA Fee</p>
                  <p className="font-medium">{listing.fbaFee || "N/A"}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-gray-50 p-4 rounded-lg md:col-span-2">
              <h3 className="font-semibold text-lg mb-3 flex items-center">
                <MdOutlineDescription className="mr-2" />
                Product Description
              </h3>
              <div className="prose max-w-none">
                {listing.description ? (
                  <p className="whitespace-pre-line">{listing.description}</p>
                ) : (
                  <p className="text-gray-500">No description available</p>
                )}
              </div>
            </div>

            {/* Images */}
            {listing.images && listing.images.length > 0 && (
              <div className="bg-gray-50 p-4 rounded-lg md:col-span-2">
                <h3 className="font-semibold text-lg mb-3">Product Images</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {listing.images.map((image, index) => (
                    <div key={index} className="border rounded overflow-hidden">
                      <img 
                        src={image} 
                        alt={`Product image ${index + 1}`}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}