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

package cucumber.scratch.maven.react.steps;

import cucumber.api.java.en.Given;
import cucumber.api.java.en.Then;
import cucumber.api.java.en.When;
import cucumber.scratch.maven.react.domain.UserFactory;
import cucumber.scratch.maven.react.pages.HelloWorldPage;
import cucumber.scratch.maven.react.pages.HomePage;
import cucumber.scratch.maven.react.pages.LoginPage;
import cucumber.scratch.maven.react.pages.Page;
import org.springframework.beans.factory.annotation.Autowired;

import static org.hamcrest.Matchers.is;
import static org.junit.Assert.assertThat;

public class LoginSteps {

    private final UserFactory userFactory;
    private final UserHolder userHolder;
    private final Page page;
    private final HelloWorldPage helloWorldPage;
    private final LoginPage loginPage;
    private final HomePage homePage;

    @Autowired
    public LoginSteps(
        UserFactory userFactory,
        UserHolder userHolder,
        Page page,
        HelloWorldPage helloWorldPage,
        LoginPage loginPage,
        HomePage homePage
    ) {
        this.userFactory = userFactory;
        this.userHolder = userHolder;
        this.page = page;
        this.helloWorldPage = helloWorldPage;
        this.loginPage = loginPage;
        this.homePage = homePage;
    }

    @Given("^I am an existing user$")
    public void iAmAnExistingUser() {
        userHolder.set(userFactory.create("existing"));
    }

    @Given("^I am logged in$")
    public void iAmLoggedIn() {
        iAmAnExistingUser();
        iLogin();
    }

    @Given("^I am not logged in$")
    public void iAmNotLoggedIn() {
        // Do nothing here because the Hooks will logout before every scenario.
    }

    @Given("^my session has expired$")
    public void mySessionHasExpired() {
        helloWorldPage.expireSession();
    }

    @When("^I login$")
    public void iLogin() {
        homePage.waitToLoad();
        helloWorldPage.clickLogin();
        loginPage.login(userHolder.get());
    }

    @When("^I logout$")
    public void iLogout() {
        homePage.waitToLoad();
        helloWorldPage.clickLogout();
    }

    @Then("^I should see that I am logged in$")
    public void iShouldSeeThatIAmLoggedIn() {
        homePage.waitToLoad();
        page.refresh();
        homePage.waitToLoad();
        assertThat(helloWorldPage.isLoggedIn(), is(true));
    }

    @Then("^I should not be logged in$")
    public void iShouldNotBeLoggedIn() {
        assertThat(helloWorldPage.isLoggedIn(), is(false));
    }

    @Then("^I should be taken to the login page$")
    public void iShouldBeTakenToTheLoginPage() {
        assertThat(loginPage.isCurrentPage(), is(true));
    }

    @Then("^I should see that I am logged out$")
    public void iShouldSeeThatIAmLoggedOut() {
        iShouldNotBeLoggedIn();
    }
}
