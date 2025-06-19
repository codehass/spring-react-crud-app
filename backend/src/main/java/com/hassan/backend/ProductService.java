package com.hassan.backend;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    public Product findProductById(Integer id) {
        return productRepository.findById(id).orElseThrow(()-> new IllegalStateException("Product not found with id: " + id));
    }

    public ResponseEntity<Void> deleteProductById(Integer id){
        productRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
