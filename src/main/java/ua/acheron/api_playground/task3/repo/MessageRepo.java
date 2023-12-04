package ua.acheron.api_playground.task3.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ua.acheron.api_playground.task3.entity.Message;

@Repository
public interface MessageRepo extends JpaRepository<Message,Integer> {
}
