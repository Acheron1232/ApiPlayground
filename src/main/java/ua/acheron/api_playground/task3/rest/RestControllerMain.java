package ua.acheron.api_playground.task3.rest;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ua.acheron.api_playground.task3.entity.Message;
import ua.acheron.api_playground.task3.repo.MessageRepo;

import java.util.List;

@RestController
@RequestMapping("/messages")
@RequiredArgsConstructor
public class RestControllerMain {
    private final MessageRepo messageRepo;
    @GetMapping
    public List<Message> getAllMessages(){
        return messageRepo.findAll();
    }
}
