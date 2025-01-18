Feature: Specify Number of Events
    Scenario:  When user hasn’t specified a number, 32 events are shown by default
        Given user has not specified the number of events to display
        When the user views the events
        Then 32 events should be displayed by default

    Scenario: User can change the number of events displayed
        Given user has specified a number of events to display
        When the user selects a different number of events to display
        Then the system should display the specified number of events