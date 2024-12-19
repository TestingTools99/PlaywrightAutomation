Feature: Xero Login 

Scenario: Performing signing into Xero trial account
Given navigating to Xero login page
When user clicks on signIn with username is "{username}" and password is "{password}"
Then verify login should be successful