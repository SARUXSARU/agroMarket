package com.example.agroMarket.ad;

import com.example.agroMarket.ad.dto.*;
import com.example.agroMarket.ad.entity.AdEntity;
import com.example.agroMarket.exception.WrongAdID;
import com.example.agroMarket.user.UserRepository;
import com.example.agroMarket.user.entity.UserEntity;
import lombok.AllArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@AllArgsConstructor
@Service
public class AdService {
    private AdRepository adRepository;
    private UserRepository userRepository;

    public AddAdResponseDTO addAd(AdDTO adDTO) {
        AdEntity adEntity = new AdEntity(null, adDTO.getTitle(), adDTO.getPrice(), adDTO.getImage(), adDTO.getCategory(), adDTO.getDescription(), adDTO.getUser_id());
        Optional<UserEntity> optionalUser = userRepository.findUserEntityBy_id(adEntity.getUser_id());
        adRepository.save(adEntity);
        if (optionalUser.isPresent()) {
            UserEntity userEntity = optionalUser.get();
            userEntity.getUserAd().add(adEntity.get_id().toString());
            userRepository.save(userEntity);
        } else {
            throw new RuntimeException("User not found");
        }
       return new AddAdResponseDTO(adEntity.get_id().toString(),"ok", HttpStatus.ACCEPTED);
    }

    public GetAdResponseDTO getAd(ObjectId _id) {
        AdEntity adEntity = adRepository.findAdEntityBy_id(_id).orElseThrow(() -> new WrongAdID("There is no ad with this _id"));
        AdDTO adDTO = new AdDTO(adEntity.getTitle(), adEntity.getPrice(), adEntity.getImage(), adEntity.getCategory(), adEntity.getDescription(), adEntity.getUser_id());
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
        adEntity.setPrice(adDTO.getPrice() != 0 ? adDTO.getPrice() : adEntity.getPrice());
        adEntity.setCategory(adDTO.getCategory() !=0 ? adDTO.getCategory() : adEntity.getCategory());
        adEntity.setDescription(adDTO.getDescription() != null ? adDTO.getDescription() : adEntity.getDescription());
        adEntity.setUser_id(adDTO.getUser_id() != null ? adDTO.getUser_id() : adEntity.getUser_id());


        adRepository.save(adEntity);
        return new EditAdResponseDTO("Ad edited", HttpStatus.OK);
    }

    public GetAdsIdsDTO getAds(){
        List<AdEntity> adsList= new ArrayList<>();
        adsList.addAll(adRepository.findAll());
        return new GetAdsIdsDTO(adsList,"Number of ads ok", HttpStatus.OK);
    }
}
