<template>
    <v-card>
        <v-card-title> Дневник практики </v-card-title>
        <v-card-text>
            <v-btn @click="saveDiary"> Скачать</v-btn>
        </v-card-text>
    </v-card>
</template>

<script>
import { useAppStore } from "../store/app";
const app = useAppStore();

export default {
    data() {
        return {
            id: 2,
        };
    },
    methods: {
        add() {
            app.setId(app.id + 1);
            console.log(app.id);
        },
        saveDiary() {
            console.log("save");
        },
    },
    computed: {
        app() {
            return app.id;
        },
    },
};
</script>
