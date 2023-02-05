package com.example.eshop.repository;

import com.example.eshop.models.ShoppingCartModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ShoppingCartRepository extends JpaRepository<ShoppingCartModel, Integer> {

    Optional<ShoppingCartModel> findAllByuserID(Integer userID);
}
