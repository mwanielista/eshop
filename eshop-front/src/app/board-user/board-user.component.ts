import {Component, OnInit} from '@angular/core';
import {ProductService} from '../_services/product.service';
import {TokenStorageService} from '../_services/token-storage.service';
import {OrderDB} from '../models/OrderDB';
import {Report} from '../models/Report';


@Component({
    selector: 'app-board-user',
    templateUrl: './board-user.component.html',
    styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit {
    currentUser: any;
    orders: Array<OrderDB> = [];

    selectedOrder: OrderDB | undefined;
    isSelected = false;

    emergencyForm: any = {
        topic: null,
        message: null
    };

    constructor(private token: TokenStorageService, private productService: ProductService) {
        this.currentUser = this.token.getUser();
    }

    ngOnInit(): void {
        this.productService.getUserOrders(this.currentUser.id).subscribe(
            success => {
                // @ts-ignore
                for (const data of success) {
                    this.orders.push(
                        new OrderDB(
                            data.id,
                            data.userID,
                            data.name,
                            data.surname,
                            data.productIDs,
                            data.address,
                            data.city,
                            data.postalCode,
                            data.paymentMethod,
                            data.price,
                            data.status));
                }
            }, err => {
                console.error(err);
            }
        );
    }

    openTable = (orderID: number) => {
        this.isSelected = true;
        this.productService.getOrder(orderID).subscribe(
            data => {
                this.selectedOrder = new OrderDB(
                    // @ts-ignore
                    data.id,
                    // @ts-ignore
                    data.userID,
                    // @ts-ignore
                    data.name,
                    // @ts-ignore
                    data.surname,
                    // @ts-ignore
                    data.productIDs,
                    // @ts-ignore
                    data.address,
                    // @ts-ignore
                    data.city,
                    // @ts-ignore
                    data.postalCode,
                    // @ts-ignore
                    data.paymentMethod,
                    // @ts-ignore
                    data.price,
                    // @ts-ignore
                    data.status
                );
            },
            error => console.error(error)
        );
    };

    submitError = () => {
        const {topic, message} = this.emergencyForm;
        this.productService.createReport(new Report(topic, message)).subscribe(
            success => {
                alert('Zgłoszono awarię!');
            }
        );

    }
}
