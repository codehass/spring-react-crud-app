package com.hassan.backend.Service;

import com.hassan.backend.Model.Product;
import com.hassan.backend.exceptions.ResourceNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import static org.junit.jupiter.api.Assertions.assertThrows;
import org.mockito.InjectMocks;
import org.mockito.Mock;

import com.hassan.backend.Repository.ProductRepository;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@ExtendWith(MockitoExtension.class)
class ProductServiceTest {
    // In your test class
    @BeforeEach
    void setUp() {
        Mockito.framework().clearInlineMock(this);
    }

    @InjectMocks
    private ProductService productService;

    @Mock
    private ProductRepository productRepository;


    @Test
     void getProducts(){
        // Arrange
        Product product1 = new Product();
        product1.setName("A");
        product1.setPrice(BigDecimal.valueOf(10.99));
        product1.setDescription("A product description");
        product1.setQuantity(10);

        Product product2 = new Product();
        product2.setName("B");
        product2.setPrice(BigDecimal.valueOf(20.99));
        product2.setDescription("B product description");
        product2.setQuantity(5);

        List<Product> expectedProducts = List.of(product1, product2);
        when(productRepository.findAll()).thenReturn(expectedProducts);

        //Act
        List<Product> actualProducts = productService.getProducts();

        //Assert
        // verifies the list size
        assertEquals(expectedProducts.size(), actualProducts.size());

        // Verify the repository was called once
        verify(productRepository, times(1)).findAll();

        // Verify the properties of the product
        Product expected = expectedProducts.get(0);
        Product actual = actualProducts.get(0);
        assertEquals(expected.getName(), actual.getName());
        assertEquals(expected.getPrice(), actual.getPrice());
        assertEquals(expected.getDescription(), actual.getDescription());
        assertEquals(expected.getQuantity(), actual.getQuantity());
    }

    @Test
    void getAllProducts_shouldReturnEmptyList_whenNoProductsExist() {
        // Arrange
        when(productRepository.findAll()).thenReturn(List.of());

        // Act
        List<Product> result = productService.getProducts();

        // Assert
        assertNotNull(result);
        assertTrue(result.isEmpty(), "Expected the result list to be empty");
        verify(productRepository, times(1)).findAll();
    }

    @Test
    void insertNewProduct() {
        //Arrange
        Product newProduct = new Product();
        newProduct.setName("Product A");
        newProduct.setPrice(BigDecimal.valueOf(15.99));
        newProduct.setDescription("Description product A");
        newProduct.setQuantity(20);

        when(productRepository.save(any(Product.class))).thenReturn(newProduct);

        //Act
        Product savedProduct = productService.insertNewProduct(newProduct);

        //Assert
        assertNotNull(savedProduct);
        assertEquals(newProduct.getName(), savedProduct.getName());
        assertEquals(newProduct.getPrice(), savedProduct.getPrice());
        assertEquals(newProduct.getDescription(), savedProduct.getDescription());
        assertEquals(newProduct.getQuantity(), savedProduct.getQuantity());

        verify(productRepository, times(1)).save(newProduct);
    }

    @Test
    void findProductById() {
        // Arrange
        Product product = new Product();
        product.setName("Product A");
        product.setPrice(BigDecimal.valueOf(10.99));
        product.setDescription("Description A");
        product.setQuantity(5);

        when(productRepository.findById(1)).thenReturn(Optional.of(product));

        // Act
        Product foundProduct = productService.findProductById(1);

        // Assert
        assertNotNull(foundProduct);
        assertEquals(product.getName(), foundProduct.getName());
        assertEquals(product.getPrice(), foundProduct.getPrice());
        assertEquals(product.getDescription(), foundProduct.getDescription());
        assertEquals(product.getQuantity(), foundProduct.getQuantity());

        verify(productRepository, times(1)).findById(1);
    }

    @Test
    void deleteProductById() {
        // Arrange
        Product product = new Product();
        product.setName("Product A");
        product.setPrice(BigDecimal.valueOf(9.99));
        product.setDescription("Description product A");
        product.setQuantity(3);
        
        when(productRepository.findById(1)).thenReturn(Optional.of(product));
        doNothing().when(productRepository).delete(any(Product.class));

        // Act
        productService.deleteProductById(1);

        // Assert
        verify(productRepository, times(1)).findById(1);
        verify(productRepository, times(1)).delete(product);
    
        verify(productRepository, times(1)).delete(product);
    }

    @Test
    void findProductById_shouldThrowException_whenProductNotFound() {
        when(productRepository.findById(99)).thenReturn(Optional.empty());
        assertThrows(ResourceNotFoundException.class, () -> productService.findProductById(99));
    }

    @Test
    void updateProduct() {
        // Arrange
        Product existingProduct = new Product();
        existingProduct.setName("Product A");
        existingProduct.setPrice(BigDecimal.valueOf(19.99));
        existingProduct.setDescription("A product description");
        existingProduct.setQuantity(10);

        Product updatedProduct = new Product();
        updatedProduct.setName("Product B");
        updatedProduct.setPrice(BigDecimal.valueOf(29.99));
        updatedProduct.setDescription("B product description");
        updatedProduct.setQuantity(15);

        when(productRepository.findById(1)).thenReturn(Optional.of(existingProduct));
        when(productRepository.save(any(Product.class))).thenReturn(updatedProduct);

        // Act
        Product result = productService.updateProduct(1, updatedProduct);

        // Assert
        assertNotNull(result);
        assertEquals(updatedProduct.getName(), result.getName());
        assertEquals(updatedProduct.getPrice(), result.getPrice());
        assertEquals(updatedProduct.getDescription(), result.getDescription());
        assertEquals(updatedProduct.getQuantity(), result.getQuantity());

        verify(productRepository, times(1)).findById(1);
        verify(productRepository, times(1)).save(any(Product.class));
    }
}