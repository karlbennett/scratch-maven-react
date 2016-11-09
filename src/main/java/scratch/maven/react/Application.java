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

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;

/**
 * After a successful Maven build the React assets for the frontend will be served up automatically by Spring MVC. This
 * happens because the Maven build will copy the files created by the Webpack build into the "classpath:/static" folder.
 * Spring MVC will automatically serve up any files within this classpath as static assets.
 */
@RestController
@SpringBootApplication
@EnableWebMvc
public class Application extends WebMvcConfigurerAdapter {

    /**
     * This is the backend endpoint that the React frontend will call to get the text that is to be displayed on the
     * home page.
     */
    @RequestMapping(path = "hello", method = GET, produces = APPLICATION_JSON_VALUE)
    public String hello() {
        return "Hello world.";
    }

    /**
     * This is a secure endpoint that the React frontend will call to get the text that is to be displayed on the secure
     * page.
     */
    @RequestMapping(path = "secret", method = GET, produces = APPLICATION_JSON_VALUE)
    public String secret() {
        return "Hello secret world.";
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/styles/**").addResourceLocations("classpath:/static/styles/");
        registry.addResourceHandler("/scripts/**").addResourceLocations("classpath:/static/scripts/");
        registry.addResourceHandler("/images/**").addResourceLocations("classpath:/static/images/");
        registry.addResourceHandler("/*", "/**/*").resourceChain(false)
            .addResolver(new ClasspathFileResourceResolver("/static/index.html"));
    }

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

}
