package com.apartmentchecklist.apartmentchecklist.repo;

import java.util.Optional;

import com.apartmentchecklist.apartmentchecklist.model.Tenants;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TenantsRepo extends JpaRepository<Tenants, String>{

    void deleteTenantsByName(String name);

    Optional<Tenants> findTenantsByName(String name);
    
}
