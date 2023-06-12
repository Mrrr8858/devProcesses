// Utilities
import Vacancy from "@/model/Vacancy";
import { defineStore } from "pinia";
import api from "./api";

export const useVacancyStore = defineStore("vacancy", {
    state: () => ({
        listVacancies: [],
        vacancy: null,
    }),
    getters: {
        getId(state) {
            return state.id;
        },
    },
    actions: {
        setListVacancies(data) {
            this.listVacancies = data.map((row) => new Vacancy(row));
        },
        setVacancy(data) {
            this.vacancy = new Vacancy(data);
        },
        async getListVacancies() {
            this.setListVacancies(await api.vacancy.getVacancies());
        },
        async createVacancy(payload) {
            console.log(await api.vacancy.createVacancy(payload));
        },
        async getVacancy(payload) {
            this.setVacancy(await api.vacancy.getVacancy(payload));
        },
    },
});
