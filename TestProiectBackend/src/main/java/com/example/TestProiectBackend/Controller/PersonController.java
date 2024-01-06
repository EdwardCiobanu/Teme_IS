package com.example.TestProiectBackend.Controller;

import com.example.TestProiectBackend.DTO.AdaugProdusClient;
import com.example.TestProiectBackend.DTO.ObiectNou;
import com.example.TestProiectBackend.Model.Cos;
import com.example.TestProiectBackend.Model.Employee;
import com.example.TestProiectBackend.Model.Person;
import com.example.TestProiectBackend.Model.Product;
import com.example.TestProiectBackend.Service.Implementation.CosServiceImplementation;
import com.example.TestProiectBackend.Service.Implementation.EmployeeServiceImplementation;
import com.example.TestProiectBackend.Service.Implementation.PersonServiceImplementation;
import com.example.TestProiectBackend.Service.Implementation.ProductServiceImplementation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/Person")
@RequiredArgsConstructor
public class PersonController {

    private final CosServiceImplementation cosServiceImplementation;
    private final PersonServiceImplementation personServiceImplementation;
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
    public ResponseEntity<Object> insert(@RequestBody Person person){
        String string = personServiceImplementation.Insert(person);
        if(string.equals("Person added succesfully")){
            return ResponseEntity.ok(string);
        }
        else {
            return ResponseEntity.badRequest().body(string);
        }
    }

    @PostMapping("/GetById")
    public ResponseEntity ReadByID(@RequestBody Integer id){
        Person person = personServiceImplementation.ReadById(id);
        return ResponseEntity.status(HttpStatus.OK).body(person);
    }

    @PostMapping("/FindByNume")
    public ResponseEntity<Object> ReadByNume(@RequestBody Person person){
        if(person.getNume().isEmpty())
        {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No person selected");
        }

        Person person1 = personServiceImplementation.findFirstByNume(person.getNume());
        System.out.println(person1.getNume());
        List<Product> productList = cosServiceImplementation.getAllProductsByPersonId(person1.getId());
        System.out.println(productList);

        if (productList.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No products found for that person");
        }

        return ResponseEntity.status(HttpStatus.OK).body(productList);
    }

    @GetMapping("/FindAll")
    public ResponseEntity<Object> findAll() {
        List<Person> personList = personServiceImplementation.getAllPersons();

        if (personList.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No persons found");
        }

        return ResponseEntity.status(HttpStatus.OK).body(personList);
    }

    @PostMapping("/Delete")
    public ResponseEntity<Object> delete(@RequestBody Person person){
        System.out.println(person);
        String string = personServiceImplementation.Delete(person);
        if(string.equals("Person deleted succesfully")){
            return ResponseEntity.ok(string);
        }
        else {
            return ResponseEntity.badRequest().body(string);
        }
    }

    @PostMapping("/Update")
    public ResponseEntity<Object> save(@RequestBody Person person){
        System.out.println(person);
        String string = personServiceImplementation.Save(person);
        if(string.equals("Infos updated succesfully")){
            return ResponseEntity.ok(string);
        }
        else {
            return ResponseEntity.badRequest().body(string);
        }
    }

    @PostMapping("/UpdateProductPerson")
    public ResponseEntity<Object> saveProduct(@RequestBody AdaugProdusClient adaugProdusClient){
        System.out.println(adaugProdusClient.getProducts());
        System.out.println(adaugProdusClient.getPerson());

        System.out.println(adaugProdusClient.getProducts());


//        List<Product> products = new ArrayList<>();
//        products.add(adaugProdusClient.getProduct());
//        System.out.println(products);
//        adaugProdusClient.getPerson().setProducts(products);

//        List<Person> persons = new ArrayList<>();
//        persons.add(adaugProdusClient.getPerson());
//        adaugProdusClient.getProduct().setPersons(persons);

        //System.out.println(persons.get(0));
//        String string1 = personServiceImplementation.Save(persons.get(0));

        List<Product> products = adaugProdusClient.getProducts();
        for (Product product : products) {
            Cos cos = new Cos(adaugProdusClient.getPerson().getId(), product.getId());
            cosServiceImplementation.Insert(cos);
            Person person = personServiceImplementation.findFirstById(adaugProdusClient.getPerson().getId());
            List<Cos> cosuriPerson = person.getCosuri();
            cosuriPerson.add(cos);
            person.setCosuri(cosuriPerson);
            personServiceImplementation.Save(person);

            Product product1 = productServiceImplementation.findFirstById(product.getId());
            List<Cos> cosuriProduct = product1.getCosuri();
            cosuriProduct.add(cos);
            product1.setCosuri(cosuriProduct);
            productServiceImplementation.Save(product1);

        }
//        adaugProdusClient.getPerson()
//        String string2 = personServiceImplementation.Save(adaugProdusClient.getPerson());
//        if(string2.equals("Infos updated succesfully")){
//            return ResponseEntity.ok(string2);
//        }
//        else{
//            return ResponseEntity.badRequest().body(string2);
//        }
        return ResponseEntity.ok("Produsele au fost adaugate cu succes");

    }

    // Am comentat in product legatura one to many si aici am comentat ce se vede, daca vreau sa ajung la varianta de inainte

}
