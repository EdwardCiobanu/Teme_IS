package com.example.TestProiectBackend.Controller;

import com.example.TestProiectBackend.DTO.ObiectNou;
import com.example.TestProiectBackend.Model.Employee;
import com.example.TestProiectBackend.Model.Masa;
import com.example.TestProiectBackend.Service.Implementation.EmployeeServiceImplementation;
import com.example.TestProiectBackend.Service.Implementation.MasaServiceImplementation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/Masa")
@RequiredArgsConstructor
public class MasaController {
    private final MasaServiceImplementation masaServiceImplementation;
    @GetMapping("/GetData")
    public String getMessage(){
        return "Ana are mere";
    }

    @PostMapping("/Print")
    public void printMessage(@RequestBody ObiectNou data){
        System.out.println(data);
    }
    @PostMapping("/Insert")
    public void insert(@RequestBody Masa masa){
        masaServiceImplementation.Insert(masa);
        System.out.println(masa);
    }

    @PostMapping("/GetById")
    public ResponseEntity ReadByID(@RequestBody Integer id) {
        Masa masa = masaServiceImplementation.ReadById(id);
        return ResponseEntity.status(HttpStatus.OK).body(masa);
    }
}
