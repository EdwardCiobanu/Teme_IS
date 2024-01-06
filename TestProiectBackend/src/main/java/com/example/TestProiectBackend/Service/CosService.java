package com.example.TestProiectBackend.Service;

import com.example.TestProiectBackend.Model.Cos;
import com.example.TestProiectBackend.Model.Employee;
import com.example.TestProiectBackend.Model.EmployeeHelp;
import com.example.TestProiectBackend.Model.Product;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface CosService {
    Cos findFirstById(Integer id);
    public void Insert(Cos cos);

    public List<Cos> getAllCosuri();

    public List<Product> getAllProductsByPersonId(Integer id);

}
