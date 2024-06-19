package com.example.agroMarket.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;


@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(GlobalException.class)
    public final ResponseEntity<ErrResponse> somethingWentWrong(GlobalException exception) {
        ErrResponse errorResponse = new ErrResponse(exception.getMessage(), exception.getStatus());
        return new ResponseEntity<>(errorResponse, exception.getStatus());
    }
}
