package com.example.agroMarket.ad;

import com.example.agroMarket.ad.dto.*;
import lombok.AllArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/ad")
@AllArgsConstructor
public class AdController {

    private AdService adService;

    @PostMapping("/")
    ResponseEntity<AddAdResponseDTO> addUser(@RequestBody AdDTO adDTO) {
        AddAdResponseDTO response = adService.addAd(adDTO);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{_id}")
    ResponseEntity<GetAdResponseDTO> getAd(@PathVariable ObjectId _id) {
        GetAdResponseDTO response = adService.getAd(_id);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{_id}")
    ResponseEntity<DeleteAdResponseDTO> deleteAd(@PathVariable ObjectId _id) {
        DeleteAdResponseDTO response = adService.deleteAd(_id);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/{_id}")
    ResponseEntity<EditAdResponseDTO> editAd(@RequestBody AdDTO adDTO, @PathVariable ObjectId _id) {
        EditAdResponseDTO response = adService.editAd(adDTO, _id);
        return ResponseEntity.ok(response);
    }


}

