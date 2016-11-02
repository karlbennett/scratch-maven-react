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

package scratch.maven.react.pages;

import cucumber.scratch.maven.react.pages.Page;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.WebDriver;

import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.openqa.selenium.WebDriver.Navigation;
import static org.openqa.selenium.WebDriver.Options;
import static shiver.me.timbers.data.random.RandomStrings.someString;

public class PageTest {

    private String baseUrl;
    private WebDriver driver;
    private Page page;

    @Before
    public void setUp() {
        baseUrl = someString();
        driver = mock(WebDriver.class);
        page = new Page(baseUrl, driver);
    }

    @Test
    public void Can_clear_the_browsers_cookies() {

        final Options options = mock(Options.class);

        // Given
        given(driver.manage()).willReturn(options);

        // When
        page.clearCookies();

        // Then
        verify(options).deleteAllCookies();
    }

    @Test
    public void Can_visit_a_page() {

        // Given
        final String path = someString();

        // When
        page.visit(path);

        // Then
        verify(driver).get(baseUrl + path);
    }

    @Test
    public void Can_refresh_a_page() {

        final String path = someString();

        final Navigation navigation = mock(Navigation.class);

        // Given
        given(driver.navigate()).willReturn(navigation);

        // When
        page.refresh();

        // Then
        verify(navigation).refresh();
    }
}