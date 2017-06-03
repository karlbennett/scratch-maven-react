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

import cucumber.scratch.maven.react.io.Resources;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class HelloWorldPage {

    private final WebDriver driver;
    private final Resources resources;
    private final Finder finder;
    private final Bys by;
    private Logger log = LoggerFactory.getLogger(getClass());

    public HelloWorldPage(WebDriver driver, Resources resources, Finder finder, Bys by) {
        this.driver = driver;
        this.resources = resources;
        this.finder = finder;
        this.by = by;
    }

    public boolean isLoggedIn() {
        final WebElement header = finder.findByClassName("hello_world_header");
        try {
            header.findElement(by.text("Login"));
            return false;
        } catch (NoSuchElementException e) {
            log.debug("User is logged in.", e);
            header.findElement(by.text("Logout"));
            return true;
        }
    }

    public void clickLogin() {
        finder.clickByText("Login");
    }

    public void clickLogout() {
        finder.clickByText("Logout");
    }

    public void expireSession() {
        try {
            final JavascriptExecutor javascriptExecutor = (JavascriptExecutor) this.driver;
            final String logout = resources.toString("logout.js");
            // We have to logout twice to make sure it works.
            javascriptExecutor.executeAsyncScript(logout);
            javascriptExecutor.executeAsyncScript(logout);
        } catch (IOException e) {
            throw new IllegalStateException(e);
        }
    }
}
