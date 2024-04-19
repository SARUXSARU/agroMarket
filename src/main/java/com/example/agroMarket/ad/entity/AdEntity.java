package com.example.agroMarket.ad.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
@Document("ad")
@AllArgsConstructor
@Data
public class AdEntity {
    @Id
    private ObjectId _id;
    private String title;
    private double price;
//    private int category; // 1-4 frontend get number and show right cat name
//    private String description; // max length 500
   private byte[] img;




}
