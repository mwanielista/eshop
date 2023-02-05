export class OrderDB {
    id: number;
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
        id: number,
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
        this.id = id;
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
