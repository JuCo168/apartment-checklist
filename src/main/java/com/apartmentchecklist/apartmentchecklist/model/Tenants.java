package com.apartmentchecklist.apartmentchecklist.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Tenants implements Serializable{
    @Id
    @Column(length = 20, updatable = true)
    private String name;
    private String email;
    private String phone;
    private String imageUrl;

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Tenants() {}
    
    public Tenants(String name, String email, String phone) {
    this.name = name;
    this.email = email;
    this.phone = phone;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return this.phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    @Override
    public String toString() {
        return "Tenants [email=" + email + ", name=" + name + ", phone=" + phone + "]";
    }

}