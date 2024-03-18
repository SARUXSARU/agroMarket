package com.example.agroMarket.exception;

import org.springframework.http.HttpStatus;

public class UserWithThisEmailExistException extends GlobalException {
    private final static HttpStatus defaultHttpStatus = HttpStatus.BAD_REQUEST;

    public UserWithThisEmailExistException(String message) {
        super(message, defaultHttpStatus);
    }
}
