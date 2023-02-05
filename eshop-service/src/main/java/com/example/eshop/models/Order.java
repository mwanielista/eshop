package com.example.eshop.models;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Data
@Entity
@Table(name="Zamowienie")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer userID;
    private String productIDs;
    private String name;
    private String surname;
    private String address;
    private String city;
    private String postalCode;
    private String paymentMethod;
    private Double price;
    private String status;
}
