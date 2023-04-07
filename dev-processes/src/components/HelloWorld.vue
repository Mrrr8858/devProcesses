<template>
    <v-container>
        <v-btn @click="add">{{ app }}</v-btn>
    </v-container>
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
    },
    computed: {
        app() {
            return app.id;
        },
    },
};
</script>
