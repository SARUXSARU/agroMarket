package com.example.agroMarket.ad.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@AllArgsConstructor
@Data
public class AdDTO {
    @Size(min=2)
    private String title;
    @DecimalMin("0.0")
    private double price;
    @Size(min=0, max=3)
    private List<String> images;
    @Min(1)
    @Max(5)
    private int category; //
    @Size(min=5, max=350)
    private String description; // max length 350
}
