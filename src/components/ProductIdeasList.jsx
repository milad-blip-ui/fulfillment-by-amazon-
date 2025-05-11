import { FaEye, FaEdit, FaTrash, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

export default function ProductIdeasList({ ideas = [],selectedIds, setSelectedIds, onEdit, onDelete, onViewDetail }) {
  const statusColors = {
    "Concept": "bg-blue-100 text-blue-800",
    "Under Review": "bg-purple-100 text-purple-800",
    "Approved for Design": "bg-green-100 text-green-800",
    "Discarded": "bg-red-100 text-red-800"
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border rounded shadow">
        <thead className="bg-gray-100">
          <tr>
          <th className="px-4 py-2 text-left w-8">
              <input
                type="checkbox"
                checked={ideas.length > 0 && selectedIds.length === ideas.length}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedIds(ideas.map(i => i.id));
                  } else {
                    setSelectedIds([]);
                  }
                }}
              />
            </th>
            <th className="px-4 py-2 text-left">Title</th>
            <th className="px-4 py-2 text-left">Material</th>
            <th className="px-4 py-2 text-left">Priority</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {ideas.length > 0 ? (
            ideas.map((idea) => (
              <tr key={idea.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">
                <input
                  type="checkbox"
                  checked={selectedIds.includes(idea.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedIds(prev => [...prev, idea.id]);
                    } else {
                      setSelectedIds(prev => prev.filter(id => id !== idea.id));
                    }
                  }}
                />
              </td>
                <td 
                  className="px-4 py-2 text-blue-600 hover:text-blue-800 cursor-pointer"
                  onClick={() => onViewDetail(idea)}
                >
                  {idea.title || idea.productName}
                </td>
                <td className="px-4 py-2">{idea.material}</td>
                <td className="px-4 py-2">{idea.priority}</td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${statusColors[idea.status]}`}>
                    {idea.status === "Approved for Design" ? (
                      <FaCheckCircle className="inline mr-1" />
                    ) : idea.status === "Discarded" ? (
                      <FaTimesCircle className="inline mr-1" />
                    ) : null}
                    {idea.status}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onViewDetail(idea);
                      }}
                      className="p-1 text-gray-600 hover:text-gray-800"
                      title="View"
                    >
                      <FaEye />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onEdit(idea);
                      }}
                      className="p-1 text-blue-600 hover:text-blue-800"
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(idea.id);
                      }}
                      className="p-1 text-red-600 hover:text-red-800"
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center px-4 py-2 text-gray-500">
                No items found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}