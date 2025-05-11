import { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import InProcessList from "../components/InProcessList";
import InProcessKanban from "../components/InProcessKanban";
import InProcessForm from "../components/InProcessForm";
import InProcessDetail from "../components/InProcessDetail";

export default function InProcess() {
  const [view, setView] = useState("kanban");
  const inDesignNew = JSON.parse(localStorage.getItem("productIdea"));
  console.log(inDesignNew);
  
  if (inDesignNew) {
    inDesignNew.id = 4;
  inDesignNew.productionId = "PROD-003";
  inDesignNew.finalProductName = inDesignNew.productName;
  inDesignNew.linkedIdea = "IDEA-125";
  inDesignNew.unitsToProduce = 500;
  inDesignNew.materialBatchNumber = "BATCH-PLASTIC-2023";
  inDesignNew.designFinalizationDate = inDesignNew.initialConceptDate;
  inDesignNew.stage = "In Design";
  inDesignNew.boxDetails = [];      
  console.log(inDesignNew);
  }
  
  const [items, setItems] = useState([
    {
      id: 1,
      productionId: "PROD-001",
      finalProductName: "Premium Wooden Chair",
      linkedIdea: "IDEA-123",
      unitsToProduce: 100,
      materialBatchNumber: "BATCH-WOOD-2023",
      designFinalizationDate: "2023-05-15",
      productionStartDate: "2023-05-20",
      productionCompleteDate: "2023-06-10",
      qaStatus: "Passed",
      labelRequired: "FNSKU",
      prepInstructionsCompleted: true,
      stage: "Ready for FBA Shipment",
      boxDetails: [
        {
          boxLabelName: "Chair Box A",
          boxLength: 24,
          boxWidth: 18,
          boxHeight: 12,
          weightPerBox: 15.5,
          unitsPerBox: 2,
          totalBoxes: 50,
          barcode: "123456789012",
          labelPlacementNotes: "Place on top right corner",
        },
      ],
    },
    {
      id: 2,
      productionId: "PROD-002",
      finalProductName: "Metal Bookstand",
      linkedIdea: "IDEA-124",
      unitsToProduce: 200,
      materialBatchNumber: "BATCH-METAL-2023",
      designFinalizationDate: "2023-06-01",
      productionStartDate: "2023-06-05",
      qaStatus: "Rework Needed",
      labelRequired: "UPC",
      prepInstructionsCompleted: false,
      stage: "QA",
      boxDetails: [
        {
          boxLabelName: "Bookstand Box",
          boxLength: 12,
          boxWidth: 8,
          boxHeight: 4,
          weightPerBox: 5.2,
          unitsPerBox: 1,
          totalBoxes: 200,
          barcode: "987654321098",
          labelPlacementNotes: "Place on front side",
        },
      ],
    },
    {
      id: 3,
      productionId: "PROD-003",
      finalProductName: "Plastic Storage Bin",
      linkedIdea: "IDEA-125",
      unitsToProduce: 500,
      materialBatchNumber: "BATCH-PLASTIC-2023",
      designFinalizationDate: "2023-06-10",
      stage: "In Design",
      boxDetails: [],
    },
    inDesignNew?inDesignNew:{},
  ]);
  console.log(items);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({ 
    qaStatus: "", 
    stage: "",
    labelRequired: ""
  });
  const [selectedItem, setSelectedItem] = useState(null);
  const [detailItem, setDetailItem] = useState(null);

  const handleAddOrUpdate = (item) => {
    if (item.id) {
      setItems((prev) => prev.map((i) => (i.id === item.id ? item : i)));
    } else {
      item.id = Date.now();
      item.productionId = `PROD-${Math.floor(1000 + Math.random() * 9000)}`;
      setItems((prev) => [...prev, item]);
    }
    setSelectedItem(null);
  };

  const handleDelete = (id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const filteredItems = items.filter((i) => {
    const matchName = i.finalProductName?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchQAStatus = filters.qaStatus ? i.qaStatus === filters.qaStatus : true;
    const matchStage = filters.stage ? i.stage === filters.stage : true;
    const matchLabelType = filters.labelRequired ? i.labelRequired === filters.labelRequired : true;
    
    return matchName && matchQAStatus && matchStage && matchLabelType;
  });

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">🏭 FBA Production Tracker</h1>
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
            onClick={() => setSelectedItem({})}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            + Add Item
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-4">
        <input
          type="text"
          placeholder="Search product name..."
          className="p-2 border rounded w-full md:w-1/3"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="p-2 border rounded"
          onChange={(e) => setFilters({ ...filters, qaStatus: e.target.value })}
        >
          <option value="">All QA Statuses</option>
          <option>Passed</option>
          <option>Rework Needed</option>
          <option>Failed</option>
        </select>
        <select
          className="p-2 border rounded"
          onChange={(e) => setFilters({ ...filters, stage: e.target.value })}
        >
          <option value="">All Stages</option>
          <option>In Design</option>
          <option>In Production</option>
          <option>QA</option>
          <option>Packing</option>
          <option>Ready for FBA Shipment</option>
        </select>
        <select
          className="p-2 border rounded"
          onChange={(e) => setFilters({ ...filters, labelRequired: e.target.value })}
        >
          <option value="">All Label Types</option>
          <option>FNSKU</option>
          <option>UPC</option>
          <option>Custom</option>
          <option>None</option>
        </select>
      </div>

      {/* Toggle Views */}
      {view === "kanban" ? (
        <InProcessKanban
          items={filteredItems}
          setItems={setItems}
          onEdit={setSelectedItem}
          onViewDetails={setDetailItem}
          onDelete={handleDelete}
        />
      ) : (
        <InProcessList
          items={filteredItems}
          onEdit={setSelectedItem}
          onViewDetails={setDetailItem}
          onDelete={handleDelete}
        />
      )}

      {/* Form for Create/Edit */}
      {selectedItem && (
        <InProcessForm
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onSave={handleAddOrUpdate}
        />
      )}

      {/* Detail View */}
      {detailItem && (
        <InProcessDetail
          item={detailItem}
          onClose={() => setDetailItem(null)}
          onEdit={(item) => {
            setDetailItem(null);
            setSelectedItem(item);
          }}
        />
      )}
    </DashboardLayout>
  );
}