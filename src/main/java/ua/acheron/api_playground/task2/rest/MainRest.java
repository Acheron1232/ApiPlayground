package ua.acheron.api_playground.task2.rest;

import lombok.RequiredArgsConstructor;
import org.apache.catalina.Server;
import org.springframework.boot.autoconfigure.web.ServerProperties;
import org.springframework.core.env.Environment;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ua.acheron.api_playground.task2.dto.UserRequest;
import ua.acheron.api_playground.task2.model.User;
import ua.acheron.api_playground.task2.service.UserService;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/v2")
@RequiredArgsConstructor
public class MainRest {
    private final UserService userService;
    private final Environment server;
    @GetMapping
    public List<User> getAllUsers(){
        return userService.getAllUsers();
    }
    @PostMapping("/add")
    public void getAllUsers(@RequestParam String name){
        System.out.println(name);
        userService.save(User.builder().username(name).time(LocalDateTime.now()).build());
    }
    @GetMapping("/server")
    public List<String> getServerProperties(){
        ArrayList<String> strings = new ArrayList<>();
        strings.add("Port - 8080");

        return strings;
    }
    @GetMapping("/database/all")
    public ResponseEntity<?> getAllEntities(){
        return ResponseEntity.ok(userService.getAllUsers());
    }
    @GetMapping("/database/id/{id}")
    public ResponseEntity<?> getEntity(@PathVariable Integer id){
        return ResponseEntity.ok(userService.getUserById(id).get());
    }
    @PostMapping("/database/insert")
    public void getEntity(@RequestBody UserRequest user){
         userService.save(User.builder().age(user.getAge()).occupation(user.getOccupation()).username(user.getUsername()).build());
    }
}
