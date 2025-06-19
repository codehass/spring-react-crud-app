package com.hassan.backend;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.*;

import java.math.BigDecimal;

@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotBlank(message = "Product name must not be blank")
    @Size(max = 100, message = "Product name must be at most 100 characters")
    private String name;

    @NotNull(message = "Price is required")
    @DecimalMin(value="0.0", inclusive= false, message= "Price must be grater than 0")
    private BigDecimal price;

    @Size(max=500, message="Description must be at most 500 characters")
    private String description;

    @NotNull(message = "Quantity is required")
    @Min(value=0, message="Quantity cannot be negative")
    private Integer quantity;

    public Product() {
    }

    public Product(Integer id, String name, BigDecimal price, String description, Integer quantity) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
        this.quantity = quantity;
    }

    public Integer getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public String getDescription() {
        return description;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public void setName(String name) {
        this.name = name;
    }
}
