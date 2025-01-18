Feature: Show/Hide Event Details
    Scenario:  An event element is collapsed by default
        Given user is on the main page
        When the user did not click on the show details button
        Then the event details should be collapsed and hidden by default

    Scenario:  User can expand an event to see details
        Given user is on the main page
        And the event details are collapsed
        When the user clicks on the event to expand it
        Then the event details should be expanded and visible

    Scenario: User can collapse an event to hide details
        Given user is on the main page
        And the event details are expanded
        When the user clicks on the event to collapse it
        Then the event details should be collapsed and hidden


