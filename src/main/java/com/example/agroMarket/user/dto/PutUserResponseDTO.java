package com.example.agroMarket.user.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@Data
public class PutUserResponseDTO {

    private String message;
    private HttpStatus status;
}
