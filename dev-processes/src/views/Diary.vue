<template>
    <v-container>
        <v-card>
            <v-card-title> Дневник практики </v-card-title>
            <v-card-text>
                <v-btn @click="saveDiary"> Скачать</v-btn>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
export default {
    data() {
        return {};
    },
    methods: {
        saveDiary() {
            console.log("save");
        },
    },
    computed: {},
};
</script>
