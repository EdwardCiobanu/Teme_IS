package com.example.TestProiectBackend.Service.Implementation;

import com.example.TestProiectBackend.Model.Cos;
import com.example.TestProiectBackend.Model.Employee;
import com.example.TestProiectBackend.Model.Masa;
import com.example.TestProiectBackend.Model.Product;
import com.example.TestProiectBackend.Repository.CosRepository;
import com.example.TestProiectBackend.Repository.EmployeeRepository;
import com.example.TestProiectBackend.Repository.MasaRepository;
import com.example.TestProiectBackend.Service.CosService;
import com.example.TestProiectBackend.Service.MasaService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CosServiceImplementation implements CosService {
    private final CosRepository cosRepository;
    private final ProductServiceImplementation productServiceImplementation;
    //@Autowired
    //private EmployeeRepository employeeRepository;

    @Override
    public Cos findFirstById(Integer id){
        return cosRepository.findFirstByCosid(id);
    }

    @Override
    public void Insert(Cos cos) {
        cosRepository.save(cos);
        System.out.println(cos);

    }

    @Override
    public List<Cos> getAllCosuri() {
        return (List<Cos>) cosRepository.findAll();
    }

    @Override
    public List<Product> getAllProductsByPersonId(Integer id){
        List<Cos> cosuri = (List<Cos>) cosRepository.findAllByPersonid(id);
        ArrayList<Product> products = new ArrayList<>();
        for(Cos cos : cosuri){
            Product product = productServiceImplementation.findFirstById(cos.getProductid());
            products.add(product);
        }
        return products;
    }

}
