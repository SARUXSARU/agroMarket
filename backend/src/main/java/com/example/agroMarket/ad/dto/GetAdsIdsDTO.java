package com.example.agroMarket.ad.dto;

import com.example.agroMarket.ad.entity.AdEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.http.HttpStatus;

import java.util.List;

@AllArgsConstructor
@Data
public class GetAdsIdsDTO {
    private List<AdEntity> adsList;
    private String message;
    private HttpStatus httpStatus;

}
