package com.example.TestProiectBackend.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import lombok.*;

import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Product {
    @Id
    // Pentru auto increment id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String nume;
    private Integer price;
//    @OneToMany
//    private List<Person> persons;
    @OneToMany
    private List<Cos> cosuri;
}
