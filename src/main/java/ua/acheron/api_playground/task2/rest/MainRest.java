package ua.acheron.api_playground.task2.rest;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import ua.acheron.api_playground.task2.model.User;
import ua.acheron.api_playground.task2.service.UserService;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/v2")
@RequiredArgsConstructor
public class MainRest {
    private final UserService userService;
    @GetMapping
    public List<User> getAllUsers(){
        return userService.getAllUsers();
    }
    @PostMapping("/add")
    public void getAllUsers(@RequestParam String name){
        System.out.println(name);
        userService.save(User.builder().username(name).time(LocalDateTime.now()).build());
    }
}
