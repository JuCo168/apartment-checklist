package com.apartmentchecklist.apartmentchecklist.exception;

public class ApplianceNotFoundException extends RuntimeException{
    public ApplianceNotFoundException(String message) {
        super(message);
    }
}
