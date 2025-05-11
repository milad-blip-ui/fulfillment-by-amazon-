import { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import AmazonStatusList from "../components/AmazonStatusList";
import AmazonStatusKanban from "../components/AmazonStatusKanban";
import AmazonStatusForm from "../components/AmazonStatusForm";
import AmazonStatusDetail from "../components/AmazonStatusDetail";

export default function AmazonStatus() {
  const [view, setView] = useState("kanban");
  const [items, setItems] = useState([
    { 
      id: 1, 
      productName: "Item ABC", 
      quantity: 50, 
      status: "In Stock",
      sku: "ABC123",
      asin: "B08N5KWB9H",
      location: "A12-34",
      supplier: "Amazon FBA",
      lastUpdated: "2023-05-15",
      notes: "This item sells quickly during holidays."
    },
    { 
      id: 2, 
      productName: "Item XYZ", 
      quantity: 10, 
      status: "Low Stock",
      sku: "XYZ789",
      asin: "B07PBLJ2G1",
      location: "B05-12",
      supplier: "Third Party",
      lastUpdated: "2023-05-10",
      notes: "Consider increasing order quantity next time."
    },
  ]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [detailViewItem, setDetailViewItem] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [quantityFilter, setQuantityFilter] = useState("");

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.productName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter ? item.status === statusFilter : true;
    const matchesQuantity =
      quantityFilter === "" || item.quantity >= parseInt(quantityFilter);

    return matchesSearch && matchesStatus && matchesQuantity;
  });

  const handleAddOrUpdate = (item) => {
    if (item.id) {
      setItems((prev) => prev.map((i) => (i.id === item.id ? item : i)));
    } else {
      item.id = Date.now();
      item.lastUpdated = new Date().toISOString().split('T')[0];
      setItems((prev) => [...prev, item]);
    }
    setSelectedItem(null);
    setDetailViewItem(null);
  };

  const handleDelete = (id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
    if (detailViewItem && detailViewItem.id === id) {
      setDetailViewItem(null);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">📦 Amazon Status</h1>
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

      {/* Search and Filter Section */}
      {!detailViewItem && (
        <div className="flex space-x-4 mb-4">
          <input
            type="text"
            placeholder="Search by Product Name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 border rounded-md w-1/3"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="p-2 border rounded-md w-1/3"
          >
            <option value="">Filter by Status</option>
            <option value="In Stock">In Stock</option>
            <option value="Low Stock">Low Stock</option>
            <option value="Replenish">Replenish</option>
          </select>

          <input
            type="number"
            placeholder="Min Quantity"
            value={quantityFilter}
            onChange={(e) => setQuantityFilter(e.target.value)}
            className="p-2 border rounded-md w-1/3"
          />
        </div>
      )}

      {/* Main Content Area */}
      {detailViewItem ? (
        <AmazonStatusDetail 
          item={detailViewItem} 
          onClose={() => setDetailViewItem(null)}
          onEdit={(item) => {
            setDetailViewItem(null);
            setSelectedItem(item);
          }}
        />
      ) : view === "kanban" ? (
        <AmazonStatusKanban
          items={filteredItems}
          onEdit={setSelectedItem}
          onDelete={handleDelete}
          onViewDetail={setDetailViewItem}
        />
      ) : (
        <AmazonStatusList
          items={filteredItems}
          onEdit={setSelectedItem}
          onDelete={handleDelete}
          onViewDetail={setDetailViewItem}
        />
      )}

      {/* Form for Create/Edit */}
      {selectedItem && (
        <AmazonStatusForm
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onSave={handleAddOrUpdate}
        />
      )}
    </DashboardLayout>
  );
}