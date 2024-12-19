Feature: Organization details scenarios

    Background:
        Given navigating to Xero login page
        When user clicks on signIn with username is "y.tummalagunta@xero.com" and password is "Automation@12345"
        Then verify login should be successful

    Scenario: Creating Organization
        Given click on Organization dropdown in the dashBoard
        Then verify that Add organization link is visible and enabled
        When click on Add organization link
        Then verify that Add Business page
        When User enters business details with "{businessName}" "{industry}" "{country}" "{employeeStatus}" "{selectTool}"
        And  click on Start trail button
        Then  verify the Created Organization and displayed in the Organization dropdown