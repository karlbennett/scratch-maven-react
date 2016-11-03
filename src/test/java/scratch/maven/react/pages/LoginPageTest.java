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

import cucumber.scratch.maven.react.domain.User;
import cucumber.scratch.maven.react.pages.Bys;
import cucumber.scratch.maven.react.pages.Finder;
import cucumber.scratch.maven.react.pages.LoginPage;
import org.junit.Test;
import org.mockito.InOrder;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.inOrder;
import static org.mockito.Mockito.mock;
import static shiver.me.timbers.data.random.RandomStrings.someString;

public class LoginPageTest {

    @Test
    public void Can_login_a_user() {

        final Finder finder = mock(Finder.class);
        final Bys by = mock(Bys.class);
        final User user = mock(User.class);

        final String username = someString();
        final String password = someString();
        final WebElement login = mock(WebElement.class);
        final By byText = mock(By.class);
        final WebElement loginButton = mock(WebElement.class);

        // Given
        given(user.getUserName()).willReturn(username);
        given(user.getPassword()).willReturn(password);
        given(finder.findByClassName("hello_world_login")).willReturn(login);
        given(by.text("Login")).willReturn(byText);
        given(login.findElement(byText)).willReturn(loginButton);

        // When
        new LoginPage(finder, by).login(user);

        // Then
        final InOrder order = inOrder(finder, loginButton);
        order.verify(finder).setTextByLabel("Username", username);
        order.verify(finder).setTextByLabel("Password", password);
        order.verify(loginButton).click();
    }
}