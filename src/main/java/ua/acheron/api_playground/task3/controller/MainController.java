package ua.acheron.api_playground.task3.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import ua.acheron.api_playground.task3.dto.MessageDto;
import ua.acheron.api_playground.task3.entity.Message;
import ua.acheron.api_playground.task3.repo.MessageRepo;

import java.time.LocalDateTime;

@Controller("task3MainController")
@RequestMapping("/task3")
@RequiredArgsConstructor
public class MainController {
    private final MessageRepo messageRepo;
    @GetMapping
    public String mainPage(){
        return "sockets";
    }


    @MessageMapping("/app/send_message")
    @SendTo("/topic/public")
    public MessageDto getMessage(@Payload MessageDto s){
        messageRepo.save(Message.builder().id(0).color(s.getColor()).time(LocalDateTime.now()).content(s.getContent()).sender(s.getSender()).build());
        return s;
    }


}
