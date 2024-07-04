package com.example.agroMarket.ad;

import com.example.agroMarket.ad.dto.*;
import com.example.agroMarket.ad.entity.AdEntity;
import com.example.agroMarket.exception.WrongAdID;
import lombok.AllArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;


@AllArgsConstructor
@Service
public class AdService {

    //todo check if add img work with front
    private AdRepository adRepository;

    public AddAdResponseDTO addAd(AdDTO adDTO) {
        AdEntity adEntity = new AdEntity(null, adDTO.getTitle(), adDTO.getPrice(), adDTO.getImages(), adDTO.getCategory(), adDTO.getDescription(), adDTO.getUser_id());
        adRepository.save(adEntity);
        return new AddAdResponseDTO("ok", HttpStatus.ACCEPTED);
    }

    public GetAdResponseDTO getAd(ObjectId _id) {
        AdEntity adEntity = adRepository.findAdEntityBy_id(_id).orElseThrow(() -> new WrongAdID("There is no ad with this _id"));
        AdDTO adDTO = new AdDTO(adEntity.getTitle(), adEntity.getPrice(), adEntity.getImages(), adEntity.getCategory(), adEntity.getDescription(), adEntity.getUser_id());
        return new GetAdResponseDTO(adDTO, "ok", HttpStatus.OK);
    }

    public DeleteAdResponseDTO deleteAd(@PathVariable ObjectId _id) {
        adRepository.findAdEntityBy_id(_id).orElseThrow(() -> new WrongAdID("There is no ad with this _id"));
        adRepository.deleteAdEntityBy_id(_id);
        return new DeleteAdResponseDTO("Ad deleted", HttpStatus.OK);
    }

    public EditAdResponseDTO editAd(AdDTO adDTO, ObjectId _id) {
        AdEntity adEntity = adRepository.findAdEntityBy_id(_id).orElseThrow(() -> new WrongAdID("There is no ad with this _id"));
        adEntity.setTitle(adDTO.getTitle() != null ? adDTO.getTitle() : adEntity.getTitle());
        adEntity.setPrice(adDTO.getPrice() != null ? adDTO.getPrice() : adEntity.getPrice());
        adEntity.setCategory(adDTO.getCategory() != null ? adDTO.getCategory() : adEntity.getCategory());
        adEntity.setDescription(adDTO.getDescription() != null ? adDTO.getDescription() : adEntity.getDescription());
        adEntity.setUser_id(adDTO.getUser_id() != null ? adDTO.getUser_id() : adEntity.getUser_id());


        adRepository.save(adEntity);
        return new EditAdResponseDTO("Ad edited", HttpStatus.OK);
    }
}
