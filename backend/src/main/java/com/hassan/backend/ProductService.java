package com.hassan.backend;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getProducts(){
        return productRepository.findAll();
    }

    public Product insertNewProduct(Product product){
        return productRepository.save(product);
    }

    public Product findProductById(Integer id) {
        return productRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Product not found with id: " + id));
    }

    public void deleteProductById(Integer id){
        Product product = productRepository.findById(id).orElseThrow(
                ()-> new ResourceNotFoundException("Product not found with id: " + id)
        );
        productRepository.delete(product);
    }

    public Product updateProduct(Integer id, Product updatedProduct) {
        Product existing = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id)
                );

        existing.setName(updatedProduct.getName());
        existing.setPrice(updatedProduct.getPrice());
        existing.setDescription(updatedProduct.getDescription());
        existing.setQuantity(updatedProduct.getQuantity());

        return productRepository.save(existing);
    }

}
