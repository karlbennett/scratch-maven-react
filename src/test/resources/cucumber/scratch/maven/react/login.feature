Feature: Can login
  As a user I would like to be able to login so that I can access sucre parts of the website.

  Scenario: Login
    Given I am an existing user
    When I have logged in
    Then I should be on the home page
    And I should see that I am logged in

  Scenario: Logout
    Given I am logged in
    When I have logged out
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

  Scenario: Redirected to the login page when session has expired and viewing a secure page
    Given I am logged in
    And my session has expired
    When I view a secure page
    Then I should be taken to the login page
    And I should see that I am logged out

  Scenario: Redirected back to requested page after login
    Given I am redirected to the login page because I am logged out
    When I login
    Then I should see the secure page

  Scenario: Redirected back to requested page after session timeout login
    Given I am redirected to the login page my session has timed out
    When I login
    Then I should see the secure page
