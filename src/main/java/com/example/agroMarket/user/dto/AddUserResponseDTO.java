package com.example.agroMarket.user.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@Data
@NoArgsConstructor
public class AddUserResponseDTO {
    private String message;
    private HttpStatus status;
}
