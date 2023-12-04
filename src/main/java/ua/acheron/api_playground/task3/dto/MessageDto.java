package ua.acheron.api_playground.task3.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@Builder

@NoArgsConstructor
public class MessageDto {
    String sender;
    String content;
    String color;
}
