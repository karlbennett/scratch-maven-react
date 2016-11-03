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
import cucumber.scratch.maven.react.pages.HomePage;
import cucumber.scratch.maven.react.pages.Page;
import org.springframework.beans.factory.annotation.Autowired;

import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.is;
import static org.junit.Assert.assertThat;

public class HomePageSteps {

    private final PagePathHolder pagePathHolder;
    private final Page page;
    private final HomePage homePage;

    @Autowired
    public HomePageSteps(PagePathHolder pagePathHolder, Page page, HomePage homePage) {
        this.pagePathHolder = pagePathHolder;
        this.page = page;
        this.homePage = homePage;
    }

    @Given("^I have decided to visit the Hello World homepage$")
    public void iHaveDecidedToVisitTheHelloWorldHomepage() {
        page.clearCookies();
        pagePathHolder.set("");
    }

    @When("^I view a secure page$")
    public void iViewASecurePage() {
        homePage.clickSecret();
    }

    @Then("^I should be on the home page$")
    public void iShouldBeOnTheHomePage() {
        homePage.waitToLoad();
        assertThat(homePage.getMessage(), equalTo("Hello world."));
        assertThat(homePage.hasImage(), is(true));
    }
}
