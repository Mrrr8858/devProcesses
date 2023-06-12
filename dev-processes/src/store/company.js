// Utilities
import Company from "@/model/Company";
import { defineStore } from "pinia";
import api from "./api";

export const useCompanyStore = defineStore("company", {
    state: () => ({
        listCompanies: [],
        company: null,
    }),
    getters: {
        getId(state) {
            return state.id;
        },
    },
    actions: {
        setListCompanies(data) {
            this.listCompanies = data?.map((row) => new Company(row));
        },
        setItem(data) {
            let index = this.listCompanies.findIndex((d) => d.id === data.id);
            if (index !== -1) {
                this.listCompanies.splice(index, 1, new Company(data));
            } else {
                this.listCompanies.add(new Company(data));
            }
        },
        setCompany(data) {
            this.company = new Company(data);
        },
        async getListCompanies() {
            this.setListCompanies(await api.companies.getCompanies());
        },
        async createCompany(payload) {
            this.setItem(await api.companies.createCompany(payload));
        },
        async getCompany() {
            this.setCompany(await api.companies.getCompanyById());
        },
        async editCompany(payload) {
            this.setItem(await api.companies.editCompany(payload));
        },
    },
});
