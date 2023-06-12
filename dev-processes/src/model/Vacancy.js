export default class Vacancy {
    id;
    name;
    requirements;
    description;
    companyId;
    companyName;
    constructor(row) {
        this.id = row.id;
        this.name = row.name;
        this.requirements = row.requirements;
        this.description = row.description;
        this.companyId = row.companyId;
        this.companyName = row.companyName;
    }
}
