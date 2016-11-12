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
import static org.mockito.Mockito.verifyZeroInteractions;

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
    public void Can_be_logged_in() {

        final User user = mock(User.class);

        // Given
        given(userFactory.create("existing")).willReturn(user);
        given(userHolder.get()).willReturn(user);

        // When
        steps.iAmLoggedIn();

        // Then
        final InOrder order = inOrder(userHolder, homePage, helloWorldPage, loginPage);
        order.verify(userHolder).set(user);
        order.verify(homePage).waitToLoad();
        order.verify(helloWorldPage).clickLogin();
        order.verify(userHolder).get();
        order.verify(loginPage).login(user);
    }

    @Test
    public void Can_be_not_logged_in() {

        // When
        steps.iAmNotLoggedIn();

        // Then
        verifyZeroInteractions(userFactory, userHolder, page, helloWorldPage, loginPage, homePage);
    }

    @Test
    public void Can_expire_the_users_session() {

        // When
        steps.mySessionHasExpired();

        // Then
        verify(helloWorldPage).expireSession();
    }

    @Test
    public void Can_be_redirected_because_of_being_logged_out() {

        final User user = mock(User.class);

        // Given
        given(userFactory.create("existing")).willReturn(user);
        given(loginPage.isCurrentPage()).willReturn(true);

        // When
        steps.iAmRedirectedToTheLoginPageBecauseIAmLoggedOut();

        // Then
        verify(userHolder).set(user);
        verify(homePage).clickSecret();
        verify(loginPage).isCurrentPage();
    }

    @Test
    public void Can_fail_to_be_redirected_because_of_being_logged_out() {

        // Given
        given(loginPage.isCurrentPage()).willReturn(false);
        expectedException.expect(AssertionError.class);

        // When
        steps.iAmRedirectedToTheLoginPageBecauseIAmLoggedOut();
    }

    @Test
    public void Can_be_redirected_because_of_a_session_time_out() {

        final User user = mock(User.class);

        // Given
        given(userFactory.create("existing")).willReturn(user);
        given(userHolder.get()).willReturn(user);

        // When
        steps.iAmRedirectedToTheLoginPageMySessionHasTimedOut();

        // Then
        final InOrder order = inOrder(userHolder, homePage, helloWorldPage, loginPage);
        order.verify(userHolder).set(user);
        order.verify(homePage).waitToLoad();
        order.verify(helloWorldPage).clickLogin();
        order.verify(userHolder).get();
        order.verify(loginPage).login(user);
        order.verify(helloWorldPage).expireSession();
        order.verify(homePage).waitToLoad();
        order.verify(homePage).clickSecret();
    }

    @Test
    public void Can_login_from_the_home_page() {

        final User user = mock(User.class);

        // Given
        given(userHolder.get()).willReturn(user);

        // When
        steps.iHaveLoggedIn();

        // Then
        final InOrder order = inOrder(homePage, helloWorldPage, loginPage);
        order.verify(homePage).waitToLoad();
        order.verify(helloWorldPage).clickLogin();
        order.verify(loginPage).login(user);
    }

    @Test
    public void Can_logout_from_the_home_page() {

        // When
        steps.iHaveLoggedOut();

        // Then
        final InOrder order = inOrder(homePage, helloWorldPage);
        order.verify(homePage).waitToLoad();
        order.verify(helloWorldPage).clickLogout();
    }

    @Test
    public void Can_login() {

        final User user = mock(User.class);

        // Given
        given(userHolder.get()).willReturn(user);

        // When
        steps.iLogin();

        // Then
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

    @Test
    public void Can_check_that_the_user_sees_they_are_logged_out() {

        // Given
        given(helloWorldPage.isLoggedIn()).willReturn(false);

        // When
        steps.iShouldSeeThatIAmLoggedOut();

        // Then
        verify(helloWorldPage).isLoggedIn();
    }

    @Test
    public void Can_check_that_the_user_sees_they_are_logged_out_but_are_logged_in() {

        // Given
        given(helloWorldPage.isLoggedIn()).willReturn(true);
        expectedException.expect(AssertionError.class);

        // When
        steps.iShouldSeeThatIAmLoggedOut();
    }

    @Test
    public void Can_check_that_the_user_is_on_the_login_page() {

        // Given
        given(loginPage.isCurrentPage()).willReturn(true);

        // When
        steps.iShouldBeTakenToTheLoginPage();

        // Then
        verify(loginPage).isCurrentPage();
    }

    @Test
    public void Can_check_that_the_user_is_not_on_the_login_page() {

        // Given
        given(loginPage.isCurrentPage()).willReturn(false);
        expectedException.expect(AssertionError.class);

        // When
        steps.iShouldBeTakenToTheLoginPage();
    }
}