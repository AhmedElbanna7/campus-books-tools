import Header from "../components/Header/Header";
import Search from "../components/Home/search";
import Card from "../components/Home/Card";
import { useState } from "react";
import "../components/Home/home.css";
import { useAuth } from "../context/AuthContext";


function Home() {
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAdmin } = useAuth();
  return (
    <>
      <Header isAdmin={isAdmin} />
      <main className="browse-page">
        <h1>Browse Books & Tools</h1>
        <p>Find what you need from your university classmates</p>

        <Search
          results={(data) => setFilteredItems(data)}
          setLoading={setLoading}
        />
        <div className="cards">
          <Card items={filteredItems} loading={loading} />
        </div>
        
      </main>
    </>
  );
}

export default Home;