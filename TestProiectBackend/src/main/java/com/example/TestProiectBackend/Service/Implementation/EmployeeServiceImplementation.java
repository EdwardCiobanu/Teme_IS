package com.example.TestProiectBackend.Service.Implementation;

import com.example.TestProiectBackend.Model.Employee;
import com.example.TestProiectBackend.Model.EmployeeHelp;
import com.example.TestProiectBackend.Repository.EmployeeRepository;
import com.example.TestProiectBackend.Service.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class EmployeeServiceImplementation implements EmployeeService {
    private final EmployeeRepository employeeRepository;
    //@Autowired
    //private EmployeeRepository employeeRepository;

    private boolean isValidEmail(String email) {
        // Define a basic pattern for email validation
        String emailRegex = "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$";

        // Create a Pattern object
        Pattern pattern = Pattern.compile(emailRegex);

        // Create matcher object
        Matcher matcher = pattern.matcher(email);

        // Return whether the email matches the pattern
        return matcher.matches();
    }

    @Override
    public Employee findFirstById(Integer id){
        return employeeRepository.findFirstById(id);
    }

    @Override
    public String Insert(Employee employee) {
        if(employee.getNume().isEmpty() || employee.getRol() == null || employee.getEmail().isEmpty() || employee.getPassword().isEmpty()){
            //System.out.println("Date insuficiente");
            return ("All fields are required");
        }
        else if (!isValidEmail(employee.getEmail())) {
            //System.out.println("Adresa de email incorecta");
            return ("Invalid email address");
        }
        else{
            employeeRepository.save(employee);
            return ("Account created succesfully");
            //System.out.println(employee);
        }

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
    public Employee login(EmployeeHelp credentials) {
        String email = credentials.getEmail();
        String password = credentials.getPassword();

        if (email.isEmpty() || password.isEmpty()) {
            return null;
        }

        Employee employee1 = findByEmail(email);

        if (employee1 != null && employee1.getPassword().equals(password)) {
            return employee1;
        } else {
            return null;
        }
    }
}
