package com.example.agroMarket.user;

import com.example.agroMarket.ad.AdRepository;
import com.example.agroMarket.exception.UserWithThisNameExistException;
import com.example.agroMarket.exception.WrongUserID;
import com.example.agroMarket.user.dto.*;
import com.example.agroMarket.user.entity.UserEntity;
import lombok.AllArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@Service
public class UserService {
    private UserRepository userRepository;
    private AdRepository adRepository;

    // todo favourite as object id i think
    public AddUserResponseDTO addUser(UserDTO userDTO) {
        List<String> userAds = new ArrayList<>();
        List<String> userFavourite = new ArrayList<>();
        UserEntity userEntity = new UserEntity(null, userDTO.getAuthCode(), userDTO.getFirstName(), userDTO.getLastName(), userDTO.getEmail(), userDTO.getPhoneNumber(), userAds, userFavourite);
        if (userRepository.findUserEntityByEmail(userDTO.getEmail()).isPresent()) {
            throw new UserWithThisNameExistException("Already exist user with this email");
        }
        userRepository.save(userEntity);
        return new AddUserResponseDTO("ok", HttpStatus.ACCEPTED);
    }

    public GetUserResponseDTO getUser(String _id) {
        UserEntity userEntity = userRepository.findUserEntityBy_id(_id).
                orElseThrow(
                        () -> new WrongUserID("There is no user with this _id")
                );
        UserDTO userDTO = new UserDTO(userEntity.getAuthCode(),
                                        userEntity.getFirstName(),
                                        userEntity.getLastName(),
                                        userEntity.getEmail(),
                                        userEntity.getPhoneNumber(),
                                        userEntity.getUserAd(),
                                        userEntity.getFavourite());
        return new GetUserResponseDTO(userDTO, "ok", HttpStatus.OK);
    }


    public CheckIfUserResponseDTO checkIfUser(UserLoginDTO userLoginDTO) {
        UserEntity userEntity = userRepository.findUserEntityByEmailAndAuthCode(userLoginDTO.getEmail(), userLoginDTO.getAuthCode()).orElseThrow(() -> new WrongUserID("Email or password is wrong"));
        UserDTO userDTO = new UserDTO(userEntity.getAuthCode(), userEntity.getFirstName(), userEntity.getLastName(), userEntity.getEmail(), userEntity.getPhoneNumber(), userEntity.getUserAd(), userEntity.getFavourite());
        String _id = String.valueOf(userEntity.get_id());
        return new CheckIfUserResponseDTO(userDTO, _id, "ok", HttpStatus.OK);
    }


    public DeleteUserResponseDTO deleteUser(ObjectId _id) {
        UserEntity user = userRepository.findUserEntityBy_id(_id)
                .orElseThrow(() -> new WrongUserID("There is no user with this _id"));

        if (user.getUserAd() != null && !user.getUserAd().isEmpty()) {
            for (String adId : user.getUserAd()) {
                adRepository.deleteAdEntityBy_id(new ObjectId(adId));
            }
        }

        userRepository.deleteUserEntityBy_id(_id);
        return new DeleteUserResponseDTO("User deleted", HttpStatus.OK);
    }

    public PutUserResponseDTO putUser(UserDTO userDTO, ObjectId _id) {
        UserEntity userEntity = userRepository.findUserEntityBy_id(_id).orElseThrow(() -> new WrongUserID("There is no user with this _id"));

//        userEntity.setName(userDTO.getName() != null ? userDTO.getName() : userEntity.getName());
        userEntity.setFirstName(userDTO.getFirstName() != null ? userDTO.getFirstName() : userEntity.getFirstName());
        userEntity.setLastName(userDTO.getLastName() != null ? userDTO.getLastName() : userEntity.getLastName());
        userEntity.setEmail(userDTO.getEmail() != null ? userDTO.getEmail() : userEntity.getEmail());
        userEntity.setPhoneNumber(userDTO.getPhoneNumber() != null ? userDTO.getPhoneNumber() : userEntity.getPhoneNumber());
        userEntity.setUserAd((userDTO.getUserAd()));

        if (userDTO.getFavourite() != null && !userDTO.getFavourite().isEmpty()) {
            List<String> existingFavourites = userEntity.getFavourite();
            if (existingFavourites == null) {
                existingFavourites = new ArrayList<>();
            }
            for (String newFavourite : userDTO.getFavourite()) {
                if (!existingFavourites.contains(newFavourite)) {
                    existingFavourites.add(newFavourite);
                } else {
                    existingFavourites.remove(existingFavourites.indexOf(newFavourite));
                }
            }
            userEntity.setFavourite(existingFavourites);
        }
        userRepository.save(userEntity);
        return new PutUserResponseDTO("User updated", HttpStatus.OK);
    }


}
