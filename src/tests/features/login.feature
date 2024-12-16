Feature: Login Scenarios

Scenario: Perfoming Login Validation

Given I am on Xero login Page
When I login with valid credentials
And  click on signIn button
Then verify  login shpould be successful