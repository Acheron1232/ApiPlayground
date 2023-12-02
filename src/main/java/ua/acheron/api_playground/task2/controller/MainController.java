package ua.acheron.api_playground.task2.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller("task2MainController")
@RequestMapping("/task2")
public class MainController {

    @GetMapping
    public String mainPage(){
        return "restDB";
    }
}
