package com.metabook.controller.web;

import com.metabook.dto.ResponseObject;
import com.metabook.dto.StatusCode;
import com.metabook.entity.Story;
import com.metabook.repository.StoryRepository;
import com.metabook.util.FileUploadUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Date;

import static com.metabook.controller.web.LoginController.getUser;

@RestController()
@RequestMapping("/api/story")
public class StoryController {
    @Autowired
    private StoryRepository storyRepository;

    @PostMapping("/uploadFile")
    public ResponseEntity<ResponseObject> uploadStoryFile(@RequestParam("file") MultipartFile file) throws IOException {

        String fileName = file.getOriginalFilename();
        Story story = Story.builder()
                .image(fileName)
                .createAt(new Date())
                .user(getUser())
                .build();
        if (storyRepository.existsStoryByImage(fileName)) {
            return ResponseEntity.ok(
                    new ResponseObject(null, "File image is exist", StatusCode.FAILED)
            );
        }
        String uploadDir = "story/" + storyRepository.save(story).getId();
        FileUploadUtil.saveFile(uploadDir, fileName, file);

        return ResponseEntity.ok(
                new ResponseObject(null, "Upload image story is success", StatusCode.SUCCESS)
        );
    }

}
