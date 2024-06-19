package com.example.agroMarket.ad.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@Data
public class EditAdResponseDTO {
    private String message;
    private HttpStatus httpStatus;
}
