package com.example.TestProiectBackend.Repository;

import com.example.TestProiectBackend.Model.Employee;
import com.example.TestProiectBackend.Model.Person;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PersonRepository extends CrudRepository<Person, Integer> {
    Person findFirstById(Integer id);
    List<Person> findAllByNume(String nume);
}
