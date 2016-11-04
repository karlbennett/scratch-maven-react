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

import cucumber.scratch.maven.react.pages.Finder;
import cucumber.scratch.maven.react.pages.HelloWorldPage;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.WebElement;

import static org.hamcrest.Matchers.is;
import static org.junit.Assert.assertThat;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static shiver.me.timbers.data.random.RandomStrings.someString;

public class HelloWorldPageTest {

    private Finder finder;
    private HelloWorldPage page;

    @Before
    public void setUp() {
        finder = mock(Finder.class);
        page = new HelloWorldPage(finder);
    }

    @Test
    public void Can_check_that_the_user_is_logged_in() {

        // Given
        given(finder.findByText("Login")).willThrow(new NoSuchElementException(someString()));
        given(finder.findByText("Logout")).willReturn(mock(WebElement.class));

        // When
        final boolean actual = page.isLoggedIn();

        // Then
        assertThat(actual, is(true));
    }

    @Test
    public void Can_check_that_the_user_is_logged_out() {

        // Given
        given(finder.findByText("Login")).willReturn(mock(WebElement.class));
        given(finder.findByText("Logout")).willThrow(new NoSuchElementException(someString()));

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
}