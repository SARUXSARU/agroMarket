package com.example.agroMarket.ad;

import com.example.agroMarket.ad.dto.AdDTO;
import com.example.agroMarket.ad.dto.AddAdResponseDTO;
import com.example.agroMarket.user.UserService;
import com.example.agroMarket.user.dto.AddUserResponseDTO;
import com.example.agroMarket.user.dto.UserDTO;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("api/v1/ad")
@AllArgsConstructor
public class AdController {

    private AdService adService;
    @PostMapping("/")
    ResponseEntity<AddAdResponseDTO> addUser(@RequestBody AdDTO adDTO){
        AddAdResponseDTO response=adService.addAd(adDTO);
        return ResponseEntity.ok(response);
    }


}

