// AppContext.js
import { createContext, useState, useContext } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [productIdeas, setProductIdeas] = useState([
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

  const [inProcessItems, setInProcessItems] = useState([
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
          labelPlacementNotes: "Place on top right corner"
        }
      ]
    }
  ]);

  const approveForDesign = (idea) => {
    // Create new in-process item
    const newItem = {
      id: Date.now(),
      productionId: `PROD-${Math.floor(1000 + Math.random() * 9000)}`,
      finalProductName: idea.productName || idea.title,
      linkedIdea: idea.id,
      material: idea.material,
      priority: idea.priority,
      stage: "In Design",
      designFinalizationDate: new Date().toISOString().split('T')[0],
      estimatedCOGS: idea.estimatedCOGS,
      packagingConcept: idea.packagingConcept,
      shortDescription: idea.shortDescription,
      productCategory: idea.productCategory,
      targetMarket: idea.targetMarket,
      initialConceptDate: idea.initialConceptDate,
      creator: idea.creator,
      competitiveBenchmarking: idea.competitiveBenchmarking,
      notes: idea.notes,
      boxDetails: []
    };

    // Add to in-process and remove from product ideas
    setInProcessItems([...inProcessItems, newItem]);
    setProductIdeas(productIdeas.filter(item => item.id !== idea.id));
  };

  return (
    <AppContext.Provider value={{
      productIdeas,
      setProductIdeas,
      inProcessItems,
      setInProcessItems,
      approveForDesign
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}