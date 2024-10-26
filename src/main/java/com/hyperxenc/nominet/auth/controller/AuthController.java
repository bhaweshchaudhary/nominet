package com.hyperxenc.nominet.auth.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hyperxenc.nominet.auth.model.User;
import com.hyperxenc.nominet.auth.service.AuthService;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        User registeredUser = authService.registerUser(user);
        return ResponseEntity.ok(registeredUser);
    }

    @GetMapping("/get-user/{email}")
    public ResponseEntity<?> getUser(@PathVariable String email) {
        Optional<User> user = authService.findByEmail(email);
        return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/verify-email")
    public ResponseEntity<?> verifyEmail(@RequestParam("token") String token) {
        // TODO: Implement email verification
        boolean isVerified = authService.verifyEmail(token);
        if (isVerified) {
            return ResponseEntity.ok().body("Email verified successfully");
        } else {
            return ResponseEntity.badRequest().body("Invalid or expired token");
        }
    }
}
