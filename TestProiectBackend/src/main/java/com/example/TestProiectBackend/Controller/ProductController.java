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
    public ResponseEntity<Object> insert(@RequestBody Product product){
        String string = productServiceImplementation.Insert(product);
        if(string.equals("Product added succesfully")){
            return ResponseEntity.ok(string);
        }
        else {
            return ResponseEntity.badRequest().body(string);
        }
    }

    @PostMapping("/DeleteById")
    public ResponseEntity<Object> deleteById(@RequestBody Product product){
        String string = productServiceImplementation.DeleteById(product.getId());
        if(string.equals("Product deleted succesfully")) {
            return ResponseEntity.ok(string);
        }
        else{
            return ResponseEntity.badRequest().body(string);
        }
    }

    @PostMapping("/GetById")
    public ResponseEntity ReadByID(@RequestBody Integer id){
        Product product = productServiceImplementation.ReadById(id);
        return ResponseEntity.status(HttpStatus.OK).body(product);
    }

    @PostMapping("/DeleteByNume")
    public ResponseEntity<Object> deleteByNume(@RequestBody String nume){
        nume = nume.substring(1, nume.length() - 1);
        productServiceImplementation.DeleteByNume(nume);
        String string = productServiceImplementation.DeleteByNume(nume);
        if(string.equals("Product deleted succesfully")){
            return ResponseEntity.ok(string);
        }
        else {
            return ResponseEntity.badRequest().body(string);
        }
    }

}
