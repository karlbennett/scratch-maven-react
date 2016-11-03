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

import org.openqa.selenium.By;
import org.springframework.stereotype.Component;

import static java.lang.String.format;

@Component
public class Bys {

    public By id(String id) {
        return By.id(id);
    }

    public By className(String className) {
        return By.className(className);
    }

    public By text(String text) {
        return xpath(format(".//*[contains(text(),'%s')]", text));
    }

    public By value(String value) {
        return xpath(format(".//*[@value = '%s']", value));
    }

    private static By xpath(String xpath) {
        return By.xpath(xpath);
    }
}
