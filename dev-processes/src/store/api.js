import axios from "axios";

const endpoints = {
    user: {
        getUser: "api/users/",
        editUser: "api/users/",
        getUsers: "api/users",
        deleteUser: "api/users/",
        createUser: "api/users",
        auth: "api/auth/authenticate",
        refresh: "api/auth/refresh-token",
    },
    report: {},
    offer: {
        create: "api/offers",
        getOffers: "api/offers/",
    },
    companies: {
        requestCompany: "api/companies",
        requestCompanyWithId: "api/companies/",
    },
};
export default {
    user: {
        //get
        getUser: (id) =>
            axios
                .get(endpoints.user.getUser + id)
                .then((response) => response.data)
                .catch((error) => {
                    console.log(error);
                    if (error.response.status != 200) {
                        refresh();
                    }
                }),
        getUsers: () =>
            axios
                .get(endpoints.user.getUsers)
                .then((response) => response.data)
                .catch((error) => console.log(error)),
        editUser: (id, payload) =>
            axios
                .put(endpoints.user.editUser + id, payload)
                .then((response) => response.data)
                .catch((error) => console.log(error)),
        deleteUser: (id) =>
            axios
                .delete(endpoints.user.getUser + id)
                .then((response) => response.data)
                .catch((error) => console.log(error)),
        createUser: (payload) =>
            axios
                .post(endpoints.user.createUser, payload)
                .then((response) => response.data)
                .catch((error) => console.log(error)),

        /////
        auth: (payload) =>
            axios
                .post(endpoints.user.auth, payload)
                .then((response) => {
                    axios.defaults.headers.common["Authorization"] =
                        response.data.access_token;

                    localStorage.setItem("token", response.data.access_token);
                    localStorage.setItem(
                        "refreshToken",
                        response.data.refresh_token
                    );
                    return response.data;
                })
                .catch((error) => console.log(error)),
        refresh: () =>
            axios
                .post(
                    endpoints.user.refresh,
                    localStorage.getItem("refreshToken")
                )
                .then((response) => {
                    axios.defaults.headers.common["Authorization"] =
                        response.data.access_token;

                    localStorage.setItem("token", response.data.access_token);
                    localStorage.setItem(
                        "refreshToken",
                        response.data.refresh_token
                    );
                    return response.data;
                    /* localStorage.removeItem("token");
                    delete axios.defaults.headers.common["Authorization"];
                    return response.data; */
                })
                .catch((error) => console.log(error)),
    },
    offer: {
        create: (payload) =>
            axios
                .post(endpoints.offer.create, payload)
                .then((response) => response.data)
                .catch((error) => {
                    console.log(error);
                    if (error.response.status != 200) {
                        refresh();
                    }
                }),
        getOffers: (id) =>
            axios
                .get(endpoints.offer.getOffers + id + "/user")
                .then((response) => response.data)
                .catch((error) => {
                    console.log(error);
                    if (error.response.status != 200) {
                        refresh();
                    }
                }),
    },
    companies: {
        getCompanies: () =>
            axios
                .get(endpoints.companies.requestCompany)
                .then((response) => response.data)
                .catch((error) => {
                    console.log(error);
                    /* if (error.response != 200) {
                        refresh();
                    } */
                }),
        createCompany: (payload) =>
            axios
                .post(endpoints.companies.requestCompany, payload)
                .then((response) => response.data)
                .catch((error) => {
                    console.log(error);
                    if (error.response != 200) {
                        refresh();
                    }
                }),
        getCompanyById: (id) =>
            axios
                .get(endpoints.companies.requestCompanyWithId + id)
                .then((response) => response.data)
                .catch((error) => {
                    console.log(error);
                    if (error.response.status != 200) {
                        refresh();
                    }
                }),
        deleteCompany: (id) =>
            axios
                .delete(endpoints.companies.requestCompanyWithId + id)
                .then((response) => response.data)
                .catch((error) => {
                    console.log(error);
                    if (error.response.status != 200) {
                        refresh();
                    }
                }),
        editCompany: (payload) =>
            axios
                .patch(
                    endpoints.companies.requestCompanyWithId + payload.id,
                    payload.body
                )
                .then((response) => response.data)
                .catch((error) => {
                    console.log(error);
                    if (error.response.status != 200) {
                        refresh();
                    }
                }),
    },
    vacancy: {
        getVacancies: () =>
            axios
                .get(`api/companies/0/vacancies`)
                .then((response) => response.data)
                .catch((error) => {
                    console.log(error);
                    if (error.response.status != 200) {
                        refresh();
                    }
                }),
        createVacancy: (payload) =>
            axios
                .post(
                    `api/companies/${payload.companyId}/vacancies`,
                    payload.body
                )
                .then((response) => response.data)
                .catch((error) => {
                    console.log(error);
                    if (error.response.status != 200) {
                        refresh();
                    }
                }),
        getVacancy: (payload) =>
            axios
                .get(
                    `api/companies/${payload.companyId}/vacancies/${payload.id}`
                )
                .then((response) => response.data)
                .catch((error) => {
                    console.log(error);
                    /* if (error.response.status != 200) {
                        refresh();
                    } */
                }),
        deleteVacancy: (payload) =>
            axios
                .delete(
                    `api/companies/${payload.companyId}/vacancies/${payload.id}`
                )
                .then((response) => response.data)
                .catch((error) => {
                    console.log(error);
                    if (error.response.status != 200) {
                        refresh();
                    }
                }),
        editVacancy: (payload) =>
            axios
                .patch(
                    `api/companies/${payload.companyId}/vacancies/${payload.id}`,
                    payload.body
                )
                .then((response) => response.data)
                .catch((error) => {
                    console.log(error);
                    if (error.response.status != 200) {
                        refresh();
                    }
                }),
    },
};
