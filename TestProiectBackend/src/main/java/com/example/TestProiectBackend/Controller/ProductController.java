package com.example.TestProiectBackend.Controller;

import com.example.TestProiectBackend.DTO.ObiectNou;
import com.example.TestProiectBackend.Model.Employee;
import com.example.TestProiectBackend.Model.Product;
import com.example.TestProiectBackend.Service.Implementation.EmployeeServiceImplementation;
import com.example.TestProiectBackend.Service.Implementation.ProductServiceImplementation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/Product")
@RequiredArgsConstructor

public class ProductController {

    private final ProductServiceImplementation productServiceImplementation;
    @GetMapping("/GetData")
    public String getMessage(){
        return "Ana are mere";
    }

    @PostMapping("/Print")
    public void printMessage(@RequestBody ObiectNou data){
        System.out.println(data);
    }
    @PostMapping("/Insert")
    public void insert(@RequestBody Product product){
        productServiceImplementation.Insert(product);
        System.out.println(product);
    }

    @PostMapping("/DeleteById")
    public void deleteById(@RequestBody Integer id){
        productServiceImplementation.DeleteById(id);
        System.out.println(id);
    }

    @PostMapping("/GetById")
    public ResponseEntity ReadByID(@RequestBody Integer id){
        Product product = productServiceImplementation.ReadById(id);
        return ResponseEntity.status(HttpStatus.OK).body(product);
    }

    @PostMapping("/DeleteByNume")
    public void deleteByNume(@RequestBody String nume){
        productServiceImplementation.DeleteByNume(nume);
        System.out.println(nume);
    }

}
