import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ProductsUpdate} from '../models/ProductsInCartUpdate';
import {Order} from '../models/Order';
import {Report} from '../models/Report';

const API_URL = 'http://localhost:8080/api/products/';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    constructor(private http: HttpClient) {
    }

    getAllProducts(): Observable<any> {
        return this.http.get(API_URL + 'get/all', {responseType: 'json'});
    }

    getProductByID(id: string): Observable<any> {
        return this.http.get(API_URL + 'get/product/' + id, {responseType: 'json'});
    }

    create(name: string, producent: string, price: number, availableCount: number): Observable<any> {
        return this.http.post(API_URL + 'add', {
            name,
            producent,
            price,
            availableCount
        }, httpOptions);
    }

    decreaseProductCount = (productID: string) => {
        return this.http.post(API_URL + 'buy/' + productID, null);
    };

    addToCart = (userID: string, productID: string) => {
        return this.http.post(API_URL + 'add/cart/' + userID + '/' + productID, {responseType: 'json'});
    };

    getCart = (userID: string) => {
        return this.http.get(API_URL + 'get/cart/' + userID, {responseType: 'json'});
    };

    updateCart = (cart: ProductsUpdate, cartID: number) => {
        return this.http.put(API_URL + 'update/cart/' + cartID, cart);
    };

    deleteCart = (cartID: string) => {
        return this.http.delete(API_URL + 'delete/cart/' + cartID, {responseType: 'json'});
    };

    createOrder = (order: Order) => {
        return this.http.post(API_URL + 'create/order/', order);
    };

    getUserOrders = (userID: number) => {
        return this.http.get(API_URL + 'get/orders/' + userID, {responseType: 'json'});
    };

    getOrder = (orderID: number) => {
        return this.http.get(API_URL + 'get/order/' + orderID, {responseType: 'json'});
    };

    getAllOrders = () => {
        return this.http.get(API_URL + 'get/all/orders/', {responseType: 'json'});
    };

    updateOrderStatus = (orderID: number, orderStatus: string) => {
        return this.http.post(API_URL + 'update/order/status/' + orderID + '/' + orderStatus, null);

    };

    getAllReports = () => {
        return this.http.get('http://localhost:8080/api/reports/' + 'get/all/', {responseType: 'json'});
    };

    getReport = (id: number) => {
        return this.http.get('http://localhost:8080/api/reports/' + 'get/' + id, {responseType: 'json'});
    };

    createReport = (report: Report) => {
        return this.http.post('http://localhost:8080/api/reports/' + 'add/', report);
    };

    changeReportState = (reportID: number) => {
        return this.http.post('http://localhost:8080/api/reports/' + 'change/' + reportID, null);
    };

}
