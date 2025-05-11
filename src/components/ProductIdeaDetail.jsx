import { FaArrowLeft, FaEdit, FaLightbulb, FaClipboardCheck, FaFlask, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

export default function ProductIdeaDetail({ idea, onClose, onEdit }) {
  const statusConfig = {
    "Concept": { 
      icon: <FaLightbulb className="mr-2 text-blue-600" size={20} />, 
      color: "bg-blue-100 text-blue-800" 
    },
    "Under Review": { 
      icon: <FaClipboardCheck className="mr-2 text-purple-600" size={20} />, 
      color: "bg-purple-100 text-purple-800" 
    },
    "Approved for Design": { 
      icon: <FaCheckCircle className="mr-2 text-green-600" size={20} />, 
      color: "bg-green-100 text-green-800" 
    },
    "Discarded": { 
      icon: <FaTimesCircle className="mr-2 text-red-600" size={20} />, 
      color: "bg-red-100 text-red-800" 
    }
  };

  const priorityColors = {
    "High": "bg-red-100 text-red-800",
    "Medium": "bg-yellow-100 text-yellow-800",
    "Low": "bg-green-100 text-green-800"
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <button 
          onClick={onClose}
          className="flex items-center text-gray-600 hover:text-gray-800"
        >
          <FaArrowLeft className="mr-2" /> Back to list
        </button>
        <button
          onClick={() => onEdit(idea)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
        >
          <FaEdit /> Edit Idea
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">{idea.productName || idea.title}</h2>
          
          <div className="flex flex-wrap gap-2 mb-4">
            <div className={`inline-flex items-center px-4 py-2 rounded-full ${statusConfig[idea.status].color}`}>
              {statusConfig[idea.status].icon}
              <span className="font-semibold">{idea.status}</span>
            </div>
            <div className={`inline-flex items-center px-4 py-2 rounded-full ${priorityColors[idea.priority]}`}>
              <span className="font-semibold">{idea.priority} Priority</span>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-700 mb-3 border-b pb-2">Core Information</h3>
            <div className="space-y-3">
              <DetailItem label="Product Name" value={idea.productName || idea.title} />
              <DetailItem label="Short Description" value={idea.shortDescription} />
              <DetailItem label="Target Market" value={idea.targetMarket?.join(', ')} />
              <DetailItem label="Product Category" value={idea.productCategory} />
              <DetailItem label="Initial Concept Date" value={idea.initialConceptDate} />
              <DetailItem label="Creator/Owner" value={idea.creator} />
            </div>
          </div>

          {/* Design Version Tracker */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-700 mb-3 border-b pb-2">Design Versions</h3>
            {idea.designVersions?.length > 0 ? (
              <div className="space-y-3">
                {idea.designVersions.map((version, index) => (
                  <div key={index} className="border-b pb-3 last:border-b-0">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium">Version {version.versionNumber}</h4>
                      <span className="text-xs text-gray-500">{version.date}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{version.description}</p>
                    {version.attachment && (
                      <p className="text-xs text-blue-600 mt-1">Attachment: {version.attachment.name}</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No design versions recorded</p>
            )}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-700 mb-3 border-b pb-2">Materials & Packaging</h3>
            <div className="space-y-3">
              <DetailItem label="Materials Needed" value={idea.materialsNeeded?.join(', ')} />
              <DetailItem label="Packaging Concept" value={idea.packagingConcept} />
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-700 mb-3 border-b pb-2">Cost Analysis</h3>
            <div className="space-y-3">
              <DetailItem label="Estimated COGS" value={idea.estimatedCOGS ? `$${idea.estimatedCOGS}` : 'Not specified'} />
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-700 mb-3 border-b pb-2">Competitive Benchmarking</h3>
            <p className="whitespace-pre-line text-sm">{idea.competitiveBenchmarking || "No notes available"}</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-700 mb-3 border-b pb-2">Additional Notes</h3>
            <p className="whitespace-pre-line text-sm">{idea.notes || "No additional notes"}</p>
          </div>

          {idea.sketch && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-700 mb-3 border-b pb-2">Sketch/Image</h3>
              <div className="flex items-center gap-2">
                <span className="text-blue-600">{idea.sketch.name}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function DetailItem({ label, value }) {
  return (
    <div className="flex justify-between">
      <span className="text-sm font-medium text-gray-600">{label}:</span>
      <span className="text-sm text-gray-800 font-medium">
        {value || <span className="text-gray-400 italic">Not specified</span>}
      </span>
    </div>
  );
}