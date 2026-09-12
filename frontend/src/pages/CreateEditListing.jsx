import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function CreateEditListing() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    type: "book",
    price: "",
    condition: "good",
    description: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isEdit) {
      axios.get(`${import.meta.env.VITE_API_URL}/updatelistings/${id}`).then((res) => setForm(res.data));
    }
  }, [id, isEdit]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const data = new FormData();
      Object.entries(form).forEach(([key, value]) => data.append(key, value));
      if (imageFile) data.append("image", imageFile);

      if (isEdit) {
        await axios.put(`${import.meta.env.VITE_API_URL}/updatelistings/${id}`, data);
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/listings`, data);
      }
      navigate("/my-listings");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save listing");
    }
  };

  return (
    <div className="listing-form-page">
      <h1>{isEdit ? "Edit Listing" : "Create Listing"}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input name="title" value={form.title} onChange={handleChange} required />
        </div>
        <div>
          <label>Type</label>
          <select name="type" value={form.type} onChange={handleChange}>
            <option value="Book">Book</option>
            <option value="Tool">Tool</option>
          </select>
        </div>
        <div>
          <label>Price (leave 0 for free)</label>
          <input type="number" name="price" value={form.price} onChange={handleChange} />
        </div>
        <div>
          <label>Condition</label>
          <select name="condition" value={form.condition} onChange={handleChange}>
            <option value="New">New</option>
            <option value="Like-New">Like-New</option>
            <option value="Used">Used</option>
            <option value="Worn">Worn</option>
          </select>
        </div>
        <div>
          <label>Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} />
        </div>
        <div>
          <label>Image</label>
          <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">{isEdit ? "Save Changes" : "Create Listing"}</button>
      </form>
    </div>
  );
}

export default CreateEditListing;