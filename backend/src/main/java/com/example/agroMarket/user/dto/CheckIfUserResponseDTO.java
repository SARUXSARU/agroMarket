package com.example.agroMarket.user.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.http.HttpStatus;
@AllArgsConstructor
@Data
public class CheckIfUserResponseDTO {
    private UserDTO userDTO;
    private String message;
    private HttpStatus status;
}
