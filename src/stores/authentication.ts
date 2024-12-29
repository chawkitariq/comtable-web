import { isExpired } from "@/lib/utils";
import { AuthenticationTokenType } from "@/types";
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

type AuthenticationStoreStateType = AuthenticationTokenType;

type AuthenticationLoginActionPayloadType = AuthenticationStoreStateType;

type AuthenticationStoreActionsType = {
  isAuthenticated: () => boolean;
  login: (payload: AuthenticationLoginActionPayloadType) => void;
  logout: () => void;
};

const initialState: AuthenticationStoreStateType = {
  tokenType: "",
  accessToken: "",
  tokenExpiredAt: 0,
};

export const useAuthenticationStore = create<
  AuthenticationStoreStateType & AuthenticationStoreActionsType
>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,
        isAuthenticated: () => isExpired(get().tokenExpiredAt),
        login: (payload: AuthenticationLoginActionPayloadType) => {
          set(() => payload);
        },
        logout: () => set(() => initialState),
      }),
      {
        name: "comtable-authentication",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
