import { FaEdit, FaTrash, FaEye } from "react-icons/fa";

export default function AmazonStatusList({ items = [], onEdit, onDelete, onViewDetails }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border rounded shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Product</th>
            <th className="px-4 py-2 text-left">Quantity</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="border-t hover:bg-gray-50">
              <td className="px-4 py-2">{item.productName}</td>
              <td className="px-4 py-2">{item.quantity}</td>
              <td className="px-4 py-2">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  item.status === 'In Draft' ? 'bg-gray-100 text-gray-800' :
                  item.status === 'Content Ready' ? 'bg-blue-100 text-blue-800' :
                  item.status === 'Submitted' ? 'bg-purple-100 text-purple-800' :
                  item.status === 'Live' ? 'bg-green-100 text-green-800' :
                  item.status === 'Flagged' ? 'bg-red-100 text-red-800' : 'bg-gray-100'
                }`}>
                  {item.status || 'N/A'}
                </span>
              </td>
              <td className="px-4 py-2 space-x-2">
                <button 
                  onClick={() => onEdit(item)} 
                  className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
                >
                  Edit
                </button>
                <button 
                  onClick={() => onViewDetails(item)} 
                  className="px-3 py-1 bg-indigo-600 text-white rounded text-sm"
                >
                  Details
                </button>
                <button 
                  onClick={() => onDelete(item.id)} 
                  className="px-3 py-1 bg-red-600 text-white rounded text-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}