package com.example.TestProiectBackend.Service;

import com.example.TestProiectBackend.Model.Employee;
import com.example.TestProiectBackend.Model.EmployeeHelp;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface EmployeeService {
    Employee findFirstById(Integer id);
    public String Insert(Employee employee);
    public Employee ReadById(Integer id);
    public List<Employee> getAllEmployees();
    public void DeleteById(Integer id);
    public String Delete(Employee employee);
    public Employee findByEmail(String email);
    public Employee login(EmployeeHelp credentials);
    public String Save(Employee employee);
}
