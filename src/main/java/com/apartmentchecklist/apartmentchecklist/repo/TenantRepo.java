package com.apartmentchecklist.apartmentchecklist.repo;

import java.util.Optional;

import com.apartmentchecklist.apartmentchecklist.model.Tenant;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

public interface TenantRepo extends JpaRepository<Tenant, Long>{

    @Transactional
    void deleteTenantById(Long id);

    Optional<Tenant> findTenantById(Long id);
    
}
    