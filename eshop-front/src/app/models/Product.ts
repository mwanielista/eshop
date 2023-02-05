export class ProductResponse {
    productID: number;
    productName: string;
    producent: string;
    price: number;
    availableCount: number;

    constructor(productID: number, productName: string, producent: string, price: number, availableCount: number) {
        this.productID = productID;
        this.productName = productName;
        this.producent = producent;
        this.price = price;
        this.availableCount = availableCount;
    }
}
