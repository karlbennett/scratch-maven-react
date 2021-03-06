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

import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class Page {

    private final String baseUrl;
    private final WebDriver driver;

    public Page(@Value("${base.url:http://localhost:8080}") String baseUrl, WebDriver driver) {
        this.baseUrl = baseUrl;
        this.driver = driver;
    }

    public void clearCookies() {
        driver.manage().deleteAllCookies();
    }

    public void clearLocalStorage() {
        visit(""); // We need to visit a page before we can use local storage.
        ((JavascriptExecutor) driver).executeScript("localStorage.clear();");
    }

    public void visit(String path) {
        driver.get(baseUrl + path);
    }

    public void refresh() {
        driver.navigate().refresh();
    }
}
