var CLIENT_ID =
  "280227795234-r04m37hmv71lj46t7j3it98p3k5jcl8v.apps.googleusercontent.com";

var API_KEY = "AIzaSyAhUm_FO6JYzjqvwxeewpfbOxHCdUP-cH8";

function authenticate() {
  return gapi.auth2
    .getAuthInstance()
    .signIn({
      scope:
        "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar.events.readonly https://www.googleapis.com/auth/calendar.readonly",
    })
    .then(
      function () {
        console.log("Sign-in successful");
      },
      function (err) {
        console.error("Error signing in", err);
      }
    );
}
function loadClient() {
  gapi.client.setApiKey(API_KEY);
  return gapi.client
    .load("https://content.googleapis.com/discovery/v1/apis/calendar/v3/rest")
    .then(
      function () {
        console.log("GAPI client loaded for API");
      },
      function (err) {
        console.error("Error loading GAPI client for API", err);
      }
    );
}
// Make sure the client is loaded and sign-in is complete before calling this method.
function execute() {
  return gapi.client.calendar.events
    .list({
      calendarId: "primary",
    })
    .then(
      function (response) {
        // Handle the results here (response.result has the parsed body).
        console.log("Response", response);
      },
      function (err) {
        console.error("Execute error", err);
      }
    );
}
gapi.load("client:auth2", function () {
  gapi.auth2.init({ client_id: CLIENT_ID });
});
