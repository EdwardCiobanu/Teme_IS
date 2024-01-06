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
public class Cos {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer cosid;
    private Integer personid;
    private Integer productid;

    public Cos(Integer personid, Integer productid) {
        this.personid = personid;
        this.productid = productid;
    }
}
