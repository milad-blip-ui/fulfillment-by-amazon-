import { useState, useEffect } from "react";
import { FaFileAlt, FaCheckCircle, FaPaperPlane, FaFlag } from "react-icons/fa";

export default function AmazonListingForm({ listing, onSave, onClose }) {
  const [form, setForm] = useState({
    productName: '',
    sku: '',
    oldJobNumber: '',
    photoUrl: '',
    color: '',
    pieces: '',
    size: '',
    style: '',
    material: '',
    basePrice: '',
    cog: '',
    competitorPrice1: '',
    competitorLink1: '',
    competitorPrice2: '',
    competitorLink2: '',
    competitorPrice3: '',
    competitorLink3: '',
    length: '',
    width: '',
    height: '',
    weight: '',
    status: '',
    ...listing
  });

  useEffect(() => {
    if (listing) {
      setForm(listing);
    }
  }, [listing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  const statusOptions = [
    { value: "In Draft", label: "In Draft", icon: <FaFileAlt className="inline mr-1" /> },
    { value: "Content Ready", label: "Content Ready", icon: <FaCheckCircle className="inline mr-1" /> },
    { value: "Submitted", label: "Submitted", icon: <FaPaperPlane className="inline mr-1" /> },
    { value: "Live", label: "Live", icon: <FaCheckCircle className="inline mr-1" /> },
    { value: "Flagged", label: "Flagged", icon: <FaFlag className="inline mr-1" /> }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case "In Draft": return "bg-gray-100 text-gray-800";
      case "Content Ready": return "bg-blue-100 text-blue-800";
      case "Submitted": return "bg-purple-100 text-purple-800";
      case "Live": return "bg-green-100 text-green-800";
      case "Flagged": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4 border-b pb-2">
          {form.id ? "Edit" : "Create"} Amazon Listing
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg border-b pb-1">Basic Information</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Name*</label>
              <input
                name="productName"
                value={form.productName}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Motivational Vinyl Stickers Set"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">SKU*</label>
              <input
                name="sku"
                value={form.sku}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="1S-VMS-BLK-M"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Old Job #</label>
              <input
                name="oldJobNumber"
                value={form.oldJobNumber}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="31235"
                type="number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Photo URL</label>
              <input
                name="photoUrl"
                value={form.photoUrl}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="https://workdrive.zoho.com/..."
                type="url"
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg border-b pb-1">Product Details</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Color*</label>
              <input
                name="color"
                value={form.color}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="Black"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pieces*</label>
              <input
                name="pieces"
                value={form.pieces}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="6"
                type="number"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Size*</label>
              <select
                name="size"
                value={form.size}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              >
                <option value="">Select Size</option>
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Style (Optional)</label>
              <input
                name="style"
                value={form.style}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="Motivational Vinyl Stickers Set"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Material*</label>
              <select
                name="material"
                value={form.material}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              >
                <option value="">Select Material</option>
                <option value="Vinyl">Vinyl</option>
                <option value="PVC">PVC</option>
                <option value="Acrylic">Acrylic</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Pricing Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg border-b pb-1">Pricing Information</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Base Price ($)*</label>
              <input
                name="basePrice"
                value={form.basePrice}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="23.99"
                type="number"
                step="0.01"
                min="0"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cost of Goods ($)</label>
              <input
                name="cog"
                value={form.cog}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="9.10"
                type="number"
                step="0.01"
                min="0"
              />
            </div>
          </div>

          {/* Status */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg border-b pb-1">Listing Status</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status*</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              >
                <option value="">Select Status</option>
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.icon} {option.label}
                  </option>
                ))}
              </select>
              {form.status && (
                <div className={`mt-2 px-3 py-1 rounded-full text-sm inline-flex items-center ${getStatusColor(form.status)}`}>
                  {statusOptions.find(o => o.value === form.status)?.icon}
                  {form.status}
                </div>
              )}
            </div>
          </div>

          {/* Competitor Information */}
          <div className="space-y-4 md:col-span-2">
            <h3 className="font-semibold text-lg border-b pb-1">Competitor Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Competitor 1 Price ($)</label>
                <input
                  name="competitorPrice1"
                  value={form.competitorPrice1}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  placeholder="9.99"
                  type="number"
                  step="0.01"
                  min="0"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Competitor 1 Link</label>
                <input
                  name="competitorLink1"
                  value={form.competitorLink1}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  placeholder="https://www.amazon.com/..."
                  type="url"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Competitor 2 Price ($)</label>
                <input
                  name="competitorPrice2"
                  value={form.competitorPrice2}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  placeholder="8.39"
                  type="number"
                  step="0.01"
                  min="0"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Competitor 2 Link</label>
                <input
                  name="competitorLink2"
                  value={form.competitorLink2}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  placeholder="https://www.amazon.com/..."
                  type="url"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Competitor 3 Price ($)</label>
                <input
                  name="competitorPrice3"
                  value={form.competitorPrice3}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  placeholder="8.39"
                  type="number"
                  step="0.01"
                  min="0"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Competitor 3 Link</label>
                <input
                  name="competitorLink3"
                  value={form.competitorLink3}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  placeholder="https://www.amazon.com/..."
                  type="url"
                />
              </div>
            </div>
          </div>

          {/* Dimensions */}
          <div className="space-y-4 md:col-span-2">
            <h3 className="font-semibold text-lg border-b pb-1">Dimensions</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Length (in)*</label>
                <input
                  name="length"
                  value={form.length}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  placeholder="11.5"
                  type="number"
                  step="0.01"
                  min="0"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Width (in)*</label>
                <input
                  name="width"
                  value={form.width}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  placeholder="10"
                  type="number"
                  step="0.01"
                  min="0"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Height (in)*</label>
                <input
                  name="height"
                  value={form.height}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  placeholder="0.25"
                  type="number"
                  step="0.01"
                  min="0"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Weight (lb)*</label>
                <input
                  name="weight"
                  value={form.weight}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  placeholder="0.35"
                  type="number"
                  step="0.01"
                  min="0"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
          <button 
            type="button" 
            onClick={onClose} 
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Save Listing
          </button>
        </div>
      </form>
    </div>
  );
}