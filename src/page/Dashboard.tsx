import React, { useState } from "react";
import Sidebar from "../components/Dashboard/Sidebar";
import Books from "../components/Dashboard/ProductsTable";
import Profile from "../components/Dashboard/UserProfile";
import MusicList from "../components/Dashboard/MusicList";

const Dashboard: React.FC = () => {
  const [selectedSection, setSelectedSection] = useState("books");

  const renderSection = () => {
    switch (selectedSection) {
      case "books":
        return <Books />;
      case "users":
        return <MusicList />;
      case "profile":
        return <Profile />;
    }
  };

  return (
    <div className="flex h-screen w-screen justify-between">
      <Sidebar onSelect={setSelectedSection} />
      <main className="flex-1 p-6">{renderSection()}</main>
    </div>
  );
};

export default Dashboard;
