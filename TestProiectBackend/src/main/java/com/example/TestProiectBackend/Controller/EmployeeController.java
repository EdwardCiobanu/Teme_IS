package com.example.TestProiectBackend.Controller;

import com.example.TestProiectBackend.DTO.ObiectNou;
import com.example.TestProiectBackend.Model.Employee;
import com.example.TestProiectBackend.Model.EmployeeHelp;
import com.example.TestProiectBackend.Service.Implementation.EmployeeServiceImplementation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

@RestController
@CrossOrigin
@RequestMapping("/Employee")
@RequiredArgsConstructor

public class EmployeeController {

    private final EmployeeServiceImplementation employeeServiceImplementation;
    private static final Logger logger = LoggerFactory.getLogger(EmployeeController.class);

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

    @GetMapping("/GetData")
    public String getMessage(){
        return "Ana are mere";
    }

    @PostMapping("/Print")
    public void printMessage(@RequestBody ObiectNou data){
        System.out.println(data);
    }
    @PostMapping("/Insert")
    public ResponseEntity<String> insert(@RequestBody Employee employee){
        if(employee.getNume().isEmpty() || employee.getRol() == null || employee.getEmail().isEmpty() || employee.getPassword().isEmpty()){
            //System.out.println("Date insuficiente");
            return ResponseEntity.badRequest().body("All fields are required");
        }
        else if (!isValidEmail(employee.getEmail())) {
            //System.out.println("Adresa de email incorecta");
            return ResponseEntity.badRequest().body("Invalid email address");
        }
        else{
            employeeServiceImplementation.Insert(employee);
            return ResponseEntity.ok("Account created succesfully");
            //System.out.println(employee);
        }
    }
    @PostMapping("/Login")
    public ResponseEntity<Object> login(@RequestBody EmployeeHelp employee) {
        String email = employee.getEmail();
        String password = employee.getPassword();

        if (email.isEmpty() || password.isEmpty()) {
            logger.error("Email or password is empty");
            return ResponseEntity.badRequest().body("Email or password is empty");
        }

        Employee employee1 = employeeServiceImplementation.findByEmail(email);

        if (employee1 != null && employee1.getPassword().equals(password)) {
            logger.info("Login successful for user with email: {}", email);
            return ResponseEntity.ok(employee1);
        } else {
            logger.warn("Invalid email or password for user with email: {}", email);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }
    }

    @PostMapping("/GetById")
    public ResponseEntity ReadByID(@RequestBody Integer id){
        Employee employee = employeeServiceImplementation.ReadById(id);
        return ResponseEntity.status(HttpStatus.OK).body(employee);
    }
}
