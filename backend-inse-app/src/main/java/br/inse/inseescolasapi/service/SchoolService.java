package br.inse.inseescolasapi.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import br.inse.inseescolasapi.domain.School;
import br.inse.inseescolasapi.repository.SchoolRepository;

import java.io.IOException;
import java.util.List;

@Service
@AllArgsConstructor
public class SchoolService {
    private SchoolRepository schoolRepository;

    public void saveSchoolsToDatabase(MultipartFile file){
        if(ExcelUploadService.isValidExcelFile(file)){
            try {
                List<School> schools = ExcelUploadService.getSchoolsDataFromExcel(file.getInputStream());
                this.schoolRepository.saveAll(schools);
            } catch (IOException e) {
                throw new IllegalArgumentException("The file is not a valid excel file");
            }
        }
    }

    public List<School> getSchools(){
        return schoolRepository.findAll();
    }
}
