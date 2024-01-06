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
    public String Insert(Product product) {
        if(product.getId() == null || product.getNume().isEmpty() || product.getPrice() == null){
            return ("All fields are required");
        }
        else {
            productRepository.save(product);
            System.out.println(product);
            return ("Product added succesfully");
        }

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
    public String DeleteById(Integer id){
        if(id == null) {
            return ("Product id needed to be deleted");

        }
        else{
            productRepository.deleteById(id);
//            System.out.println(id);
            return ("Product deleted succesfully");
        }

    }

    @Override
    public String Delete(Product product){
        if(product.getNume().isEmpty()) {
            return ("Product needed to be deleted");
        }
        else{
            productRepository.delete(product);
            return ("Product deleted succesfully");
        }
    }

    @Override
    public String DeleteByNume(String nume){
        if(nume.isEmpty()){
            return ("Product name needed to be deleted");
        }
        else {
            List<Product> produse = productRepository.findAllByNume(nume);
            for (Product produs:produse) {
                productRepository.delete(produs);
            }
            return ("Product deleted succesfully");
        }
    }

    public String Save(Product product) {
        if(product.getNume().isEmpty() || product.getPrice() == null){
            //System.out.println("Date insuficiente");
            return ("Name and price fields are required / Select a product");
        }
        else{
            productRepository.save(product);
            return ("Infos updated succesfully");
            //System.out.println(employee);
        }
    }


}
