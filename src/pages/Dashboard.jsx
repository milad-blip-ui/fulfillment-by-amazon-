import { useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import { FaBoxes, FaChartLine, FaTruck, FaLightbulb } from "react-icons/fa";

export default function Dashboard() {
  // Shared state lifted from all modules
  const [inProcessItems, setInProcessItems] = useState([
    { id: 1, title: "Prototype Design", material: "Plastic", priority: "High", status: "Design" },
    { id: 2, title: "Manufacturing", material: "Metal", priority: "Medium", status: "Production" },
    { id: 3, title: "Assembly", material: "Wood", priority: "Low", status: "Assembly" },
  ]);

  const [productIdeas, setProductIdeas] = useState([
    { id: 1, title: "Wooden Stand", material: "Wood", priority: "High", status: "Backlog" },
    { id: 2, title: "Metal Lamp", material: "Metal", priority: "Medium", status: "Shortlisted" },
    { id: 3, title: "Plastic Bottle", material: "Plastic", priority: "Low", status: "Ideas" },
  ]);

  const [amazonListings, setAmazonListings] = useState([
    { id: 1, name: "Product A", size: "Medium", weight: "500g", status: "Listing data not complete" },
    { id: 2, name: "Product B", size: "Large", weight: "1kg", status: "Listing is in process" },
    { id: 3, name: "Product C", size: "Small", weight: "250g", status: "SEO optimization of listing" },
  ]);

  const [amazonStatusItems, setAmazonStatusItems] = useState([
    { id: 1, productName: "Item ABC", quantity: 50, status: "In Stock" },
    { id: 2, productName: "Item XYZ", quantity: 10, status: "Low Stock" },
  ]);

  // Calculate dynamic KPIs
  const totalStock = amazonStatusItems.reduce((sum, item) => sum + item.quantity, 0);
  const liveListingsCount = amazonListings.filter(l => 
    !l.status.includes('not complete') && !l.status.includes('process')
  ).length;
  const newIdeasCount = productIdeas.filter(idea => idea.status === "Backlog").length;

  return (
    <DashboardLayout>
      <div className="text-gray-800">
        <h1 className="text-3xl font-semibold mb-1">Analytics</h1>
        <p className="text-sm text-gray-500 mb-6">
          Check the KPIs across Amazon FBA operations.
        </p>

        {/* Dynamic KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {/* In Production Card */}
          <div className="bg-white border rounded-lg p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">In Production</p>
                <p className="text-2xl font-semibold text-gray-800">{inProcessItems.length}</p>
                <p className="text-green-600 text-xs mt-1">
                  {inProcessItems.length > 0 ? "+10% since last week" : "No items in production"}
                </p>
              </div>
              <div className="bg-gray-800 p-2 rounded-md text-white">
                <FaTruck />
              </div>
            </div>
          </div>

          {/* Stock in Amazon Card */}
          <div className="bg-white border rounded-lg p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Stock in Amazon</p>
                <p className="text-2xl font-semibold text-gray-800">{totalStock}</p>
                <p className={
                  amazonStatusItems.some(item => item.status === "Low Stock") 
                    ? "text-yellow-500 text-xs mt-1" 
                    : "text-green-600 text-xs mt-1"
                }>
                  {amazonStatusItems.some(item => item.status === "Low Stock") 
                    ? "Low inventory detected" 
                    : "No low inventory"}
                </p>
              </div>
              <div className="bg-gray-800 p-2 rounded-md text-white">
                <FaBoxes />
              </div>
            </div>
          </div>

          {/* Live Listings Card */}
          <div className="bg-white border rounded-lg p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Live Listings</p>
                <p className="text-2xl font-semibold text-gray-800">{liveListingsCount}</p>
                <p className="text-green-600 text-xs mt-1">
                  {amazonListings.length > 0 ? "+5 this week" : "No live listings"}
                </p>
              </div>
              <div className="bg-gray-800 p-2 rounded-md text-white">
                <FaChartLine />
              </div>
            </div>
          </div>

          {/* Product Ideas Card */}
          <div className="bg-white border rounded-lg p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Product Ideas</p>
                <p className="text-2xl font-semibold text-gray-800">{productIdeas.length}</p>
                <p className={
                  newIdeasCount > 0 
                    ? "text-yellow-500 text-xs mt-1" 
                    : "text-green-600 text-xs mt-1"
                }>
                  {newIdeasCount} new submissions
                </p>
              </div>
              <div className="bg-gray-800 p-2 rounded-md text-white">
                <FaLightbulb />
              </div>
            </div>
          </div>
        </div>

        {/* Compact Table Reports - 2 per row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Amazon Status Table */}
          <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-700">Amazon Inventory Status</h2>
              <Link to="/amazon-status" className="text-sm text-blue-600 hover:underline">View All</Link>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {amazonStatusItems.slice(0, 3).map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{item.productName}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{item.quantity}</td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${item.status === 'In Stock' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* In Process Table */}
          <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-700">Production Status</h2>
              <Link to="/in-process" className="text-sm text-blue-600 hover:underline">View All</Link>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {inProcessItems.slice(0, 3).map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{item.title}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{item.status}</td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${item.priority === 'High' ? 'bg-red-100 text-red-800' : 
                            item.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-green-100 text-green-800'}`}>
                          {item.priority}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Second Row of Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Amazon Listing Table */}
          <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-700">Listing Status</h2>
              <Link to="/amazon-listing" className="text-sm text-blue-600 hover:underline">View All</Link>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {amazonListings.slice(0, 3).map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${item.status.includes('complete') ? 'bg-red-100 text-red-800' : 
                            item.status.includes('process') ? 'bg-blue-100 text-blue-800' : 
                            'bg-purple-100 text-purple-800'}`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Product Ideas Table */}
          <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-700">Product Ideas</h2>
              <Link to="/product-ideas" className="text-sm text-blue-600 hover:underline">View All</Link>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {productIdeas.slice(0, 3).map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{item.title}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{item.status}</td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${item.priority === 'High' ? 'bg-red-100 text-red-800' : 
                            item.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-green-100 text-green-800'}`}>
                          {item.priority}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}