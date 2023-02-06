import {Component, OnInit} from '@angular/core';
import {ProductService} from '../_services/product.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {OrderDB} from '../models/OrderDB';
import {Report} from '../models/Report';
import {ReportDB} from '../models/ReportDB';

@Component({
    selector: 'app-board-admin',
    templateUrl: './board-admin.component.html',
    styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {
    content?: string;
    form: FormGroup = new FormGroup({
        name: new FormControl(''),
        producent: new FormControl(''),
        price: new FormControl(''),
        avaliableCount: new FormControl('')
    });

    updateForm: any = {
        status: null
    };


    allOrders: Array<OrderDB> = [];
    selectedOrder: OrderDB | undefined;
    isSelected = false;

    allReports: Array<Report> = [];
    isSelectedReport = false;
    selectedReport: ReportDB | undefined;

    constructor(private productService: ProductService,
                private fb: FormBuilder) {
    }

    ngOnInit(): void {
        this.form = this.fb.group(
            {
                name: [
                    '',
                    [
                        Validators.required,
                        Validators.minLength(1),
                        Validators.maxLength(20)
                    ]
                ],
                producent: [
                    '',
                    [
                        Validators.required,
                        Validators.minLength(1),
                        Validators.maxLength(20)
                    ]
                ],
                price: ['', Validators.required],
                avaliableCount: ['', Validators.required],
            }
        );

        this.productService.getAllOrders().subscribe(
            success => {
                // @ts-ignore
                for (const data of success) {
                    this.allOrders?.push(new OrderDB(
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
                        data.status)
                    );
                }

            }, error => {
                console.error(error);
            }
        );

        this.productService.getAllReports().subscribe(
            success => {
                // @ts-ignore
                for (const r of success) {
                    this.allReports.push(new ReportDB(r.id, r.topic, r.message, r.isReviewed));
                }
            }, error => console.error(error)
        );
    }

    onSubmit = () => {
        this.productService.create(this.form.value.name, this.form.value.producent, this.form.value.price, this.form.value.avaliableCount)
            .subscribe(
                success => {
                    alert('Produkt dodany pomyślnie');
                    this.form.reset();
                }
            );
    };

    openEditBox = (orderID: number) => {
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
                    data.status);
            },
            error => console.error(error)
        );
    };

    updateOrder = (orderID: number) => {
        const {status} = this.updateForm;
        this.productService.updateOrderStatus(orderID, status).subscribe(
            success => {
                alert('Pomyślnie zmieniono status!');
                window.location.reload();
            },
            error => console.error(error)
        );
    };

    selectReport = (reportID: number) => {
        this.isSelectedReport = true;
        this.productService.getReport(reportID).subscribe(
            success => {
                // @ts-ignore
                this.selectedReport = new ReportDB(success.id, success.topic, success.message, success.reviewed);
            },
            error => console.error(error)
        );
    }

    reviewReport = (reportID: number) => {
        this.productService.changeReportState(reportID).subscribe(
            success => {},
            error => {}
        );
    }

}
