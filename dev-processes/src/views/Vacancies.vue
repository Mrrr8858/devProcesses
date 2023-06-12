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
                <v-btn
                    @click="create()"
                    class="ma-1 pa-2"
                    prepend-icon="mdi-plus"
                >
                    Добавить
                </v-btn>
                <v-list>
                    <v-card
                        color="#E0E0E0"
                        width="500"
                        v-for="item in vacancies"
                        :key="item.title"
                        class="mb-2 pb-1"
                        @click="openDetails(item.id, item.companyId)"
                    >
                        <v-card-title class="text-h5">
                            {{ item.name }}
                        </v-card-title>

                        <v-card-subtitle>
                            {{ item.companyName }}</v-card-subtitle
                        >
                    </v-card>
                </v-list>
            </v-card-text>
        </v-card>
        <v-dialog v-model="dialog" persistent width="700">
            <v-card>
                <v-card-title class="mt-2">
                    <span class="text-h5"> Добавить вакансию </span>
                </v-card-title>
                <v-card-text>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field
                                label="Должность"
                                v-model="name"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-autocomplete
                                label="Компания"
                                :items="companies"
                                v-model="companyId"
                                item-title="name"
                                item-value="id"
                            ></v-autocomplete>
                        </v-col>
                        <v-col cols="12">
                            <v-textarea
                                label="Описание вакансии"
                                v-model="description"
                            ></v-textarea>
                        </v-col>
                        <v-col cols="12">
                            <v-textarea
                                label="Требования"
                                v-model="requirements"
                            ></v-textarea>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="blue-darken-1"
                        variant="text"
                        @click="closeAdd()"
                    >
                        Закрыть
                    </v-btn>
                    <v-btn color="blue-darken-1" variant="text" @click="save()">
                        Сохранить
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
import { useVacancyStore } from "../store/vacancy";
const vacancy = useVacancyStore();
import { useCompanyStore } from "../store/company";
const company = useCompanyStore();

export default {
    data() {
        return {
            id: 2,
            dialog: false,
            vacanciesSearch: null,
            companySearch: "",
            companyId: null,
            description: null,
            name: null,
            requirements: null,
        };
    },
    methods: {
        async save() {
            //сохранение данных
            const payload = {
                companyId: this.companyId,
                body: {
                    name: this.name,
                    requirements: this.requirements,
                    description: this.description,
                },
            };
            await vacancy.createVacancy(payload);
            await vacancy.getListVacancies();
            this.dialog = false;
            this.clear();
        },
        create() {
            this.dialog = true;
        },
        closeAdd() {
            this.dialog = false;
            this.clear();
        },
        clear() {
            this.name = null;
            this.fullName = null;
            this.description = null;
        },
        openDetails(id, companyId) {
            this.$router.push({
                path: "/vacanciesInfo",
                query: { id: id, companyId: companyId },
            });
        },
    },
    computed: {
        listVacancies() {
            return vacancy.listVacancies;
        },
        vacancies() {
            let vac = vacancy.listVacancies;
            if (this.companySearch != null && this.companySearch != "") {
                vac = vac.filter(
                    (item) =>
                        company.listCompanies
                            .filter((row) =>
                                row.name
                                    .toLowerCase()
                                    .includes(
                                        this.companySearch?.trim().toLowerCase()
                                    )
                            )
                            .findIndex((x) => x.id == item.companyId) !== -1
                );
            }
            if (this.vacanciesSearch != null && this.vacanciesSearch != "") {
                vac = vac.filter((item) =>
                    item.name
                        .toLowerCase()
                        .includes(this.vacanciesSearch?.trim().toLowerCase())
                );
            }
            return vac;
        },
        companies() {
            return company.listCompanies;
        },
    },
    mounted() {
        vacancy.getListVacancies();
        company.getListCompanies();
    },
};
</script>
