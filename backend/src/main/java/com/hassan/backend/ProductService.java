package com.hassan.backend;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    private ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getProducts(){
        return productRepository.findAll();
    }

    public ResponseEntity<Product> insertNewProduct(Product product){
        Product saved = productRepository.save(product);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }
}
