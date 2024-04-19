package com.example.agroMarket.ad;

import com.example.agroMarket.ad.dto.AdDTO;
import com.example.agroMarket.ad.dto.AddAdResponseDTO;
import com.example.agroMarket.ad.entity.AdEntity;
import com.example.agroMarket.user.dto.AddUserResponseDTO;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;

@AllArgsConstructor
@Service
public class AdService {

    //todo check if add img work with front
    private AdRepository adRepository;
    public AddAdResponseDTO addAd(AdDTO adDTO) {

        AdEntity adEntity=new AdEntity(null, adDTO.getTitle(),adDTO.getPrice(),adDTO.getImg());
        adRepository.save(adEntity);

        return new AddAdResponseDTO("ok", HttpStatus.ACCEPTED);
    }
}
