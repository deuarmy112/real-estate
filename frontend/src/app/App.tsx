import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../components/Header";
import Home from "../pages/Home";
import ListingList from "../pages/ListingList";
import ListingDetail from "../pages/ListingDetail";
import CreateListing from "../pages/CreateListing";
import EditListing from "../pages/EditListing";
import AgentProfile from "../pages/AgentProfile";
import ContactAgent from "../pages/ContactAgent";
import Login from "../pages/Login";
import Register from "../pages/Register";
import "../styles.css";
import Footer from "../components/Footer";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/listings" element={<ListingList />} />
          <Route path="/listings/:id" element={<ListingDetail />} />
          <Route path="/listings/:id/edit" element={<EditListing />} />
          <Route path="/create" element={<CreateListing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/agents/:id" element={<AgentProfile />} />
          <Route path="/contact/:id" element={<ContactAgent />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
