package com.apartmentchecklist.apartmentchecklist.service;

import java.util.List;

import com.apartmentchecklist.apartmentchecklist.exception.TenantNotFoundException;
import com.apartmentchecklist.apartmentchecklist.model.Tenant;
import com.apartmentchecklist.apartmentchecklist.repo.TenantRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TenantService {
    private final TenantRepo tenantsRepo;

    @Autowired
    public TenantService(TenantRepo tenantsRepo) {
        this.tenantsRepo = tenantsRepo;
    }
    
    public Tenant addTenant(Tenant tenant) {
        return tenantsRepo.save(tenant);
    }

    public List<Tenant> listTenants() {
        return tenantsRepo.findAll();
    }

    public Tenant updateTenant(Tenant tenant) {
        return tenantsRepo.save(tenant);
    }

    public Tenant findTenant(Long id) {
        return tenantsRepo.findTenantById(id)
        .orElseThrow(() -> new TenantNotFoundException ("Tenant " + id + " does not exist"));
    }

    public void deleteTenant(Long id) {
        tenantsRepo.deleteTenantById(id);
    }
}
