package com.apartmentchecklist.apartmentchecklist.service;

import java.util.List;

import com.apartmentchecklist.apartmentchecklist.exception.TenantNotFoundException;
import com.apartmentchecklist.apartmentchecklist.model.Tenant;
import com.apartmentchecklist.apartmentchecklist.repo.TenantRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TenantService {
    private final TenantRepo tenantRepo;

    @Autowired
    public TenantService(TenantRepo tenantRepo) {
        this.tenantRepo = tenantRepo;
    }
    
    public Tenant addTenant(Tenant tenant) {
        return tenantRepo.save(tenant);
    }

    public List<Tenant> listTenants() {
        return tenantRepo.findAll();
    }

    public Tenant updateTenant(Tenant tenant) {
        return tenantRepo.save(tenant);
    }

    public Tenant findTenant(Long id) {
        return tenantRepo.findTenantById(id)
        .orElseThrow(() -> new TenantNotFoundException ("Tenant " + id + " does not exist"));
    }

    public void deleteTenant(Long id) {
        tenantRepo.deleteTenantById(id);
    }
}
