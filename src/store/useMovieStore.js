import { create } from "zustand";
import { persist } from "zustand/middleware";
import toast from "react-hot-toast";

export const useMovieStore = create(
  persist(
    (set, get) => ({
      wishlist: [],
      user: null,

      toggleWishlist: (movie) => {
        const currentUser = get().user;

        if (!currentUser) {
          toast.error("Please login to manage your wishlist! ❤️", {
            style: { background: "#333", color: "#fff", borderRadius: "10px" },
          });
          return false;
        }

        const currentWishlist = get().wishlist;
        const isExist = currentWishlist.find((m) => m.id === movie.id);

        if (isExist) {
          set({ wishlist: currentWishlist.filter((m) => m.id !== movie.id) });
          toast.success("Removed from wishlist");
        } else {
          set({ wishlist: [...currentWishlist, movie] });
          toast.success("Added to wishlist!");
        }
        return true;
      },

      setUser: (userData) => set({ user: userData }),

      logout: () => {
        set({ user: null, wishlist: [] });
        localStorage.removeItem("user-storage");
        toast.success("Logged out successfully");
      },
    }),
    {
      name: "user-storage",
    },
  ),
);
