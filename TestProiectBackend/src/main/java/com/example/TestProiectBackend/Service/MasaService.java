package com.example.TestProiectBackend.Service;

import com.example.TestProiectBackend.Model.Employee;
import com.example.TestProiectBackend.Model.Masa;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface MasaService {
    Masa findFirstById(Integer id);
    public String Insert(Masa masa);
    public Masa ReadById(Integer id);
    public List<Masa> getAllMese();
    public void DeleteById(Integer id);
    public String Delete(Masa masa);
    public String Save(Masa masa);
}
