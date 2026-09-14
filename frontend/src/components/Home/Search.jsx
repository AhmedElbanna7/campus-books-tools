import './search.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Search({ results, setLoading }) {
    const [name, setName] = useState('');
    const [itemType, setItemType] = useState('');
    const [category, setCategory] = useState('');
    const [operation, setOperation] = useState('');

    useEffect(() => {
        setLoading(true);

        const timer = setTimeout(async () => {
            const params = {};
            if (name.trim()) params.name = name.trim();
            if (itemType) params.itemType = itemType;
            if (category) params.category = category;
            if (operation) params.operation = operation;
            
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/search`, { params });
                results(res.data);
            } catch (error) {
                console.error('Search failed:', error);
                results([]);
            } finally {
                setLoading(false);
            }
        }, 400);

        return () => clearTimeout(timer);
    }, [name, itemType, category, operation]);

    return (
        <>
            <input
                type="text"
                id="search"
                placeholder="Search for a book or tool..."
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <div className="filters">
                <select value={itemType} onChange={(e) => setItemType(e.target.value)}>
                    <option value="">All Types</option>
                    <option value="Book">Books</option>
                    <option value="Tool">Tools</option>
                    <option value="Device">Devices</option>
                </select>

                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="">All Categories</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Commerce">Commerce</option>
                    <option value="Science">Science</option>
                    <option value="Medicine">Medicine</option>
                    <option value="Arts">Arts</option>
                </select>

                <select value={operation} onChange={(e) => setOperation(e.target.value)}>
                    <option value="">All Operations</option>
                    <option value="Sale">Sale</option>
                    <option value="Borrow">Borrow</option>
                    <option value="Both">Both</option>
                </select>
            </div>
        </>
    )
}
export default Search;