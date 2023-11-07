package com.example.TestProiectBackend.Service;

import com.example.TestProiectBackend.Model.Employee;
import com.example.TestProiectBackend.Model.Person;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface PersonService {

    Person findFirstById(Integer id);
    public void Insert(Person person);
    public Person ReadById(Integer id);
    public List<Person> getAllPersons();
    public void DeleteById(Integer id);
    public void Delete(Person person);
}
