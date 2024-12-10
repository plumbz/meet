# meet-app
 
 The objective is to build a serverless, progressive web application with React using
 a test- driven technique. The application uses the Google
 Calendar API to fetch upcoming events.

 ##  Feature 1: Show/Hide Events Details
 As a user,
 I should be able to click a button,
 So that, I can view the details of the events.

 Given the user on the event pages <br>
 When the user click/view an event <br>
 Then the event details should either expand(show) or collapsed (hide) the additional information about the events.

 ##  Feature 2: Specify Number of Events
 As a user,
 I should be able specify the number of the events displayed,
 So that, I can control how many events I see at a time based on my preferences.

 Scenario 1:  When user hasn’t specified a number, 32 events are shown by default.
    Given the user has not specified the number of events to display <br>
    When the user views the events<br>
    Then 32 events should be displayed by default<br>

Scenario 2: User can change the number of events displayed<br>
    Given the user has specified a number of events to display<br>
    When the user selects a different number of events to display<br>
    Then the system should display the specified number of events

## Feature 3: Use App when offline
As a user,
I should be able to use the app when offline,
So that I can access important event information without needing an internet connection.

Scenario 1: Show cached data when there’s no internet connection.<br>
    Given the user is offline,<br>
    When the user opens the app,<br>
    Then the app should load the cached version of the events available when the user was last online<br>
    and  there should be an indicator showing the user is currently offline. <br>

Scenario 2: Show error when user changes search settings (city, number of events)<br>
    Given the user is on the events search page<br>
    When the user changes the search settings (e.g., city or number of events)<br>
    Then an error message should be displayed indicating that the search cannot be completed.

## Feature 4:  Add an App Shortcut to the Home Screen
As a user,
I should be able to add an app shortcut to my home screen,
So that, I can quickly access the app without opening the app drawer.

Scenario: User can install the Meet app as a shortcut on their device home screen<br>
    Given the user has installed the Meet app on their device<br>
    When the user selects the option to add the app as a shortcut to the home screen<br>
    Then a shortcut icon for the Meet app should be added to the user's home screen

## Feature 5: Display Charts Visualizing Event Details
As a user,
I should be able to see a chart visualizing the number of upcoming events in each city,
so that I can easily compare event availability across different locations.

Scenario: Show a chart with the number of upcoming events in each city
    Given the user is on the event dashboard page
    When the user selects the option to view upcoming events by city
    Then the app should display a chart showing the number of upcoming events in each city
    And the chart should accurately represent the number of events per city


Technical Requirements: 
- The app must be a React application.
- The app must be built using the TDD technique.
- The app must use the Google Calendar API and OAuth2 authentication flow.
- The app must use serverless functions (AWS lambda is preferred) for the authorization server
 instead of using a traditional server.
- The app’s code must be hosted in a Git repository on GitHub.
- The app must work on the latest versions of Chrome, Firefox, Safari, Edge, and Opera, as well
 as on IE11.
- The app must display well on all screen sizes (including mobile and tablet) widths of 1920px
 and 320px.
- The app must pass Lighthouse’s PWA checklist
- The app must work offline or in slow network conditions with the help of a service worker.
-Users may be able to install the app on desktop and add the app to their home screen on
 mobile.
 -The app must be deployed on Git Hub Pages.
 The app must implement an alert system using an OOP approach to show information to the
 user.
 The app must make use of data visualization.
 -The app must be covered by tests with a coverage rate >= 90%.
- The app must be monitored using anonline performance monitoring tool.