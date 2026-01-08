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

const API_BASE = (import.meta as any).env?.VITE_API_URL || "https://real-estate-backend-aqg2.onrender.com";

function getAuthHeaders() {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export default {
  // auth
  register: async (payload: { email: string; password: string; name?: string }) => {
    const res = await axios.post(`${API_BASE}/api/auth/register`, payload);
    return res.data;
  },
  login: async (payload: { email: string; password: string }) => {
    const res = await axios.post(`${API_BASE}/api/auth/login`, payload);
    return res.data;
  },
  // listings
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
    const headers = getAuthHeaders();
    const res = await axios.post(`${API_BASE}/api/listings/create`, payload, { headers });
    return res.data;
  },
  updateListing: async (id: number, payload: Partial<Listing>): Promise<Listing | null> => {
    try {
      const headers = getAuthHeaders();
      const res = await axios.put(`${API_BASE}/api/listings/${id}`, payload, { headers });
      return res.data;
    } catch (e) {
      return null;
    }
  },
  deleteListing: async (id: number) => {
    const headers = getAuthHeaders();
    const res = await axios.delete(`${API_BASE}/api/listings/${id}`, { headers });
    return res.data;
  },
  // agents
  getAgentById: async (id: number): Promise<Agent | null> => {
    try {
      const res = await axios.get(`${API_BASE}/api/users/${id}`);
      return res.data;
    } catch (e) {
      return null;
    }
  },
  // upload
  uploadFile: async (file: File): Promise<string> => {
    const form = new FormData();
    form.append('file', file);
    const headers = { ...(getAuthHeaders() as any) } as any;
    const res = await axios.post(`${API_BASE}/api/upload`, form as any, { headers });
    return res.data.url;
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
