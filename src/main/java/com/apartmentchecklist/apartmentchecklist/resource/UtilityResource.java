package com.apartmentchecklist.apartmentchecklist.resource;

import java.util.List;

import com.apartmentchecklist.apartmentchecklist.model.Utility;
import com.apartmentchecklist.apartmentchecklist.service.UtilityService;

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
@RequestMapping("/utility")
public class UtilityResource {
    private final UtilityService UtilitysService;

    public UtilityResource(UtilityService UtilitysService) {
        this.UtilitysService = UtilitysService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Utility>> getAllUtilitys() {
        List<Utility> Utilitys = UtilitysService.listUtilities();
        return new ResponseEntity<>(Utilitys, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<Utility> getUtilityById(@PathVariable("id") Long id) {
        Utility Utility = UtilitysService.findUtility(id);
        return new ResponseEntity<>(Utility, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Utility> addUtility(@RequestBody Utility Utility) {
        Utility newUtility = UtilitysService.addUtility(Utility);
        return new ResponseEntity<>(newUtility, HttpStatus.CREATED);
    }
    
    @PutMapping("/update")
    public ResponseEntity<Utility> updateUtility(@RequestBody Utility Utility) {
        Utility updateUtility = UtilitysService.updateUtility(Utility);
        return new ResponseEntity<>(updateUtility, HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteUtility(@PathVariable("id") Long id) {
        UtilitysService.deleteUtility(id); 
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
