package com.example.agroMarket.user.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.validation.annotation.Validated;

import java.util.List;

@AllArgsConstructor
@Data
public class UserDTO {


    @NotBlank(message = "type nick name")
    private String name;
    @NotBlank(message = "type passsword")
    private String authCode;
    @NotBlank(message = "type first name")
    private String firstName;
    @NotBlank(message = "type last name")
    private String lastName;
    @NotBlank(message = "type email")
    @Email(message = "type right email")
    private String email;
//    private List<ObjectId> userAd;
//    private List<ObjectId> favourite;
}
