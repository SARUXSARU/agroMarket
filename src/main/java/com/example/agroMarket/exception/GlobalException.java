package com.example.agroMarket.exception;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@Data
public class GlobalException extends RuntimeException{
    private final HttpStatus status;
    private final String message;

    public GlobalException(String message, HttpStatus status) {
        super(message);
        this.status = status;
        this.message = message;
    }
}
