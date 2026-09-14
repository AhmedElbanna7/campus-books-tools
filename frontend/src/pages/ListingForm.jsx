import { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import Header from "../components/Header/Header";
import "../components/Create&EditListing/listingform.css";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

async function fetchListingById(id) {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/listings/${id}`);
  return res.data;
}

async function createListing(formData) {
  const res = await axios.post(`${import.meta.env.VITE_API_URL}/listings`, formData);
  return res.data;
}

async function updateListing(id, formData) {
  const res = await axios.put(`${import.meta.env.VITE_API_URL}/updatelistings/${id}`, formData);
  return res.data;
}

const MAX_IMAGES = 5;
const MAX_FILE_SIZE_MB = 5;

const emptyForm = {
  title: "",
  itemType: "",
  category: "",
  condition: "",
  price: "",
  operation: "",
  isFree: false,
  status: "",
  phone: "",
  description: "",
};

export default function ListingForm() {
  const { id: editId } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(emptyForm);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "success", visible: false });
  const { isAdmin } = useAuth();

  const fileInputRef = useRef(null);
  const toastTimerRef = useRef(null);

  const showToast = useCallback((message, type = "success") => {
    setToast({ message, type, visible: true });
    clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(
      () => setToast((t) => ({ ...t, visible: false })),
      2800
    );
  }, []);

  useEffect(() => {
    if (!editId) return;

    setLoading(true);

    fetchListingById(editId)
      .then((data) => {
        setForm({
          title: data.title || "",
          itemType: data.itemType || "",
          category: data.category || "",
          condition: data.condition || "",
          operation: data.operation || "",
          status: data.status || "",
          price: data.isFree ? 0 : data.price ?? "",
          isFree: !!data.isFree,
          phone: data.phone || "",
          description: data.description || "",
        });
        setImages(
          (data.images || []).map((url, idx) => ({
            id: `existing-${idx}`,
            preview: url,
            file: null,
            isExisting: true,
            originalUrl: url,
          }))
        );
      })
      .catch(() => {
        showToast("Couldn't load this listing. Is the API running?", "error");
      })
      .finally(() => setLoading(false));
  }, [editId, showToast]);

  useEffect(() => {
    return () => {
      images.forEach((img) => {
        if (!img.isExisting && img.preview) URL.revokeObjectURL(img.preview);
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function handleFreeToggle(e) {
    const checked = e.target.checked;
    setForm((f) => ({ ...f, isFree: checked, price: checked ? 0 : "" }));
  }

  function handleFiles(fileList) {
    const files = Array.from(fileList);

    setImages((prev) => {
      let next = [...prev];
      for (const file of files) {
        if (!file.type.startsWith("image/")) {
          showToast(`"${file.name}" is not an image file.`, "error");
          continue;
        }
        if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
          showToast(`"${file.name}" is larger than ${MAX_FILE_SIZE_MB}MB.`, "error");
          continue;
        }
        if (next.length >= MAX_IMAGES) {
          showToast(`You can upload up to ${MAX_IMAGES} images.`, "error");
          break;
        }
        next.push({
          id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
          preview: URL.createObjectURL(file),
          file,
          isExisting: false,
          originalUrl: null,
        });
      }
      return next;
    });
  }

  function removeImage(id) {
    setImages((prev) => {
      const target = prev.find((i) => i.id === id);
      if (target && !target.isExisting) URL.revokeObjectURL(target.preview);
      return prev.filter((i) => i.id !== id);
    });
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (images.length === 0) {
      showToast("Add at least one image before submitting.", "error");
      return;
    }

    setSaving(true);

    try {
      const payload = new FormData();
      payload.append("title", form.title.trim());
      payload.append("description", form.description.trim());
      payload.append("itemType", form.itemType);
      payload.append("category", form.category);
      payload.append("condition", form.condition);
      payload.append("operation", form.operation);
      const priceNum = Number(form.price) || 0;
      payload.append("isFree", String(form.isFree || priceNum === 0));
      payload.append("price", String(priceNum));
      payload.append("phone", form.phone.trim());
      payload.append("status", form.status || "Available");

      const keptExisting = images
        .filter((i) => i.isExisting)
        .map((i) => i.originalUrl);
      payload.append("existingImages", JSON.stringify(keptExisting));

      images
        .filter((i) => !i.isExisting && i.file)
        .forEach((i) => payload.append("images", i.file));

      if (editId) {
        await updateListing(editId, payload);
        showToast("Listing updated successfully!");
      } else {
        await createListing(payload);
        showToast("Listing created successfully!");
        setForm(emptyForm);
        setImages([]);
      }
    } catch (err) {
      const serverMessage = err.response?.data?.message;
      showToast(serverMessage || "Something went wrong. Is the API running?", "error");
    } finally {
      setSaving(false);
    }
  }

  const isEdit = !!editId;

  return (
    <>
    <Header isAdmin={isAdmin}/>
    <div className="lf-root">
      <div className="lf-container">
        <div className="lf-heading-row">
          <div>
            <h1 className="lf-title">{isEdit ? "Edit Item" : "Add Item"}</h1>
            <p className="lf-subtitle">
              {isEdit ? "Update the details of your item." : "Fill in the details below to list your item."}
            </p>
          </div>
        </div>

        <div className="lf-card">
          <h3 className="lf-card-title">Item Information</h3>

          <form onSubmit={handleSubmit}>
            <div className="lf-row">
              <div className="lf-group">
                <label className="lf-label" htmlFor="title">Title</label>
                <input
                  className="lf-input" id="title" name="title" placeholder="Item title"
                  value={form.title} onChange={handleChange} required disabled={loading}
                />
              </div>
              <div className="lf-group">
                <label className="lf-label" htmlFor="itemType">Item Type</label>
                <select
                  className="lf-select" id="itemType" name="itemType"
                  value={form.itemType} onChange={handleChange} required disabled={loading}
                >
                  <option value="" disabled>Select Type</option>
                  <option value="Book">Book</option>
                  <option value="Tool">Tool</option>
                  <option value="Device">Device</option>
                </select>
              </div>
            </div>

            <div className="lf-row">
              <div className="lf-group">
                <label className="lf-label" htmlFor="category">Faculty / Category</label>
                <select
                  className="lf-select" id="category" name="category"
                  value={form.category} onChange={handleChange} required disabled={loading}
                >
                  <option value="" disabled>Select Category</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Commerce">Commerce</option>
                  <option value="Science">Science</option>
                  <option value="Medicine">Medicine</option>
                  <option value="Arts">Arts</option>
                </select>
              </div>
              <div className="lf-group">
                <label className="lf-label" htmlFor="condition">Condition</label>
                <select
                  className="lf-select" id="condition" name="condition"
                  value={form.condition} onChange={handleChange} required disabled={loading}
                >
                  <option value="" disabled>Select Condition</option>
                  <option value="New">New</option>
                  <option value="Like-New">Like New</option>
                  <option value="Used">Used</option>
                  <option value="Worn">Worn</option>
                </select>
              </div>
            </div>

            <div className="lf-row">
              <div className="lf-group">
                <label className="lf-label" htmlFor="price">Price (EGP)</label>
                <input
                  className="lf-input" type="number" id="price" name="price" min="0"
                  placeholder="Enter price (0 for free)" value={form.price}
                  onChange={handleChange} required disabled={loading || form.isFree}
                />
                <label className="lf-checkbox-label">
                  <input type="checkbox" checked={form.isFree} onChange={handleFreeToggle} />
                  This item is free
                </label>
              </div>
              <div className="lf-group">
                <label className="lf-label" htmlFor="operation">Operation</label>
                <select
                  className="lf-select" id="operation" name="operation"
                  value={form.operation} onChange={handleChange} required disabled={loading}
                >
                  <option value="" disabled>Select Operation</option>
                  <option value="Sale">Sale</option>
                  <option value="Borrow">Borrow</option>
                  <option value="Both">Both</option>
                </select>
              </div>
              <div className="lf-group">
                <label className="lf-label" htmlFor="status">Status</label>
                <select
                  className="lf-select" id="status" name="status"
                  value={form.status} onChange={handleChange} required disabled={loading}
                >
                  <option value="" disabled>Select Status</option>
                  <option value="Available">Available</option>
                  <option value="Borrowed">Borrowed</option>
                  <option value="Sold">Sold</option>
                </select>
              </div>
            </div>

            <div className="lf-row">
              <div className="lf-group full">
                <label className="lf-label" htmlFor="description">Description</label>
                <textarea
                  className="lf-textarea" id="description" name="description" rows={3}
                  placeholder="Write item summary or details here..." value={form.description}
                  onChange={handleChange} disabled={loading}
                />
              </div>
            </div>

            <div className="lf-row">
              <div className="lf-group full">
                <label className="lf-label">Item Images</label>
                <div
                  className={`lf-dropzone${dragOver ? " drag-over" : ""}`}
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                >
                  <input
                    ref={fileInputRef} type="file" accept="image/*" multiple hidden
                    onChange={(e) => { handleFiles(e.target.files); e.target.value = ""; }}
                  />
                  <span className="lf-dropzone-icon">🖼️</span>
                  <p>Drag &amp; drop images here, or <span className="lf-browse-link">browse</span></p>
                  <p className="lf-dropzone-hint">PNG or JPG, up to {MAX_FILE_SIZE_MB}MB each — max {MAX_IMAGES} images</p>
                </div>

                {images.length > 0 && (
                  <div className="lf-preview-grid">
                    {images.map((img) => (
                      <div className="lf-preview-item" key={img.id}>
                        <img src={img.preview} alt="" />
                        <button
                          type="button" className="lf-preview-remove"
                          onClick={() => removeImage(img.id)} aria-label="Remove image"
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="lf-actions">
              <button type="submit" className="lf-submit-btn" disabled={saving || loading}>
                {saving ? "Saving..." : isEdit ? "Save Changes" : "Submit"}
              </button>
              <a className="lf-cancel-link" onClick={() => navigate(-1)}>Cancel</a>
            </div>
          </form>
        </div>
      </div>

      <div className={`lf-toast${toast.visible ? " show" : ""}${toast.type === "error" ? " error" : ""}`}>
        {toast.message}
      </div>
    </div>
    </>
  );
}
