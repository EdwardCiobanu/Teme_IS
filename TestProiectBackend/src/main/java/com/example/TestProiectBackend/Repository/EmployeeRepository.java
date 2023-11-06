package com.example.TestProiectBackend.Repository;

import com.example.TestProiectBackend.Model.Employee;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmployeeRepository extends CrudRepository<Employee, Integer> {
    Employee findFirstById(Integer id);
    List<Employee> findAllByNume(String nume);
}
