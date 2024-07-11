package com.example.agroMarket.user.entity;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document("user")
@AllArgsConstructor
@Data
public class UserEntity {
    @Id
    private ObjectId _id;
   // private String name;
    private String authCode;
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private List<String> userAd;
    private List<String> favourite;
}
