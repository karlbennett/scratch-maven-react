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

import cucumber.api.java.en.Then;
import cucumber.scratch.maven.react.pages.SecretPage;

import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.is;
import static org.junit.Assert.assertThat;

public class SecretPageSteps {

    private final SecretPage secretPage;

    public SecretPageSteps(SecretPage secretPage) {
        this.secretPage = secretPage;
    }

    @Then("^I should see the secure page$")
    public void iShouldSeeTheSecurePage() {
        secretPage.waitToLoad();
        assertThat(secretPage.getMessage(), equalTo("Hello secret world."));
        assertThat(secretPage.hasImage(), is(true));
    }
}
