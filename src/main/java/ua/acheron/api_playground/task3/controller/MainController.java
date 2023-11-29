package ua.acheron.api_playground.task3.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;



import jakarta.servlet.http.HttpSession;
import org.springframework.boot.autoconfigure.web.ServerProperties;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;


import java.time.LocalDateTime;

@Controller("task3MainController")
public class MainController {

    @GetMapping
    public String mainPage(){
        return "index";
    }


    @MessageMapping("/app/send_message")
    @SendTo("/topic/public")
    public String getMessage(@Payload String s){
        return s;
    }
    @MessageMapping("/app/send_username")
    @SendTo("/topic/public")
    public String getUsername(@Payload String s){
        System.out.println(s);
        return s;
    }
}
