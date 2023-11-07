package com.example.TestProiectBackend.Controller;

import com.example.TestProiectBackend.DTO.ObiectNou;
import com.example.TestProiectBackend.Model.Employee;
import com.example.TestProiectBackend.Model.Person;
import com.example.TestProiectBackend.Service.Implementation.EmployeeServiceImplementation;
import com.example.TestProiectBackend.Service.Implementation.PersonServiceImplementation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/Person")
@RequiredArgsConstructor
public class PersonController {

    private final PersonServiceImplementation personServiceImplementation;
    @GetMapping("/GetData")
    public String getMessage(){
        return "Ana are mere";
    }

    @PostMapping("/Print")
    public void printMessage(@RequestBody ObiectNou data){
        System.out.println(data);
    }
    @PostMapping("/Insert")
    public void insert(@RequestBody Person person){
        personServiceImplementation.Insert(person);
        System.out.println(person);
    }

    @PostMapping("/GetById")
    public ResponseEntity ReadByID(@RequestBody Integer id){
        Person person = personServiceImplementation.ReadById(id);
        return ResponseEntity.status(HttpStatus.OK).body(person);
    }

}
