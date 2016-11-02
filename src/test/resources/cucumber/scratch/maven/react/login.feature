Feature: Can login
  As a user I would like to be able to login so that I can access sucre parts of the website.

  Scenario: Login
    Given I am an existing user
    And I am not logged in
    When I login
    Then I should be on the home page
    And I should see that I am logged in
