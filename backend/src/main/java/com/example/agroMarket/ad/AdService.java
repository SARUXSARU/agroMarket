package com.example.agroMarket.ad;

import com.example.agroMarket.ad.dto.*;
import com.example.agroMarket.ad.entity.AdEntity;
import com.example.agroMarket.exception.WrongAdID;
import com.example.agroMarket.exception.WrongUserID;
import com.example.agroMarket.user.dto.*;
import com.example.agroMarket.user.entity.UserEntity;
import lombok.AllArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;

@AllArgsConstructor
@Service
public class AdService {

    //todo check if add img work with front
    private AdRepository adRepository;
    public AddAdResponseDTO addAd(AdDTO adDTO) {
        AdEntity adEntity=new AdEntity(null, adDTO.getTitle(),adDTO.getPrice(),adDTO.getImages(), adDTO.getCategory(),adDTO.getDescription());
        adRepository.save(adEntity);
        return new AddAdResponseDTO("ok", HttpStatus.ACCEPTED);
    }

    public GetAdResponseDTO getAd(ObjectId _id) {
        AdEntity adEntity = adRepository.findAdEntityBy_id(_id).orElseThrow(() -> new WrongAdID("There is no ad with this _id"));
        AdDTO adDTO = new AdDTO(adEntity.getTitle(), adEntity.getPrice(), adEntity.getImages(), adEntity.getCategory(), adEntity.getDescription());
        return new GetAdResponseDTO(adDTO, "ok", HttpStatus.OK);
    }

    public DeleteAdResponseDTO deleteAd(@PathVariable ObjectId _id){
        adRepository.findAdEntityBy_id(_id).orElseThrow(() -> new WrongAdID("There is no ad with this _id"));
        adRepository.deleteAdEntityBy_id(_id);
        return new DeleteAdResponseDTO("Ad deleted", HttpStatus.OK);
    }

    public EditAdResponseDTO editAd(AdDTO adDTO, ObjectId _id) {
        AdEntity adEntity = adRepository.findAdEntityBy_id(_id).orElseThrow(() -> new WrongAdID("There is no ad with this _id"));
        adEntity.setTitle(adEntity.getTitle());
        adEntity.setPrice(adEntity.getPrice());
        adEntity.setImages(adEntity.getImages());
        adEntity.setCategory(adDTO.getCategory());
        adEntity.setDescription(adDTO.getDescription());
        adRepository.save(adEntity);
        return new EditAdResponseDTO("Ad edited", HttpStatus.OK);
    }
}
