package com.apartmentchecklist.apartmentchecklist.repo;

import java.util.Optional;

import com.apartmentchecklist.apartmentchecklist.model.Tenants;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

public interface TenantsRepo extends JpaRepository<Tenants, String>{

    @Transactional
    void deleteTenantsByName(String name);

    Optional<Tenants> findTenantsByName(String name);
    
}
    