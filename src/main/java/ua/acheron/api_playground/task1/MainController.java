package ua.acheron.api_playground.task1;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/task1")
public class MainController {
    @GetMapping
    public String asd(){
        return "index";
    }
}
