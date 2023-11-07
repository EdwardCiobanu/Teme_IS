package com.example.TestProiectBackend.Service.Implementation;

import com.example.TestProiectBackend.Model.Employee;
import com.example.TestProiectBackend.Model.Masa;
import com.example.TestProiectBackend.Repository.EmployeeRepository;
import com.example.TestProiectBackend.Repository.MasaRepository;
import com.example.TestProiectBackend.Service.MasaService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MasaServiceImplementation implements MasaService {
    private final MasaRepository masaRepository;
    //@Autowired
    //private EmployeeRepository employeeRepository;

    @Override
    public Masa findFirstById(Integer id){
        return masaRepository.findFirstById(id);
    }

    @Override
    public void Insert(Masa masa) {
        masaRepository.save(masa);
    }

    @Override
    public Masa ReadById(Integer id) {
        Masa masa = masaRepository.findFirstById(id);
        return masa;
    }

    @Override
    public List<Masa> getAllMese() {
        return (List<Masa>) masaRepository.findAll();
    }

    @Override
    public void DeleteById(Integer id){
        masaRepository.deleteById(id);
    }

    @Override
    public void Delete(Masa masa){
        masaRepository.delete(masa);
    }


}
