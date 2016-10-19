import React from 'react';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { render } from 'enzyme';
import HelloWorldContainer from '../../main/javascript/HelloWorldContainer';

// Here we configure a function that can be used to create a mock Redux store that also has 'redux-thunk' support.
const mockStore = configureStore([thunk]);

describe('HelloWorldContainer', () => {

  it('Can add text to a HelloWorldContainer tag', () => {

    // Given
    const text = 'some text';
    const store = mockStore({ text }); // Create the mock store with an initial state that contains the test data.

    // When
    const actual = render(<HelloWorldContainer store={store} text={text} />).find('a').text();

    // Then
    assertThat(actual, equalTo(text))
  });
});