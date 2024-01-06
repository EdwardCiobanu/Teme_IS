package com.example.TestProiectBackend.Service.Implementation;

import com.example.TestProiectBackend.Model.Employee;
import com.example.TestProiectBackend.Model.Masa;
import com.example.TestProiectBackend.Model.Product;
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
    public String Insert(Masa masa) {
        if(masa.getId() == null || masa.getNrLocuri() == null){
            return ("All fields are required");
        }
        else {
            masaRepository.save(masa);
            System.out.println(masa);
            return ("Table added succesfully");
        }

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
    public String Delete(Masa masa){
        if(masa.getNrLocuri() == 0 && masa.getId() == 0) {
            return ("Table needed to be deleted");
        }
        else{
            masaRepository.delete(masa);
            return ("Table deleted succesfully");
        }
    }


    public String Save(Masa masa) {
        System.out.println(masa.getId());
        System.out.println(masa.getNrLocuri());
        if(masa.getNrLocuri() == 0 && masa.getId() == 0){
            //System.out.println("Date insuficiente");
            return ("Numar de Locuri field is required / Select a table");
        }
        else{
            masaRepository.save(masa);
            return ("Infos updated succesfully");
            //System.out.println(employee);
        }
    }

}
