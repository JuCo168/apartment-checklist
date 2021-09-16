package com.apartmentchecklist.apartmentchecklist.repo;

import java.util.Optional;

import com.apartmentchecklist.apartmentchecklist.model.Misc;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

public interface MiscRepo extends JpaRepository<Misc, Long>{

    @Transactional
    void deleteMiscById(Long id);

    Optional<Misc> findMiscById(Long id);
    
}
    