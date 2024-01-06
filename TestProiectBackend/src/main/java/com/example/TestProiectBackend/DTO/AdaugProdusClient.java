package com.example.TestProiectBackend.DTO;

import com.example.TestProiectBackend.Model.Masa;
import com.example.TestProiectBackend.Model.Person;
import com.example.TestProiectBackend.Model.Product;
import jakarta.persistence.OneToMany;
import lombok.Data;
import lombok.ToString;

import java.util.List;

@Data
@ToString
public class AdaugProdusClient {
    private Person person;
    private List<Product> products;



//    public AdaugProdusClient(Person person, Product[] products) {
//        this.person = person;
//        this.products = products;
//    }
}
