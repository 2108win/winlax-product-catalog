/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from "@/lib/interfaces";
import { toast } from "sonner";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
interface SessionStore {
  isLogin: boolean;
  user: any;
  setSession(data: any): void;
  login: (data: User) => void;
  logout: () => void;
}

const useSessionUser = create<SessionStore>()(
  persist(
    (set) => ({
      isLogin: false,
      user: {} as any,
      setSession(data: any) {
        set({ user: data, isLogin: true });
      },

      login: (data: User) => {
        set({ isLogin: true, user: data });
        toast.success(`Hi <b>${data.fullName}</b>!`, {
          description: "Login successfully! ",
        });
      },
      logout: () => {
        set({ isLogin: false, user: {} as User });
        toast.success("Goodbye! See you soon!");
      },
    }),
    {
      name: "session-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useSessionUser;
