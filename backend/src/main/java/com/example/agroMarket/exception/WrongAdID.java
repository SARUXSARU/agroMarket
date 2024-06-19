package com.example.agroMarket.exception;

import org.springframework.http.HttpStatus;

public class WrongAdID extends GlobalException {
    private final static HttpStatus defaultHttpStatus = HttpStatus.BAD_REQUEST;

    public WrongAdID(String message) {
        super(message, defaultHttpStatus);
    }

}
