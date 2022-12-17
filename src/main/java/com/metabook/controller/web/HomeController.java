package com.metabook.controller.web;

import com.metabook.entity.User;
import com.metabook.repository.post.PostRepository;
import com.metabook.service.story.StoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import static com.metabook.controller.web.LoginController.getUser;

@Controller(value = "WebController")
public class HomeController {

    @Autowired
    private StoryService storyService;

    @Autowired
    private PostRepository postRepository;

    @GetMapping({"/", "/home"})
    public String viewHomePage(Model model) {
        model.addAttribute("posts", postRepository.findAll());
        model.addAttribute("user", getUser());
        return "web/index";
    }

    @GetMapping("/login")
    public String viewLogin(Model model) {
        model.addAttribute("user", new User());
        return "web/login";
    }

    @GetMapping("/story/create")
    public String viewStoryCreate(Model model) {
        model.addAttribute("user", getUser());
        return "web/story-create";
    }

    @GetMapping("/story/news")
    public String viewStoryNews(@RequestParam(value = "id", required = false) Long storyId, Model model) {
        model.addAttribute("user", getUser());
        model.addAttribute("stories", storyService.findAllStoryByUserId(getUser().getId()));
        return "web/story-news";
    }
}
