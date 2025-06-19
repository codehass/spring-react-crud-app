package com.hassan.backend;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/v1/products")
public class ProductController {
    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public List<Product> getAllProducts(){
        return productService.getProducts();
    }

    @PostMapping
    public ResponseEntity<Product> createProduct(@Valid @RequestBody Product product){
        return productService.insertNewProduct(product);
    }
}
