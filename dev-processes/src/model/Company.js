import Vacancy from "./Vacancy";

export default class Company {
    id;
    name;
    fullName;
    info;
    vacancies;
    constructor(row) {
        this.id = row.id;
        this.name = row.name;
        this.fullName = row.fullName;
        this.info = row.info;
        this.vacancies = row.vacancies.map((x) => new Vacancy(x));
    }
}
