package com.example.TestProiectBackend.Controller;

import com.example.TestProiectBackend.DTO.ObiectNou;
import com.example.TestProiectBackend.Model.Employee;
import com.example.TestProiectBackend.Model.Masa;
import com.example.TestProiectBackend.Model.Product;
import com.example.TestProiectBackend.Service.Implementation.EmployeeServiceImplementation;
import com.example.TestProiectBackend.Service.Implementation.MasaServiceImplementation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public ResponseEntity<Object> insert(@RequestBody Masa masa){
        String string = masaServiceImplementation.Insert(masa);
        if(string.equals("Table added succesfully")){
            return ResponseEntity.ok(string);
        }
        else {
            return ResponseEntity.badRequest().body(string);
        }
    }

    @GetMapping("/FindAll")
    public ResponseEntity<Object> findAll(){
        List<Masa> masaList = masaServiceImplementation.getAllMese();
        if(masaList.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No tables found");
        }
        return ResponseEntity.status(HttpStatus.OK).body(masaList);
    }

    @PostMapping("/Delete")
    public ResponseEntity<Object> delete(@RequestBody Masa masa){
        System.out.println(masa);
        String string = masaServiceImplementation.Delete(masa);
        if(string.equals("Table deleted succesfully")){
            return ResponseEntity.ok(string);
        }
        else {
            return ResponseEntity.badRequest().body(string);
        }
    }

    @PostMapping("/Update")
    public ResponseEntity<Object> save(@RequestBody Masa masa){
        String string = masaServiceImplementation.Save(masa);
        if(string.equals("Infos updated succesfully"))
        {
            return ResponseEntity.ok(string);
        }
        else
        {
            return ResponseEntity.badRequest().body(string);
        }
    }


    @PostMapping("/GetById")
    public ResponseEntity ReadByID(@RequestBody Integer id) {
        Masa masa = masaServiceImplementation.ReadById(id);
        return ResponseEntity.status(HttpStatus.OK).body(masa);
    }
}
