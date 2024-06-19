package com.example.agroMarket.user.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class UserLoginDTO {
    private String email;
    private String authCode;
}
