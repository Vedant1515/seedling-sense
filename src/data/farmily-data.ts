export interface Plant {
  id: string;
  name: string;
  variety: string;
  moisture: number;
  sunlight_hours: number;
  temperature_c: number;
  status: string;
  last_watered: string;
}

export interface Reminder {
  id: string;
  type: string;
  plantId: string;
  due: string;
  priority: string;
}

export interface Tutorial {
  id: string;
  title: string;
  length: string;
  level: string;
}

export interface CommunityPost {
  id: string;
  author: string;
  text: string;
  likes: number;
  comments: number;
}

export interface StoreItem {
  sku: string;
  name: string;
  price: number;
}

export interface CartItem extends StoreItem {
  quantity: number;
}

export const initialData = {
  plants: [
    {
      id: "p1",
      name: "Basil",
      variety: "Genovese",
      moisture: 42,
      sunlight_hours: 6.1,
      temperature_c: 24,
      status: "Needs Water",
      last_watered: "2025-09-06T07:20:00Z"
    },
    {
      id: "p2",
      name: "Cherry Tomato",
      variety: "Sweet 100",
      moisture: 58,
      sunlight_hours: 7.4,
      temperature_c: 25,
      status: "Healthy",
      last_watered: "2025-09-07T06:45:00Z"
    },
    {
      id: "p3",
      name: "Mint",
      variety: "Spearmint",
      moisture: 37,
      sunlight_hours: 5.8,
      temperature_c: 23,
      status: "Low Moisture",
      last_watered: "2025-09-05T18:00:00Z"
    }
  ],
  reminders: [
    { id: "r1", type: "Water", plantId: "p1", due: "Today", priority: "High" },
    { id: "r2", type: "Fertilize", plantId: "p2", due: "Tomorrow", priority: "Medium" },
    { id: "r3", type: "Harvest", plantId: "p2", due: "In 3 days", priority: "Low" },
    { id: "r4", type: "Water", plantId: "p3", due: "Today", priority: "High" }
  ],
  tutorials: [
    { id: "t1", title: "Basil Care 101", length: "3 min", level: "Beginner" },
    { id: "t2", title: "Wicking Bed Setup", length: "4 min", level: "Beginner" },
    { id: "t3", title: "Watering Schedules", length: "2 min", level: "Beginner" },
    { id: "t4", title: "Compost Basics", length: "5 min", level: "Intermediate" },
    { id: "t5", title: "Pest Prevention", length: "6 min", level: "Intermediate" }
  ],
  community: [
    { id: "c1", author: "Asha", text: "First cherry tomatoes today!", likes: 12, comments: 3 },
    { id: "c2", author: "Liam", text: "Wicking bed saved me during hot week", likes: 19, comments: 4 },
    { id: "c3", author: "Emily", text: "Tip: eggshells boost basil growth", likes: 9, comments: 1 },
    { id: "c4", author: "Raj", text: "Balcony mint harvest 🍃", likes: 14, comments: 2 }
  ],
  store: [
    { sku: "SEN-001", name: "IoT Sensor Kit", price: 89.0 },
    { sku: "SEED-BAS", name: "Basil Seed Pack", price: 4.0 },
    { sku: "SOIL-10L", name: "Organic Potting Mix 10L", price: 9.0 },
    { sku: "POT-SET3", name: "Eco Pots (Set of 3)", price: 15.0 },
    { sku: "FERT-ORG", name: "Organic Fertilizer 2kg", price: 12.0 }
  ]
};