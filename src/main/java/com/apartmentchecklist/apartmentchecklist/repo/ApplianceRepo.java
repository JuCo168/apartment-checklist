package com.apartmentchecklist.apartmentchecklist.repo;

import java.util.Optional;

import com.apartmentchecklist.apartmentchecklist.model.Appliance;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

public interface ApplianceRepo extends JpaRepository<Appliance, Long>{

    @Transactional
    void deleteApplianceById(Long id);

    Optional<Appliance> findApplianceById(Long id);
    
}
