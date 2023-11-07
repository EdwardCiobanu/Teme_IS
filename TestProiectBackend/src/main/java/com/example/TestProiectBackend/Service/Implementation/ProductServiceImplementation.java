package com.example.TestProiectBackend.Service.Implementation;

import com.example.TestProiectBackend.Model.Employee;
import com.example.TestProiectBackend.Model.Product;
import com.example.TestProiectBackend.Repository.EmployeeRepository;
import com.example.TestProiectBackend.Repository.ProductRepository;
import com.example.TestProiectBackend.Service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductServiceImplementation implements ProductService {

    private final ProductRepository productRepository;
    //@Autowired
    //private EmployeeRepository employeeRepository;

    @Override
    public Product findFirstById(Integer id){
        return productRepository.findFirstById(id);
    }

    @Override
    public void Insert(Product product) {
        productRepository.save(product);
    }

    @Override
    public Product ReadById(Integer id) {
        Product product = productRepository.findFirstById(id);
        return product;
    }

    @Override
    public List<Product> getAllProducts() {
        return (List<Product>) productRepository.findAll();
    }

    @Override
    public void DeleteById(Integer id){
        productRepository.deleteById(id);
    }

    @Override
    public void Delete(Product product){
        productRepository.delete(product);
    }


}
