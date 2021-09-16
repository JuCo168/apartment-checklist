package com.apartmentchecklist.apartmentchecklist.resource;

import java.util.List;

import com.apartmentchecklist.apartmentchecklist.model.Furniture;
import com.apartmentchecklist.apartmentchecklist.service.FurnitureService;

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
@RequestMapping("/furniture")
public class FurnitureResource {
    private final FurnitureService furnitureService;

    public FurnitureResource(FurnitureService furnitureService) {
        this.furnitureService = furnitureService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Furniture>> getAllFurnitures() {
        List<Furniture> Furniture = furnitureService.listFurniture();
        return new ResponseEntity<>(Furniture, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<Furniture> getFurnitureById(@PathVariable("id") Long id) {
        Furniture Furniture = furnitureService.findFurniture(id);
        return new ResponseEntity<>(Furniture, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Furniture> addFurniture(@RequestBody Furniture furniture) {
        Furniture newFurniture = furnitureService.addFurniture(furniture);
        return new ResponseEntity<>(newFurniture, HttpStatus.CREATED);
    }
    
    @PutMapping("/update")
    public ResponseEntity<Furniture> updateFurniture(@RequestBody Furniture furniture) {
        Furniture updateFurniture = furnitureService.updateFurniture(furniture);
        return new ResponseEntity<>(updateFurniture, HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteFurniture(@PathVariable("id") Long id) {
        furnitureService.deleteFurniture(id); 
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
