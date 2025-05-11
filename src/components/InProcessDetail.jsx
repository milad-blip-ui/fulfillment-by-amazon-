import { FaBox, FaRuler, FaWeight, FaBarcode, FaClipboardList, FaLightbulb, FaList, FaDollarSign } from "react-icons/fa";
import { MdDesignServices, MdPrecisionManufacturing, MdDateRange } from "react-icons/md";
import { RiTruckLine } from "react-icons/ri";
import { FaClipboardCheck, FaRegCalendarCheck } from "react-icons/fa6";

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
    icon: <FaBox className="mr-1" />
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

export default function InProcessDetail({ item, onClose, onEdit }) {
  if (!item) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-screen overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{item.finalProductName}</h2>
              <p className="text-gray-600">{item.productionId || item.id}</p>
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={() => onEdit(item)}
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
            {/* Product Ideas Details */}
            <div className="bg-gray-50 p-4 rounded-lg md:col-span-2">
              <h3 className="font-semibold text-lg mb-3 flex items-center">
                <FaLightbulb className="mr-2" />
                Product Ideas Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Product Name</p>
                  <p className="font-medium">{item.productName || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Product Category</p>
                  <p className="font-medium">{item.productCategory || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Initial Concept Date</p>
                  <p className="font-medium flex items-center">
                    <FaRegCalendarCheck className="mr-2" />
                    {item.initialConceptDate || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Priority</p>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    item.priority === 'High' ? 'bg-red-100 text-red-800' :
                    item.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {item.priority || "N/A"}
                  </span>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm text-gray-500">Short Description</p>
                  <p className="font-medium whitespace-pre-line">{item.shortDescription || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Target Market</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {item.targetMarket?.map((market, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        {market}
                      </span>
                    )) || "N/A"}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Materials Needed</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {item.materialsNeeded?.map((material, index) => (
                      <span key={index} className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                        {material}
                      </span>
                    )) || "N/A"}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Estimated COGS</p>
                  <p className="font-medium flex items-center">
                    <FaDollarSign className="mr-1" />
                    {item.estimatedCOGS || "N/A"}
                  </p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm text-gray-500">Competitive Benchmarking</p>
                  <p className="font-medium">{item.competitiveBenchmarking || "N/A"}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm text-gray-500">Notes</p>
                  <p className="font-medium whitespace-pre-line">{item.notes || "N/A"}</p>
                </div>
                {item.sketch && (
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-500 mb-2">Sketch Preview</p>
                    <img 
                      src={item.sketch} 
                      alt="Product sketch" 
                      className="max-w-full h-auto max-h-64 rounded border"
                    />
                  </div>
                )}
                {item.designVersions?.length > 0 && (
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-500 mb-3">Design Versions</p>
                    <div className="space-y-4">
                      {item.designVersions.map((version, index) => (
                        <div key={index} className="border p-4 rounded-lg">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-gray-500">Version Name</p>
                              <p className="font-medium">{version.versionName || "N/A"}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Date</p>
                              <p className="font-medium">{version.date || "N/A"}</p>
                            </div>
                            <div className="md:col-span-2">
                              <p className="text-sm text-gray-500">Description</p>
                              <p className="font-medium whitespace-pre-line">{version.description || "N/A"}</p>
                            </div>
                            {version.fileUpload && (
                              <div className="md:col-span-2">
                                <p className="text-sm text-gray-500 mb-2">Design Preview</p>
                                <img 
                                  src={version.fileUpload} 
                                  alt={`Design version ${index + 1}`} 
                                  className="max-w-full h-auto max-h-64 rounded border"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Existing sections... */}
            {/* Basic Info */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-3 flex items-center">
                <FaClipboardList className="mr-2" />
                Basic Information
              </h3>
              <div className="space-y-2">
                <div>
                  <p className="text-sm text-gray-500">Linked Idea</p>
                  <p className="font-medium">{item.linkedIdea || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Units to Produce</p>
                  <p className="font-medium">{item.unitsToProduce || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Material Batch Number</p>
                  <p className="font-medium">{item.materialBatchNumber || "N/A"}</p>
                </div>
              </div>
            </div>

            {/* Status Info */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-3 flex items-center">
                <MdDesignServices className="mr-2" />
                Status Information
              </h3>
              <div className="space-y-2">
                <div>
                  <p className="text-sm text-gray-500">Current Stage</p>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusConfig[item.stage]?.color || 'bg-gray-100'}`}>
                    {statusConfig[item.stage]?.icon}
                    {item.stage || "N/A"}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">QA Status</p>
                  {item.qaStatus ? (
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${qaStatusColors[item.qaStatus] || 'bg-gray-100'}`}>
                      {item.qaStatus}
                    </span>
                  ) : (
                    <p className="font-medium">N/A</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-500">Label Required</p>
                  <p className="font-medium">{item.labelRequired || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Prep Instructions Completed</p>
                  <p className="font-medium">
                    {item.prepInstructionsCompleted === true ? "Yes" : 
                     item.prepInstructionsCompleted === false ? "No" : "N/A"}
                  </p>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-gray-50 p-4 rounded-lg md:col-span-2">
              <h3 className="font-semibold text-lg mb-3 flex items-center">
                <MdDateRange className="mr-2" />
                Production Timeline
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Design Finalization Date</p>
                  <p className="font-medium">{item.designFinalizationDate || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Production Start Date</p>
                  <p className="font-medium">{item.productionStartDate || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Production Complete Date</p>
                  <p className="font-medium">{item.productionCompleteDate || "N/A"}</p>
                </div>
              </div>
            </div>

            {/* Box Details */}
            {item.boxDetails && item.boxDetails.length > 0 && (
              <div className="bg-gray-50 p-4 rounded-lg md:col-span-2">
                <h3 className="font-semibold text-lg mb-3 flex items-center">
                  <FaBox className="mr-2" />
                  Packaging Details
                </h3>
                <div className="space-y-4">
                  {item.boxDetails.map((box, index) => (
                    <div key={index} className="border p-4 rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Box Label Name</p>
                          <p className="font-medium">{box.boxLabelName || "N/A"}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Barcode</p>
                          <p className="font-medium">{box.barcode || "N/A"}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Dimensions (L×W×H)</p>
                          <p className="font-medium flex items-center">
                            <FaRuler className="mr-1" />
                            {box.boxLength ? `${box.boxLength} × ${box.boxWidth} × ${box.boxHeight} in` : "N/A"}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Weight per Box</p>
                          <p className="font-medium flex items-center">
                            <FaWeight className="mr-1" />
                            {box.weightPerBox ? `${box.weightPerBox} lbs` : "N/A"}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Units per Box</p>
                          <p className="font-medium">{box.unitsPerBox || "N/A"}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Total Boxes</p>
                          <p className="font-medium">{box.totalBoxes || "N/A"}</p>
                        </div>
                        <div className="md:col-span-2">
                          <p className="text-sm text-gray-500">Label Placement Notes</p>
                          <p className="font-medium">{box.labelPlacementNotes || "N/A"}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Artwork Preview */}
            {item.finalArtwork && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-3">Final Artwork</h3>
                <div className="flex justify-center">
                  <img 
                    src={item.finalArtwork} 
                    alt="Final artwork preview" 
                    className="max-w-full h-auto max-h-64 rounded border"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}