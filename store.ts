import { create } from "zustand";
import { UserData } from "./types";

interface IUserList {
  data: UserData[];
  cities: string[];
  updateData: (date: UserData[]) => void;
  updateCities: (data: string[]) => void;
}

export const useBookStore = create<IUserList>((set, get) => ({
  data: [],
  cities: [],
  updateData: (data: UserData[]) => set({ data: data }),
  updateCities: (data: string[]) => set({ cities: data }),
}));
