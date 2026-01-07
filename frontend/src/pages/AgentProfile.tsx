import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";

export default function AgentProfile() {
  const { id } = useParams();
  const [agent, setAgent] = useState<any | null>(null);

  useEffect(() => {
    if (!id) return;
    api.getAgentById(Number(id)).then((a) => setAgent(a));
  }, [id]);

  if (!agent) return <p className="container">Agent not found.</p>;

  return (
    <section className="container">
      <h2>{agent.name}</h2>
      <p>Email: {agent.email}</p>
      <p>Phone: {agent.phone}</p>
      <Link to="/listings">View agent listings</Link>
    </section>
  );
}
