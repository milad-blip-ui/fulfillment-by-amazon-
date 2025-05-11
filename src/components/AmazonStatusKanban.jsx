import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { FaEdit, FaTrash, FaGripVertical, FaBoxes, FaExclamationTriangle, FaTruck, FaEye } from "react-icons/fa";

const statuses = ["In Stock", "Low Stock", "Replenish"];

const statusColors = {
  "In Stock": "bg-green-100 text-green-800",
  "Low Stock": "bg-yellow-100 text-yellow-800",
  "Replenish": "bg-red-100 text-red-800"
};

const statusIcons = {
  "In Stock": <FaBoxes className="mr-1" />,
  "Low Stock": <FaExclamationTriangle className="mr-1" />,
  "Replenish": <FaTruck className="mr-1" />
};

const getQuantityColor = (quantity) => {
  if (quantity >= 50) return "bg-green-100 text-green-800";
  if (quantity >= 20) return "bg-blue-100 text-blue-800";
  return "bg-amber-100 text-amber-800";
};

export default function AmazonStatusKanban({ items, onEdit, onDelete, onViewDetail }) {
  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;
    
    if (!destination || 
        (destination.droppableId === source.droppableId && 
         destination.index === source.index)) {
      return;
    }

    const updatedItems = [...items];
    const itemIndex = updatedItems.findIndex((i) => i.id.toString() === draggableId);
    
    const [removed] = updatedItems.splice(itemIndex, 1);
    removed.status = destination.droppableId;
    updatedItems.splice(destination.index, 0, removed);
    
    onEdit(updatedItems);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        {statuses.map((status) => (
          <Droppable key={status} droppableId={status}>
            {(provided, snapshot) => (
              <div
                className={`rounded-lg shadow-sm transition-all duration-200 ${
                  snapshot.isDraggingOver ? "bg-gray-50" : "bg-gray-50/50"
                }`}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <div className={`p-3 rounded-t-lg ${statusColors[status]} flex items-center`}>
                  <span className="text-sm">
                    {statusIcons[status]}
                  </span>
                  <h3 className="font-bold text-sm uppercase tracking-wide flex-1">
                    {status}
                  </h3>
                  <span className="text-xs font-normal px-2 py-1 rounded-full bg-white/30">
                    {items.filter(i => i.status === status).length}
                  </span>
                </div>
                <div className="p-2 min-h-[150px]">
                  {items
                    .filter((item) => item.status === status)
                    .map((item, index) => (
                      <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                        {(provided, snapshot) => (
                          <div
                            className={`mb-3 rounded-lg border transition-all duration-200 ${
                              snapshot.isDragging 
                                ? "shadow-lg rotate-1 bg-white" 
                                : "bg-white hover:shadow-md"
                            }`}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                          >
                            <div className="p-3">
                              <div className="flex justify-between items-start">
                                <h4 
                                  className="font-semibold text-gray-800 hover:text-blue-600 cursor-pointer"
                                  onClick={() => onViewDetail(item)}
                                >
                                  {item.productName}
                                </h4>
                                <div 
                                  className="text-gray-400 hover:text-gray-600 cursor-grab"
                                  {...provided.dragHandleProps}
                                >
                                  <FaGripVertical />
                                </div>
                              </div>
                              
                              <div className="flex flex-wrap gap-1 mt-2">
                                <span className={`text-xs px-2 py-1 rounded-full ${getQuantityColor(item.quantity)}`}>
                                  {item.quantity} units
                                </span>
                                {item.status === "Low Stock" && (
                                  <span className="text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-800">
                                    Reorder soon
                                  </span>
                                )}
                                {item.status === "Replenish" && (
                                  <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-800">
                                    Urgent!
                                  </span>
                                )}
                              </div>
                              
                              <div className="flex justify-end space-x-2 mt-3 pt-2 border-t border-gray-100">
                                <button 
                                  onClick={() => onViewDetail(item)} 
                                  className="text-gray-600 hover:text-gray-800 text-sm flex items-center gap-1"
                                >
                                  <FaEye size={12} /> View
                                </button>
                                <button 
                                  onClick={() => onEdit(item)} 
                                  className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                                >
                                  <FaEdit size={12} /> Edit
                                </button>
                                <button 
                                  onClick={() => onDelete(item.id)} 
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