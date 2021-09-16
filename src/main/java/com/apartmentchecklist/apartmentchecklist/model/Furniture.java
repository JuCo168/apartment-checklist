package com.apartmentchecklist.apartmentchecklist.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Furniture implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false, updatable = false)
    private Long id;
    @Column(length = 20, updatable = true)
    private String name;
    private Double price;
    private String buyer;
    private String link;
    private String imageUrl;

    public Furniture() {}

    public Furniture(String name, Double price, String buyer, String link, String imageUrl) {
        this.name = name;
        this.price = price;
        this.buyer = buyer;
        this.link = link;
        this.imageUrl = imageUrl;
    }
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public Double getPrice() {
        return price;
    }
    public void setPrice(Double price) {
        this.price = price;
    }
    public String getBuyer() {
        return buyer;
    }
    public void setBuyer(String buyer) {
        this.buyer = buyer;
    }
    public String getLink() {
        return link;
    }
    public void setLink(String link) {
        this.link = link;
    }
    public String getImageUrl() {
        return imageUrl;
    }
    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
    @Override
    public String toString() {
        return "Furniture [id=" + id + ", imageUrl=" + imageUrl + ", link=" + link + ", name=" + name + ", price="
                + price + ", buyer=" + buyer + "]";
    }
}
