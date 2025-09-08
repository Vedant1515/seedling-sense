import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Plant, Reminder, Tutorial, CommunityPost, StoreItem, CartItem, initialData } from '../data/farmily-data';

interface FarmilyContextType {
  plants: Plant[];
  reminders: Reminder[];
  tutorials: Tutorial[];
  community: CommunityPost[];
  store: StoreItem[];
  cart: CartItem[];
  cartCount: number;
  updatePlant: (id: string, updates: Partial<Plant>) => void;
  markReminderDone: (id: string) => void;
  snoozeReminder: (id: string) => void;
  addToCart: (item: StoreItem) => void;
  removeFromCart: (sku: string) => void;
  likePost: (id: string) => void;
  addPost: (text: string) => void;
  clearCart: () => void;
}

const FarmilyContext = createContext<FarmilyContextType | undefined>(undefined);

export const useFarmily = () => {
  const context = useContext(FarmilyContext);
  if (!context) {
    throw new Error('useFarmily must be used within a FarmilyProvider');
  }
  return context;
};

export const FarmilyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [plants, setPlants] = useState<Plant[]>(initialData.plants);
  const [reminders, setReminders] = useState<Reminder[]>(initialData.reminders);
  const [tutorials] = useState<Tutorial[]>(initialData.tutorials);
  const [community, setCommunity] = useState<CommunityPost[]>(initialData.community);
  const [store] = useState<StoreItem[]>(initialData.store);
  const [cart, setCart] = useState<CartItem[]>([]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const updatePlant = (id: string, updates: Partial<Plant>) => {
    setPlants(prev => prev.map(plant => 
      plant.id === id ? { ...plant, ...updates } : plant
    ));
  };

  const markReminderDone = (id: string) => {
    setReminders(prev => prev.filter(reminder => reminder.id !== id));
  };

  const snoozeReminder = (id: string) => {
    setReminders(prev => prev.map(reminder => 
      reminder.id === id 
        ? { ...reminder, due: reminder.due === 'Today' ? 'Tomorrow' : 'In 2 days' }
        : reminder
    ));
  };

  const addToCart = (item: StoreItem) => {
    setCart(prev => {
      const existing = prev.find(cartItem => cartItem.sku === item.sku);
      if (existing) {
        return prev.map(cartItem =>
          cartItem.sku === item.sku
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (sku: string) => {
    setCart(prev => prev.filter(item => item.sku !== sku));
  };

  const likePost = (id: string) => {
    setCommunity(prev => prev.map(post =>
      post.id === id ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  const addPost = (text: string) => {
    const newPost: CommunityPost = {
      id: `c${Date.now()}`,
      author: 'You',
      text,
      likes: 0,
      comments: 0
    };
    setCommunity(prev => [newPost, ...prev]);
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <FarmilyContext.Provider value={{
      plants,
      reminders,
      tutorials,
      community,
      store,
      cart,
      cartCount,
      updatePlant,
      markReminderDone,
      snoozeReminder,
      addToCart,
      removeFromCart,
      likePost,
      addPost,
      clearCart,
    }}>
      {children}
    </FarmilyContext.Provider>
  );
};