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

import cucumber.scratch.maven.react.pages.Bys;
import cucumber.scratch.maven.react.pages.Finder;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import static org.hamcrest.Matchers.is;
import static org.junit.Assert.assertThat;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.mock;
import static shiver.me.timbers.data.random.RandomStrings.someString;

public class FinderTest {

    @Test
    public void Can_find_an_element_by_a_class_name() {

        final WebDriver driver = mock(WebDriver.class);
        final Bys by = mock(Bys.class);
        final String className = someString();

        final By byClassName = mock(By.class);
        final WebElement expected = mock(WebElement.class);

        // Given
        given(by.className(className)).willReturn(byClassName);
        given(driver.findElement(byClassName)).willReturn(expected);

        // When
        final WebElement actual = new Finder(driver, by).findByClassName(className);

        // Then
        assertThat(actual, is(expected));
    }

    @Test
    public void Can_find_some_text_by_a_class_name() {

        final WebDriver driver = mock(WebDriver.class);
        final Bys by = mock(Bys.class);
        final String className = someString();

        final By byClassName = mock(By.class);
        final WebElement element = mock(WebElement.class);

        final String expected = someString();

        // Given
        given(by.className(className)).willReturn(byClassName);
        given(driver.findElement(byClassName)).willReturn(element);
        given(element.getText()).willReturn(expected);

        // When
        final String actual = new Finder(driver, by).findTextByClassName(className);

        // Then
        assertThat(actual, is(expected));
    }
}