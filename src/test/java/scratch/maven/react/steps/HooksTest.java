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

package scratch.maven.react.steps;

import cucumber.api.Scenario;
import cucumber.scratch.maven.react.pages.HelloWorldPage;
import cucumber.scratch.maven.react.pages.HomePage;
import cucumber.scratch.maven.react.pages.Page;
import cucumber.scratch.maven.react.steps.Hooks;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InOrder;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;

import static org.mockito.BDDMockito.given;
import static org.mockito.Matchers.any;
import static org.mockito.Matchers.anyString;
import static org.mockito.Mockito.inOrder;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyZeroInteractions;
import static org.openqa.selenium.OutputType.BYTES;

public class HooksTest {

    private ScreenshotWebDriver driver;
    private Page page;
    private HomePage homePage;
    private HelloWorldPage helloWorldPage;
    private Hooks hooks;

    @Before
    public void setUp() {
        driver = mock(ScreenshotWebDriver.class);
        page = mock(Page.class);
        homePage = mock(HomePage.class);
        helloWorldPage = mock(HelloWorldPage.class);
        hooks = new Hooks(driver, page, homePage, helloWorldPage);
    }

    @Test
    public void Can_logout_before_a_scenario() {

        // Given
        given(helloWorldPage.isLoggedIn()).willReturn(true, false);

        // When
        hooks.setUp();

        // Then
        final InOrder order = inOrder(page, homePage, helloWorldPage);
        order.verify(page).visit("/");
        order.verify(page).clearCookies();
        order.verify(page).clearLocalStorage();
        order.verify(page).refresh();
        order.verify(homePage).waitToLoad();
        order.verify(helloWorldPage).isLoggedIn();
        order.verify(page).visit("/");
        order.verify(page).clearCookies();
        order.verify(page).clearLocalStorage();
        order.verify(page).refresh();
        order.verify(homePage).waitToLoad();
        order.verify(helloWorldPage).isLoggedIn();
    }

    @Test
    public void Can_take_a_screen_shot_when_a_scenario_fails() {

        final Scenario scenario = mock(Scenario.class);

        final byte[] bytes = new byte[0];

        // Given
        given(scenario.isFailed()).willReturn(true);
        given(driver.getScreenshotAs(BYTES)).willReturn(bytes);

        // When
        hooks.tearDown(scenario);

        // Then
        verify(scenario).embed(bytes, "image/png");
    }

    @Test
    public void Will_not_take_a_screen_shot_when_a_scenario_succeeds() {

        final Scenario scenario = mock(Scenario.class);

        // Given
        given(scenario.isFailed()).willReturn(false);

        // When
        hooks.tearDown(scenario);

        // Then
        verifyZeroInteractions(driver);
        verify(scenario, never()).embed(any(byte[].class), anyString());
    }

    private interface ScreenshotWebDriver extends WebDriver, TakesScreenshot {
    }
}
