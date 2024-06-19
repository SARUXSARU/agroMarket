package com.example.agroMarket.exception;

import lombok.*;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@Data
public class ErrResponse {
    private final String message;
    private final HttpStatus status;
}
