import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { FaEdit, FaTrash, FaGripVertical, FaEye, FaFileAlt, FaCheckCircle, FaPaperPlane, FaFlag } from "react-icons/fa";

// Updated statuses
const statuses = ["In Draft", "Content Ready", "Submitted", "Live", "Flagged"];

// Updated status colors and icons
const statusColors = {
  "In Draft": "bg-gray-100 text-gray-800 border-gray-200",
  "Content Ready": "bg-blue-100 text-blue-800 border-blue-200",
  "Submitted": "bg-purple-100 text-purple-800 border-purple-200",
  "Live": "bg-green-100 text-green-800 border-green-200",
  "Flagged": "bg-red-100 text-red-800 border-red-200"
};

const statusIcons = {
  "In Draft": <FaFileAlt className="mr-1" />,
  "Content Ready": <FaCheckCircle className="mr-1" />,
  "Submitted": <FaPaperPlane className="mr-1" />,
  "Live": <FaCheckCircle className="mr-1" />,
  "Flagged": <FaFlag className="mr-1" />
};

const sizeColors = {
  "Small": "bg-purple-100 text-purple-800",
  "Medium": "bg-amber-100 text-amber-800",
  "Large": "bg-sky-100 text-sky-800"
};

export default function AmazonListingKanban({ listings, onEdit, onViewDetails, onDelete }) {
  const onDragEnd = (result) => {
    if (!result.destination) return;

    const updatedListings = [...listings];
    const [movedItem] = updatedListings.splice(result.source.index, 1);
    movedItem.status = result.destination.droppableId;
    updatedListings.splice(result.destination.index, 0, movedItem);
    
    onEdit(updatedListings);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4">
        {statuses.map((status) => (
          <Droppable key={status} droppableId={status}>
            {(provided, snapshot) => (
              <div
                className={`rounded-lg border shadow-sm transition-all ${snapshot.isDraggingOver ? "bg-gray-50" : "bg-white"}`}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <div className={`p-3 rounded-t-lg border-b ${statusColors[status]} flex items-center`}>
                  <span className="text-sm">
                    {statusIcons[status]}
                  </span>
                  <h3 className="font-bold text-sm uppercase tracking-wide flex-1">
                    {status}
                  </h3>
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-white/80">
                    {listings.filter(l => l.status === status).length}
                  </span>
                </div>
                <div className="p-2 min-h-[150px]">
                  {listings
                    .filter(l => l.status === status)
                    .map((listing, index) => (
                      <Draggable key={listing.id} draggableId={listing.id.toString()} index={index}>
                        {(provided, snapshot) => (
                          <div
                            className={`mb-3 rounded-lg border transition-all ${snapshot.isDragging ? "shadow-lg rotate-1" : "hover:shadow-md"}`}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                          >
                            <div className="p-3">
                              <div className="flex justify-between items-start">
                                <div className="font-semibold text-gray-800">
                                  {listing.name}
                                </div>
                                <div 
                                  className="text-gray-400 hover:text-gray-600 cursor-grab"
                                  {...provided.dragHandleProps}
                                >
                                  <FaGripVertical />
                                </div>
                              </div>
                              
                              <div className="flex flex-wrap gap-1 mt-2">
                                <span className={`text-xs px-2 py-1 rounded-full ${sizeColors[listing.size]}`}>
                                  {listing.size}
                                </span>
                                <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-800">
                                  {listing.weight}
                                </span>
                                <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-800">
                                  SKU: {listing.sku}
                                </span>
                              </div>
                              
                              <div className="flex justify-end space-x-2 mt-3 pt-2 border-t border-gray-100">
                                <button 
                                  onClick={() => onViewDetails(listing)}
                                  className="text-indigo-600 hover:text-indigo-800 text-sm flex items-center gap-1"
                                >
                                  <FaEye size={12} /> View
                                </button>
                                <button 
                                  onClick={() => onEdit(listing)}
                                  className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                                >
                                  <FaEdit size={12} /> Edit
                                </button>
                                <button 
                                  onClick={() => onDelete(listing.id)}
                                  className="text-red-600 hover:text-red-800 text-sm flex items-center gap-1"
                                >
                                  <FaTrash size={12} /> Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
}