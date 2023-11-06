package com.example.TestProiectBackend.Controller;

import com.example.TestProiectBackend.DTO.ObiectNou;
import com.example.TestProiectBackend.Model.Employee;
import com.example.TestProiectBackend.Service.Implementation.EmployeeServiceImplementation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/Employee")
@RequiredArgsConstructor

public class EmployeeController {

    private final EmployeeServiceImplementation employeeServiceImplementation;
    @GetMapping("/GetData")
    public String getMessage(){
        return "Ana are mere";
    }

    @PostMapping("/Print")
    public void printMessage(@RequestBody ObiectNou data){
        System.out.println(data);
    }
    @PostMapping("/Insert")
    public void insert(@RequestBody Employee employee){
        employeeServiceImplementation.Insert(employee);
        System.out.println(employee);
    }

    @PostMapping("/GetById")
    public ResponseEntity ReadByID(@RequestBody Integer id){
        Employee employee = employeeServiceImplementation.ReadById(id);
        return ResponseEntity.status(HttpStatus.OK).body(employee);
    }
}
