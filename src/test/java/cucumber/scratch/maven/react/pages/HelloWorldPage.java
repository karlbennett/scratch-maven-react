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

package cucumber.scratch.maven.react.pages;

import org.openqa.selenium.NoSuchElementException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
public class HelloWorldPage {

    private final Finder finder;
    private Logger log = LoggerFactory.getLogger(getClass());


    public HelloWorldPage(Finder finder) {
        this.finder = finder;
    }

    public boolean isLoggedIn() {
        try {
            finder.findByText("Login");
            return false;
        } catch (NoSuchElementException e) {
            log.debug("User is logged in.", e);
            finder.findByText("Logout");
            return true;
        }
    }

    public void clickLogin() {
        finder.clickByText("Login");
    }
}
