package com.example.agroMarket.user.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
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
    private String name;
    private String authCode;
    private String firstName;
    private String lastName;
    private String email;
//    private List<ObjectId> userAd;
//    private List<ObjectId> favourite;
}
