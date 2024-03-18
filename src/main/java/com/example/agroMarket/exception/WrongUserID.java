package com.example.agroMarket.exception;

import org.springframework.http.HttpStatus;

public class WrongUserID extends GlobalException {
    private final static HttpStatus defaultHttpStatus = HttpStatus.BAD_REQUEST;
    public WrongUserID(String message) {
        super(message, defaultHttpStatus);
    }
}
