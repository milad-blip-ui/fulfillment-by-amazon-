export default function InProcessList({ items = [], onEdit, onViewDetails, onDelete }) {

  return (

    <div className="overflow-x-auto">

      <table className="min-w-full bg-white border rounded shadow">

        <thead className="bg-gray-100">

          <tr>

            <th className="px-4 py-2 text-left">Production ID</th>

            <th className="px-4 py-2 text-left">Final Product Name</th>

            <th className="px-4 py-2 text-left">Units</th>

            <th className="px-4 py-2 text-left">QA Status</th>

            <th className="px-4 py-2 text-left">Stage</th>

            <th className="px-4 py-2 text-left">Actions</th>

          </tr>

        </thead>

        <tbody>

          {items.map((item) => (

            <tr key={item.id} className="border-t hover:bg-gray-50">

              <td className="px-4 py-2">{item.productionId || item.id}</td>

              <td className="px-4 py-2">{item.finalProductName}</td>

              <td className="px-4 py-2">{item.unitsToProduce}</td>

              <td className="px-4 py-2">

                <span className={`px-2 py-1 rounded-full text-xs ${

                  item.qaStatus === 'Passed' ? 'bg-green-100 text-green-800' :

                  item.qaStatus === 'Rework Needed' ? 'bg-yellow-100 text-yellow-800' :

                  item.qaStatus === 'Failed' ? 'bg-red-100 text-red-800' : 'bg-gray-100'

                }`}>

                  {item.qaStatus || 'N/A'}

                </span>

              </td>

              <td className="px-4 py-2">

                <span className={`px-2 py-1 rounded-full text-xs ${

                  item.stage === 'In Design' ? 'bg-blue-100 text-blue-800' :

                  item.stage === 'In Production' ? 'bg-purple-100 text-purple-800' :

                  item.stage === 'QA' ? 'bg-yellow-100 text-yellow-800' :

                  item.stage === 'Packing' ? 'bg-green-100 text-green-800' :

                  item.stage === 'Ready for FBA Shipment' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100'

                }`}>

                  {item.stage}

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