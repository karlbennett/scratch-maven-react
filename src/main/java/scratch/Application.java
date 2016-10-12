package scratch;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;

@RestController
@SpringBootApplication
public class Application {

    @RequestMapping(method = GET, produces = APPLICATION_JSON_VALUE)
    public String request() {
        return "Hello world.";
    }

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
