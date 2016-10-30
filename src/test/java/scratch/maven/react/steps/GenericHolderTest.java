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

import cucumber.scratch.maven.react.steps.GenericHolder;
import org.junit.Before;
import org.junit.Test;

import static org.hamcrest.Matchers.is;
import static org.junit.Assert.assertThat;
import static shiver.me.timbers.data.random.RandomThings.someThing;
import static shiver.me.timbers.matchers.Matchers.hasField;

public class GenericHolderTest {

    private GenericHolder<Object> holder;

    @Before
    public void setUp() {
        holder = new GenericHolder<>();
    }

    @Test
    public void Can_set_a_value() {

        // Given
        final Object value = someThing();

        // When
        holder.set(value);

        // Then
        assertThat(holder, hasField("value", value));
    }

    @Test
    public void Can_get_a_value() {

        // Given
        final Object value = someThing();
        holder.set(value);

        // When
        final Object actual = holder.get();

        // Then
        assertThat(actual, is(value));
    }
}