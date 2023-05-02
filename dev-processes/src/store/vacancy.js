// Utilities
import { defineStore } from "pinia";

export const useVacancyStore = defineStore("vacancy", {
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
