package com.example.TestProiectBackend.Repository;

import com.example.TestProiectBackend.Model.Cos;
import com.example.TestProiectBackend.Model.Employee;
import com.example.TestProiectBackend.Model.Masa;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MasaRepository extends CrudRepository<Masa, Integer> {
    Masa findFirstById(Integer id);
    Iterable<Masa> findAllById(Integer id);
}
