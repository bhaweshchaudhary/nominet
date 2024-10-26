package com.hyperxenc.nominet.auth.service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.hyperxenc.nominet.auth.model.User;
import com.hyperxenc.nominet.auth.repository.UserRepository;

@Service
public class AuthService {
    
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public User registerUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole("USER");
        user.setEmailVerified(false);

        // Generate verification token
        String token = UUID.randomUUID().toString();
        user.setVerificationToken(token);

        // Set token expiry time 
        user.setTokenExpiryDate(LocalDateTime.now().plusHours(24));

        // Save user with token
        User registeredUser = userRepository.save(user);

        // Send verification email
        sendVeificationEmail(user.getEmail(), token);

        return registeredUser;
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public void sendVeificationEmail(String email, String token) {
        emailService.sendVeificationEmail(email, token);
    }

    public boolean verifyEmail(String token) {
        Optional<User> userOptional = userRepository.findByVerificationToken(token);

        if (userOptional.isPresent()) {
            User user = userOptional.get();

            // Check if token is expired
            if (user.getTokenExpiryDate().isBefore(LocalDateTime.now())) {
                return false; // Token expired
            }

            user.setEmailVerified(true);
            user.setVerificationToken(null); // Clear token after verification
            user.setTokenExpiryDate(null); // Clear expiry date after verification

            userRepository.save(user);
            return true;
        }

        return false;
    }
}
