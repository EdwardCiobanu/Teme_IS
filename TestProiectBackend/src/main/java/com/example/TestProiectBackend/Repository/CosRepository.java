package com.example.TestProiectBackend.Repository;

import com.example.TestProiectBackend.Model.Cos;
import com.example.TestProiectBackend.Model.Employee;
import com.example.TestProiectBackend.Model.Product;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CosRepository extends CrudRepository<Cos, Integer> {
    Cos findFirstByCosid(Integer id);

    Iterable<Cos> findAllByPersonid(Integer id);

    // in repouri pun doar cele care nu sunt default
    // save, update(aceeasi chestie cu update), delete, find all sunt default
}
