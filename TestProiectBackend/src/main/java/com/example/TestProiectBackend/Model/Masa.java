package com.example.TestProiectBackend.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Masa {
    @Id
    private Integer id;
    private Integer nrLocuri;
    @OneToMany
    private List<Person> persons;
}
