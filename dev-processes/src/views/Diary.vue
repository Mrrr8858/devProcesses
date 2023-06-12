<template>
    <v-container>
        <v-card>
            <v-card-title> Дневник практики </v-card-title>
            <v-card-text>
                <v-list v-if="diaries.length !== 0">
                    <v-card
                        color="#E0E0E0"
                        width="500"
                        v-for="item in diaries"
                        :key="item.title"
                        class="mb-2 pb-1"
                    >
                        <v-card-title
                            class="text-h5 d-flex justify-space-between"
                        >
                            <div>Дневник практики</div>
                            <v-card-subtitle class="ma-2">
                                Статус: {{ item.status }}
                            </v-card-subtitle>
                        </v-card-title>

                        <v-card-subtitle class="d-flex">
                            <v-col class="ma-2 pa-2 me-auto">
                                {{ item.date }}
                            </v-col>
                            <v-col class="ma-1 pa-2">
                                <v-btn
                                    variant="text"
                                    size="small"
                                    @click="edit(item)"
                                >
                                    Редактировать</v-btn
                                >
                                <v-btn
                                    variant="text"
                                    size="small"
                                    @click="openDeleteDialog(item.id)"
                                >
                                    Удалить</v-btn
                                >
                            </v-col>
                        </v-card-subtitle>
                    </v-card>
                </v-list>
                <div v-else class="mb-2 pb-1">
                    У вас еще нет дневников практики
                </div>
                <v-btn @click="create()"> Сформировать дневник практики</v-btn>
            </v-card-text>
        </v-card>

        <v-dialog v-model="dialog" persistent width="1024">
            <v-card>
                <v-card-title class="mt-2">
                    <span class="text-h5">{{ dialogData.title }}</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-autocomplete
                                    v-model="dialogData.company"
                                    :items="[
                                        'Skiing',
                                        'Ice hockey',
                                        'Soccer',
                                        'Basketball',
                                        'Hockey',
                                        'Reading',
                                        'Writing',
                                        'Coding',
                                        'Basejump',
                                    ]"
                                    label="Компания"
                                ></v-autocomplete>
                            </v-col>
                            <v-col cols="12">
                                <v-autocomplete
                                    v-model="dialogData.mentor"
                                    :items="[
                                        'Skiing',
                                        'Ice hockey',
                                        'Soccer',
                                        'Basketball',
                                        'Hockey',
                                        'Reading',
                                        'Writing',
                                        'Coding',
                                        'Basejump',
                                    ]"
                                    label="Куратор"
                                ></v-autocomplete>
                            </v-col>
                            <v-col cols="12">
                                <v-file-input
                                    label="Загрузить характеристику"
                                ></v-file-input>
                            </v-col>
                            <v-col cols="12">
                                <v-file-input
                                    label="Загрузить информацию о работе"
                                ></v-file-input>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="blue-darken-1"
                        variant="text"
                        @click="dialog = false"
                    >
                        Закрыть
                    </v-btn>
                    <v-btn color="blue-darken-1" variant="text" @click="save()">
                        Сохранить
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="deleteDialog" persistent width="600">
            <v-card>
                <v-card-title>
                    Вы уверены, что хотите удалить дневник практики?
                </v-card-title>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        variant="text"
                        color="blue-darken-1"
                        @click="deleteDialog()"
                    >
                        Да
                    </v-btn>
                    <v-btn
                        variant="text"
                        color="blue-darken-1"
                        @click="deleteDialog = false"
                    >
                        Нет
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            diaries: [
                {
                    date: "10.10.10",
                    status: "принят",
                    company: "Skiing",
                    mentor: "Skiing",
                    id: 1,
                },
            ],
            dialog: false,
            deleteDialog: false,
            dialogData: {
                title: "Дневник практики",
                company: null,
                mentor: null,
                id: null,
            },
            deletedDiaryId: null,
        };
    },
    methods: {
        edit(item) {
            this.dialogData.title =
                "Редактирование дневника практики от " + item.date;
            this.dialogData.company = item.company;
            this.dialogData.mentor = item.mentor;
            this.dialog = true;
        },
        create() {
            this.dialogData.title = "Дневник практики";
            this.dialogData.company = null;
            this.dialogData.mentor = null;
            this.dialog = true;
        },
        openDeleteDialog(id) {
            this.deleteDialog = true;
            this.deletedDiaryId = id;
        },
        deleteItem() {
            this.deleteDialog = false;
            //удаление по deletedDiaryId
            //
            this.deletedDiaryId = null;
        },
        save() {
            //сохранение дневника
        },
    },
    computed: {},
};
</script>
