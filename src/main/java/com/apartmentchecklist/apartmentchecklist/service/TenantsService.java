package com.apartmentchecklist.apartmentchecklist.service;

import java.util.List;
import java.util.UUID;

import com.apartmentchecklist.apartmentchecklist.exception.TenantNotFoundException;
import com.apartmentchecklist.apartmentchecklist.model.Tenants;
import com.apartmentchecklist.apartmentchecklist.repo.TenantsRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TenantsService {
    private final TenantsRepo tenantsRepo;

    @Autowired
    public TenantsService(TenantsRepo tenantsRepo) {
        this.tenantsRepo = tenantsRepo;
    }
    
    public Tenants addTenant(Tenants tenant) {
        tenant.setName(UUID.randomUUID().toString());
        return tenantsRepo.save(tenant);
    }

    public List<Tenants> listTenants() {
        return tenantsRepo.findAll();
    }

    public Tenants updateTenant(Tenants tenant) {
        return tenantsRepo.save(tenant);
    }

    public Tenants findTenant(String name) {
        return tenantsRepo.findTenantsByName(name)
        .orElseThrow(() -> new TenantNotFoundException ("Tenant " + name + " does not exist"));
    }

    public void removeTenant(String name) {
        tenantsRepo.deleteTenantsByName(name);
    }
}
