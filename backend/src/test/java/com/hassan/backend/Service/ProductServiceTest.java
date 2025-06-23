package com.hassan.backend.Service;

import com.hassan.backend.Model.Product;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;

import com.hassan.backend.Repository.ProductRepository;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.math.BigDecimal;
import java.util.List;

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
    }

    @Test
    void findProductById() {
    }

    @Test
    void deleteProductById() {
    }

    @Test
    void updateProduct() {
    }
}