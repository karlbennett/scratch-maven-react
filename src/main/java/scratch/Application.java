package scratch;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;

/**
 * After a successful Maven build the React assets for the frontend will be served up automatically by Spring MVC. This
 * happens because the Maven build will copy the files created by the Webpack build into the "classpath:/static" folder.
 * Spring MVC will automatically serve up any files within this classpath as static assets.
 */
@RestController
@SpringBootApplication
public class Application {

    /**
     * This is the backend endpoint that the React frontend will call to get the text that is to be be displayed on the
     * page.
     */
    @RequestMapping(path = "hello", method = GET, produces = APPLICATION_JSON_VALUE)
    public String request() {
        return "Hello world.";
    }

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
