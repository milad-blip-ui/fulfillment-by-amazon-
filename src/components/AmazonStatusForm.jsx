import { useState, useEffect } from "react";

export default function AmazonStatusForm({ item = {}, onClose, onSave }) {
  const [form, setForm] = useState({
    sku: '',
    asin: '',
    title: '',
    availableStock: 0,
    last30DaysSales: 0,
    stockRecommendation: 0,
    approvedQty: 0,
    unitsPerCase: 0,
    length: 0,
    width: 0,
    height: 0,
    weight: 0,
    status: '',
    ...item
  });

  useEffect(() => {
    if (item) {
      setForm(item);
    }
  }, [item]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.sku || !form.title || !form.status) {
      alert("Please fill in all required fields");
      return;
    }
    onSave(form);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4 border-b pb-2">
          {form.id ? "Edit" : "Add"} Amazon Status
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Product Identification */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg border-b pb-1">Product Identification</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">SKU*</label>
              <input
                name="sku"
                value={form.sku}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="1S-VMS-BLK-M"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ASIN</label>
              <input
                name="asin"
                value={form.asin}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="B0DT2H9CTC"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title*</label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="Motivational Vinyl Stickers Set"
                required
              />
            </div>
          </div>

          {/* Stock Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg border-b pb-1">Stock Information</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Available Stock*</label>
              <input
                name="availableStock"
                value={form.availableStock}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                type="number"
                min="0"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last 30 Days Sales</label>
              <input
                name="last30DaysSales"
                value={form.last30DaysSales}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                type="number"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stock Recommendation</label>
              <input
                name="stockRecommendation"
                value={form.stockRecommendation}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                type="number"
                min="0"
              />
            </div>
          </div>

          {/* Shipment Details */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg border-b pb-1">Shipment Details</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Approved Quantity</label>
              <input
                name="approvedQty"
                value={form.approvedQty}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                type="number"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Units Per Case</label>
              <input
                name="unitsPerCase"
                value={form.unitsPerCase}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                type="number"
                min="0"
              />
            </div>
          </div>

          {/* Dimensions */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg border-b pb-1">Dimensions</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Length (in)</label>
              <input
                name="length"
                value={form.length}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                type="number"
                step="0.01"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Width (in)</label>
              <input
                name="width"
                value={form.width}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                type="number"
                step="0.01"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Height (in)</label>
              <input
                name="height"
                value={form.height}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                type="number"
                step="0.01"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Weight (lb)</label>
              <input
                name="weight"
                value={form.weight}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                type="number"
                step="0.01"
                min="0"
              />
            </div>
          </div>

          {/* Status */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg border-b pb-1">Status</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Inventory Status*</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              >
                <option value="">Select Status</option>
                <option value="In Stock">In Stock</option>
                <option value="Low Stock">Low Stock</option>
                <option value="Replenish">Replenish</option>
              </select>
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
            Save Status
          </button>
        </div>
      </form>
    </div>
  );
}