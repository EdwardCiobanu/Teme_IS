package com.example.TestProiectBackend.Service;

import com.example.TestProiectBackend.Model.Employee;
import com.example.TestProiectBackend.Model.Product;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface ProductService {
    Product findFirstById(Integer id);
    public void Insert(Product product);
    public Product ReadById(Integer id);
    public List<Product> getAllProducts();
    public void DeleteById(Integer id);
    public void Delete(Product product);
}
