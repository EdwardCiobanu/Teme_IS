package com.example.TestProiectBackend.Service;

import com.example.TestProiectBackend.Model.Employee;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface EmployeeService {
    Employee findFirstById(Integer id);
    public void Insert(Employee employee);
    public Employee ReadById(Integer id);
    public List<Employee> getAllEmployees();
    public void DeleteById(Integer id);
    public void Delete(Employee employee);
}
