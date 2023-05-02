<template>
    <v-container>
        <v-card>
            <v-card-title> Вакансии </v-card-title>
            <v-card-text>
                <v-row>
                    <v-text-field
                        label="Поиск"
                        class="ma-2 pa-2"
                        v-model="vacanciesSearch"
                    ></v-text-field>
                    <v-text-field
                        label="Компании"
                        class="ma-2 pa-2"
                        v-model="companySearch"
                    ></v-text-field>
                </v-row>

                <v-list>
                    <v-card
                        color="#E0E0E0"
                        width="500"
                        v-for="item in vacancies"
                        :key="item.title"
                        class="mb-2 pb-1"
                        @click="openDetails(item.id)"
                    >
                        <v-card-title class="text-h5">
                            {{ item.title }}
                        </v-card-title>

                        <v-card-subtitle> {{ item.company }}</v-card-subtitle>
                    </v-card>
                </v-list>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
import { useVacancyStore } from "../store/vacancy";
const vacancy = useVacancyStore();

export default {
    data() {
        return {
            id: 2,
            dialog: false,
            vacanciesSearch: null,
            companySearch: "",
            items: [
                {
                    title: "Backend developer",
                    company: "QSCdvcd",
                    id: 1,
                },
                {
                    title: "asdasd",
                    company: "AASD",
                    id: 2,
                },
                {
                    title: "DWED VFFF",
                    company: "QSCdvcd",
                    id: 3,
                },
                {
                    title: "DWED",
                    company: "AASD",
                    id: 2,
                },
            ],
            company: null,
        };
    },
    methods: {
        openDetails(id) {
            this.$router.push({
                path: `/vacancies/${id}`,
            });
        },
    },
    computed: {
        vacancies() {
            let vac = this.items;
            if (this.companySearch != null && this.companySearch != "") {
                vac = vac.filter((item) =>
                    item.company
                        .toLowerCase()
                        .includes(this.companySearch?.trim().toLowerCase())
                );
            }
            if (this.vacanciesSearch != null && this.vacanciesSearch != "") {
                vac = vac.filter((item) =>
                    item.title
                        .toLowerCase()
                        .includes(this.vacanciesSearch?.trim().toLowerCase())
                );
            }
            return vac;
        },
    },
};
</script>
