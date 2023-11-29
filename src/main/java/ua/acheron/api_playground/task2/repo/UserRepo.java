package ua.acheron.api_playground.task2.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ua.acheron.api_playground.task2.model.User;
@Repository
public interface UserRepo extends JpaRepository<User,Integer> {
}
