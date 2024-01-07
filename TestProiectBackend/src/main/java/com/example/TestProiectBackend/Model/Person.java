package com.example.TestProiectBackend.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Person {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private String nume;
    private Integer age;
//    @OneToMany
//    private List<Masa> mese;
    @OneToMany
    private List<Cos> cosuri;

    public Person(String nume, Integer age) {
        this.nume = nume;
        this.age = age;
    }
}
