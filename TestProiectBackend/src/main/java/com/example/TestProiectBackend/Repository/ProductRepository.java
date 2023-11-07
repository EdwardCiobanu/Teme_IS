package com.example.TestProiectBackend.Repository;

import com.example.TestProiectBackend.Model.Employee;
import com.example.TestProiectBackend.Model.Product;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends CrudRepository<Product, Integer> {

    Product findFirstById(Integer id);
    List<Product> findAllByNume(String nume);
}
