Feature: Can visit the home page
  As a user I would like to be able to visits the Hello World home page to see what the example code produces.

  Scenario: Visit the home page
    Given I have decided to visit the Hello World homepage
    When I visit the page
    Then I should see it rendered correctly