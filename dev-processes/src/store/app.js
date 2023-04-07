// Utilities
import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
    state: () => ({
        id: 10,
    }),
    getters: {
        getId(state) {
            return state.id;
        },
    },
    actions: {
        setId(id) {
            this.id = id;
        },
    },
});
