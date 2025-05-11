import { useState } from "react";
import { FaTimes } from "react-icons/fa";

export default function BulkUpdateForm({ onClose, onSave, fields }) {
  const [updateData, setUpdateData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateData(prev => ({
      ...prev,
      [name]: value === "" ? null : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(updateData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Bulk Update Selected Items</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              name="status"
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Don't update status</option>
              {fields.statusOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Priority</label>
            <select
              name="priority"
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Don't update priority</option>
              {fields.priorityOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Material</label>
            <select
              name="material"
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Don't update material</option>
              {fields.materialOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded"
          >
            Apply Updates
          </button>
        </div>
      </form>
    </div>
  );
}