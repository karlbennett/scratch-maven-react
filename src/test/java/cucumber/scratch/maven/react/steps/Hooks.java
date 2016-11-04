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

package cucumber.scratch.maven.react.steps;

import cucumber.api.Scenario;
import cucumber.api.java.After;
import cucumber.api.java.Before;
import cucumber.scratch.maven.react.ITCucumber;
import cucumber.scratch.maven.react.pages.HelloWorldPage;
import cucumber.scratch.maven.react.pages.HomePage;
import cucumber.scratch.maven.react.pages.Page;
import org.junit.runner.RunWith;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import shiver.me.timbers.waiting.Options;
import shiver.me.timbers.waiting.Until;
import shiver.me.timbers.waiting.Waiter;

import static org.openqa.selenium.OutputType.BYTES;
import static org.springframework.boot.test.context.SpringBootTest.WebEnvironment.DEFINED_PORT;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = ITCucumber.class)
@SpringBootTest(webEnvironment = DEFINED_PORT)
public class Hooks {

    private final WebDriver driver;
    private final Page page;
    private final HomePage homePage;
    private final HelloWorldPage helloWorldPage;

    @Autowired
    public Hooks(WebDriver driver, Page page, HomePage homePage, HelloWorldPage helloWorldPage) {
        this.driver = driver;
        this.page = page;
        this.homePage = homePage;
        this.helloWorldPage = helloWorldPage;
    }

    @Before
    public void setUp() {
        // Make sure that we are logged out and the page state has been reset before every scenario.
        new Waiter(new Options().willWaitForTrue(true)).wait(() -> {
            page.visit("/");
            page.clearCookies();
            page.clearLocalStorage();
            page.refresh();
            homePage.waitToLoad();
            return !helloWorldPage.isLoggedIn();
        });
    }

    @After
    public void tearDown(Scenario scenario) {
        if (scenario.isFailed()) {
            scenario.embed(((TakesScreenshot) driver).getScreenshotAs(BYTES), "image/png");
        }
    }
}
