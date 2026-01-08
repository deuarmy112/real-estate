import axios from "axios";

type Listing = {
  id: number;
  title: string;
  description?: string;
  price: number;
  address?: string;
  images?: string[];
  agentId?: number;
  video?: string;
};

type Agent = { id: number; name: string; email?: string; phone?: string };

const API_BASE = "https://real-estate-backend-aqg2.onrender.com";

export default {
  getListings: async (): Promise<Listing[]> => {
    const res = await axios.get(`${API_BASE}/api/listings`);
    return res.data;
  },
  getListingById: async (id: number): Promise<Listing | null> => {
    try {
      const res = await axios.get(`${API_BASE}/api/listings/${id}`);
      return res.data;
    } catch (e) {
      return null;
    }
  },
  createListing: async (payload: Partial<Listing>): Promise<Listing> => {
    const res = await axios.post(`${API_BASE}/api/listings`, payload);
    return res.data;
  },
  updateListing: async (id: number, payload: Partial<Listing>): Promise<Listing | null> => {
    try {
      const res = await axios.put(`${API_BASE}/api/listings/${id}`, payload);
      return res.data;
    } catch (e) {
      return null;
    }
  },
  getAgentById: async (id: number): Promise<Agent | null> => {
    try {
      const res = await axios.get(`${API_BASE}/api/users/${id}`);
      return res.data;
    } catch (e) {
      return null;
    }
  },
  sendMessage: async (agentId: number, payload: { name?: string; email?: string; message?: string }) => {
    try {
      // try a message endpoint if backend implements one
      const res = await axios.post(`${API_BASE}/api/agents/${agentId}/message`, payload);
      return res.data;
    } catch (e) {
      console.log("message to agent (mock)", agentId, payload);
      return { ok: true };
    }
  },
};
