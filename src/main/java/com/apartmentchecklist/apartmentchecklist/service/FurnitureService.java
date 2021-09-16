package com.apartmentchecklist.apartmentchecklist.service;

import java.util.List;

import com.apartmentchecklist.apartmentchecklist.exception.FurnitureNotFoundException;
import com.apartmentchecklist.apartmentchecklist.model.Furniture;
import com.apartmentchecklist.apartmentchecklist.repo.FurnitureRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FurnitureService {
    private final FurnitureRepo furnitureRepo;

    @Autowired
    public FurnitureService(FurnitureRepo furnitureRepo) {
        this.furnitureRepo = furnitureRepo;
    }
    
    public Furniture addFurniture(Furniture furniture) {
        return furnitureRepo.save(furniture);
    }

    public List<Furniture> listFurniture() {
        return furnitureRepo.findAll();
    }

    public Furniture updateFurniture(Furniture furniture) {
        return furnitureRepo.save(furniture);
    }

    public Furniture findFurniture(Long id) {
        return furnitureRepo.findFurnitureById(id)
        .orElseThrow(() -> new FurnitureNotFoundException ("Furniture " + id + " does not exist"));
    }

    public void deleteFurniture(Long id) {
        furnitureRepo.deleteFurnitureById(id);
    }
}
