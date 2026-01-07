import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

export default function EditListing() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (!id) return;
    api.getListingById(Number(id)).then((l: any) => {
      if (!l) return;
      setTitle(l.title || "");
      setPrice(l.price || 0);
      setAddress(l.address || "");
      setDescription(l.description || "");
      setLoading(false);
    });
  }, [id]);

  const submit = async (e: any) => {
    e.preventDefault();
    if (!id) return;
    await api.updateListing(Number(id), { title, price, address, description });
    navigate(`/listings/${id}`);
  };

  if (loading) return <p className="container">Loading…</p>;

  return (
    <section className="container">
      <h2>Edit Listing</h2>
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
        <div className="form-actions">
          <button className="btn" type="submit">Save</button>
        </div>
      </form>
    </section>
  );
}
