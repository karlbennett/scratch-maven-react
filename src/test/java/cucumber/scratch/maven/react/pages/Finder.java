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

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.springframework.stereotype.Component;

@Component
public class Finder {

    private final WebDriver driver;
    private final Bys by;

    public Finder(WebDriver driver, Bys by) {
        this.driver = driver;
        this.by = by;
    }

    public WebElement findByClassName(String className) {
        return driver.findElement(by.className(className));
    }

    public String findTextByClassName(String className) {
        return findByClassName(className).getText();
    }

    public WebElement findByText(String text) {
        return driver.findElement(by.text(text));
    }

    public void clickByText(String text) {
        findByText(text).click();
    }

    public WebElement findByLabel(String labelName) {
        final WebElement label = findByText(labelName);
        return driver.findElement(by.id(label.getAttribute("for")));
    }

    public void setTextByLabel(String labelName, String text) {
        final WebElement input = findByLabel(labelName);
        input.clear();
        input.sendKeys(text);
    }

    public void clickByValue(String value) {
        driver.findElement(by.value(value)).click();
    }
}
