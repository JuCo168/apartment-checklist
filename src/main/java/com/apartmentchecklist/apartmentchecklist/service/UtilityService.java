package com.apartmentchecklist.apartmentchecklist.service;

import java.util.List;

import com.apartmentchecklist.apartmentchecklist.exception.UtilityNotFoundException;
import com.apartmentchecklist.apartmentchecklist.model.Utility;
import com.apartmentchecklist.apartmentchecklist.repo.UtilityRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UtilityService {
    private final UtilityRepo UtilitysRepo;

    @Autowired
    public UtilityService(UtilityRepo UtilitysRepo) {
        this.UtilitysRepo = UtilitysRepo;
    }
    
    public Utility addUtility(Utility Utility) {
        return UtilitysRepo.save(Utility);
    }

    public List<Utility> listUtilities() {
        return UtilitysRepo.findAll();
    }

    public Utility updateUtility(Utility Utility) {
        return UtilitysRepo.save(Utility);
    }

    public Utility findUtility(Long id) {
        return UtilitysRepo.findUtilityById(id)
        .orElseThrow(() -> new UtilityNotFoundException ("Utility " + id + " does not exist"));
    }

    public void deleteUtility(Long id) {
        UtilitysRepo.deleteUtilityById(id);
    }
}
