import { useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import ProductIdeasList from "../components/ProductIdeasList";

import ProductIdeasKanban from "../components/ProductIdeasKanban";

import ProductIdeaForm from "../components/ProductIdeaForm";

import ProductIdeaDetail from "../components/ProductIdeaDetail";
import BulkUpdateForm from "../components/BulkUpdateForm";



const statuses = ["Concept", "Under Review", "Approved for Design", "Discarded"];



export default function ProductIdeas({ onAddToInProcess }) {

  const [view, setView] = useState("kanban");

  const [ideas, setIdeas] = useState([

    { 

      id: 1, 

      title: "Wooden Stand", 

      productName: "Wooden Phone Stand",

      material: "Wood", 

      priority: "High", 

      status: "Concept",

      shortDescription: "Eco-friendly wooden stand for phones and tablets",

      productCategory: "Home",

      targetMarket: ["General", "Professionals"],

      initialConceptDate: "2023-05-15",

      creator: "John Doe",

      packagingConcept: "Box",

      estimatedCOGS: "12.99",

      competitiveBenchmarking: "Competitors price at $19.99",

      notes: "Need to research sustainable wood sources",

      lastUpdated: "2023-05-20"

    },

    { 

      id: 2, 

      title: "Metal Bookstand", 

      productName: "Metal Bookstand",

      material: "Metal", 

      priority: "Medium", 

      status: "Under Review",

      shortDescription: "Sturdy metal stand for books and tablets",

      productCategory: "Home",

      targetMarket: ["General", "Students"],

      initialConceptDate: "2023-06-01",

      creator: "Jane Smith",

      packagingConcept: "Box",

      estimatedCOGS: "15.50",

      competitiveBenchmarking: "Competitors price at $24.99",

      notes: "Consider powder coating options",

      lastUpdated: "2023-06-05"

    }

  ]);



  const [searchTerm, setSearchTerm] = useState("");

  const [filters, setFilters] = useState({ priority: "", material: "" });

  const [selectedIdea, setSelectedIdea] = useState(null);

  const [detailViewIdea, setDetailViewIdea] = useState(null);

  const [selectedIds, setSelectedIds] = useState([]);
  const [showBulkForm, setShowBulkForm] = useState(false);



  const handleAddOrUpdate = (idea) => {

    if (idea.id) {

      setIdeas((prev) => prev.map((i) => (i.id === idea.id ? idea : i)));

    } else {

      idea.id = Date.now();

      idea.createdDate = new Date().toISOString().split('T')[0];

      idea.lastUpdated = new Date().toISOString().split('T')[0];

      idea.status = "Concept";

      setIdeas((prev) => [...prev, idea]);

    }

    setSelectedIdea(null);

    setDetailViewIdea(null);

  };



  const handleDelete = (id) => {

    setIdeas((prev) => prev.filter((i) => i.id !== id));

    if (detailViewIdea && detailViewIdea.id === id) {

      setDetailViewIdea(null);

    }

  };



  const handleApproveForDesign = (idea) => {

    const inProcessItem = {

      title: idea.productName || idea.title,

      material: idea.material,

      priority: idea.priority,

      status: "In Design",

      linkedIdea: idea.id,

      designFinalizationDate: new Date().toISOString().split('T')[0],

      productionId: `PROD-${Math.floor(1000 + Math.random() * 9000)}`,

      finalProductName: idea.productName || idea.title,

      estimatedCOGS: idea.estimatedCOGS,

      packagingConcept: idea.packagingConcept

    };

    

    onAddToInProcess(inProcessItem);

  };

  const handleBulkUpdate = (updateData) => {
    setIdeas(prev => prev.map(idea => {
      if (selectedIds.includes(idea.id)) {
        return {
          ...idea,
          ...updateData,
          lastUpdated: new Date().toISOString().split('T')[0]
        };
      }
      return idea;
    }));
    setSelectedIds([]);
  };

  const filteredIdeas = ideas.filter((i) => {

    const searchFields = [i.title, i.productName].filter(Boolean).join(' ').toLowerCase();

    const matchSearch = searchFields.includes(searchTerm.toLowerCase());

    const matchPriority = filters.priority ? i.priority === filters.priority : true;

    const matchMaterial = filters.material ? i.material === filters.material : true;

    return matchSearch && matchPriority && matchMaterial;

  });



  return (

    <DashboardLayout>

      <div className="flex justify-between items-center mb-4">

        <h1 className="text-2xl font-bold">💡 Product Ideas</h1>

        <div className="space-x-2">

          <button

            onClick={() => setView("kanban")}

            className={`px-4 py-2 rounded ${view === "kanban" ? "bg-indigo-600 text-white" : "bg-gray-200"}`}

          >

            Kanban

          </button>

          <button

            onClick={() => setView("list")}

            className={`px-4 py-2 rounded ${view === "list" ? "bg-indigo-600 text-white" : "bg-gray-200"}`}

          >

            List

          </button>

          <button

            onClick={() => setSelectedIdea({ status: "Concept" })}

            className="bg-green-600 text-white px-4 py-2 rounded"

          >

            + Add Idea

          </button>

        </div>

      </div>

      {selectedIds.length > 0 && !detailViewIdea && (
        <div className="mb-4 p-3 bg-indigo-50 rounded-lg flex items-center gap-4">
          <span className="text-indigo-600">{selectedIds.length} selected</span>
          <button
            onClick={() => setShowBulkForm(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded"
          >
            Bulk Update
          </button>
          <button
            onClick={() => {
              setIdeas(prev => prev.filter(i => !selectedIds.includes(i.id)));
              setSelectedIds([]);
            }}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Delete Selected
          </button>
          <button
            onClick={() => setSelectedIds([])}
            className="text-gray-600 hover:text-gray-800"
          >
            Clear Selection
          </button>
        </div>
      )}

      {detailViewIdea ? (

        <ProductIdeaDetail 

          idea={detailViewIdea} 

          onClose={() => setDetailViewIdea(null)}

          onEdit={(idea) => {

            setDetailViewIdea(null);

            setSelectedIdea(idea);

          }}

        />

      ) : (

        <>

          <div className="flex gap-4 mb-4">

            <input

              type="text"

              placeholder="Search..."

              className="p-2 border rounded w-1/3"

              onChange={(e) => setSearchTerm(e.target.value)}

            />

            <select

              className="p-2 border rounded"

              onChange={(e) => setFilters({ ...filters, priority: e.target.value })}

            >

              <option value="">All Priorities</option>

              <option>High</option>

              <option>Medium</option>

              <option>Low</option>

            </select>

            <select

              className="p-2 border rounded"

              onChange={(e) => setFilters({ ...filters, material: e.target.value })}

            >

              <option value="">All Materials</option>

              <option>Wood</option>

              <option>Metal</option>

              <option>Plastic</option>

            </select>

          </div>



          {view === "kanban" ? (

            <ProductIdeasKanban

              ideas={filteredIdeas}

              setIdeas={setIdeas}
              selectedIds={selectedIds}
              setSelectedIds={setSelectedIds}

              onEdit={setSelectedIdea}

              onDelete={handleDelete}

              onViewDetail={setDetailViewIdea}

              onApproveForDesign={handleApproveForDesign}

            />

          ) : (

            <ProductIdeasList

              ideas={filteredIdeas}
              selectedIds={selectedIds}
              setSelectedIds={setSelectedIds}

              onEdit={setSelectedIdea}

              onDelete={handleDelete}

              onViewDetail={setDetailViewIdea}

            />

          )}

        </>

      )}



      {selectedIdea && (

        <ProductIdeaForm

          idea={selectedIdea}

          onClose={() => setSelectedIdea(null)}

          onSave={handleAddOrUpdate}

        />

      )}

{showBulkForm && (
        <BulkUpdateForm
          onClose={() => setShowBulkForm(false)}
          onSave={handleBulkUpdate}
          fields={{
            statusOptions: statuses,
            priorityOptions: ["High", "Medium", "Low"],
            materialOptions: ["Wood", "Metal", "Plastic"]
          }}
        />
      )}

    </DashboardLayout>

  );

}