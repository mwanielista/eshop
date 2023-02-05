export class Order {
    userID: number;
    name: string;
    surname: string;
    productIDs: string;
    address: string;
    city: string;
    postalCode: string;
    paymentMethod: string;
    price: number;
    status: string;

    constructor(
        userID: number,
        name: string,
        surname: string,
        productIds: string,
        address: string,
        city: string,
        postalCode: string,
        paymentMethod: string,
        price: number,
        status: string) {
        this.userID = userID;
        this.name = name;
        this.surname = surname;
        this.productIDs = productIds;
        this.address = address;
        this.city = city;
        this.postalCode = postalCode;
        this.paymentMethod = paymentMethod;
        this.price = price;
        this.status = status;
    }
}
