package com.apartmentchecklist.apartmentchecklist.service;

import java.util.List;

import com.apartmentchecklist.apartmentchecklist.exception.MiscNotFoundException;
import com.apartmentchecklist.apartmentchecklist.model.Misc;
import com.apartmentchecklist.apartmentchecklist.repo.MiscRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MiscService {
    private final MiscRepo furnitureRepo;

    @Autowired
    public MiscService(MiscRepo furnitureRepo) {
        this.furnitureRepo = furnitureRepo;
    }
    
    public Misc addMisc(Misc furniture) {
        return furnitureRepo.save(furniture);
    }

    public List<Misc> listMisc() {
        return furnitureRepo.findAll();
    }

    public Misc updateMisc(Misc furniture) {
        return furnitureRepo.save(furniture);
    }

    public Misc findMisc(Long id) {
        return furnitureRepo.findMiscById(id)
        .orElseThrow(() -> new MiscNotFoundException ("Misc " + id + " does not exist"));
    }

    public void deleteMisc(Long id) {
        furnitureRepo.deleteMiscById(id);
    }
}
