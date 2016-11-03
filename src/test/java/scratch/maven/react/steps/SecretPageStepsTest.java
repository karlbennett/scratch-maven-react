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

import cucumber.scratch.maven.react.pages.SecretPage;
import cucumber.scratch.maven.react.steps.SecretPageSteps;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;
import org.mockito.InOrder;

import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.inOrder;
import static org.mockito.Mockito.mock;
import static shiver.me.timbers.data.random.RandomStrings.someString;
import static shiver.me.timbers.data.random.RandomThings.someThing;

public class SecretPageStepsTest {

    @Rule
    public ExpectedException expectedException = ExpectedException.none();

    private SecretPage secretPage;
    private SecretPageSteps steps;

    @Before
    public void setUp() {
        secretPage = mock(SecretPage.class);
        steps = new SecretPageSteps(secretPage);
    }

    @Test
    public void Can_verify_the_content_of_the_secret_page() {

        // Given
        given(secretPage.getMessage()).willReturn("Hello secret world.");
        given(secretPage.hasImage()).willReturn(true);

        // When
        steps.iShouldSeeTheSecurePage();

        // Then
        final InOrder order = inOrder(secretPage);
        order.verify(secretPage).waitToLoad();
        order.verify(secretPage).getMessage();
        order.verify(secretPage).hasImage();
    }

    @Test
    public void Can_verify_the_content_of_the_home_page_is_invalid() {

        // Given
        given(secretPage.getMessage()).willReturn(someThing(someString(), "Hello secret world."));
        given(secretPage.hasImage()).willReturn(false);
        expectedException.expect(AssertionError.class);

        // When
        steps.iShouldSeeTheSecurePage();
    }

}