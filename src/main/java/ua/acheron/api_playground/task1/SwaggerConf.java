package ua.acheron.api_playground.task1;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConf {
    @Bean
    public OpenAPI openApiInformation() {
        Server localServer = new Server()
                .url("http://localhost:8080")
                .description("API PLAYGROUND");

        Info info = new Info()
                .description("Spring Boot 3 + Open API 3")
                .description("Dev: aryemfedorov@gmail.com, bohdan")
                .description("https://imgur.com/a/Ff7im6Z")
                .title("API PLAYGROUND")
                .version("V1.0.0")
                .license(new License().name("Git Hub").url("https://github.com/Acheron1232"))
                .license(new License().name("Artem Fedorov").url("https://t.me/artfdrv"));
        return new OpenAPI().info(info).addServersItem(localServer);
    }
}