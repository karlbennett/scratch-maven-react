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

package scratch.maven.react.io;

import cucumber.scratch.maven.react.io.Resources;
import org.apache.commons.io.IOUtils;
import org.junit.Test;

import java.io.IOException;

import static org.hamcrest.Matchers.is;
import static org.junit.Assert.assertThat;

public class ResourcesTest {

    @Test
    public void Can_get_the_input_stream_for_a_resource() throws IOException {

        // When
        final String actual = IOUtils.toString(new Resources().toInputStream("test-resource.txt"), "UTF-8");

        // Then
        assertThat(actual, is("Some test text."));
    }

    @Test
    public void Can_get_the_string_for_a_resource() throws IOException {

        // When
        final String actual = new Resources().toString("test-resource.txt");

        // Then
        assertThat(actual, is("Some test text."));
    }
}