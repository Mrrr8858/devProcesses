export default class User {
    id;
    role;
    name;
    surname;
    lastName;
    email;
    password;
    companyName;
    username;
    groupName;

    constructor(row) {
        this.id = row.id;
        this.role = row.role;
        this.name = row.name;
        this.surname = row.surname;
        this.lastName = row.lastName;
        this.email = row.email;
        this.password = row.password;
        this.companyName = row.companyName;
        this.username = row.username;
        this.groupName = row.groupName;
    }
    roleName() {
        switch (this.role) {
            case "STUDENT":
                return "Студент";
            case "UNIVERSITY_EMPLOYEE":
                return "Представитель университета";
            case "COMPANY_EMPLOYEE":
                return "Представитель компании";
            default:
                break;
        }
    }
    fullName() {
        return `${this.surname} ${this.name} ${this.lastName}`;
    }
}
