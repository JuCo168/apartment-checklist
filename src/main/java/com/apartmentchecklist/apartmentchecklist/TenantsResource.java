package com.apartmentchecklist.apartmentchecklist;

import java.util.List;

import com.apartmentchecklist.apartmentchecklist.model.Tenants;
import com.apartmentchecklist.apartmentchecklist.service.TenantsService;

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
@RequestMapping("/tenants")
public class TenantsResource {
    private final TenantsService tenantsService;

    public TenantsResource(TenantsService tenantsService) {
        this.tenantsService = tenantsService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Tenants>> getAllTenants() {
        List<Tenants> tenants = tenantsService.listTenants();
        return new ResponseEntity<>(tenants, HttpStatus.OK);
    }

    @GetMapping("/find/{name}")
    public ResponseEntity<Tenants> getTenantByName(@PathVariable("name") String name) {
        Tenants tenant = tenantsService.findTenant(name);
        return new ResponseEntity<>(tenant, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Tenants> addTenant(@RequestBody Tenants tenant) {
        Tenants newTenant = tenantsService.addTenant(tenant);
        return new ResponseEntity<>(newTenant, HttpStatus.CREATED);
    }
    
    @PutMapping("/update")
    public ResponseEntity<Tenants> updateTenant(@RequestBody Tenants tenant) {
        Tenants updateTenant = tenantsService.updateTenant(tenant);
        return new ResponseEntity<>(updateTenant, HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteTenant(@PathVariable("name") String name) {
        tenantsService.deleteTenant(name); 
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
