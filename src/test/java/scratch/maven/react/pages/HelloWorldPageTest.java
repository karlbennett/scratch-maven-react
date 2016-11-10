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

import cucumber.scratch.maven.react.io.Resources;
import cucumber.scratch.maven.react.pages.Bys;
import cucumber.scratch.maven.react.pages.Finder;
import cucumber.scratch.maven.react.pages.HelloWorldPage;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;
import org.openqa.selenium.By;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.WebElement;

import java.io.IOException;

import static org.hamcrest.Matchers.is;
import static org.junit.Assert.assertThat;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static shiver.me.timbers.data.random.RandomStrings.someString;

public class HelloWorldPageTest {

    @Rule
    public ExpectedException expectedException = ExpectedException.none();

    private JavaScriptWebDriver driver;
    private Resources resources;
    private Finder finder;
    private Bys by;
    private HelloWorldPage page;

    @Before
    public void setUp() {
        finder = mock(Finder.class);
        resources = mock(Resources.class);
        driver = mock(JavaScriptWebDriver.class);
        by = mock(Bys.class);
        page = new HelloWorldPage(driver, resources, finder, by);
    }

    @Test
    public void Can_check_that_the_user_is_logged_in() {

        final WebElement header = mock(WebElement.class);
        final By byLogin = mock(By.class);
        final By byLogout = mock(By.class);

        // Given
        given(finder.findByClassName("hello_world_header")).willReturn(header);
        given(by.text("Login")).willReturn(byLogin);
        given(header.findElement(byLogin)).willThrow(new NoSuchElementException(someString()));
        given(by.text("Logout")).willReturn(byLogout);
        given(header.findElement(byLogout)).willReturn(mock(WebElement.class));

        // When
        final boolean actual = page.isLoggedIn();

        // Then
        assertThat(actual, is(true));
    }

    @Test
    public void Can_check_that_the_user_is_logged_out() {

        final WebElement header = mock(WebElement.class);
        final By byLogin = mock(By.class);
        final By byLogout = mock(By.class);

        // Given
        given(finder.findByClassName("hello_world_header")).willReturn(header);
        given(by.text("Login")).willReturn(byLogin);
        given(header.findElement(byLogin)).willReturn(mock(WebElement.class));
        given(by.text("Logout")).willReturn(byLogout);
        given(header.findElement(byLogout)).willThrow(new NoSuchElementException(someString()));

        // When
        final boolean actual = page.isLoggedIn();

        // Then
        assertThat(actual, is(false));
    }

    @Test
    public void Can_login_a_user() {

        // When
        page.clickLogin();

        // Then
        verify(finder).clickByText("Login");
    }

    @Test
    public void Can_logout_a_user() {

        // When
        page.clickLogout();

        // Then
        verify(finder).clickByText("Logout");
    }

    @Test
    public void Can_expire_the_users_session() throws IOException {

        final String javaScript = someString();

        // Given
        given(resources.toString("logout.js")).willReturn(javaScript);

        // When
        page.expireSession();

        // Then
        verify(driver).executeAsyncScript(javaScript);
    }

    @Test
    public void Can_fail_to_expire_the_users_session() throws IOException {

        final IOException exception = new IOException();

        // Given
        given(resources.toString("logout.js")).willThrow(exception);
        expectedException.expect(IllegalStateException.class);
        expectedException.expectCause(is(exception));

        // When
        page.expireSession();
    }
}