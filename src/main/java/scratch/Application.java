package scratch;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.Http403ForbiddenEntryPoint;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static javax.servlet.http.HttpServletResponse.SC_OK;
import static javax.servlet.http.HttpServletResponse.SC_UNAUTHORIZED;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;

/**
 * After a successful Maven build the React assets for the frontend will be served up automatically by Spring MVC. This
 * happens because the Maven build will copy the files created by the Webpack build into the "classpath:/static" folder.
 * Spring MVC will automatically serve up any files within this classpath as static assets.
 */
@RestController
@SpringBootApplication
@EnableWebSecurity
public class Application extends WebSecurityConfigurerAdapter {

    /**
     * This is the backend endpoint that the React frontend will call to get the text that is to be be displayed on the
     * page.
     */
    @RequestMapping(path = "hello", method = GET, produces = APPLICATION_JSON_VALUE)
    public String hello() {
        return "Hello world.";
    }

    @RequestMapping(path = "secure", method = GET, produces = APPLICATION_JSON_VALUE)
    public String secure() {
        return "Hello secret world.";
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .authorizeRequests().antMatchers("/", "/scripts/*", "/images/*", "/styles/*", "/hello").permitAll()
            .anyRequest().authenticated()
            .and()
            .exceptionHandling().authenticationEntryPoint(new Http403ForbiddenEntryPoint())
            .and()
            .formLogin()
            .successHandler((request, response, authentication) -> response.setStatus(SC_OK))
            .failureHandler((request, response, exception) -> response.sendError(SC_UNAUTHORIZED, "Login Failed"))
            .loginPage("/login").permitAll()
            .and()
            .logout().logoutUrl("/logout").permitAll();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.inMemoryAuthentication().withUser("user").password("password").roles("USER");
    }

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
