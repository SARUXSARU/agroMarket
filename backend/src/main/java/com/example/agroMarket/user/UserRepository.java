package com.example.agroMarket.user;

import com.example.agroMarket.user.entity.UserEntity;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserRepository extends MongoRepository<UserEntity, String> {
    Optional<UserEntity> findUserEntityBy_id(ObjectId _id);

    Optional<UserEntity> findUserEntityByEmailAndAuthCode(String email, String authCode);

    void deleteUserEntityBy_id(ObjectId _id);

    Optional<Object> findUserEntityByEmailOrName(String email, String name);
}
