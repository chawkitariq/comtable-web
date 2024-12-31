import { isExpired } from "@/lib/utils";
import { AuthenticationTokenType, UserType } from "@/types";
import { create } from "zustand";
import {
  createJSONStorage,
  devtools,
  persist,
  subscribeWithSelector,
} from "zustand/middleware";
import { useSessionStore } from "./session";

type AuthenticationStoreStateType = Omit<AuthenticationTokenType, "me"> & {
  me: Partial<UserType>;
};

type AuthenticationLoginActionPayloadType = AuthenticationStoreStateType;

type AuthenticationStoreActionsType = {
  isAuthenticated: () => boolean;
  login: (payload: AuthenticationLoginActionPayloadType) => void;
  logout: () => void;
};

const initialState: AuthenticationStoreStateType = {
  tokenType: "",
  accessToken: "",
  expiresIn: 0,
  expiredAt: 0,
  me: {},
};

export const useAuthenticationStore = create<
  AuthenticationStoreStateType & AuthenticationStoreActionsType
>()(
  devtools(
    subscribeWithSelector(
      persist(
        (set, get) => ({
          ...initialState,
          isAuthenticated: () => !isExpired(get().expiredAt),
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
  )
);

useAuthenticationStore.subscribe(
  (state) => state.accessToken,
  (accessToken) => {
    if (!accessToken) {
      useSessionStore.getState().clear();
    }
  }
);
