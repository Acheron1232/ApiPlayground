package ua.acheron.api_playground.task2.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ua.acheron.api_playground.task2.model.User;
import ua.acheron.api_playground.task2.repo.UserRepo;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepo userRepo;

    public List<User> getAllUsers(){
        return userRepo.findAll();
    }

    public void save(User user) {
        userRepo.save(user);
    }
}
