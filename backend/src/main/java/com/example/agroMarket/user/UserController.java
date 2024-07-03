package com.example.agroMarket.user;

import com.example.agroMarket.user.dto.*;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/user")
@AllArgsConstructor
public class UserController {

    //TO_DO add user validation
    private UserService userService;

    @PostMapping("/")
    ResponseEntity<AddUserResponseDTO> addUser(@RequestBody @Valid UserDTO userDTO){
        AddUserResponseDTO response=userService.addUser(userDTO);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    ResponseEntity<CheckIfUserResponseDTO> checkIfUser(@RequestBody UserLoginDTO userLoginDTO){
        CheckIfUserResponseDTO response=userService.checkIfUser(userLoginDTO);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{_id}")
    ResponseEntity<GetUserResponseDTO> getUser(@PathVariable String _id){
        GetUserResponseDTO response=userService.getUser(_id);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{_id}")
    ResponseEntity<DeleteUserResponseDTO> deleteUser(@PathVariable ObjectId _id){
        DeleteUserResponseDTO response=userService.deleteUser(_id);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{_id}")
    ResponseEntity<PutUserResponseDTO> putUser(@RequestBody UserDTO userDTO, @PathVariable ObjectId _id){
        PutUserResponseDTO response=userService.putUser(userDTO,_id);
        return ResponseEntity.ok(response);
    }

}
