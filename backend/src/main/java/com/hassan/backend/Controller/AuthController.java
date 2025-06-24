package com.hassan.backend.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class AuthController {

    @GetMapping("/api/v1/me")
    public ResponseEntity<?> getCurrentUser(OAuth2AuthenticationToken authentication) {
        if (authentication == null) {
            return ResponseEntity.status(401).build();
        }

        String registrationId = authentication.getAuthorizedClientRegistrationId();
        Map<String, Object> attributes = authentication.getPrincipal().getAttributes();

        if ("github".equals(registrationId)) {
            return ResponseEntity.ok(Map.of(
                    "login", attributes.get("login"),
                    "name", attributes.get("name"),
                    "email", attributes.get("email"),
                    "avatar", attributes.get("avatar_url")
            ));
        } else if ("google".equals(registrationId)) {
            return ResponseEntity.ok(Map.of(
                    "login", attributes.get("email"),
                    "name", attributes.get("name"),
                    "email", attributes.get("email"),
                    "avatar", attributes.get("picture")
            ));
        } else {
            return ResponseEntity.status(400).body("Unsupported OAuth2 provider: " + registrationId);
        }
    }

}
