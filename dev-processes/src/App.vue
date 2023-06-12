<template>
    <v-app>
        <v-navigation-drawer v-model="drawer">
            <v-list>
                <v-list-item
                    v-for="item in items"
                    :key="item.index"
                    :to="item.route"
                    link
                >
                    <v-list-item-title> {{ item.title }} </v-list-item-title>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar>
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

            <v-toolbar-title>Страница</v-toolbar-title>
            <v-btn @click="login">Войти</v-btn>
        </v-app-bar>
        <v-main>
            <router-view />
        </v-main>
    </v-app>
</template>

<script>
export default {
    data() {
        return {
            drawer: null,
            items: [
                {
                    title: "Аккаунты",
                    route: "/accounts",
                },
                {
                    title: "Личный кабинет",
                    route: "/lk",
                },
                {
                    title: "Дневник практики",
                    route: "/diary",
                },
                {
                    title: "Вакансии",
                    route: "/vacancies",
                },
                {
                    title: "Компании",
                    route: "/companies",
                },
            ],
        };
    },
    methods: {
        async login() {
            this.$router.push({
                path: `/login`,
            });
        },
    },
};
</script>
