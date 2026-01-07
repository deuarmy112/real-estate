import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function ContactAgent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [agent, setAgent] = useState<any | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (!id) return;
    api.getAgentById(Number(id)).then((a) => setAgent(a));
  }, [id]);

  if (!agent) return <p className="container">Agent not found.</p>;

  const submit = async (e: any) => {
    e.preventDefault();
    setSending(true);
    await api.sendMessage(agent.id, { name, email, message });
    setSending(false);
    alert("Message sent — the agent will contact you.");
    navigate(-1);
  };

  return (
    <section className="container">
      <h2>Contact {agent.name}</h2>
      <p className="muted">Email: {agent.email} • Phone: {agent.phone}</p>
      <form onSubmit={submit} className="form">
        <label>
          Your name
          <input value={name} onChange={(e: any) => setName(e.target.value)} required />
        </label>
        <label>
          Your email
          <input type="email" value={email} onChange={(e: any) => setEmail(e.target.value)} required />
        </label>
        <label>
          Message
          <textarea value={message} onChange={(e: any) => setMessage(e.target.value)} required />
        </label>
        <div className="form-actions">
          <button className="btn" type="submit" disabled={sending}>{sending ? 'Sending…' : 'Send Message'}</button>
        </div>
      </form>
    </section>
  );
}
