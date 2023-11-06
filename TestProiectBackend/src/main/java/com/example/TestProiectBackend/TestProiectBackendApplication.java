package com.example.TestProiectBackend;

import com.example.TestProiectBackend.Model.Employee;
import com.example.TestProiectBackend.Repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@RequiredArgsConstructor
public class TestProiectBackendApplication {

	private final EmployeeRepository employeeRepository;
	public static void main(String[] args) {
		SpringApplication.run(TestProiectBackendApplication.class, args);

		Employee employee = new Employee(1, "Mihai", 2);
	}

}
