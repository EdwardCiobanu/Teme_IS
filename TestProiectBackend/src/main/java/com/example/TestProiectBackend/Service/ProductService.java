package com.example.TestProiectBackend.Service;

import com.example.TestProiectBackend.Model.Employee;
import com.example.TestProiectBackend.Model.Product;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface ProductService {
    Product findFirstById(Integer id);
    public String Insert(Product product);
    public Product ReadById(Integer id);
    public List<Product> getAllProducts();
    public String DeleteById(Integer id);
    public String Delete(Product product);
    public String DeleteByNume(String nume);
    public String Save(Product product);

}
