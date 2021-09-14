package com.apartmentchecklist.apartmentchecklist.repo;

import java.util.Optional;

import com.apartmentchecklist.apartmentchecklist.model.Utility;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

public interface UtilityRepo extends JpaRepository<Utility, Long>{

    @Transactional
    void deleteUtilityById(Long id);

    Optional<Utility> findUtilityById(Long id);
    
}
    