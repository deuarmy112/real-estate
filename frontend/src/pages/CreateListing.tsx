import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function CreateListing() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const submit = async (e: any) => {
    e.preventDefault();
    const created = await api.createListing({ title, price, address, description, images: [] });
    navigate(`/listings/${created.id}`);
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
        <div className="form-actions">
          <button className="btn" type="submit">Create</button>
        </div>
      </form>
    </section>
  );
}
