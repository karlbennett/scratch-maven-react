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

package cucumber.scratch.maven.react.pages;

import cucumber.scratch.maven.react.domain.User;
import org.openqa.selenium.WebElement;
import org.springframework.stereotype.Component;
import shiver.me.timbers.waiting.Wait;

@Component
@Wait
public class LoginPage {

    private final Finder finder;
    private final Bys by;

    public LoginPage(Finder finder, Bys by) {
        this.finder = finder;
        this.by = by;
    }

    public void login(User user) {
        finder.setTextByLabel("Username", user.getUserName());
        finder.setTextByLabel("Password", user.getPassword());
        finder.findByClassName("hello_world_login").findElement(by.text("Login")).click();
    }

    public boolean isCurrentPage() {
        if (finder.findByLabel("Username") == null) {
            return false;
        }

        if (finder.findByLabel("Password") == null) {
            return false;
        }

        final WebElement login = finder.findByClassName("hello_world_login");

        if (login == null) {
            return false;
        }

        if (login.findElement(by.text("Login")) == null) {
            return false;
        }

        return true;
    }
}
