<template>
    <v-container>
        <v-card>
            <v-card-title> Компании </v-card-title>
            <v-card-text>
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
                        v-for="item in companies"
                        :key="item.title"
                        class="mb-2 pb-1"
                    >
                        <v-card-title
                            class="text-h5 d-flex justify-space-between"
                        >
                            <div>{{ item.name }}</div>
                            <v-btn variant="text" @click="edit(item)">
                                Редактировать</v-btn
                            >
                        </v-card-title>
                    </v-card>
                </v-list>
            </v-card-text>
        </v-card>

        <v-dialog v-model="dialog" persistent width="700">
            <v-card>
                <v-card-title class="mt-2">
                    <span class="text-h5"> Добавить компанию </span>
                </v-card-title>
                <v-card-text>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field
                                label="Название"
                                v-model="name"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field
                                label="Полное название"
                                v-model="fullName"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-textarea
                                label="Информация о компании"
                                v-model="description"
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
import { useCompanyStore } from "../store/company";
const company = useCompanyStore();
export default {
    data() {
        return {
            dialog: false,
            editDialog: false,
            fullName: null,
            name: null,
            description: null,
        };
    },
    methods: {
        async save() {
            //сохранение данных
            const payload = {
                name: this.name,
                fullName: this.fullName,
                info: this.description,
            };
            console.log(payload);
            await company.createCompany(payload);
            await company.getListCompanies();
            this.dialog = false;
            this.clear();
        },
        edit(item) {
            this.editDialog = true;
            this.name = item.name;
            this.fullName = item.fullName;
            this.description = item.description;
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
        closeEdit() {
            this.editDialog = false;
            this.clear();
        },
        saveChanges() {
            const payload = {
                name: this.name,
                surname: this.surname,
                patronymic: this.patronymic,
                login: this.login,
                password: this.password,
                role: this.role,
                numberPlace: this.numberPlace,
            };
            console.log(payload);
            //сохранение изменений
            this.clear();
        },
    },
    computed: {
        companies() {
            return company.listCompanies;
        },
    },
    mounted() {
        company.getListCompanies();
    },
};
</script>
