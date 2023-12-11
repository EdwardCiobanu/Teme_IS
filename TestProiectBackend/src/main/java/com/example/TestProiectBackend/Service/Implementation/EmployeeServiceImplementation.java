package com.example.TestProiectBackend.Service.Implementation;

import com.example.TestProiectBackend.Model.Employee;
import com.example.TestProiectBackend.Repository.EmployeeRepository;
import com.example.TestProiectBackend.Service.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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

    @Override
    public List<Employee> getAllEmployees() {
        return (List<Employee>) employeeRepository.findAll();
    }

    @Override
    public void DeleteById(Integer id){
        employeeRepository.deleteById(id);
    }

    @Override
    public void Delete(Employee employee){
        employeeRepository.delete(employee);
    }


    public Employee findByEmail(String email) { return employeeRepository.findByEmail(email); }
}
