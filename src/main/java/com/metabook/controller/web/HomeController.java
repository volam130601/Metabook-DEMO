package com.metabook.controller.web;

import com.metabook.entity.User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {
    @GetMapping({"/", "/home"})
    public String viewHomePage(Model model) {
        model.addAttribute("message", "Login is success");
        model.addAttribute("status", "success");
        return "web/index";
    }

    @GetMapping("/login")
    public String viewLogin(Model model) {
        model.addAttribute("user", new User());
        return "web/login";
    }

}
