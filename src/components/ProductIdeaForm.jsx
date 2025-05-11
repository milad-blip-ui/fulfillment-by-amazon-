import { useState, useEffect } from "react";

import { FaTimes, FaUpload, FaPlus, FaTrash } from "react-icons/fa";



export default function ProductIdeaForm({ idea, onClose, onSave, currentUser }) {

  const [form, setForm] = useState({

    ideaId: '',

    productName: '',

    shortDescription: '',

    targetMarket: [],

    productCategory: '',

    initialConceptDate: new Date().toISOString().split('T')[0],

    creator: currentUser || '',

    sketch: null,

    designVersions: [],

    materialsNeeded: [],

    packagingConcept: '',

    estimatedCOGS: '',

    competitiveBenchmarking: '',

    notes: '',

    status: 'Concept',

    priority: '',

    ...idea

  });



  const [newVersion, setNewVersion] = useState({

    versionNumber: '',

    description: '',

    attachment: null,

    date: new Date().toISOString().split('T')[0]

  });



  // Updated status options

  const statusOptions = ["Concept", "Under Review", "Approved for Design", "Discarded"];

  const priorityOptions = ["High", "Medium", "Low"];

  const marketOptions = ['General', 'Kids', 'Adults', 'Seniors', 'Professionals', 'Students'];

  const categoryOptions = ['Home', 'Kitchen', 'Office', 'Electronics', 'Fashion', 'Outdoor', 'Other'];

  const materialOptions = ['Plastic', 'Metal', 'Wood', 'Fabric', 'Glass', 'Ceramic', 'Composite'];

  const packagingOptions = ['Pouch', 'Box', 'Tube', 'Bottle', 'Bag', 'Other'];



  useEffect(() => {

    if (idea) {

      setForm({

        ...form,

        ...idea,

        designVersions: idea.designVersions || []

      });

    } else {

      setForm(prev => ({

        ...prev,

        ideaId: `FBA-IDEA-${Math.floor(1000 + Math.random() * 9000)}`,

        creator: currentUser || '',

        status: 'Concept'

      }));

    }

  }, [idea, currentUser]);



  const handleChange = (e) => {

    const { name, value, type } = e.target;

    setForm({ 

      ...form, 

      [name]: type === 'number' ? parseFloat(value) : value 

    });

  };



  const handleFileChange = (e) => {

    setForm({ ...form, sketch: e.target.files[0] });

  };



  const handleMultiSelect = (e, field) => {

    const selected = Array.from(e.target.selectedOptions, option => option.value);

    setForm({ ...form, [field]: selected });

  };



  const handleVersionChange = (e) => {

    const { name, value } = e.target;

    setNewVersion({ ...newVersion, [name]: value });

  };



  const handleVersionFileChange = (e) => {

    setNewVersion({ ...newVersion, attachment: e.target.files[0] });

  };



  const addVersion = () => {

    if (newVersion.versionNumber && newVersion.description) {

      setForm({

        ...form,

        designVersions: [

          ...form.designVersions,

          {

            ...newVersion,

            date: new Date().toISOString().split('T')[0]

          }

        ]

      });

      setNewVersion({

        versionNumber: '',

        description: '',

        attachment: null,

        date: new Date().toISOString().split('T')[0]

      });

    }

  };



  const removeVersion = (index) => {

    const updated = [...form.designVersions];

    updated.splice(index, 1);

    setForm({ ...form, designVersions: updated });

  };



  const handleSubmit = (e) => {
    e.preventDefault();
 
    const formData = {
      ...form,
 
      title: form.productName || form.title,
 
      productName: form.productName || form.title,
    };
 
    onSave(formData);
 
    if (formData.status === "Approved for Design") {
      // console.log(formData);
      localStorage.setItem("productIdea", JSON.stringify(formData));
    }
  };



  return (

    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-xl w-full max-w-4xl max-h-screen overflow-y-auto">

        <div className="flex justify-between items-center mb-4">

          <h2 className="text-2xl font-bold text-gray-800">

            {form.ideaId ? `Edit Product Idea (${form.ideaId})` : "Add New Product Idea"}

          </h2>

          <button 

            type="button" 

            onClick={onClose} 

            className="text-gray-500 hover:text-gray-700"

          >

            <FaTimes size={20} />

          </button>

        </div>



        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Left Column */}

          <div className="space-y-4">

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-1">Product Name*</label>

              <input

                name="productName"

                value={form.productName}

                onChange={handleChange}

                className="w-full p-2 border border-gray-300 rounded-md"

                placeholder="Enter product name"

                required

              />

            </div>



            <div>

              <label className="block text-sm font-medium text-gray-700 mb-1">Short Description*</label>

              <textarea

                name="shortDescription"

                value={form.shortDescription}

                onChange={handleChange}

                className="w-full p-2 border border-gray-300 rounded-md"

                rows={3}

                placeholder="Describe the product concept"

                required

              />

            </div>



            <div>

              <label className="block text-sm font-medium text-gray-700 mb-1">Target Market</label>

              <select

                multiple

                value={form.targetMarket}

                onChange={(e) => handleMultiSelect(e, 'targetMarket')}

                className="w-full p-2 border border-gray-300 rounded-md h-auto min-h-[42px]"

              >

                {marketOptions.map(option => (

                  <option key={option} value={option}>{option}</option>

                ))}

              </select>

              <p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple options</p>

            </div>



            <div>

              <label className="block text-sm font-medium text-gray-700 mb-1">Product Category</label>

              <select

                name="productCategory"

                value={form.productCategory}

                onChange={handleChange}

                className="w-full p-2 border border-gray-300 rounded-md"

              >

                <option value="">Select category</option>

                {categoryOptions.map(option => (

                  <option key={option} value={option}>{option}</option>

                ))}

              </select>

            </div>

          </div>



          {/* Right Column */}

          <div className="space-y-4">

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-1">Initial Concept Date</label>

              <input

                type="date"

                name="initialConceptDate"

                value={form.initialConceptDate}

                onChange={handleChange}

                className="w-full p-2 border border-gray-300 rounded-md"

              />

            </div>



            <div>

              <label className="block text-sm font-medium text-gray-700 mb-1">Creator/Owner</label>

              <input

                name="creator"

                value={form.creator}

                onChange={handleChange}

                className="w-full p-2 border border-gray-300 rounded-md"

                placeholder="Enter creator name"

              />

            </div>



            <div>

              <label className="block text-sm font-medium text-gray-700 mb-1">Sketch/Image</label>

              <div className="flex items-center gap-2">

                <label className="flex-1 p-2 border border-gray-300 rounded-md cursor-pointer bg-gray-50 hover:bg-gray-100">

                  <input

                    type="file"

                    onChange={handleFileChange}

                    className="hidden"

                    accept="image/*"

                  />

                  <div className="flex items-center justify-center gap-2">

                    <FaUpload />

                    <span>{form.sketch?.name || 'Upload image'}</span>

                  </div>

                </label>

                {form.sketch && (

                  <button

                    type="button"

                    onClick={() => setForm({ ...form, sketch: null })}

                    className="p-2 text-red-500 hover:text-red-700"

                  >

                    <FaTrash />

                  </button>

                )}

              </div>

            </div>



            <div>

              <label className="block text-sm font-medium text-gray-700 mb-1">Status*</label>

              <select

                name="status"

                value={form.status}

                onChange={handleChange}

                className="w-full p-2 border border-gray-300 rounded-md"

                required

              >

                {statusOptions.map(option => (

                  <option key={option} value={option}>{option}</option>

                ))}

              </select>

            </div>



            <div>

              <label className="block text-sm font-medium text-gray-700 mb-1">Priority*</label>

              <select

                name="priority"

                value={form.priority}

                onChange={handleChange}

                className="w-full p-2 border border-gray-300 rounded-md"

                required

              >

                <option value="">Select priority</option>

                {priorityOptions.map(option => (

                  <option key={option} value={option}>{option}</option>

                ))}

              </select>

            </div>

          </div>

        </div>



        {/* Design Version Tracker */}

        <div className="mt-6 border-t pt-4">

          <h3 className="text-lg font-medium text-gray-800 mb-3">Design Version Tracker</h3>

          

          {form.designVersions.map((version, index) => (

            <div key={index} className="p-3 border border-gray-200 rounded-md bg-gray-50 mb-2">

              <div className="flex justify-between items-center">

                <span className="font-medium">Version {version.versionNumber}</span>

                <button

                  type="button"

                  onClick={() => removeVersion(index)}

                  className="text-red-500 hover:text-red-700"

                >

                  <FaTrash />

                </button>

              </div>

              <p className="text-sm text-gray-600 mt-1">{version.description}</p>

              {version.attachment && (

                <p className="text-xs text-blue-600 mt-1">Attachment: {version.attachment.name}</p>

              )}

              <p className="text-xs text-gray-500 mt-1">{version.date}</p>

            </div>

          ))}



          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mt-3">

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-1">Version #</label>

              <input

                name="versionNumber"

                value={newVersion.versionNumber}

                onChange={handleVersionChange}

                className="w-full p-2 border border-gray-300 rounded-md"

                placeholder="1.0"

              />

            </div>

            <div className="md:col-span-2">

              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>

              <input

                name="description"

                value={newVersion.description}

                onChange={handleVersionChange}

                className="w-full p-2 border border-gray-300 rounded-md"

                placeholder="Changes made in this version"

              />

            </div>

            <div className="flex items-end gap-2">

              <div className="flex-1">

                <label className="block text-sm font-medium text-gray-700 mb-1">Attachment</label>

                <label className="flex p-2 border border-gray-300 rounded-md cursor-pointer bg-gray-50 hover:bg-gray-100">

                  <input

                    type="file"

                    onChange={handleVersionFileChange}

                    className="hidden"

                  />

                  <div className="flex items-center justify-center gap-2 w-full">

                    <FaUpload size={14} />

                    <span className="truncate">{newVersion.attachment?.name || 'Choose file'}</span>

                  </div>

                </label>

              </div>

              <button

                type="button"

                onClick={addVersion}

                className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 h-[42px]"

              >

                <FaPlus />

              </button>

            </div>

          </div>

        </div>



        {/* Materials and Pricing */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

          <div className="space-y-4">

            <h3 className="text-lg font-medium text-gray-800">Materials & Packaging</h3>

            

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-1">Materials Needed</label>

              <select

                multiple

                value={form.materialsNeeded}

                onChange={(e) => handleMultiSelect(e, 'materialsNeeded')}

                className="w-full p-2 border border-gray-300 rounded-md h-auto min-h-[42px]"

              >

                {materialOptions.map(option => (

                  <option key={option} value={option}>{option}</option>

                ))}

              </select>

            </div>



            <div>

              <label className="block text-sm font-medium text-gray-700 mb-1">Packaging Concept</label>

              <select

                name="packagingConcept"

                value={form.packagingConcept}

                onChange={handleChange}

                className="w-full p-2 border border-gray-300 rounded-md"

              >

                <option value="">Select packaging type</option>

                {packagingOptions.map(option => (

                  <option key={option} value={option}>{option}</option>

                ))}

              </select>

            </div>

          </div>



          <div className="space-y-4">

            <h3 className="text-lg font-medium text-gray-800">Cost & Competition</h3>

            

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-1">Estimated COGS ($)</label>

              <input

                type="number"

                name="estimatedCOGS"

                value={form.estimatedCOGS}

                onChange={handleChange}

                className="w-full p-2 border border-gray-300 rounded-md"

                placeholder="0.00"

                step="0.01"

                min="0"

              />

            </div>



            <div>

              <label className="block text-sm font-medium text-gray-700 mb-1">Competitive Benchmarking Notes</label>

              <textarea

                name="competitiveBenchmarking"

                value={form.competitiveBenchmarking}

                onChange={handleChange}

                className="w-full p-2 border border-gray-300 rounded-md"

                rows={3}

                placeholder="Notes about competitors and market positioning"

              />

            </div>



            <div>

              <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>

              <textarea

                name="notes"

                value={form.notes}

                onChange={handleChange}

                className="w-full p-2 border border-gray-300 rounded-md"

                rows={3}

                placeholder="Any additional information"

              />

            </div>

          </div>

        </div>



        {/* Form Actions */}

        <div className="flex justify-end gap-3 mt-8 pt-4 border-t">

          <button

            type="button"

            onClick={onClose}

            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"

          >

            Cancel

          </button>

          <button

            type="submit"

            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"

          >

            {form.ideaId ? 'Update' : 'Save'} Product Idea

          </button>

        </div>

      </form>

    </div>

  );

}