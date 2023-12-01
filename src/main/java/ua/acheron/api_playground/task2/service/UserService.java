package ua.acheron.api_playground.task2.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ua.acheron.api_playground.task2.model.User;
import ua.acheron.api_playground.task2.repo.UserRepo;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepo userRepo;

    public List<User> getAllUsers(){
        return userRepo.findAll();
    }

    public void save(User user) {
        user.setTime(LocalDateTime.now());
        userRepo.save(user);
    }

    public Optional<User> getUserById(Integer id) {
        return userRepo.findById(id);
    }
}
