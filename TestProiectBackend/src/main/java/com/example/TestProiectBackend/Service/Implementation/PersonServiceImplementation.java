package com.example.TestProiectBackend.Service.Implementation;

import com.example.TestProiectBackend.Model.Employee;
import com.example.TestProiectBackend.Model.Masa;
import com.example.TestProiectBackend.Model.Person;
import com.example.TestProiectBackend.Model.Product;
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
    public String Insert(Person person) {
        if(person.getId() == null || person.getNume().isEmpty() || person.getAge() == null){
            return ("All fields are required");
        }
        else {
            personRepository.save(person);
            System.out.println(person);
            return ("Person added succesfully");
        }

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
    public String Delete(Person person){
        if(person.getNume().isEmpty()) {
            return ("Person needed to be deleted");
        }
        else{
            personRepository.delete(person);
            return ("Person deleted succesfully");
        }
    }

    public String Save(Person person) {
        System.out.println(person.getId());
        System.out.println(person.getAge());
        System.out.println(person.getNume());
        if(person.getNume().isEmpty() || person.getAge() == null){
            //System.out.println("Date insuficiente");
            return ("Name and age fields are required / Select a person");
        }
        else{
            personRepository.save(person);
            return ("Infos updated succesfully");
            //System.out.println(employee);
        }
    }


    @Override
    public Person findFirstByNume(String nume){
        return personRepository.findFirstByNume(nume);
    }

}
