package com.example.TestProiectBackend.Controller;

import com.example.TestProiectBackend.DTO.AdaugClientiMasa;
import com.example.TestProiectBackend.DTO.AdaugProdusClient;
import com.example.TestProiectBackend.DTO.ObiectNou;
import com.example.TestProiectBackend.Model.*;
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


    @PostMapping("/FindById")
    public ResponseEntity<Object> ReadByID(@RequestBody Masa masa){
        if(masa.getId() == null)
        {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No table selected");
        }

        Masa masa1 = masaServiceImplementation.findFirstById(masa.getId());
        System.out.println(masa1.getId());
        List<Product> productList = masaServiceImplementation.getAllProductsByMasaId(masa1.getId());
        System.out.println(productList);

        if (productList.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No products found for that person");
        }

        return ResponseEntity.status(HttpStatus.OK).body(productList);
    }



    @PostMapping("/UpdateMasaPerson")
    public ResponseEntity<Object> savePersons(@RequestBody AdaugClientiMasa adaugClientiMasa){
        System.out.println(adaugClientiMasa.getPersons());
        System.out.println(adaugClientiMasa.getMasa());


        List<Person> persons = adaugClientiMasa.getPersons();
        System.out.println(persons);
        adaugClientiMasa.getMasa().setPersons(persons);
        String string1 = masaServiceImplementation.Save(adaugClientiMasa.getMasa());

        if(string1.equals("Infos updated succesfully")){
            return ResponseEntity.ok(string1);
        }
        else{
            return ResponseEntity.badRequest().body(string1);
        }


    }
}
