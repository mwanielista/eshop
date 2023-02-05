import {Component, OnInit} from '@angular/core';
import {ProductResponse} from '../models/Product';
import {TokenStorageService} from '../_services/token-storage.service';
import {ProductService} from '../_services/product.service';
import {Order} from '../models/Order';

@Component({
    selector: 'app-buy-now',
    templateUrl: './buy-now.component.html',
    styleUrls: ['./buy-now.component.css']
})
export class BuyNowComponent implements OnInit {
    currentUser: any;
    products: Array<ProductResponse> = [];
    totalPrice = 0;
    isPayed = false;
    productIds = '';
    cartID = '';

    form: any = {
        name: null,
        surname: null,
        address: null,
        city: null,
        postalcode: null,
        payment: null,
    };


    constructor(private token: TokenStorageService, private productService: ProductService) {
        this.currentUser = this.token.getUser();
    }

    ngOnInit(): void {
        this.productService.getCart(this.currentUser.id).subscribe(
            success => {
                // @ts-ignore
                this.productIds = success.productIDs;
                // @ts-ignore
                this.cartID = success.id;
                for (const x of this.productIds.split(';')) {
                    this.productService.getProductByID(x).subscribe(
                        data => {
                            this.products?.push(new ProductResponse(data.id, data.name, data.producent, data.price, data.availableCount));
                            this.totalPrice += data.price;
                        }
                    );
                }
            },
            // tslint:disable-next-line:no-shadowed-variable
            error => console.error(error)
        );
    }

    pay = () => {
        this.isPayed = true;
        alert('Zapłacono pomyślnie');
    };

    onSubmit = () => {
        const {name, surname, address, city, postalcode, payment} = this.form;
        const order: Order = new Order(
            this.currentUser.id,
            name,
            surname,
            this.productIds,
            address,
            city,
            postalcode,
            payment,
            this.totalPrice,
            'nowe');

        this.productService.createOrder(order).subscribe(
            success => {
                alert('Zamowienie złożone! ');
                this.productService.deleteCart(this.cartID).subscribe(
                    // tslint:disable-next-line:no-shadowed-variable
                    success => {},
                    // tslint:disable-next-line:no-shadowed-variable
                    error => console.error(error)
                );

                for (const x of this.productIds.split(';')) {
                    this.productService.decreaseProductCount(x).subscribe(
                        // tslint:disable-next-line:no-shadowed-variable
                        success => {
                        },
                        // tslint:disable-next-line:no-shadowed-variable
                        error => console.error(error)
                    );
                }
            },
            // tslint:disable-next-line:no-shadowed-variable
            error => console.error(error)
        );
    };
}
