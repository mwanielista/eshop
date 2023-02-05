package com.example.eshop.controllers;

import com.example.eshop.DTO.CartProductsUpdate;
import com.example.eshop.models.Order;
import com.example.eshop.models.Product;
import com.example.eshop.models.ShoppingCartModel;
import com.example.eshop.repository.OrderRepository;
import com.example.eshop.repository.ProductRepository;
import com.example.eshop.repository.ShoppingCartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/products")
public class ProductsController {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ShoppingCartRepository shoppingCartRepository;

    @Autowired
    private OrderRepository orderRepository;


    @GetMapping("/get/all")
    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @GetMapping("/get/product/{id}")
    @PreAuthorize("hasRole('ROLE_USER')")
    public Product getProductById(@PathVariable String id) {
        return productRepository.findById(Long.valueOf(id)).get();
    }

    //TODO change to only admin
    @PostMapping("/add")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public Product addProduct(@RequestBody Product product) {
        return productRepository.save(product);
    }

    @PostMapping("/buy/{productID}")
    @PreAuthorize("hasRole('ROLE_USER')")
    public void decreaseProductCount(@PathVariable Integer productID){
        Product product = productRepository.findById(Long.valueOf(productID)).get();
        if(product.getAvailableCount()> 0){
            product.setAvailableCount(product.getAvailableCount()-1);
        }
        productRepository.save(product);
    }

    @PostMapping("/add/cart/{user_id}/{product_id}")
    @PreAuthorize("hasRole('ROLE_USER')")
    public void addToCart(@PathVariable String user_id, @PathVariable Integer product_id) {
        if (!shoppingCartRepository.findAllByuserID(Integer.parseInt(user_id)).isPresent()) {
            ShoppingCartModel shoppingCartModel = new ShoppingCartModel();
            shoppingCartModel.setIsSubmitted(false);
            shoppingCartModel.setProductIDs(String.valueOf(product_id));
            shoppingCartModel.setTotalPrice(productRepository.findById(Long.valueOf(product_id)).get().getPrice());
            shoppingCartModel.setUserID(Integer.valueOf(user_id));

            shoppingCartRepository.save(shoppingCartModel);
        } else {
            ShoppingCartModel shoppingCartModel = shoppingCartRepository.findAllByuserID(Integer.parseInt(user_id)).get();
            shoppingCartModel.setProductIDs(shoppingCartModel.getProductIDs() + ";" + product_id);
            shoppingCartRepository.save(shoppingCartModel);
        }
    }

    @PutMapping("/update/cart/{cartID}")
    @PreAuthorize("hasRole('ROLE_USER')")
    public void updateCart(@RequestBody CartProductsUpdate productsUpdate, @PathVariable String cartID) {
        ShoppingCartModel cart = shoppingCartRepository.findById(Integer.parseInt(cartID)).get();
        cart.setProductIDs(productsUpdate.getProductIDs());
        shoppingCartRepository.save(cart);
    }

    @DeleteMapping("delete/cart/{cartID}")
    @PreAuthorize("hasRole('ROLE_USER')")
    public void deleteCart(@PathVariable Integer cartID) {
        shoppingCartRepository.deleteById(cartID);
    }

    @GetMapping("/get/cart/{userID}")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ShoppingCartModel getShoppingCart(@PathVariable String userID) {
        return shoppingCartRepository.findAllByuserID(Integer.parseInt(userID)).get();
    }

    @PostMapping("/create/order")
    @PreAuthorize("hasRole('ROLE_USER')")
    public void createOrder(@RequestBody Order order) {
        orderRepository.save(order);
    }

    @GetMapping("/get/orders/{userID}")
    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    public List<Order> getUserOrders(@PathVariable Integer userID){
        return orderRepository.findAllByUserID(userID);
    }

    @GetMapping("/get/all/orders")
    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    public List<Order> getAllOrders(){
        return orderRepository.findAll();
    }


    @GetMapping("/get/order/{orderID}")
    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    public Order getOrder(@PathVariable Integer orderID){
        return orderRepository.findById(orderID).get();
    }

    @PostMapping("/update/order/status/{orderID}/{status}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public void updateOrderStatus(@PathVariable Integer orderID, @PathVariable String status){
        Order order = orderRepository.findById(orderID).get();
        order.setStatus(status);

        orderRepository.save(order);
    }

}
