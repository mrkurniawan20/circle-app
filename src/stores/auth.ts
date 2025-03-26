import { User } from '@/types/user';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserStore {
  user: User;
  setUser: (user: User) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: {} as User,
      setUser: (user) => set(() => ({ user: user })),
      clearUser: () => set(() => ({ user: {} as User })),
    }),
    { name: 'auth-store' }
  )
);
