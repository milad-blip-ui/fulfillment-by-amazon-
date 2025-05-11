import Sidebar from "./Sidebar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex overflow-hidden">

      <Sidebar />
      <div className="main-content flex-1">
      <main className="flex-1 bg-gray-50 max-h-screen p-6 overflow-auto">
        {children}
      </main>
    </div>
    </div>
  );
};

export default DashboardLayout;
