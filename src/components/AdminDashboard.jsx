"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LogOut, Plus, Trash2, Edit3, Film, Image as ImageIcon, 
  MapPin, Calendar, Sparkles, UploadCloud, X, Save, Check, Loader2 
} from "lucide-react";

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("moments"); // moments, portfolio, explore, videos
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" }); // type: success, error
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [alertModal, setAlertModal] = useState({ show: false, title: "", message: "", type: "success" });

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    img: "",
    src: "", // for explore items
    thumbnail: "", // for video items
    span: "md:col-span-1 md:row-span-1",
    category: "",
    videoId: "",
    type: "youtube", // youtube or facebook
  });

  const [imagePreview, setImagePreview] = useState("");
  const [uploadProgress, setUploadProgress] = useState(false);

  // Fetch Items when tab changes
  useEffect(() => {
    fetchItems();
  }, [activeTab]);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/items?type=${activeTab}`, {
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        setItems(data.items || []);
      } else {
        showMsg(data.message || "Failed to load items", "error");
      }
    } catch (err) {
      console.error(err);
      showMsg("Failed to connect to the server", "error");
    } finally {
      setLoading(false);
    }
  };

  const showMsg = (text, type = "success") => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: "", type: "" }), 4000);
  };

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/admin/logout", {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        router.refresh();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Client Side Image Compression Helper
  const compressImage = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const MAX_WIDTH = 1200;
          const MAX_HEIGHT = 1200;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);

          // Quality 0.75 handles high detail without massive base64 lengths
          const compressedBase64 = canvas.toDataURL("image/jpeg", 0.75);
          resolve(compressedBase64);
        };
        img.onerror = (err) => reject(err);
      };
      reader.onerror = (err) => reject(err);
    });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showMsg("Please select an image file", "error");
      return;
    }

    setUploadProgress(true);
    try {
      const compressedBase64 = await compressImage(file);
      setImagePreview(compressedBase64);
      
      // Assign to the correct field depending on the active tab
      if (activeTab === "explore") {
        setFormData(prev => ({ ...prev, src: compressedBase64 }));
      } else if (activeTab === "videos") {
        setFormData(prev => ({ ...prev, thumbnail: compressedBase64 }));
      } else {
        setFormData(prev => ({ ...prev, img: compressedBase64 }));
      }
      showMsg("Image optimized and loaded successfully!", "success");
    } catch (err) {
      console.error(err);
      showMsg("Error optimizing image", "error");
    } finally {
      setUploadProgress(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      date: "",
      location: "",
      img: "",
      src: "",
      thumbnail: "",
      span: "md:col-span-1 md:row-span-1",
      category: "",
      videoId: "",
      type: "youtube",
    });
    setImagePreview("");
    setIsEditing(false);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setActionLoading(true);

    // Validate fields based on tab
    let finalPayload = { itemType: activeTab };
    if (activeTab === "moments") {
      if (!formData.title || !formData.img) {
        showMsg("Title and Image are required", "error");
        setActionLoading(false);
        return;
      }
      finalPayload = { ...finalPayload, ...formData };
    } else if (activeTab === "portfolio") {
      if (!formData.title || !formData.img) {
        showMsg("Title and Image are required", "error");
        setActionLoading(false);
        return;
      }
      finalPayload = { ...finalPayload, ...formData };
    } else if (activeTab === "explore") {
      if (!formData.title || !formData.src) {
        showMsg("Title and Image are required", "error");
        setActionLoading(false);
        return;
      }
      finalPayload = { ...finalPayload, ...formData };
    } else if (activeTab === "videos") {
      if (!formData.title || !formData.videoId || !formData.thumbnail) {
        showMsg("Title, Video ID, and Thumbnail are required", "error");
        setActionLoading(false);
        return;
      }
      finalPayload = { ...finalPayload, ...formData };
    }

    try {
      const endpoint = "/api/admin/items";
      const method = isEditing ? "PUT" : "POST";
      
      const payload = isEditing 
        ? { ...finalPayload, id: editingId } 
        : finalPayload;

      console.log("📤 Sending to API:", method, endpoint, "\nPayload keys:", Object.keys(payload));

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",   // ensure cookies are always sent
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log("📥 API Response:", res.status, data);

      if (data.success) {
        const actionType = isEditing ? "Updated" : "Created";
        setAlertModal({
          show: true,
          title: `Item ${actionType}!`,
          message: `"${formData.title}" has been successfully ${actionType.toLowerCase()} and saved to your MongoDB database.`,
          type: "success"
        });
        resetForm();
        fetchItems();
      } else {
        const errMsg = res.status === 401
          ? "❌ Not authorized — please log out and log back in."
          : (data.message || "Operation failed");
        showMsg(errMsg, "error");
      }
    } catch (err) {
      console.error("Submit error:", err);
      showMsg(`Error: ${err.message}`, "error");
    } finally {
      setActionLoading(false);
    }
  };

  const startEdit = (item) => {
    setIsEditing(true);
    setEditingId(item._id);
    
    setFormData({
      title: item.title || "",
      description: item.description || "",
      date: item.date || "",
      location: item.location || "",
      img: item.img || "",
      src: item.src || "",
      thumbnail: item.thumbnail || "",
      span: item.span || "md:col-span-1 md:row-span-1",
      category: item.category || "",
      videoId: item.videoId || "",
      type: item.type || "youtube",
    });

    const preview = item.img || item.src || item.thumbnail || "";
    setImagePreview(preview);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item? This action is permanent.")) return;

    setActionLoading(true);
    try {
      const res = await fetch(`/api/admin/items?type=${activeTab}&id=${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json();
      if (data.success) {
        setAlertModal({
          show: true,
          title: "Item Deleted!",
          message: "The item has been successfully removed from your MongoDB database.",
          type: "delete"
        });
        fetchItems();
        if (editingId === id) resetForm();
      } else {
        const errMsg = res.status === 401
          ? "❌ Not authorized — please log out and log back in."
          : (data.message || "Failed to delete item");
        showMsg(errMsg, "error");
      }
    } catch (err) {
      console.error("Delete error:", err);
      showMsg(`Error: ${err.message}`, "error");
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="space-y-12">
      {/* Header Panel */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-8 border-b border-white/10 gap-4">
        <div>
          <span className="text-red-500 font-bold uppercase tracking-[0.4em] text-xs">
            Admin Area
          </span>
          <h1 className="text-4xl sm:text-5xl font-[family-name:var(--font-anton)] tracking-tight uppercase text-white mt-1">
            Author Control Panel
          </h1>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-6 py-3 border border-white/10 rounded-full text-white/70 hover:text-white hover:border-red-500/50 hover:bg-red-500/10 transition-all text-xs font-bold uppercase tracking-widest cursor-pointer"
        >
          <LogOut className="w-4 h-4 text-red-500" />
          Logout
        </button>
      </div>

      {/* Message Banner */}
      <AnimatePresence>
        {message.text && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`p-4 rounded-2xl border flex items-center gap-3 text-sm ${
              message.type === "error"
                ? "bg-red-500/10 border-red-500/20 text-red-400"
                : "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
            }`}
          >
            {message.type === "error" ? <X className="w-4 h-4" /> : <Check className="w-4 h-4" />}
            <span className="font-semibold">{message.text}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-white/5 pb-2">
        {[
          { id: "moments", label: "Moments (Gallery)", icon: ImageIcon },
          { id: "portfolio", label: "Portfolio (Carousel)", icon: Sparkles },
          { id: "explore", label: "Explore (Accordion)", icon: MapPin },
          { id: "videos", label: "Videos (Films)", icon: Film },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                resetForm();
              }}
              className={`flex items-center gap-2 px-5 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === tab.id
                  ? "bg-red-600 text-white shadow-lg shadow-red-600/15"
                  : "bg-white/[0.02] border border-white/5 text-white/50 hover:text-white hover:bg-white/[0.05]"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
        {/* Form Column */}
        <div className="lg:col-span-2 glass-premium p-8 space-y-8">
          <div>
            <h2 className="text-xl font-bold text-white uppercase tracking-wider flex items-center gap-2">
              {isEditing ? <Edit3 className="w-5 h-5 text-red-500" /> : <Plus className="w-5 h-5 text-red-500" />}
              {isEditing ? "Edit Item" : "Add New Item"}
            </h2>
            <p className="text-white/40 text-xs mt-1">
              {activeTab === "moments" && "Add image to the moments gallery grid"}
              {activeTab === "portfolio" && "Add detailed image cards for the main slider"}
              {activeTab === "explore" && "Add expanding landscape accordion blocks"}
              {activeTab === "videos" && "Add YouTube or Facebook cinematic reels"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <label className="text-white/50 text-[10px] uppercase font-bold tracking-wider">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                placeholder="e.g. Scenic Tea Gardens"
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-red-500/50 transition-colors"
              />
            </div>

            {/* Description (Moments, Portfolio, Videos) */}
            {activeTab !== "explore" && (
              <div className="space-y-2">
                <label className="text-white/50 text-[10px] uppercase font-bold tracking-wider">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Tell the story behind this shot..."
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-red-500/50 transition-colors"
                />
              </div>
            )}

            {/* Row Layout for location, date, category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Date */}
              {activeTab !== "explore" && (
                <div className="space-y-2">
                  <label className="text-white/50 text-[10px] uppercase font-bold tracking-wider">Date</label>
                  <input
                    type="text"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    placeholder="e.g. July 2024"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-red-500/50 transition-colors"
                  />
                </div>
              )}

              {/* Location (Moments, Explore) */}
              {(activeTab === "moments" || activeTab === "explore") && (
                <div className="space-y-2">
                  <label className="text-white/50 text-[10px] uppercase font-bold tracking-wider">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="e.g. Sylhet, Bangladesh"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-red-500/50 transition-colors"
                  />
                </div>
              )}

              {/* Category (Moments, Portfolio) */}
              {(activeTab === "moments" || activeTab === "portfolio") && (
                <div className="space-y-2">
                  <label className="text-white/50 text-[10px] uppercase font-bold tracking-wider">Category</label>
                  {activeTab === "moments" ? (
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-[#101113] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500/50 transition-colors"
                    >
                      <option value="">Select Category</option>
                      <option value="Outdoor">Outdoor</option>
                      <option value="Nature">Nature</option>
                      <option value="River">River</option>
                      <option value="Sky">Sky</option>
                      <option value="Urban">Urban</option>
                    </select>
                  ) : (
                    <input
                      type="text"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      placeholder="e.g. Nature, Portrait"
                      required
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-red-500/50 transition-colors"
                    />
                  )}
                </div>
              )}
            </div>

            {/* Grid Span (Moments only) */}
            {activeTab === "moments" && (
              <div className="space-y-2">
                <label className="text-white/50 text-[10px] uppercase font-bold tracking-wider">Grid Size (Span)</label>
                <select
                  name="span"
                  value={formData.span}
                  onChange={handleInputChange}
                  className="w-full bg-[#101113] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500/50 transition-colors"
                >
                  <option value="md:col-span-1 md:row-span-1">Standard (1x1)</option>
                  <option value="md:col-span-2 md:row-span-1">Wide (2x1)</option>
                  <option value="md:col-span-1 md:row-span-2">Tall (1x2)</option>
                  <option value="md:col-span-2 md:row-span-2">Large (2x2)</option>
                </select>
              </div>
            )}

            {/* Video Fields (Videos only) */}
            {activeTab === "videos" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-white/50 text-[10px] uppercase font-bold tracking-wider">Platform Type</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full bg-[#101113] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500/50 transition-colors"
                  >
                    <option value="youtube">YouTube</option>
                    <option value="facebook">Facebook Reel</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-white/50 text-[10px] uppercase font-bold tracking-wider">Video ID / Key</label>
                  <input
                    type="text"
                    name="videoId"
                    value={formData.videoId}
                    onChange={handleInputChange}
                    required
                    placeholder={formData.type === "youtube" ? "e.g. XfTWMyT-DfQ" : "e.g. 1527322588352043"}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-red-500/50 transition-colors"
                  />
                  <p className="text-[10px] text-white/30">
                    {formData.type === "youtube" 
                      ? "The ID at the end of the URL (?v=ID)" 
                      : "The reel/video ID number in the Facebook link"}
                  </p>
                </div>
              </div>
            )}

            {/* Image Upload / URL Selector */}
            <div className="space-y-4 pt-4 border-t border-white/5">
              <label className="text-white/50 text-[10px] uppercase font-bold tracking-wider block">
                {activeTab === "videos" ? "Thumbnail Image" : "Image Media"}
              </label>

              {/* Drag/Drop Box */}
              <div className="relative border-2 border-dashed border-white/10 hover:border-red-500/40 rounded-2xl p-6 transition-colors flex flex-col items-center justify-center text-center bg-white/[0.01]">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  disabled={uploadProgress}
                />
                {uploadProgress ? (
                  <div className="space-y-2">
                    <Loader2 className="w-8 h-8 text-red-500 animate-spin mx-auto" />
                    <p className="text-xs text-white/50">Optimizing and converting image...</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <UploadCloud className="w-8 h-8 text-white/30 mx-auto" />
                    <p className="text-xs text-white/80 font-semibold">Select and upload image file</p>
                    <p className="text-[10px] text-white/30">Will automatically compress & encode to Base64</p>
                  </div>
                )}
              </div>

              {/* OR Divider */}
              <div className="flex items-center justify-center gap-3 text-white/20 text-xs font-bold uppercase">
                <span className="w-full h-px bg-white/5" />
                <span>Or</span>
                <span className="w-full h-px bg-white/5" />
              </div>

              {/* Paste URL */}
              <div className="space-y-2">
                <label className="text-white/40 text-[9px] uppercase font-semibold">Direct Image URL</label>
                <input
                  type="url"
                  name={activeTab === "explore" ? "src" : activeTab === "videos" ? "thumbnail" : "img"}
                  value={activeTab === "explore" ? formData.src : activeTab === "videos" ? formData.thumbnail : formData.img}
                  onChange={(e) => {
                    const val = e.target.value;
                    const field = activeTab === "explore" ? "src" : activeTab === "videos" ? "thumbnail" : "img";
                    setFormData(prev => ({ ...prev, [field]: val }));
                    setImagePreview(val);
                  }}
                  placeholder="https://i.ibb.co.com/..."
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-red-500/50 transition-colors"
                />
              </div>

              {/* Image Preview Box */}
              {imagePreview && (
                <div className="relative rounded-2xl overflow-hidden border border-white/10 h-[180px] bg-[#101113]">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview("");
                      const field = activeTab === "explore" ? "src" : activeTab === "videos" ? "thumbnail" : "img";
                      setFormData(prev => ({ ...prev, [field]: "" }));
                    }}
                    className="absolute top-2 right-2 p-1.5 bg-black/60 hover:bg-black text-white rounded-full transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={actionLoading}
                className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-red-950/40 text-white font-bold py-3.5 px-6 rounded-xl uppercase tracking-wider text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-red-600/10 transition-colors"
              >
                {actionLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                {isEditing ? "Save Changes" : "Create Item"}
              </button>

              {isEditing && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold px-5 py-3.5 rounded-xl uppercase tracking-wider text-xs transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* List Column */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-[family-name:var(--font-anton)] uppercase tracking-wide text-white">
              Collections Grid ({items.length})
            </h2>
            <button
              onClick={fetchItems}
              className="text-xs text-red-500 font-bold hover:text-white uppercase tracking-widest transition-colors cursor-pointer"
            >
              Refresh
            </button>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 space-y-4">
              <Loader2 className="w-10 h-10 text-red-500 animate-spin" />
              <p className="text-sm text-white/40">Loading collections from MongoDB...</p>
            </div>
          ) : items.length === 0 ? (
            <div className="border border-white/5 rounded-2xl p-16 text-center bg-white/[0.01]">
              <ImageIcon className="w-12 h-12 text-white/10 mx-auto mb-4" />
              <h3 className="text-white font-semibold mb-1">No items found</h3>
              <p className="text-white/40 text-xs">Add your first item using the control panel on the left.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-h-[75vh] overflow-y-auto pr-2 custom-scrollbar">
              {items.map((item) => {
                const imgSource = item.img || item.src || item.thumbnail || "";
                return (
                  <div
                    key={item._id}
                    className="group border border-white/10 bg-[#101113] hover:border-white/20 rounded-2xl overflow-hidden flex flex-col justify-between transition-all"
                  >
                    {/* Media Body */}
                    <div>
                      {imgSource && (
                        <div className="h-[160px] relative w-full overflow-hidden bg-black/40">
                          <img
                            src={imgSource}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                          />
                          {item.category && (
                            <span className="absolute top-2 left-2 bg-red-600 text-white font-bold text-[9px] px-2.5 py-1 rounded-full uppercase tracking-wider">
                              {item.category}
                            </span>
                          )}
                          {item.span && activeTab === "moments" && (
                            <span className="absolute top-2 right-2 bg-black/70 text-white/70 font-semibold text-[8px] px-2 py-0.5 rounded border border-white/10">
                              {item.span.includes("col-span-2") ? "2x wide" : "1x wide"}
                            </span>
                          )}
                        </div>
                      )}
                      <div className="p-5 space-y-2">
                        <h3 className="text-base font-bold text-white uppercase tracking-wide group-hover:text-red-500 transition-colors line-clamp-1">
                          {item.title}
                        </h3>
                        {item.description && (
                          <p className="text-xs text-white/40 leading-relaxed line-clamp-2">
                            {item.description}
                          </p>
                        )}
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-white/30 font-semibold uppercase tracking-wider pt-2">
                          {item.date && (
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3 text-red-500" />
                              {item.date}
                            </span>
                          )}
                          {item.location && (
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-red-500" />
                              {item.location}
                            </span>
                          )}
                          {activeTab === "videos" && item.videoId && (
                            <span className="flex items-center gap-1 text-red-400">
                              <Film className="w-3 h-3 text-red-500" />
                              {item.type === "youtube" ? "YouTube" : "FB Reel"}: {item.videoId}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Actions Panel */}
                    <div className="px-5 py-4 bg-white/[0.02] border-t border-white/5 flex gap-4">
                      <button
                        onClick={() => startEdit(item)}
                        className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white text-xs font-bold py-2 rounded-xl uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-colors"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-red-500" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="flex-1 bg-red-600/10 hover:bg-red-600 border border-red-500/20 hover:border-red-600 text-red-500 hover:text-white text-xs font-bold py-2 rounded-xl uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Custom Alert Modal Popup */}
      <AnimatePresence>
        {alertModal.show && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setAlertModal(prev => ({ ...prev, show: false }))}
              className="absolute inset-0 bg-black/85 backdrop-blur-sm"
            />
            {/* Content Card */}
            <motion.div
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              className="relative w-full max-w-sm glass-premium p-6 text-center space-y-6 border border-white/10 shadow-2xl z-10"
            >
              <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center bg-white/5 border border-white/10">
                {alertModal.type === "success" ? (
                  <Check className="w-8 h-8 text-emerald-500" />
                ) : (
                  <Trash2 className="w-8 h-8 text-red-500" />
                )}
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white uppercase tracking-wider">
                  {alertModal.title}
                </h3>
                <p className="text-sm text-white/50 leading-relaxed">
                  {alertModal.message}
                </p>
              </div>

              <button
                onClick={() => setAlertModal(prev => ({ ...prev, show: false }))}
                className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer shadow-lg shadow-red-600/20"
              >
                Continue
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
