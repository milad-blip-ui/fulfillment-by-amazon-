import { useState, useEffect } from "react";

export default function InProcessForm({ item, onSave, onClose }) {
  const [form, setForm] = useState({
    ...item,
    boxDetails: item.boxDetails || [{
      boxLabelName: '',
      boxLength: '',
      boxWidth: '',
      boxHeight: '',
      weightPerBox: '',
      unitsPerBox: '',
      barcode: '',
      labelPlacementNotes: ''
    }],
    ideaId: item.ideaId || '',
    productName: item.productName || '',
    shortDescription: item.shortDescription || '',
    targetMarket: item.targetMarket || [],
    productCategory: item.productCategory || '',
    initialConceptDate: item.initialConceptDate || '',
    creator: item.creator || 'current_user',
    sketch: item.sketch || null,
    designVersions: item.designVersions || [],
    materialsNeeded: item.materialsNeeded || [],
    packagingConcept: item.packagingConcept || '',
    estimatedCOGS: item.estimatedCOGS || '',
    competitiveBenchmarking: item.competitiveBenchmarking || '',
    notes: item.notes || '',
    status: item.status || '',
    priority: item.priority || ''
  });

  useEffect(() => {
    setForm({
      ...item,
      boxDetails: item.boxDetails || [{
        boxLabelName: '',
        boxLength: '',
        boxWidth: '',
        boxHeight: '',
        weightPerBox: '',
        unitsPerBox: '',
        barcode: '',
        labelPlacementNotes: ''
      }],
      ideaId: item.ideaId || '',
      productName: item.productName || '',
      shortDescription: item.shortDescription || '',
      targetMarket: item.targetMarket || [],
      productCategory: item.productCategory || '',
      initialConceptDate: item.initialConceptDate || '',
      creator: item.creator || 'current_user',
      sketch: item.sketch || null,
      designVersions: item.designVersions || [],
      materialsNeeded: item.materialsNeeded || [],
      packagingConcept: item.packagingConcept || '',
      estimatedCOGS: item.estimatedCOGS || '',
      competitiveBenchmarking: item.competitiveBenchmarking || '',
      notes: item.notes || '',
      status: item.status || '',
      priority: item.priority || ''
    });
  }, [item]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleBoxDetailChange = (index, e) => {
    const { name, value } = e.target;
    const updatedBoxDetails = [...form.boxDetails];
    updatedBoxDetails[index][name] = value;
    
    if (name === 'unitsPerBox' || name === 'unitsToProduce') {
      if (form.unitsToProduce && updatedBoxDetails[index].unitsPerBox) {
        updatedBoxDetails[index].totalBoxes = Math.ceil(
          form.unitsToProduce / updatedBoxDetails[index].unitsPerBox
        );
      }
    }
    
    setForm(prev => ({ ...prev, boxDetails: updatedBoxDetails }));
  };

  const handleArrayChange = (name, value) => {
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (name, file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm(prev => ({ ...prev, [name]: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const addBoxDetail = () => {
    setForm(prev => ({
      ...prev,
      boxDetails: [
        ...prev.boxDetails,
        {
          boxLabelName: '',
          boxLength: '',
          boxWidth: '',
          boxHeight: '',
          weightPerBox: '',
          unitsPerBox: '',
          barcode: '',
          labelPlacementNotes: ''
        }
      ]
    }));
  };

  const removeBoxDetail = (index) => {
    const updatedBoxDetails = form.boxDetails.filter((_, i) => i !== index);
    setForm(prev => ({ ...prev, boxDetails: updatedBoxDetails }));
  };

  const addDesignVersion = () => {
    setForm(prev => ({
      ...prev,
      designVersions: [
        ...prev.designVersions,
        { versionName: '', description: '', fileUpload: null, date: '' }
      ]
    }));
  };

  const removeDesignVersion = (index) => {
    const updatedVersions = form.designVersions.filter((_, i) => i !== index);
    setForm(prev => ({ ...prev, designVersions: updatedVersions }));
  };

  const handleDesignVersionChange = (index, e) => {
    const { name, value } = e.target;
    const updatedVersions = [...form.designVersions];
    updatedVersions[index][name] = value;
    setForm(prev => ({ ...prev, designVersions: updatedVersions }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-full max-w-2xl max-h-screen overflow-y-auto my-8">
        <h2 className="text-xl font-bold mb-4">{form.productionId ? "Edit" : "Add"} FBA Production Tracker</h2>

        {/* Original Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Final Product Name</label>
            <input
              name="finalProductName"
              value={form.finalProductName || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Linked Idea</label>
            <input
              name="linkedIdea"
              value={form.linkedIdea || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="FBA Product Idea ID"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Design Finalization Date</label>
            <input
              type="date"
              name="designFinalizationDate"
              value={form.designFinalizationDate || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Units to Produce</label>
            <input
              type="number"
              name="unitsToProduce"
              value={form.unitsToProduce || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Material Batch Number</label>
            <input
              name="materialBatchNumber"
              value={form.materialBatchNumber || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Production Start Date</label>
            <input
              type="date"
              name="productionStartDate"
              value={form.productionStartDate || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Production Complete Date</label>
            <input
              type="date"
              name="productionCompleteDate"
              value={form.productionCompleteDate || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">QA Status</label>
            <select
              name="qaStatus"
              value={form.qaStatus || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Select QA Status</option>
              <option>Passed</option>
              <option>Rework Needed</option>
              <option>Failed</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Label Required</label>
            <select
              name="labelRequired"
              value={form.labelRequired || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Label Type</option>
              <option>FNSKU</option>
              <option>UPC</option>
              <option>Custom</option>
              <option>None</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Prep Instructions Completed</label>
            <select
              name="prepInstructionsCompleted"
              value={form.prepInstructionsCompleted || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Select</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Stage</label>
            <select
              name="stage"
              value={form.stage || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select Stage</option>
              <option>In Design</option>
              <option>In Production</option>
              <option>QA</option>
              <option>Packing</option>
              <option>Ready for FBA Shipment</option>
            </select>
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Final Artwork Upload</label>
            <input
              type="file"
              name="finalArtwork"
              onChange={(e) => handleFileChange('finalArtwork', e.target.files[0])}
              className="w-full p-2 border rounded"
            />
            {form.finalArtwork && (
              <div className="mt-2">
                <img src={form.finalArtwork} alt="Artwork preview" className="max-w-xs max-h-32" />
              </div>
            )}
          </div>
        </div>

        {/* Box/Packaging Details Section */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Box/Packaging Details</h3>
            <button
              type="button"
              onClick={addBoxDetail}
              className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
            >
              Add Box
            </button>
          </div>
          
          {form.boxDetails.map((box, index) => (
            <div key={index} className="border p-4 rounded mb-3 relative">
              <button
                type="button"
                onClick={() => removeBoxDetail(index)}
                className="absolute top-2 right-2 text-red-500"
              >
                ×
              </button>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Box Label Name</label>
                  <input
                    name="boxLabelName"
                    value={box.boxLabelName}
                    onChange={(e) => handleBoxDetailChange(index, e)}
                    className="w-full p-2 border rounded"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Barcode</label>
                  <input
                    name="barcode"
                    value={box.barcode}
                    onChange={(e) => handleBoxDetailChange(index, e)}
                    className="w-full p-2 border rounded"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Box Length (inches)</label>
                  <input
                    type="number"
                    step="0.01"
                    name="boxLength"
                    value={box.boxLength}
                    onChange={(e) => handleBoxDetailChange(index, e)}
                    className="w-full p-2 border rounded"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Box Width (inches)</label>
                  <input
                    type="number"
                    step="0.01"
                    name="boxWidth"
                    value={box.boxWidth}
                    onChange={(e) => handleBoxDetailChange(index, e)}
                    className="w-full p-2 border rounded"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Box Height (inches)</label>
                  <input
                    type="number"
                    step="0.01"
                    name="boxHeight"
                    value={box.boxHeight}
                    onChange={(e) => handleBoxDetailChange(index, e)}
                    className="w-full p-2 border rounded"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Weight per Box (lbs)</label>
                  <input
                    type="number"
                    step="0.01"
                    name="weightPerBox"
                    value={box.weightPerBox}
                    onChange={(e) => handleBoxDetailChange(index, e)}
                    className="w-full p-2 border rounded"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Units per Box</label>
                  <input
                    type="number"
                    name="unitsPerBox"
                    value={box.unitsPerBox}
                    onChange={(e) => handleBoxDetailChange(index, e)}
                    className="w-full p-2 border rounded"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Total Boxes</label>
                  <input
                    type="number"
                    name="totalBoxes"
                    value={box.totalBoxes || ''}
                    readOnly
                    className="w-full p-2 border rounded bg-gray-100"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Label Placement Notes</label>
                  <textarea
                    name="labelPlacementNotes"
                    value={box.labelPlacementNotes}
                    onChange={(e) => handleBoxDetailChange(index, e)}
                    className="w-full p-2 border rounded"
                    rows="2"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Product Ideas Details Section */}
        <div className="mb-4">
          <h3 className="font-medium mb-4">Product Ideas Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
              <input
                name="productName"
                value={form.productName}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Short Description *</label>
              <textarea
                name="shortDescription"
                value={form.shortDescription}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                rows="3"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Target Market</label>
              <select
                multiple
                name="targetMarket"
                value={form.targetMarket}
                onChange={(e) => handleArrayChange('targetMarket', 
                  Array.from(e.target.selectedOptions, option => option.value))}
                className="w-full p-2 border rounded"
              >
                <option value="Kids">Kids</option>
                <option value="Adults">Adults</option>
                <option value="Seniors">Seniors</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Category</label>
              <select
                name="productCategory"
                value={form.productCategory}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="">Select Category</option>
                <option>Electronics</option>
                <option>Home Goods</option>
                <option>Apparel</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Initial Concept Date</label>
              <input
                type="date"
                name="initialConceptDate"
                value={form.initialConceptDate}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Materials Needed</label>
              <select
                multiple
                name="materialsNeeded"
                value={form.materialsNeeded}
                onChange={(e) => handleArrayChange('materialsNeeded', 
                  Array.from(e.target.selectedOptions, option => option.value))}
                className="w-full p-2 border rounded"
              >
                <option value="Plastic">Plastic</option>
                <option value="Metal">Metal</option>
                <option value="Wood">Wood</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Estimated COGS</label>
              <input
                type="text"
                name="estimatedCOGS"
                value={form.estimatedCOGS}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
              <select
                name="priority"
                value={form.priority}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="">Select Priority</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Sketch</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange('sketch', e.target.files[0])}
                className="w-full p-2 border rounded"
              />
              {form.sketch && (
                <img src={form.sketch} alt="Sketch preview" className="mt-2 max-w-xs max-h-32" />
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Competitive Benchmarking</label>
              <input
                name="competitiveBenchmarking"
                value={form.competitiveBenchmarking}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                rows="3"
              />
            </div>

            <div className="md:col-span-2">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">Design Versions</h3>
                <button
                  type="button"
                  onClick={addDesignVersion}
                  className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
                >
                  Add Version
                </button>
              </div>

              {form.designVersions.map((version, index) => (
                <div key={index} className="border p-4 rounded mb-3 relative">
                  <button
                    type="button"
                    onClick={() => removeDesignVersion(index)}
                    className="absolute top-2 right-2 text-red-500"
                  >
                    ×
                  </button>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Version Name</label>
                      <input
                        name="versionName"
                        value={version.versionName}
                        onChange={(e) => handleDesignVersionChange(index, e)}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                      <input
                        type="date"
                        name="date"
                        value={version.date}
                        onChange={(e) => handleDesignVersionChange(index, e)}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <textarea
                        name="description"
                        value={version.description}
                        onChange={(e) => handleDesignVersionChange(index, e)}
                        className="w-full p-2 border rounded"
                        rows="2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">File Upload</label>
                      <input
                        type="file"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              const updatedVersions = [...form.designVersions];
                              updatedVersions[index].fileUpload = reader.result;
                              setForm(prev => ({ ...prev, designVersions: updatedVersions }));
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
            Cancel
          </button>
          <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}