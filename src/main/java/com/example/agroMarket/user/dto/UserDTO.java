package com.example.agroMarket.user.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.bson.types.ObjectId;

import java.util.List;

@AllArgsConstructor
@Data
public class UserDTO {
    private String name;
    private String authCode;
    private String firstName;
    private String lastName;
    private String email;
//    private List<ObjectId> userAd;
//    private List<ObjectId> favourite;
}
