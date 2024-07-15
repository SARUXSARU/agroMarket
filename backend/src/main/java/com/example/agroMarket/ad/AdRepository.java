package com.example.agroMarket.ad;

import com.example.agroMarket.ad.entity.AdEntity;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface AdRepository extends MongoRepository<AdEntity, String> {
    Optional<AdEntity> findAdEntityBy_id(ObjectId id);

    void deleteAdEntityBy_id(ObjectId _id);

}
