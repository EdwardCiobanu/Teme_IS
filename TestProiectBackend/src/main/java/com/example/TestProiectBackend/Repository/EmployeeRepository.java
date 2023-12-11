package com.example.TestProiectBackend.Repository;

import com.example.TestProiectBackend.Model.Employee;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmployeeRepository extends CrudRepository<Employee, Integer> {
    Employee findFirstById(Integer id);
    List<Employee> findAllByNume(String nume);
    List<Employee> findAllByIdAfter(Integer id);
    Employee findByEmail(String email);

    // in repouri pun doar cele care nu sunt default
    // save, update(aceeasi chestie cu update), delete, find all sunt default
}
