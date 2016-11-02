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
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.Http403ForbiddenEntryPoint;

import static java.util.Collections.singletonMap;
import static javax.servlet.http.HttpServletResponse.SC_OK;
import static javax.servlet.http.HttpServletResponse.SC_UNAUTHORIZED;

@Configuration
@EnableWebSecurity
class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    @Autowired
    private ObjectMapper mapper;

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
}
