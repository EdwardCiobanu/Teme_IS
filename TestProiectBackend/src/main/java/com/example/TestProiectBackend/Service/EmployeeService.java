package com.example.TestProiectBackend.Service;

import com.example.TestProiectBackend.Model.Employee;
import org.springframework.stereotype.Component;

@Component
public interface EmployeeService {
    Employee findFirstById(Integer id);
    public void Insert(Employee employee);
    public Employee ReadById(Integer id);
}
