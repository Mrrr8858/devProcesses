<template>
    <v-card>
        <v-card-title> Авторизация </v-card-title>
        <v-card-text>
            <v-form @submit.prevent="submitForm" v-model="form">
                <v-text-field
                    v-model="email"
                    label="Email"
                    max="50"
                    :rules="[required]"
                    required
                ></v-text-field>
                <v-text-field
                    v-model="password"
                    label="Пароль"
                    type="password"
                    required
                    :rules="[required]"
                ></v-text-field>
                <v-btn type="submit" :disabled="!form" color="primary"
                    >Войти</v-btn
                >
            </v-form>
        </v-card-text>
    </v-card>
</template>

<script>
import { useUserStore } from "../store/user";
const user = useUserStore();
export default {
    name: "LogInPage",

    data() {
        return {
            email: null,
            password: null,
            valid: true,
            form: false,
        };
    },
    methods: {
        async submitForm() {
            const payload = {
                email: this.email,
                password: this.password,
            };
            user.login(payload);
            this.$router.push({
                path: `/`,
            });
        },
        required(v) {
            return !!v || "Field is required";
        },
    },
};
</script>
