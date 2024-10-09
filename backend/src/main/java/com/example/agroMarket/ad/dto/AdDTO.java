package com.example.agroMarket.ad.dto;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@AllArgsConstructor
@Data
public class AdDTO {
    @NotBlank
    @Size(min = 2)
    private String title;
    @NotBlank
    @DecimalMin("0.0")
    private double price;
    private String image;
    @NotBlank
    @Min(1)
    @Max(5)
    private int category;
    @NotBlank
    @Size(min = 5, max = 350)
    private String description;
    @NotBlank
    private String user_id;
}
