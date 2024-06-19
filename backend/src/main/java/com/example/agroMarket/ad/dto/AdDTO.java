package com.example.agroMarket.ad.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class AdDTO {
    private String title;
    private double price;
//    private String category;
//    private String description;
    private byte[] img;
}
