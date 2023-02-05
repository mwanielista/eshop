export class ProductsUpdate {
    Id: number;
    productIDs: string;

    constructor(Id: number, productIDs: string) {
        this.Id = Id;
        this.productIDs = productIDs;
    }
}
