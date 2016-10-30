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

package scratch.maven.react.domain;

import com.fasterxml.jackson.databind.ObjectMapper;
import cucumber.scratch.maven.react.domain.User;
import cucumber.scratch.maven.react.domain.UserCreationException;
import cucumber.scratch.maven.react.domain.UserFactory;
import cucumber.scratch.maven.react.io.Resources;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;

import java.io.IOException;
import java.io.InputStream;

import static java.lang.String.format;
import static org.hamcrest.Matchers.is;
import static org.junit.Assert.assertThat;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.mock;
import static shiver.me.timbers.data.random.RandomStrings.someString;

public class UserFactoryTest {

    private static final String USERS_PATTERN = "users/user-%s.json";

    @Rule
    public ExpectedException expectedException = ExpectedException.none();

    private Resources resources;
    private ObjectMapper objectMapper;
    private UserFactory factory;

    @Before
    public void setUp() {
        resources = mock(Resources.class);
        objectMapper = mock(ObjectMapper.class);
        factory = new UserFactory(resources, objectMapper);
    }

    @Test
    public void Can_create_a_user() throws IOException {

        final String name = someString();

        final InputStream stream = mock(InputStream.class);

        final User expected = mock(User.class);

        // Given
        given(resources.toInputStream(format(USERS_PATTERN, name))).willReturn(stream);
        given(objectMapper.readValue(stream, User.class)).willReturn(expected);

        // When
        final User actual = factory.create(name);

        // Then
        assertThat(actual, is(expected));
    }

    @Test
    public void Can_fail_to_create_a_user() throws IOException {

        final String name = someString();

        final String fileName = format(USERS_PATTERN, name);
        final IOException exception = new IOException();

        // Given
        given(resources.toInputStream(fileName)).willThrow(exception);
        expectedException.expect(UserCreationException.class);
        expectedException.expectMessage(format("Failed to create a user from the file (%s).", fileName));
        expectedException.expectCause(is(exception));

        // When
        factory.create(name);
    }
}