package scratch;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;

@RestController
@SpringBootApplication
public class Application extends WebMvcConfigurerAdapter {

    @RequestMapping(path = "hello", method = GET, produces = APPLICATION_JSON_VALUE)
    public String request() {
        return "Hello world.";
    }

    /**
     * This simple route is used to direct the root path to the index.html static resource. This will not work unless
     * the project has been previously built because the final static assets are placed into the class path during the
     * build.
     */
    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/").setViewName("index");
    }

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
