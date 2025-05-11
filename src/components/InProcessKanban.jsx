import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { FaEdit, FaTrash, FaGripVertical, FaBoxOpen, FaClipboardCheck, FaEye } from "react-icons/fa";

import { MdDesignServices, MdPrecisionManufacturing } from "react-icons/md";

import { RiTruckLine } from "react-icons/ri";



const statuses = ["In Design", "In Production", "QA", "Packing", "Ready for FBA Shipment"];



const statusConfig = {

  "In Design": {

    color: "bg-blue-100 text-blue-800",

    icon: <MdDesignServices className="mr-1" />

  },

  "In Production": {

    color: "bg-purple-100 text-purple-800",

    icon: <MdPrecisionManufacturing className="mr-1" />

  },

  "QA": {

    color: "bg-yellow-100 text-yellow-800",

    icon: <FaClipboardCheck className="mr-1" />

  },

  "Packing": {

    color: "bg-green-100 text-green-800",

    icon: <FaBoxOpen className="mr-1" />

  },

  "Ready for FBA Shipment": {

    color: "bg-emerald-100 text-emerald-800",

    icon: <RiTruckLine className="mr-1" />

  }

};



const qaStatusColors = {

  "Passed": "bg-green-100 text-green-800",

  "Rework Needed": "bg-yellow-100 text-yellow-800",

  "Failed": "bg-red-100 text-red-800"

};



export default function InProcessKanban({ items, setItems, onEdit, onViewDetails, onDelete }) {

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

    removed.stage = destination.droppableId;

    updatedItems.splice(destination.index, 0, removed);

    

    setItems(updatedItems);

  };



  return (

    <DragDropContext onDragEnd={onDragEnd}>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4">

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

                <div className={`p-3 rounded-t-lg ${statusConfig[status].color}`}>

                  <h3 className="font-bold text-sm uppercase tracking-wide flex justify-between items-center">

                    <span className="flex items-center">

                      {statusConfig[status].icon}

                      {status}

                    </span>

                    <span className="text-xs font-normal px-2 py-1 rounded-full bg-white/30">

                      {items.filter(i => i.stage === status).length}

                    </span>

                  </h3>

                </div>

                <div className="p-2 min-h-[150px]">

                  {items

                    .filter((i) => i.stage === status)

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

                                <div>

                                  <h4 className="font-semibold text-gray-800">{item.finalProductName}</h4>

                                  <p className="text-xs text-gray-500">ID: {item.productionId || item.id}</p>

                                </div>

                                <div 

                                  className="text-gray-400 hover:text-gray-600 cursor-grab"

                                  {...provided.dragHandleProps}

                                >

                                  <FaGripVertical />

                                </div>

                              </div>

                              

                              <div className="flex flex-wrap gap-1 mt-2">

                                {item.qaStatus && (

                                  <span className={`text-xs px-2 py-1 rounded-full ${qaStatusColors[item.qaStatus]}`}>

                                    QA: {item.qaStatus}

                                  </span>

                                )}

                                {item.unitsToProduce && (

                                  <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-800">

                                    Units: {item.unitsToProduce}

                                  </span>

                                )}

                                {item.boxDetails && item.boxDetails[0]?.totalBoxes && (

                                  <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-800">

                                    Boxes: {item.boxDetails[0].totalBoxes}

                                  </span>

                                )}

                              </div>

                              

                              <div className="flex justify-end space-x-2 mt-3 pt-2 border-t border-gray-100">

                                <button 

                                  onClick={() => onEdit(item)} 

                                  className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"

                                >

                                  <FaEdit size={12} /> Edit

                                </button>

                                <button 

                                  onClick={() => onViewDetails(item)} 

                                  className="text-indigo-600 hover:text-indigo-800 text-sm flex items-center gap-1"

                                >

                                  <FaEye size={12} /> Details

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