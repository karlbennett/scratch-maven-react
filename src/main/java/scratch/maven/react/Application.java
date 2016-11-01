/*
 * Copyright 2016 Karl Bennett
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package scratch.maven.react;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.Http403ForbiddenEntryPoint;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static java.util.Collections.singletonMap;
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

    @Autowired
    private ObjectMapper mapper;

    /**
     * This is the backend endpoint that the React frontend will call to get the text that is to be be displayed on the
     * page.
     */
    @RequestMapping(path = "hello", method = GET, produces = APPLICATION_JSON_VALUE)
    public String hello() {
        return "Hello world.";
    }

    @RequestMapping(path = "secret", method = GET, produces = APPLICATION_JSON_VALUE)
    public String secret() {
        return "Hello secret world.";
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .csrf().disable()
            .authorizeRequests().antMatchers("/", "/scripts/*", "/images/*", "/styles/*", "/hello").permitAll()
            .anyRequest().authenticated()
            .and()
            .exceptionHandling().authenticationEntryPoint(new Http403ForbiddenEntryPoint())
            .and()
            .formLogin()
            .successHandler((request, response, authentication) -> {
                response.setStatus(SC_OK);
                mapper.writeValue(
                    response.getOutputStream(),
                    singletonMap("username", ((User) authentication.getPrincipal()).getUsername())
                );
            })
            .failureHandler((request, response, exception) -> response.sendError(SC_UNAUTHORIZED, "Login Failed"))
            .loginPage("/login").permitAll()
            .and()
            .logout()
            .logoutSuccessHandler((request, response, authentication) -> response.setStatus(SC_OK))
            .logoutUrl("/logout").permitAll();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.inMemoryAuthentication().withUser("user").password("password").roles("USER");
    }

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
