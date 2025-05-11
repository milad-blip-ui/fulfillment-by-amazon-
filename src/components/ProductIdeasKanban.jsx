import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { FaEdit, FaTrash, FaGripVertical, FaEye, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const statuses = ["Concept", "Under Review", "Approved for Design", "Discarded"];

const statusColors = {
  "Concept": "bg-blue-100 text-blue-800",
  "Under Review": "bg-purple-100 text-purple-800",
  "Approved for Design": "bg-green-100 text-green-800",
  "Discarded": "bg-red-100 text-red-800"
};

const statusIcons = {
  "Concept": <FaEye className="mr-1" />,
  "Under Review": <FaEye className="mr-1" />,
  "Approved for Design": <FaCheckCircle className="mr-1" />,
  "Discarded": <FaTimesCircle className="mr-1" />
};

const priorityColors = {
  "High": "bg-red-100 text-red-800",
  "Medium": "bg-yellow-100 text-yellow-800",
  "Low": "bg-green-100 text-green-800"
};

export default function ProductIdeasKanban({ ideas, setIdeas, selectedIds, setSelectedIds, onEdit, onDelete, onViewDetail, onApproveForDesign }) {
  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    console.log(source, destination, draggableId);
    
    
    if (!destination || 
        (destination.droppableId === source.droppableId && 
         destination.index === source.index)) {
      return;
    }

    if (!statuses.includes(destination.droppableId)) {
      console.error(`Invalid droppableId: ${destination.droppableId}`);
      return;
    }

    const updatedIdeas = [...ideas];
    const ideaIndex = updatedIdeas.findIndex((i) => i.id.toString() === draggableId);
    
    if (ideaIndex === -1) {
      console.error(`Could not find idea with id: ${draggableId}`);
      return;
    }

    const [removed] = updatedIdeas.splice(ideaIndex, 1);
    const previousStatus = removed.status;
    removed.status = destination.droppableId;
    updatedIdeas.splice(destination.index, 0, removed);
    
    setIdeas(updatedIdeas);

    if (destination.droppableId === "Approved for Design" && previousStatus !== "Approved for Design") {
      onApproveForDesign(removed);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
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
                <div className={`p-3 rounded-t-lg ${statusColors[status]}`}>
                  <h3 className="font-bold text-sm uppercase tracking-wide flex justify-between items-center">
                    <span className="flex items-center">
                      {statusIcons[status]}
                      {status}
                    </span>
                    <span className="text-xs font-normal px-2 py-1 rounded-full bg-white/30">
                      {ideas.filter(i => i.status === status).length}
                    </span>
                  </h3>
                </div>
                <div className="p-2 min-h-[150px]">
                  {ideas
                    .filter((i) => i.status === status)
                    .map((idea, index) => (
                      <Draggable key={idea.id} draggableId={idea.id.toString()} index={index}>
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
                              <div className="flex items-center gap-2">
                              <input
                                    type="checkbox"
                                    checked={selectedIds?.includes(idea.id)}
                                    onChange={(e) => {
                                      if (e.target.checked) {
                                        setSelectedIds(prev => [...prev, idea.id]);
                                      } else {
                                        setSelectedIds(prev => prev.filter(id => id !== idea.id));
                                      }
                                    }}
                                    onClick={(e) => e.stopPropagation()}
                                  />
                                <h4 
                                  className="font-semibold text-gray-800 hover:text-blue-600 cursor-pointer"
                                  onClick={() => onViewDetail(idea)}
                                >
                                  {idea.title || idea.productName}
                                </h4>
                                </div>
                                <div 
                                  className="text-gray-400 hover:text-gray-600 cursor-grab"
                                  {...provided.dragHandleProps}
                                >
                                  <FaGripVertical />
                                </div>
                              </div>
                              
                              <div className="flex flex-wrap gap-1 mt-2">
                                <span className={`text-xs px-2 py-1 rounded-full ${priorityColors[idea.priority]}`}>
                                  {idea.priority}
                                </span>
                                <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-800">
                                  {idea.material}
                                </span>
                              </div>
                              
                              <div className="flex justify-end space-x-2 mt-3 pt-2 border-t border-gray-100">
                                <button 
                                  onClick={() => onViewDetail(idea)} 
                                  className="text-gray-600 hover:text-gray-800 text-sm flex items-center gap-1"
                                >
                                  <FaEye size={12} /> View
                                </button>
                                <button 
                                  onClick={() => onEdit(idea)} 
                                  className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                                >
                                  <FaEdit size={12} /> Edit
                                </button>
                                <button 
                                  onClick={() => onDelete(idea.id)} 
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