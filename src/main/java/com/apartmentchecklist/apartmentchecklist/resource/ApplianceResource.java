package com.apartmentchecklist.apartmentchecklist.resource;

import java.util.List;

import com.apartmentchecklist.apartmentchecklist.model.Appliance;
import com.apartmentchecklist.apartmentchecklist.service.ApplianceService;

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
@RequestMapping("/appliance")
public class ApplianceResource {
    private final ApplianceService applianceService;

    public ApplianceResource(ApplianceService applianceService) {
        this.applianceService = applianceService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Appliance>> getAllAppliances() {
        List<Appliance> Appliances = applianceService.listAppliances();
        return new ResponseEntity<>(Appliances, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<Appliance> getApplianceById(@PathVariable("id") Long id) {
        Appliance Appliance = applianceService.findAppliance(id);
        return new ResponseEntity<>(Appliance, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Appliance> addAppliance(@RequestBody Appliance appliance) {
        Appliance newAppliance = applianceService.addAppliance(appliance);
        return new ResponseEntity<>(newAppliance, HttpStatus.CREATED);
    }
    
    @PutMapping("/update")
    public ResponseEntity<Appliance> updateAppliance(@RequestBody Appliance appliance) {
        Appliance updateAppliance = applianceService.updateAppliance(appliance);
        return new ResponseEntity<>(updateAppliance, HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteAppliance(@PathVariable("id") Long id) {
        applianceService.deleteAppliance(id); 
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
