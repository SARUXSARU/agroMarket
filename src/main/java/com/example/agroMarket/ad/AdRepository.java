package com.example.agroMarket.ad;

import com.example.agroMarket.ad.entity.AdEntity;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AdRepository extends MongoRepository<AdEntity,String> {

}
