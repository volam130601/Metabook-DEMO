package com.metabook.controller.web;

import com.metabook.entity.User;
import com.metabook.repository.StoryRepository;
import com.metabook.repository.post.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller(value = "WebController")
public class HomeController {

    @Autowired
    private StoryRepository storyRepository;

    @Autowired
    private PostRepository postRepository;

    @GetMapping({"/", "/home"})
    public String viewHomePage(Model model) {
        model.addAttribute("stories", storyRepository.findAllReverse());
        model.addAttribute("posts", postRepository.findAll());
        return "web/index";
    }

    @GetMapping("/login")
    public String viewLogin(Model model) {
        model.addAttribute("user", new User());
        return "web/login";
    }

    @GetMapping("/story/create")
    public String viewStoryCreate() {
        return "web/story-create";
    }

    @GetMapping("/story/news")
    public String viewStoryNews(@RequestParam(value = "id", required = false) Long storyId, Model model) {
        model.addAttribute("stories", storyRepository.findAllReverse());
        return "web/story-news";
    }
}
