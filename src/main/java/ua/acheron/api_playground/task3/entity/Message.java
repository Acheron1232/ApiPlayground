package ua.acheron.api_playground.task3.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;
    String sender;
    String content;
    @DateTimeFormat(iso= DateTimeFormat.ISO.DATE_TIME)
    LocalDateTime time;
    String color;
}
