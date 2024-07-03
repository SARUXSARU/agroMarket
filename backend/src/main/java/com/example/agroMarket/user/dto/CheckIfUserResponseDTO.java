package com.example.agroMarket.user.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.http.HttpStatus;
@AllArgsConstructor
@Data
public class CheckIfUserResponseDTO {


    private UserDTO userDTO;
    private String _id;
    private String message;
    private HttpStatus status;
}
