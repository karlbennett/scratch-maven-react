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

package cucumber.scratch.maven.react.domain;

import com.fasterxml.jackson.databind.ObjectMapper;
import cucumber.scratch.maven.react.io.Resources;
import org.springframework.stereotype.Component;

import java.io.IOException;

import static java.lang.String.format;

@Component
public class UserFactory {

    private final Resources resources;
    private final ObjectMapper objectMapper;

    public UserFactory(Resources resources, ObjectMapper objectMapper) {
        this.resources = resources;
        this.objectMapper = objectMapper;
    }

    public User create(String name) {
        final String fileName = format("users/user-%s.json", name);
        try {
            return objectMapper.readValue(resources.toInputStream(fileName), User.class);
        } catch (IOException e) {
            throw new UserCreationException(fileName, e);
        }
    }
}
