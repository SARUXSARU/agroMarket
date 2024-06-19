package com.example.agroMarket.ad.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document("ad")
@AllArgsConstructor
@Data
public class AdEntity {
    @Id
    private ObjectId _id;
    private String title;
    private double price;
    private List<String> images;
    private int category; // min 1 max 5 (owoce/warzywa/zboża/miody/grzyby)
    private String description; // max length 350




}
