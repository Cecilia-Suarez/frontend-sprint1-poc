import { useState } from "react";
import Sidebar from "./Sidebar";
import UserProfile from "./UserProfile";
import ProductsTable from "./ProductsTable";
import MusicList from "./MusicList";

const Dashboard = () => {
  const [selectedSection, setSelectedSection] = useState("books");

  const renderContent = () => {
    switch (selectedSection) {
      case "books":
        return <ProductsTable />;
      case "profile":
        return <UserProfile />;
      case "user":
        return <MusicList />;
    }
  };

  return (
    <div className="flex">
      <Sidebar onSelect={setSelectedSection} />
      <div className="flex-1 p-6">{renderContent()}</div>
    </div>
  );
};

export default Dashboard;
