package com.example.agroMarket.ad.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;


@AllArgsConstructor
@Data
@NoArgsConstructor
public class AddAdResponseDTO {
    private String message;
    private HttpStatus status;
}
