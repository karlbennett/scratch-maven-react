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
import org.junit.Before;
import org.junit.Test;
import org.mockito.InOrder;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import static org.hamcrest.Matchers.is;
import static org.junit.Assert.assertThat;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.inOrder;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static shiver.me.timbers.data.random.RandomStrings.someString;

public class FinderTest {

    private WebDriver driver;
    private Bys by;
    private Finder finder;

    @Before
    public void setUp() {
        driver = mock(WebDriver.class);
        by = mock(Bys.class);
        finder = new Finder(driver, by);
    }

    @Test
    public void Can_find_an_element_by_a_class_name() {

        final String className = someString();

        final By byClassName = mock(By.class);
        final WebElement expected = mock(WebElement.class);

        // Given
        given(by.className(className)).willReturn(byClassName);
        given(driver.findElement(byClassName)).willReturn(expected);

        // When
        final WebElement actual = finder.findByClassName(className);

        // Then
        assertThat(actual, is(expected));
    }

    @Test
    public void Can_find_some_text_by_a_class_name() {

        final String className = someString();

        final By byClassName = mock(By.class);
        final WebElement element = mock(WebElement.class);

        final String expected = someString();

        // Given
        given(by.className(className)).willReturn(byClassName);
        given(driver.findElement(byClassName)).willReturn(element);
        given(element.getText()).willReturn(expected);

        // When
        final String actual = finder.findTextByClassName(className);

        // Then
        assertThat(actual, is(expected));
    }

    @Test
    public void Can_find_an_element_by_its_text() {

        final String text = someString();

        final By byText = mock(By.class);
        final WebElement expected = mock(WebElement.class);

        // Given
        given(by.text(text)).willReturn(byText);
        given(driver.findElement(byText)).willReturn(expected);

        // When
        final WebElement actual = finder.findByText(text);

        // Then
        assertThat(actual, is(expected));
    }

    @Test
    public void Can_click_an_element_by_its_text() {

        final String text = someString();

        final By byText = mock(By.class);
        final WebElement element = mock(WebElement.class);

        // Given
        given(by.text(text)).willReturn(byText);
        given(driver.findElement(byText)).willReturn(element);

        // When
        finder.clickByText(text);

        // Then
        verify(element).click();
    }

    @Test
    public void Can_find_an_element_by_its_label_name() {

        final String labelName = someString();
        final String text = someString();

        final By byText = mock(By.class);
        final WebElement label = mock(WebElement.class);
        final String inputId = someString();
        final By byId = mock(By.class);
        final WebElement expected = mock(WebElement.class);

        // Given
        given(by.text(labelName)).willReturn(byText);
        given(driver.findElement(byText)).willReturn(label);
        given(label.getAttribute("for")).willReturn(inputId);
        given(by.id(inputId)).willReturn(byId);
        given(driver.findElement(byId)).willReturn(expected);

        // When
        final WebElement actual = finder.findByLabel(labelName);

        // Then
        assertThat(actual, is(expected));
    }

    @Test
    public void Can_set_the_text_of_an_element_by_its_label_name() {

        final String labelName = someString();
        final String text = someString();

        final By byText = mock(By.class);
        final WebElement label = mock(WebElement.class);
        final String inputId = someString();
        final By byId = mock(By.class);
        final WebElement input = mock(WebElement.class);

        // Given
        given(by.text(labelName)).willReturn(byText);
        given(driver.findElement(byText)).willReturn(label);
        given(label.getAttribute("for")).willReturn(inputId);
        given(by.id(inputId)).willReturn(byId);
        given(driver.findElement(byId)).willReturn(input);

        // When
        finder.setTextByLabel(labelName, text);

        // Then
        final InOrder order = inOrder(input);
        order.verify(input).clear();
        order.verify(input).sendKeys(text);
    }

    @Test
    public void Can_click_an_element_by_its_value() {

        final String value = someString();

        final By byValue = mock(By.class);
        final WebElement element = mock(WebElement.class);

        // Given
        given(by.value(value)).willReturn(byValue);
        given(driver.findElement(byValue)).willReturn(element);

        // When
        finder.clickByValue(value);

        // Then
        verify(element).click();
    }
}