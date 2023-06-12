// Utilities
import { defineStore } from "pinia";
import api from "./api";
import User from "@/model/User";

export const useUserStore = defineStore("user", {
    state: () => ({
        id: 10,
        userInfo: null,
        userList: [],
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
        setUserInfo(data) {
            this.userInfo = new User(data);
        },
        setUser(data) {
            //
            let index = this.userList.findIndex((d) => d.id === data.id);
            if (index !== -1) {
                this.userList.splice(index, 1, new User(data));
            } else {
                this.userList.add(new User(data));
            }
        },
        setUserList(data) {
            this.userList = data.map((row) => new User(row));
        },
        async getUserInfo(id) {
            this.setUserInfo(await api.user.getUser(id));
        },
        async getUsers(id) {
            this.setUserList(await api.user.getUsers(id));
        },
        async editUser(payload) {
            this.setUser(await api.user.editUser(payload.id, payload.data));
        },
        async createUser(payload) {
            this.setUser(await api.user.createUser(payload));
        },
        async login(payload) {
            console.log(payload);
            await api.user.auth(payload);
        },
    },
});
