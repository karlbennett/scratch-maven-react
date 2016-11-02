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

import cucumber.scratch.maven.react.domain.User;
import cucumber.scratch.maven.react.domain.UserFactory;
import cucumber.scratch.maven.react.pages.HelloWorldPage;
import cucumber.scratch.maven.react.pages.HomePage;
import cucumber.scratch.maven.react.pages.LoginPage;
import cucumber.scratch.maven.react.pages.Page;
import cucumber.scratch.maven.react.steps.LoginSteps;
import cucumber.scratch.maven.react.steps.UserHolder;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;
import org.mockito.InOrder;

import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.inOrder;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;

public class LoginStepsTest {

    @Rule
    public ExpectedException expectedException = ExpectedException.none();

    private UserFactory userFactory;
    private UserHolder userHolder;
    private Page page;
    private HelloWorldPage helloWorldPage;
    private LoginPage loginPage;
    private HomePage homePage;
    private LoginSteps steps;

    @Before
    public void setUp() {
        userFactory = mock(UserFactory.class);
        userHolder = mock(UserHolder.class);
        page = mock(Page.class);
        helloWorldPage = mock(HelloWorldPage.class);
        loginPage = mock(LoginPage.class);
        homePage = mock(HomePage.class);
        steps = new LoginSteps(userFactory, userHolder, page, helloWorldPage, loginPage, homePage);
    }

    @Test
    public void Can_setup_an_existing_user() {

        final User user = mock(User.class);

        // Given
        given(userFactory.create("existing")).willReturn(user);

        // When
        steps.iAmAnExistingUser();

        // Then
        verify(userHolder).set(user);
    }

    @Test
    public void Can_make_sure_the_user_is_not_logged_in() {

        // When
        steps.iAmNotLoggedIn();

        // Then
        verify(page).clearCookies();
    }

    @Test
    public void Can_login() {

        final User user = mock(User.class);

        // Given
        given(userHolder.get()).willReturn(user);

        // When
        steps.iLogin();

        // Then
        verify(helloWorldPage).clickLogin();
        verify(loginPage).login(user);
    }

    @Test
    public void Can_check_that_the_user_should_be_logged_in_and_is() {

        // Given
        given(helloWorldPage.isLoggedIn()).willReturn(true);

        // When
        steps.iShouldSeeThatIAmLoggedIn();

        // Then
        final InOrder order = inOrder(homePage, page, helloWorldPage);
        order.verify(homePage).waitToLoad();
        order.verify(page).refresh();
        order.verify(homePage).waitToLoad();
        order.verify(helloWorldPage).isLoggedIn();
    }

    @Test
    public void Can_check_that_the_user_should_be_logged_in_and_is_not() {

        // Given
        given(helloWorldPage.isLoggedIn()).willReturn(false);
        expectedException.expect(AssertionError.class);

        // When
        steps.iShouldSeeThatIAmLoggedIn();
    }

    @Test
    public void Can_check_that_the_user_should_be_not_logged_in_and_is_not() {

        // Given
        given(helloWorldPage.isLoggedIn()).willReturn(false);

        // When
        steps.iShouldNotBeLoggedIn();

        // Then
        verify(helloWorldPage).isLoggedIn();
    }

    @Test
    public void Can_check_that_the_user_should_be_not_logged_in_and_is() {

        // Given
        given(helloWorldPage.isLoggedIn()).willReturn(true);
        expectedException.expect(AssertionError.class);

        // When
        steps.iShouldNotBeLoggedIn();
    }
}