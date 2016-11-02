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

import org.openqa.selenium.NoSuchElementException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import shiver.me.timbers.waiting.Options;
import shiver.me.timbers.waiting.Waiter;

@Component
public class HomePage {

    private Logger log = LoggerFactory.getLogger(getClass());

    private final Finder finder;

    public HomePage(Finder finder) {
        this.finder = finder;
    }

    public String getMessage() {
        return finder.findTextByClassName("hello_world_message");
    }

    public boolean hasImage() {
        try {
            finder.findByClassName("hello_world_image");
            return true;
        } catch (NoSuchElementException e) {
            log.error("Failed to find the home page image.", e);
            return false;
        }
    }

    public void waitToLoad() {
        new Waiter(new Options().willWaitForTrue(true)).wait(() -> {
            getMessage();
            return hasImage();
        });
    }
}
