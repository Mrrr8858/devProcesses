<template>
    <v-container>
        <v-card>
            <v-card-title> Qwer Qwer Qwer </v-card-title>
            <v-card-text>
                Группа 657657, 3 курс
                <v-card-title>Офферы</v-card-title>
                <v-list :items="items"></v-list>
                <v-btn prepend-icon="mdi-plus" @click="dialog = true">
                    Добавить
                </v-btn>
            </v-card-text>
            <v-dialog v-model="dialog" width="500">
                <v-card>
                    <v-card-title>Новый оффер</v-card-title>
                    <v-card-text>
                        <v-autocomplete
                            label="Компания"
                            v-model="company"
                            :items="[
                                'California',
                                'Colorado',
                                'Florida',
                                'Georgia',
                                'Texas',
                                'Wyoming',
                            ]"
                        ></v-autocomplete>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn color="primary" block @click="AddOffer(company)"
                            >Добавить</v-btn
                        >
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-card>
    </v-container>
</template>

<script>
import { useUserStore } from "../store/user";
const user = useUserStore();

export default {
    data() {
        return {
            id: 2,
            dialog: false,
            items: [],
            company: null,
        };
    },
    methods: {
        AddOffer(item) {
            this.items.push(item);
            this.dialog = false;
        },
    },
};
</script>
