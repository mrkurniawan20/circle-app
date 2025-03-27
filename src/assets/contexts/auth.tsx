import { User } from '@/types/user';
import React, { createContext, useState } from 'react';
// import { User } from '../types/user';

interface AuthContextType {
  user: User;
  //buat merubah variable user
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
  // ^biar object kosong dikasih tau property nya apa aja
);
//React.ReactNode = component, tipe data nya
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>({} as User);

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};
