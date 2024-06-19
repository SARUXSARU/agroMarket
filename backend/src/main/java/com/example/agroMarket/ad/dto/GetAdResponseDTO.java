package com.example.agroMarket.ad.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.http.HttpStatus;
@AllArgsConstructor
@Data
public class GetAdResponseDTO {
    private AdDTO adDTO;
    private String message;
    private HttpStatus httpStatus;
}
