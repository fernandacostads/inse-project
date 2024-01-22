package br.inse.inseescolasapi.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import br.inse.inseescolasapi.domain.School;
import br.inse.inseescolasapi.service.SchoolService;

import java.util.List;
import java.util.Map;

@RestController
@AllArgsConstructor
@RequestMapping("schools")
public class SchoolController {
    private SchoolService schoolService;

    @PostMapping("/upload-school-data")
    public ResponseEntity<?> uploadSchoolsData(@RequestParam("file")MultipartFile file){
        this.schoolService.saveSchoolsToDatabase(file);
        return ResponseEntity
                .ok(Map.of("Message" , " Schools data uploaded and saved to database successfully"));
    }

    @GetMapping
    public ResponseEntity<List<School>> getSchools(){
        return new ResponseEntity<>(schoolService.getSchools(), HttpStatus.FOUND);
    }
}
