package com.apartmentchecklist.apartmentchecklist.repo;

import java.util.Optional;

import com.apartmentchecklist.apartmentchecklist.model.Furniture;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

public interface FurnitureRepo extends JpaRepository<Furniture, Long>{

    @Transactional
    void deleteFurnitureById(Long id);

    Optional<Furniture> findFurnitureById(Long id);
    
}
    