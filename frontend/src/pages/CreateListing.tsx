import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function CreateListing() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState(null as FileList | null);
  const [previews, setPreviews] = useState([] as string[]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // require auth
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, [navigate]);

  useEffect(() => {
    if (!files || files.length === 0) {
      setPreviews([]);
      return;
    }
    const urls: string[] = [];
    for (let i = 0; i < files.length; i++) {
      urls.push(URL.createObjectURL(files[i]));
    }
    setPreviews(urls);
    return () => {
      urls.forEach((u) => URL.revokeObjectURL(u));
    };
  }, [files]);

  const submit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    const imageUrls: string[] = [];
    try {
      if (files && files.length > 0) {
        for (let i = 0; i < files.length; i++) {
          try {
            const url = await api.uploadFile(files[i]);
            imageUrls.push(url);
          } catch (err) {
            console.error("upload failed", err);
          }
        }
      }

      const created = await api.createListing({
        title,
        price,
        address,
        description,
        images: imageUrls,
      });

      if (!created || !created.id) {
        console.error("Create failed", created);
        alert("Failed to create listing. Check console for details.");
        return;
      }

      navigate(`/listings/${created.id}`);
    } catch (err) {
      console.error("create listing error", err);
      alert("An error occurred while creating the listing.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="container">
      <h2>Create Listing</h2>
      <form onSubmit={submit} className="form">
        <label>
          Title
          <input value={title} onChange={(e: any) => setTitle(e.target.value)} required />
        </label>
        <label>
          Price
          <input type="number" value={price} onChange={(e: any) => setPrice(Number(e.target.value))} required />
        </label>
        <label>
          Address
          <input value={address} onChange={(e: any) => setAddress(e.target.value)} />
        </label>
        <label>
          Description
          <textarea value={description} onChange={(e: any) => setDescription(e.target.value)} />
        </label>
        <label>
          Images
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e: any) => setFiles(e.target.files)}
          />
        </label>
        {previews.length > 0 && (
          <div className="image-previews">
            {previews.map((src: string, idx: number) => (
              <img key={idx} src={src} alt={`preview-${idx}`} style={{ width: 120, height: 80, objectFit: "cover", marginRight: 8 }} />
            ))}
          </div>
        )}
        <div className="form-actions">
          <button className="btn" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create"}
          </button>
        </div>
      </form>
    </section>
  );
}
