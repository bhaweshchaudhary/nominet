package com.hyperxenc.nominet.auth.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;
    
    public void sendVeificationEmail(String email, String token) {
        String verificationUrl = "http://localhost:8080/auth/verify-email?token=" + token;

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Verify your email address");
        message.setText("Click the link below to verify your email:\n" + verificationUrl);

        mailSender.send(message);
    }
}
