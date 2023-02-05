import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../_services/token-storage.service';
import {ProductService} from '../_services/product.service';

@Component({
    selector: 'app-shop',
    templateUrl: './shop.component.html',
    styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
    currentUser: any;
    products: any;

    constructor(private token: TokenStorageService, private productService: ProductService) {
    }

    ngOnInit(): void {
        this.currentUser = this.token.getUser();

        this.productService.getAllProducts().subscribe(
            data => this.products = data,
            err => {
                console.error(err);
            }
        );
    }

    addToCart = (productID: string) => {
        this.productService.addToCart(this.currentUser.id, productID).subscribe(
            success => {
                alert('Pomyślnie dodano do koszyka');
            },
            error => {
                console.error(error);
            }
        );
    }

}
