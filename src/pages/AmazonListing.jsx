import { useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import AmazonListingList from "../components/AmazonListingList";
import AmazonListingKanban from "../components/AmazonListingKanban";
import AmazonListingForm from "../components/AmazonListingForm";
import AmazonListingDetail from "../components/AmazonListingDetail";

export default function AmazonListing() {
  const [view, setView] = useState("kanban");
  const [listings, setListings] = useState([
    { 
      id: 1, 
      name: "Product A", 
      productName: "Motivational Vinyl Stickers Set",
      sku: "1S-VMS-BLK-M",
      size: "Medium", 
      weight: "500g", 
      status: "In Draft",
      // ... other existing fields
    }
  ]);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({ size: "", weight: "", status: "" });
  const [selectedListing, setSelectedListing] = useState(null);
  const [detailListing, setDetailListing] = useState(null);

  const handleAddOrUpdate = (listing) => {
    if (listing.id) {
      // Update existing listing
      setListings(prev => prev.map(l => l.id === listing.id ? listing : l));
    } else {
      // Create new listing
      const newListing = {
        id: Date.now(),
        name: listing.productName || "New Listing", // Ensure name is set
        status: "In Draft", // Default status
        ...listing // Spread all other form fields
      };
      setListings(prev => [...prev, newListing]);
    }
    setSelectedListing(null);
  };

  const handleDelete = (id) => {
    setListings(prev => prev.filter(l => l.id !== id));
  };

  const filteredListings = listings.filter(listing => {
    const matchName = (listing.name || "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchSize = filters.size ? listing.size === filters.size : true;
    const matchWeight = filters.weight ? listing.weight === filters.weight : true;
    const matchStatus = filters.status ? listing.status === filters.status : true;
    return matchName && matchSize && matchWeight && matchStatus;
  });
  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">🛒 Amazon Listings</h1>
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
            onClick={() => setSelectedListing({})}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            + Add Listing
          </button>
        </div>
      </div>

      {/* Enhanced Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <input
          type="text"
          placeholder="Search products..."
          className="p-2 border rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="p-2 border rounded"
          value={filters.size}
          onChange={(e) => setFilters({...filters, size: e.target.value})}
        >
          <option value="">All Sizes</option>
          <option>Small</option>
          <option>Medium</option>
          <option>Large</option>
        </select>
        <select
          className="p-2 border rounded"
          value={filters.weight}
          onChange={(e) => setFilters({...filters, weight: e.target.value})}
        >
          <option value="">All Weights</option>
          <option>250g</option>
          <option>500g</option>
          <option>1kg</option>
        </select>
        <select
          className="p-2 border rounded"
          value={filters.status}
          onChange={(e) => setFilters({...filters, status: e.target.value})}
        >
         <option value="">All Statuses</option>
  <option>In Draft</option>
  <option>Content Ready</option>
  <option>Submitted</option>
  <option>Live</option>
  <option>Flagged</option>
        </select>
      </div>

      {/* View Toggle */}
      {view === "kanban" ? (
        <AmazonListingKanban
          listings={filteredListings}
          onEdit={setSelectedListing}
          onViewDetails={setDetailListing}
          onDelete={handleDelete}
        />
      ) : (
        <AmazonListingList
          listings={filteredListings}
          onEdit={setSelectedListing}
          onViewDetails={setDetailListing}
          onDelete={handleDelete}
        />
      )}

      {/* Form Modal */}
      {selectedListing && (
        <AmazonListingForm
          listing={selectedListing}
          onClose={() => setSelectedListing(null)}
          onSave={handleAddOrUpdate}
        />
      )}

      {/* Detail View Modal */}
      {detailListing && (
        <AmazonListingDetail
          listing={detailListing}
          onClose={() => setDetailListing(null)}
          onEdit={(listing) => {
            setDetailListing(null);
            setSelectedListing(listing);
          }}
        />
      )}
    </DashboardLayout>
  );
}