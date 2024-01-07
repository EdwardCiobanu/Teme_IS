package com.example.TestProiectBackend.DTO;

import com.example.TestProiectBackend.Model.Masa;
import com.example.TestProiectBackend.Model.Person;
import com.example.TestProiectBackend.Model.Product;
import lombok.Data;
import lombok.ToString;

import java.util.List;

@Data
@ToString
public class AdaugClientiMasa {
    private Masa masa;
    private List<Person> persons;
}
