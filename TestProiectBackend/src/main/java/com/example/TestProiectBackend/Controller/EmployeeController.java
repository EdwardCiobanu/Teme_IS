package com.example.TestProiectBackend.Controller;

import com.example.TestProiectBackend.DTO.ObiectNou;
import com.example.TestProiectBackend.Model.Employee;
import com.example.TestProiectBackend.Model.EmployeeHelp;
import com.example.TestProiectBackend.Model.Product;
import com.example.TestProiectBackend.Service.Implementation.EmployeeServiceImplementation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@RestController
@CrossOrigin
@RequestMapping("/Employee")
@RequiredArgsConstructor

public class EmployeeController {

    private final EmployeeServiceImplementation employeeServiceImplementation;
    private static final Logger logger = LoggerFactory.getLogger(EmployeeController.class);



    @GetMapping("/GetData")
    public String getMessage(){
        return "Ana are mere";
    }

    @PostMapping("/Print")
    public void printMessage(@RequestBody ObiectNou data){
        System.out.println(data);
    }
    @PostMapping("/Insert")
    public ResponseEntity<String> insert(@RequestBody Employee employee){
        String string = employeeServiceImplementation.Insert(employee);
        if(string.equals("Account created succesfully"))
        {
            return ResponseEntity.ok(string);
        }
        else
        {
            return ResponseEntity.badRequest().body(string);
        }
    }
    @PostMapping("/Login")
    public ResponseEntity<Object> login(@RequestBody EmployeeHelp employee) {
        Employee utilizator = employeeServiceImplementation.login(employee);

        if(utilizator == null){
            logger.error("Invalid credentials");
            return ResponseEntity.badRequest().body("Invalid credentials");
        }
        else{
            logger.info("Login successful for user with email: {}", utilizator.getEmail());
            return ResponseEntity.ok(utilizator);
        }
    }

    @PostMapping("/GetById")
    public ResponseEntity ReadByID(@RequestBody Integer id){
        Employee employee = employeeServiceImplementation.ReadById(id);
        return ResponseEntity.status(HttpStatus.OK).body(employee);
    }

    @PostMapping("/Update")
    public ResponseEntity<String> save(@RequestBody Employee employee){
        String string = employeeServiceImplementation.Save(employee);
        if(string.equals("Infos updated succesfully"))
        {
            return ResponseEntity.ok(string);
        }
        else
        {
            return ResponseEntity.badRequest().body(string);
        }
    }

    @GetMapping("/FindAll")
    public ResponseEntity<Object> findAll() {
        List<Employee> employeeList = employeeServiceImplementation.getAllEmployees();

        if (employeeList.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No employees found");
        }

        return ResponseEntity.status(HttpStatus.OK).body(employeeList);
    }

    @PostMapping("/Delete")
    public ResponseEntity<Object> delete(@RequestBody Employee employee){
        System.out.println(employee);
        String string = employeeServiceImplementation.Delete(employee);
        if(string.equals("Employee deleted succesfully")){
            return ResponseEntity.ok(string);
        }
        else {
            return ResponseEntity.badRequest().body(string);
        }
    }
}
