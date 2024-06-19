package com.example.agroMarket.user;

import com.example.agroMarket.exception.UserWithThisNameExistException;
import com.example.agroMarket.exception.WrongUserID;
import com.example.agroMarket.user.dto.*;
import com.example.agroMarket.user.entity.UserEntity;
import lombok.AllArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class UserService {
    private UserRepository userRepository;

    public AddUserResponseDTO addUser(UserDTO userDTO) {
        UserEntity userEntity = new UserEntity(null, userDTO.getName(), userDTO.getAuthCode(), userDTO.getFirstName(), userDTO.getLastName(), userDTO.getEmail());
        if (userRepository.findUserEntityByEmailOrName(userDTO.getEmail(), userDTO.getName()).isPresent()) {
            throw new UserWithThisNameExistException("Already exist user with this name or email");
        }
        userRepository.save(userEntity);
        return new AddUserResponseDTO("ok", HttpStatus.ACCEPTED);
    }

    public GetUserResponseDTO getUser(ObjectId _id) {
        UserEntity userEntity = userRepository.findUserEntityBy_id(_id).orElseThrow(() -> new WrongUserID("There is no user with this _id"));
        UserDTO userDTO = new UserDTO(userEntity.getName(), userEntity.getAuthCode(), userEntity.getFirstName(), userEntity.getLastName(), userEntity.getEmail());
        return new GetUserResponseDTO(userDTO, "ok", HttpStatus.OK);
    }


    public CheckIfUserResponseDTO checkIfUser(UserLoginDTO userLoginDTO){
        UserEntity userEntity=userRepository.findUserEntityByEmailAndAuthCode(userLoginDTO.getEmail(), userLoginDTO.getAuthCode()).orElseThrow(() -> new WrongUserID("Email or password is wrong"));
        UserDTO userDTO = new UserDTO(userEntity.getName(), userEntity.getAuthCode(), userEntity.getFirstName(), userEntity.getLastName(), userEntity.getEmail());
        return new CheckIfUserResponseDTO(userDTO, "ok", HttpStatus.OK);
    }



    public DeleteUserResponseDTO deleteUser(ObjectId _id) {
        userRepository.findUserEntityBy_id(_id).orElseThrow(() -> new WrongUserID("There is no user with this _id"));
        userRepository.deleteUserEntityBy_id(_id);
        return new DeleteUserResponseDTO("User deleted", HttpStatus.OK);
    }

    public PutUserResponseDTO putUser(UserDTO userDTO, ObjectId _id) {
        UserEntity userEntity = userRepository.findUserEntityBy_id(_id).orElseThrow(() -> new WrongUserID("There is no user with this _id"));
        userEntity.setName(userDTO.getName());
        userEntity.setFirstName(userEntity.getFirstName());
        userEntity.setLastName(userEntity.getLastName());
        userEntity.setEmail(userDTO.getEmail());
        userRepository.save(userEntity);
        return new PutUserResponseDTO("User updated", HttpStatus.OK);
    }


}
