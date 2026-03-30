import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useMovieStore = create(
  persist(
    (set, get) => ({
      wishlist: [],
      user: null,

      toggleWishlist: (movie) => {
        const isExist = get().wishlist.find((m) => m.id === movie.id);
        if (isExist) {
          set({ wishlist: get().wishlist.filter((m) => m.id !== movie.id) });
        } else {
          set({ wishlist: [...get().wishlist, movie] });
        }
      },

      setUser: (userData) => set({ user: userData }),
      logout: () => {
        set({ user: null });
        localStorage.removeItem("user-storage");
      },
    }),
    {
      name: "user-storage",
    },
  ),
);
