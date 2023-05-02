<template>
    <v-container>
        <v-btn @click="add">{{ app }}</v-btn>
    </v-container>
</template>

<script>
import { useUserStore } from "../store/user";
const user = useUserStore();

export default {
    data() {
        return {
            id: 2,
        };
    },
    methods: {
        add() {
            user.setId(user.id + 1);
            console.log(user.id);
        },
    },
    computed: {
        app() {
            return user.id;
        },
    },
};
</script>
