<template>
    <v-container>
        <v-card>
            <v-card-title> Аккаунты </v-card-title>
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
                        width="700"
                        v-for="item in users"
                        :key="item.name"
                        class="mb-2 pb-1"
                    >
                        <v-card-title
                            class="text-h5 d-flex justify-space-between"
                        >
                            <div>{{ item.fullName() }}</div>
                            <v-card-subtitle class="mt-2">
                                {{ item.roleName() }}
                            </v-card-subtitle>
                        </v-card-title>

                        <v-card-subtitle class="d-flex justify-space-between">
                            <v-col class="ma-1 pa-2 me-auto">
                                <v-btn
                                    variant="text"
                                    size="small"
                                    @click="edit(item)"
                                >
                                    Редактировать</v-btn
                                >
                            </v-col>
                            <v-col
                                class="ma-2 pa-2 d-flex justify-end"
                                v-if="item.roleName() === 'Студент'"
                            >
                                {{ item.groupName }}
                            </v-col>
                            <v-col
                                class="ma-2 pa-2 d-flex justify-end"
                                v-if="
                                    item.roleName() === 'Представитель компании'
                                "
                            >
                                {{ item.companyName }}
                            </v-col>
                            <v-col
                                class="ma-2 pa-2 d-flex justify-end"
                                v-if="
                                    item.roleName() ===
                                    'Представитель университета'
                                "
                            >
                                ТГУ
                            </v-col>
                        </v-card-subtitle>
                    </v-card>
                </v-list>
            </v-card-text>
        </v-card>

        <v-dialog v-model="dialog" persistent width="700">
            <v-card>
                <v-card-title class="mt-2">
                    <span class="text-h5"> Добавить аккаунт </span>
                </v-card-title>
                <v-card-text>
                    <v-container v-if="!groupDialog">
                        <v-row>
                            <v-col cols="12">
                                <v-text-field
                                    label="Email"
                                    v-model="email"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                    label="Пароль"
                                    v-model="password"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                    label="Имя"
                                    v-model="name"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                    label="Фамилия"
                                    v-model="surname"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                    label="Отчество"
                                    v-model="lastName"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-radio-group v-model="role" inline>
                                    <v-radio
                                        label="Студент"
                                        value="student"
                                    ></v-radio>
                                    <v-radio
                                        label="Представитель компании"
                                        value="company"
                                    ></v-radio>
                                    <v-radio
                                        label="Представитель университета"
                                        value="uni"
                                    ></v-radio>
                                </v-radio-group>
                            </v-col>
                        </v-row>
                    </v-container>
                    <v-container v-else>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field
                                    v-if="role == 'student'"
                                    label="Группа"
                                    v-model="group"
                                ></v-text-field>
                                <v-autocomplete
                                    v-if="role == 'company'"
                                    label="Компания"
                                    :items="companies"
                                    v-model="company"
                                ></v-autocomplete>
                            </v-col>
                        </v-row>
                    </v-container>
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
                    <v-btn color="blue-darken-1" variant="text" @click="next()">
                        Далее
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="editDialog" persistent width="600">
            <v-card>
                <v-card-title class="mt-2">
                    <span class="text-h5"> Редактировать аккаунт </span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field
                                    label="Email"
                                    v-model="email"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                    label="Пароль"
                                    v-model="password"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                    label="Имя"
                                    v-model="name"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                    label="Фамилия"
                                    v-model="surname"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                    label="Отчество"
                                    v-model="lastName"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                    v-if="role == 'student'"
                                    label="Группа"
                                    v-model="group"
                                ></v-text-field>
                                <v-autocomplete
                                    v-if="role == 'company'"
                                    label="Компания"
                                    :items="companies"
                                    v-model="company"
                                ></v-autocomplete>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="blue-darken-1"
                        variant="text"
                        @click="closeEdit()"
                    >
                        Закрыть
                    </v-btn>
                    <v-btn
                        color="blue-darken-1"
                        variant="text"
                        @click="saveChanges()"
                    >
                        Сохранить
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
import { useUserStore } from "../store/user";
const user = useUserStore();
import { useCompanyStore } from "../store/company";
const company = useCompanyStore();
export default {
    data() {
        return {
            dialog: false,
            groupDialog: false,
            editDialog: false,
            role: "student",
            lastName: null,
            email: null,
            password: null,
            name: null,
            surname: null,
            group: null,
            company: null,
        };
    },
    methods: {
        next() {
            if (this.groupDialog) {
                //сохранение данных
                const payload = {
                    name: this.name,
                    surname: this.surname,
                    lastName: this.lastName,
                    email: this.email,
                    password: this.password,
                    role: this.role,
                    companyName: this.company,
                    groupName: this.group,
                };
                console.log(payload);
                this.closeAdd();
                this.clear();
            } else {
                this.groupDialog = true;
            }
        },
        edit(item) {
            this.editDialog = true;
            this.email = item.email;
            this.password = item.password;
            this.name = item.name;
            this.surname = item.surname;
            this.lastName = item.lastName;
            this.role = item.role;
            this.place = item.place;
        },
        create() {
            this.dialog = true;
        },
        closeAdd() {
            this.dialog = false;
            this.groupDialog = false;
        },
        clear() {
            this.email = null;
            this.password = null;
            this.name = null;
            this.surname = null;
            this.lastName = null;
            this.role = null;
            this.place = null;
        },
        closeEdit() {
            this.editDialog = false;
            this.clear();
        },
        saveChanges() {
            const payload = {
                name: this.name,
                surname: this.surname,
                lastName: this.lastName,
                email: this.email,
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
        users() {
            return user.userList;
        },
        companies() {
            return company.listCompanies;
        },
    },
    mounted() {
        user.getUsers();
        company.getListCompanies();
    },
};
</script>
