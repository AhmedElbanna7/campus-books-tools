import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header/Header";
import ItemCard from "../components/Listing&Favorites/ItemCard";
import Skeleton from "../components/Listing&Favorites/Skeleton";
import ToastRegion from "../components/Listing&Favorites/ToastRegion";
import useToast from "../components/Listing&Favorites/useToast";
import "../components/Listing&Favorites/MyListingsFavorites.css";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function MyFavorites() {
    const [loading, setLoading] = useState(true);
    const [favorites, setFavorites] = useState([]);
    const [category, setCategory] = useState("");
    const { toasts, showToast } = useToast();
    const { user } = useAuth();
    const navigate = useNavigate();

    //search
    useEffect(() => {
        if (!user) return;

        setLoading(true);
        const timer = setTimeout(async () => {
            const params = {};
            if (category) params.category = category;
                console.log('Fetching favorites with params:', params);
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/favorites`, { params });
                setFavorites(res.data);
            } catch (error) {
                console.error('Search failed:', error);
                setFavorites([]);
            } finally {
                setLoading(false);
            }
        }, 400);

        return () => clearTimeout(timer);
    }, [category]);

    //Remove
    const RemoveFavorite = async (item) => {
        setFavorites((list) => list.filter((i) => i._id !== item._id));
        showToast("Removed from favorites", "success");
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/deletefavorites/${item._id}`);
        } catch (error) {
            console.error('Delete failed:', error);
            showToast("Failed to remove from favorites", { error });
        }
    };

    return (
        <>
            <Header />
            <div className="page">

                <header className="page-header">
                    <h1>My Favorites</h1>
                    <p>Everything you've saved for later, in one place.</p>
                </header>

                <div className="toolbar">
                    <div className="toolbar-filters">
                        <select
                            className="chip"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="">All categories</option>
                            <option value="Engineering">Engineering</option>
                            <option value="Commerce">Commerce</option>
                            <option value="Science">Science</option>
                            <option value="Medicine">Medicine</option>
                            <option value="Arts">Arts</option>
                        </select>
                    </div>
                </div>

                {loading ? (
                    <div className="listings-grid">
                        <Skeleton count={8} />
                    </div>
                ) : favorites.length === 0 ? (
                    <div className="empty-state">
                        <h2>Nothing saved yet</h2>
                        <p>Tap the ♡ icon on any listing to save it here for later.</p>
                        <button
                            className="btn btn-outline"
                            onClick={() => {
                                navigate("/");
                            }}
                        >
                            Browse available listings
                        </button>
                    </div>
                ) : (
                    <div className="listings-grid">
                        {favorites.map((item) => (
                            <ItemCard
                                key={item._id}
                                item={item}
                                showEditDelete={false}
                                favorited
                                onToggleFavorite={RemoveFavorite}
                                onEdit={() => { }}
                                onDelete={() => { }}
                            />
                        ))}
                    </div>
                )}

                <ToastRegion toasts={toasts} />
            </div>
        </>
    );
}

export default MyFavorites;
