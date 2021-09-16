package com.apartmentchecklist.apartmentchecklist.resource;

import java.util.List;

import com.apartmentchecklist.apartmentchecklist.model.Misc;
import com.apartmentchecklist.apartmentchecklist.service.MiscService;

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
@RequestMapping("/misc")
public class MiscResource {
    private final MiscService miscService;

    public MiscResource(MiscService miscService) {
        this.miscService = miscService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Misc>> getAllMiscs() {
        List<Misc> Misc = miscService.listMisc();
        return new ResponseEntity<>(Misc, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<Misc> getMiscById(@PathVariable("id") Long id) {
        Misc Misc = miscService.findMisc(id);
        return new ResponseEntity<>(Misc, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Misc> addMisc(@RequestBody Misc misc) {
        Misc newMisc = miscService.addMisc(misc);
        return new ResponseEntity<>(newMisc, HttpStatus.CREATED);
    }
    
    @PutMapping("/update")
    public ResponseEntity<Misc> updateMisc(@RequestBody Misc misc) {
        Misc updateMisc = miscService.updateMisc(misc);
        return new ResponseEntity<>(updateMisc, HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteMisc(@PathVariable("id") Long id) {
        miscService.deleteMisc(id); 
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
