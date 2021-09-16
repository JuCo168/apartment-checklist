package com.apartmentchecklist.apartmentchecklist.resource;

import java.util.List;

import com.apartmentchecklist.apartmentchecklist.model.Tenant;
import com.apartmentchecklist.apartmentchecklist.service.TenantService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/tenant")
public class TenantResource {
    private final TenantService tenantService;

    public TenantResource(TenantService tenantService) {
        this.tenantService = tenantService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Tenant>> getAllTenants() {
        List<Tenant> tenants = tenantService.listTenants();
        return new ResponseEntity<>(tenants, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<Tenant> getTenantById(@PathVariable("id") Long id) {
        Tenant tenant = tenantService.findTenant(id);
        return new ResponseEntity<>(tenant, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Tenant> addTenant(@RequestBody Tenant tenant) {
        Tenant newTenant = tenantService.addTenant(tenant);
        return new ResponseEntity<>(newTenant, HttpStatus.CREATED);
    }
    
    @PutMapping("/update")
    public ResponseEntity<Tenant> updateTenant(@RequestBody Tenant tenant) {
        Tenant updateTenant = tenantService.updateTenant(tenant);
        return new ResponseEntity<>(updateTenant, HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteTenant(@PathVariable("id") Long id) {
        tenantService.deleteTenant(id); 
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
