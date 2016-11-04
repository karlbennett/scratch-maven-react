Feature: Can login
  As a user I would like to be able to login so that I can access sucre parts of the website.

  Scenario: Login
    Given I am an existing user
    When I login
    Then I should be on the home page
    And I should see that I am logged in

  Scenario: Logout
    Given I am logged in
    When I logout
    Then I should be on the home page
    And I should see that I am logged out

  Scenario: View a secure page
    Given I am logged in
    When I view a secure page
    Then I should see the secure page

  Scenario: Redirected to the login page when not logged in and viewing a secure page
    Given I am not logged in
    When I view a secure page
    Then I should be taken to the login page
