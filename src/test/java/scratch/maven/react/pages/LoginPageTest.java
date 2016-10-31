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
import cucumber.scratch.maven.react.pages.Finder;
import cucumber.scratch.maven.react.pages.LoginPage;
import org.junit.Test;
import org.mockito.InOrder;

import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.inOrder;
import static org.mockito.Mockito.mock;
import static shiver.me.timbers.data.random.RandomStrings.someString;

public class LoginPageTest {

    @Test
    public void Can_login_a_user() {

        final Finder finder = mock(Finder.class);
        final User user = mock(User.class);

        final String username = someString();
        final String password = someString();

        // Given
        given(user.getUserName()).willReturn(username);
        given(user.getPassword()).willReturn(password);

        // When
        new LoginPage(finder).login(user);

        // Then
        final InOrder order = inOrder(finder);
        order.verify(finder).setTextByLabel("Username", username);
        order.verify(finder).setTextByLabel("Password", password);
        order.verify(finder).clickByText("Login");
    }
}