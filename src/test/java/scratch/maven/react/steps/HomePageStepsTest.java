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

import cucumber.scratch.maven.react.pages.HomePage;
import cucumber.scratch.maven.react.pages.Page;
import cucumber.scratch.maven.react.steps.HomePageSteps;
import cucumber.scratch.maven.react.steps.PagePathHolder;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;

import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static shiver.me.timbers.data.random.RandomStrings.someString;
import static shiver.me.timbers.data.random.RandomThings.someThing;

public class HomePageStepsTest {

    @Rule
    public ExpectedException expectedException = ExpectedException.none();

    private PagePathHolder pagePathHolder;
    private Page page;
    private HomePage homePage;
    private HomePageSteps steps;

    @Before
    public void setUp() {
        pagePathHolder = mock(PagePathHolder.class);
        page = mock(Page.class);
        homePage = mock(HomePage.class);
        steps = new HomePageSteps(pagePathHolder, page, homePage);
    }

    @Test
    public void Can_decide_to_visit_the_home_page() {

        // When
        steps.iHaveDecidedToVisitTheHelloWorldHomepage();

        // Then
        verify(page).clearCookies();
        verify(pagePathHolder).set("");
    }

    @Test
    public void Can_verify_the_content_of_the_home_page() {

        // Given
        given(homePage.getMessage()).willReturn("Hello world.");
        given(homePage.hasImage()).willReturn(true);

        // When
        steps.iShouldBeOnTheHomePage();

        // Then
        verify(homePage).getMessage();
        verify(homePage).hasImage();
    }

    @Test
    public void Can_verify_the_content_of_the_home_page_is_invalid() {

        // Given
        given(homePage.getMessage()).willReturn(someThing(someString(), "Hello world."));
        given(homePage.hasImage()).willReturn(false);
        expectedException.expect(AssertionError.class);

        // When
        steps.iShouldBeOnTheHomePage();
    }
}