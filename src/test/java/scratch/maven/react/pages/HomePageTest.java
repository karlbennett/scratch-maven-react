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
import cucumber.scratch.maven.react.pages.HomePage;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.WebElement;

import static org.hamcrest.Matchers.is;
import static org.junit.Assert.assertThat;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static shiver.me.timbers.data.random.RandomStrings.someString;

public class HomePageTest {

    private Finder finder;
    private HomePage page;

    @Before
    public void setUp() {
        finder = mock(Finder.class);
        page = new HomePage(finder);
    }

    @Test
    public void Can_get_the_home_page_message() {

        final String expected = someString();

        // Given
        given(finder.findTextByClassName("hello_world_message")).willReturn(expected);

        // When
        final String actual = page.getMessage();

        // Then
        assertThat(actual, is(expected));
    }

    @Test
    public void Can_check_for_the_home_page_image() {

        // Given
        given(finder.findByClassName("hello_world_image")).willReturn(mock(WebElement.class));

        // When
        final boolean actual = page.hasImage();

        // Then
        assertThat(actual, is(true));
    }

    @Test
    public void Can_check_for_the_home_page_image_not_being_present() {

        // Given
        given(finder.findByClassName("hello_world_image")).willThrow(new NoSuchElementException(someString()));

        // When
        final boolean actual = page.hasImage();

        // Then
        assertThat(actual, is(false));
    }

    @Test
    public void Can_wait_for_the_page_to_load() {

        // Given
        given(finder.findTextByClassName("hello_world_message"))
            .willThrow(new NoSuchElementException(someString())).willReturn(someString());
        given(finder.findByClassName("hello_world_image"))
            .willThrow(new NoSuchElementException(someString())).willReturn(mock(WebElement.class));

        // When
        page.waitToLoad();

        // Then
        verify(finder, times(3)).findTextByClassName("hello_world_message");
        verify(finder, times(2)).findByClassName("hello_world_image");
    }
}