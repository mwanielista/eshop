package com.example.eshop.models;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Table;

@Entity
@Data
@Table(name="ShoppingCart")
public class ShoppingCartModel {

    @javax.persistence.Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer Id;
    private Integer userID;
    private String productIDs;
    private Double totalPrice;
    private Boolean isSubmitted;
}
