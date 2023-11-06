package com.example.TestProiectBackend.Service.Implementation;

import com.example.TestProiectBackend.Model.Employee;
import com.example.TestProiectBackend.Repository.EmployeeRepository;
import com.example.TestProiectBackend.Service.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmployeeServiceImplementation implements EmployeeService {
    private final EmployeeRepository employeeRepository;
    //@Autowired
    //private EmployeeRepository employeeRepository;

    @Override
    public Employee findFirstById(Integer id){
        return employeeRepository.findFirstById(id);
    }

    @Override
    public void Insert(Employee employee) {
        employeeRepository.save(employee);
    }

    @Override
    public Employee ReadById(Integer id) {
        Employee employee = employeeRepository.findFirstById(id);
        return employee;
    }


}
