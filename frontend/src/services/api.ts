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

let _listings: Listing[] = [
  {
    id: 1,
    title: "Cozy 2BR Cottage",
    description: "A charming cottage near the river.",
    price: 175000,
    address: "12 Oak Street",
    images: ["https://source.unsplash.com/800x600/?cottage,house","https://source.unsplash.com/800x600/?cottage,river"],
    agentId: 1,
  },
  {
    id: 2,
    title: "Modern Apartment",
    description: "Bright 1BR in the city center.",
    price: 210000,
    address: "88 Market Ave",
    images: ["https://source.unsplash.com/800x600/?apartment,interior","https://source.unsplash.com/800x600/?apartment,city"],
    agentId: 2,
  },
  {
    id: 6,
    title: "Cliffside Villa, Santorini",
    description: "Stunning sea views and white-washed architecture.",
    price: 950000,
    address: "Oia, Santorini, Greece",
    images: ["https://source.unsplash.com/800x600/?santorini,villa","https://source.unsplash.com/800x600/?santorini,sea"],
    video: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    agentId: 1,
  },
  {
    id: 7,
    title: "Rice Terrace Retreat, Bali",
    description: "Traditional villa overlooking rice terraces.",
    price: 420000,
    address: "Ubud, Bali, Indonesia",
    images: ["https://source.unsplash.com/800x600/?bali,villa","https://source.unsplash.com/800x600/?ubud,terrace"],
    video: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    agentId: 2,
  },
  {
    id: 8,
    title: "Vineyard Estate, Napa Valley",
    description: "Private estate surrounded by vineyards.",
    price: 1250000,
    address: "Napa Valley, CA, USA",
    images: ["https://source.unsplash.com/800x600/?napa,vineyard"],
    agentId: 1,
  },
  {
    id: 9,
    title: "Coastal Plot, Cape Town",
    description: "Build-ready land parcel with ocean views.",
    price: 675000,
    address: "Chapman's Peak, Cape Town, South Africa",
    images: ["https://source.unsplash.com/800x600/?cape%20town,coast"],
    video: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    agentId: 2,
  },
  {
    id: 10,
    title: "Zen Garden Home, Kyoto",
    description: "Historic property near temples and gardens.",
    price: 780000,
    address: "Kyoto, Japan",
    images: ["https://source.unsplash.com/800x600/?kyoto,temple"],
    agentId: 1,
  },
  {
    id: 3,
    title: "Spacious Family Home",
    description: "4 bedrooms, large backyard, friendly neighborhood.",
    price: 420000,
    address: "240 Maple Drive",
    images: ["/placeholder.png"],
    agentId: 1,
  },
  {
    id: 4,
    title: "Downtown Loft",
    description: "Open-plan loft with great city views.",
    price: 330000,
    address: "5 Central Plaza",
    images: ["/placeholder.png"],
    agentId: 2,
  },
  {
    id: 5,
    title: "Suburban Starter",
    description: "Affordable 2BR close to schools.",
    price: 150000,
    address: "77 Pine Lane",
    images: ["/placeholder.png"],
    agentId: 1,
  },
];

type Agent = { id: number; name: string; email?: string; phone?: string };

let _agents: Agent[] = [
  { id: 1, name: "Alice Agent", email: "alice@example.com", phone: "555-0101" },
  { id: 2, name: "Bob Broker", email: "bob@example.com", phone: "555-0202" },
];

const API_BASE = (import.meta.env && import.meta.env.VITE_API_URL) || "http://localhost:4000";

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
      // fallback to local mock agents if backend doesn't expose users
      return _agents.find((a) => a.id === id) ?? null;
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
