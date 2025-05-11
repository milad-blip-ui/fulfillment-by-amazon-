import { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Product Ideas state with sample data
  const [productIdeas, setProductIdeas] = useState([
    { 
      id: 1,
      ideaId: 'IDEA-001',
      title: "Wooden Phone Stand",
      productName: "Wooden Phone Stand",
      material: "Wood",
      priority: "High",
      status: "Concept",
      shortDescription: "Eco-friendly wooden stand for phones and tablets",
      targetMarket: ["General", "Professionals"],
      productCategory: "Home",
      initialConceptDate: "2023-05-15",
      creator: "John Doe",
      sketch: null,
      designVersions: [],
      materialsNeeded: ["Wood", "Glue"],
      packagingConcept: "Box",
      estimatedCOGS: "12.99",
      competitiveBenchmarking: "Competitors price at $19.99",
      notes: "Need to research sustainable wood sources",
      lastUpdated: "2023-05-20"
    }
  ]);

  // In Process state with sample data
  const [inProcessItems, setInProcessItems] = useState([
    {
      id: 1,
      productionId: "PROD-001",
      finalProductName: "Wooden Phone Stand",
      linkedIdea: 1,
      unitsToProduce: 100,
      materialBatchNumber: "BATCH-WOOD-001",
      designFinalizationDate: "2023-05-20",
      productionStartDate: "",
      productionCompleteDate: "",
      qaStatus: "",
      labelRequired: "FNSKU",
      prepInstructionsCompleted: false,
      stage: "In Design",
      boxDetails: [{
        boxLabelName: "Phone Stand Box",
        boxLength: 10,
        boxWidth: 8,
        boxHeight: 4,
        weightPerBox: 1.5,
        unitsPerBox: 1,
        totalBoxes: 100,
        barcode: "123456789012",
        labelPlacementNotes: "Place on top right corner"
      }]
    }
  ]);

  // Handle approving an idea for design (move to In Process)
  const handleApproveForDesign = (idea) => {
    const newInProcessItem = {
      id: Date.now(),
      productionId: `PROD-${Math.floor(1000 + Math.random() * 9000)}`,
      finalProductName: idea.productName || idea.title,
      linkedIdea: idea.id,
      material: idea.material,
      priority: idea.priority,
      stage: "In Design",
      designFinalizationDate: new Date().toISOString().split('T')[0],
      unitsToProduce: 0,
      materialBatchNumber: "",
      productionStartDate: "",
      productionCompleteDate: "",
      qaStatus: "",
      labelRequired: "",
      prepInstructionsCompleted: false,
      boxDetails: [{
        boxLabelName: "",
        boxLength: "",
        boxWidth: "",
        boxHeight: "",
        weightPerBox: "",
        unitsPerBox: "",
        barcode: "",
        labelPlacementNotes: ""
      }]
    };

    setInProcessItems(prev => [...prev, newInProcessItem]);
  };

  return (
    <AppContext.Provider value={{
      productIdeas,
      setProductIdeas,
      inProcessItems,
      setInProcessItems,
      handleApproveForDesign
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}