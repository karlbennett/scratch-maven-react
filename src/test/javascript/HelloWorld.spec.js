import React from 'react';
import { render } from 'enzyme';
import HelloWorld from '../../main/javascript/HelloWorld';

describe('HelloWorld', () => {

  it('Can add text to a HelloWorld tag', () => {

    // Given
    const text = 'some text';

    // When
    const actual = render(<HelloWorld text={text} />).find('a').text();

    // Then
    assertThat(actual, equalTo(text))
  });
});