package com.apartmentchecklist.apartmentchecklist.service;

import java.util.List;

import com.apartmentchecklist.apartmentchecklist.exception.ApplianceNotFoundException;
import com.apartmentchecklist.apartmentchecklist.model.Appliance;
import com.apartmentchecklist.apartmentchecklist.repo.ApplianceRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ApplianceService {
    private final ApplianceRepo applianceRepo;

    @Autowired
    public ApplianceService(ApplianceRepo applianceRepo) {
        this.applianceRepo = applianceRepo;
    }
    
    public Appliance addAppliance(Appliance appliance) {
        return applianceRepo.save(appliance);
    }

    public List<Appliance> listAppliances() {
        return applianceRepo.findAll();
    }

    public Appliance updateAppliance(Appliance appliance) {
        return applianceRepo.save(appliance);
    }

    public Appliance findAppliance(Long id) {
        return applianceRepo.findApplianceById(id)
        .orElseThrow(() -> new ApplianceNotFoundException ("Appliance " + id + " does not exist"));
    }

    public void deleteAppliance(Long id) {
        applianceRepo.deleteApplianceById(id);
    }
}
