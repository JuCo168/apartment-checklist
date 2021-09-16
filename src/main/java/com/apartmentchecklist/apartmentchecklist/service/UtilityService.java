package com.apartmentchecklist.apartmentchecklist.service;

import java.util.List;

import com.apartmentchecklist.apartmentchecklist.exception.UtilityNotFoundException;
import com.apartmentchecklist.apartmentchecklist.model.Utility;
import com.apartmentchecklist.apartmentchecklist.repo.UtilityRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UtilityService {
    private final UtilityRepo utilityRepo;

    @Autowired
    public UtilityService(UtilityRepo utilityRepo) {
        this.utilityRepo = utilityRepo;
    }
    
    public Utility addUtility(Utility utility) {
        return utilityRepo.save(utility);
    }

    public List<Utility> listUtilities() {
        return utilityRepo.findAll();
    }

    public Utility updateUtility(Utility utility) {
        return utilityRepo.save(utility);
    }

    public Utility findUtility(Long id) {
        return utilityRepo.findUtilityById(id)
        .orElseThrow(() -> new UtilityNotFoundException ("Utility " + id + " does not exist"));
    }

    public void deleteUtility(Long id) {
        utilityRepo.deleteUtilityById(id);
    }
}
