Feature: Xero Login 

Scenario: Performing signing into Xero trial account
Given navigating to Xero login page
When user clicks on signIn with username is "y.tummalagunta@xero.com" and password is "Automation@12345"
Then verify login should be successful