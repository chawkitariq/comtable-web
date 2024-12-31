import { CompanyType } from "@/types";
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

type SessionStoreStateType = {
  company: Partial<CompanyType>;
};

type SessionStoreActionsType = {
  setCompany: (company: SessionStoreStateType["company"]) => void;
  clear: () => void;
};

const initialState: SessionStoreStateType = {
  company: {},
};

export const useSessionStore = create<
  SessionStoreStateType & SessionStoreActionsType
>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,
        setCompany: (company) => {
          set((state) => ({ ...state, company }));
        },
        clear: () => set(() => initialState),
      }),
      {
        name: "comtable-session",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
