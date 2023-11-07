package com.example.TestProiectBackend.Service.Implementation;

import com.example.TestProiectBackend.Model.Employee;
import com.example.TestProiectBackend.Model.Person;
import com.example.TestProiectBackend.Repository.EmployeeRepository;
import com.example.TestProiectBackend.Repository.PersonRepository;
import com.example.TestProiectBackend.Service.PersonService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PersonServiceImplementation implements PersonService {
    private final PersonRepository personRepository;
    //@Autowired
    //private EmployeeRepository employeeRepository;

    @Override
    public Person findFirstById(Integer id){
        return personRepository.findFirstById(id);
    }

    @Override
    public void Insert(Person person) {
        personRepository.save(person);
    }

    @Override
    public Person ReadById(Integer id) {
        Person person = personRepository.findFirstById(id);
        return person;
    }

    @Override
    public List<Person> getAllPersons() {
        return (List<Person>) personRepository.findAll();
    }

    @Override
    public void DeleteById(Integer id){
        personRepository.deleteById(id);
    }

    @Override
    public void Delete(Person person){
        personRepository.delete(person);
    }


}
