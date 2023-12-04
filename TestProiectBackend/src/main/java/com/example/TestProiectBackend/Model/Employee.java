package com.example.TestProiectBackend.Model;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Employee {
    @Id
    private Integer id;
    private String nume;
    private Integer rol;
    private String email;
    private String password;
    @OneToOne
    private Masa masa;

    public Employee(Integer id, String nume, Integer rol, String email, String password) {
        this.id = id;
        this.nume = nume;
        this.rol = rol;
        this.email = email;
        this.password = password;
    }

    //    @ManyToMany
//    private List<Masa> mese;
}
