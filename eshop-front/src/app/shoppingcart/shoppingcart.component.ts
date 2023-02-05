import {Component, OnInit} from '@angular/core';
import {ProductService} from '../_services/product.service';
import {TokenStorageService} from '../_services/token-storage.service';
import {ProductResponse} from '../models/Product';
import {ProductsUpdate} from '../models/ProductsInCartUpdate';

@Component({
    selector: 'app-shoppingcart',
    templateUrl: './shoppingcart.component.html',
    styleUrls: ['./shoppingcart.component.css']
})
export class ShoppingcartComponent implements OnInit {
    currentUser: any;
    products: Array<ProductResponse> = [];
    totalPrice = 0;


    constructor(private token: TokenStorageService, private productService: ProductService) {
        this.currentUser = this.token.getUser();
    }

    ngOnInit(): void {
        this.productService.getCart(this.currentUser.id).subscribe(
            success => {
                // @ts-ignore
                for (const x of success.productIDs.split(';')) {
                    this.productService.getProductByID(x).subscribe(
                        data => {
                            this.products?.push(new ProductResponse(data.id, data.name, data.producent, data.price, data.availableCount));
                            this.totalPrice += data.price;
                            console.log(this.totalPrice);
                        }
                    );
                }
            },
            error => console.error(error)
        );
    }

    deleteProduct = (productID: number) => {
        let products: [any];
        let newProducts = '';
        let cartID = 0;

        this.productService.getCart(this.currentUser.id).subscribe(
            cart => {
                // @ts-ignore
                cartID = cart.id;
                // @ts-ignore
                products = cart.productIDs.split(';');
                for (const index of products) {
                    if (index.toString() !== productID.toString()) {
                        if (newProducts === '') {
                            newProducts = index;
                        } else {
                            newProducts += ';' + index;
                        }
                    }
                }
                const update: ProductsUpdate = new ProductsUpdate(cartID, newProducts);
                this.productService.updateCart(update, cartID).subscribe(
                    s => {
                        alert('Zaktualizowano pomyślnie!');
                        window.location.reload();
                    },
                    error => console.error(error)
                );
            },
            error => console.error(error)
        );
    }
}

