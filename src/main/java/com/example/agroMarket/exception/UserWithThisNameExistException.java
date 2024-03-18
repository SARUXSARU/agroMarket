package com.example.agroMarket.exception;

import org.springframework.http.HttpStatus;

public class UserWithThisNameExistException extends GlobalException {
    private final static HttpStatus defaultHttpStatus = HttpStatus.BAD_REQUEST;
    public UserWithThisNameExistException(String message) {
        super(message, defaultHttpStatus);
    }
}
