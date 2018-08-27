export class ClientForm {
    public firstName: string;
    public lastName: string;
    public phone: number;
    public city: string;
    public street: string;
    public zip: number;

    constructor(firstName, lastName, phone, city, street, zip) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.city = city;
        this.street = street;
        this.zip = zip;
    }
}
