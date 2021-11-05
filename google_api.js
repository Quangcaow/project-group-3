// client id and api key from the developer console
var client_id =
  "280227795234-r04m37hmv71lj46t7j3it98p3k5jcl8v.apps.googleusercontent.com";
var api_key = "aizasyahum_fo6jyzjqvwxeewpfboxhcdup-ch8";

// array of api discovery doc urls for apis used by the quickstart
var discovery_docs = [
  "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
];

// authorization scopes required by the api; multiple scopes can be
// included, separated by spaces.
var scopes = "https://www.googleapis.com/auth/calendar.readonly";

var authorizebutton = document.getelementbyid("authorize_button");
var signoutbutton = document.getelementbyid("signout_button");

/**
 *  on load, called to load the auth2 library and api client library.
 */
function handleclientload() {
  gapi.load("client:auth2", initclient);
}

/**
 *  initializes the api client library and sets up sign-in state
 *  listeners.
 */
function initclient() {
  gapi.client
    .init({
      apikey: api_key,
      clientid: client_id,
      discoverydocs: discovery_docs,
      scope: scopes,
    })
    .then(
      function () {
        // listen for sign-in state changes.
        gapi.auth2.getauthinstance().issignedin.listen(updatesigninstatus);

        // handle the initial sign-in state.
        updatesigninstatus(gapi.auth2.getauthinstance().issignedin.get());
        authorizebutton.onclick = handleauthclick;
        signoutbutton.onclick = handlesignoutclick;
      },
      function (error) {
        appendpre(json.stringify(error, null, 2));
      }
    );
}

/**
 *  called when the signed in status changes, to update the ui
 *  appropriately. after a sign-in, the api is called.
 */
function updatesigninstatus(issignedin) {
  if (issignedin) {
    authorizebutton.style.display = "none";
    signoutbutton.style.display = "block";
    listupcomingevents();
  } else {
    authorizebutton.style.display = "block";
    signoutbutton.style.display = "none";
  }
}

/**
 *  sign in the user upon button click.
 */
function handleauthclick(event) {
  gapi.auth2.getauthinstance().signin();
}

/**
 *  sign out the user upon button click.
 */
function handlesignoutclick(event) {
  gapi.auth2.getauthinstance().signout();
}

/**
 * append a pre element to the body containing the given message
 * as its text node. used to display the results of the api call.
 *
 * @param {string} message text to be placed in pre element.
 */
function appendpre(message) {
  var pre = document.getelementbyid("content");
  var textcontent = document.createtextnode(message + "\n");
  pre.appendchild(textcontent);
}

/**
 * print the summary and start datetime/date of the next ten events in
 * the authorized user's calendar. if no events are found an
 * appropriate message is printed.
 */
function listupcomingevents() {
  gapi.client.calendar.events
    .list({
      calendarid: "primary",
      timemin: new date().toisostring(),
      showdeleted: false,
      singleevents: true,
      maxresults: 10,
      orderby: "starttime",
    })
    .then(function (response) {
      var events = response.result.items;
      appendpre("upcoming events:");

      if (events.length > 0) {
        for (i = 0; i < events.length; i++) {
          var event = events[i];
          var when = event.start.datetime;
          if (!when) {
            when = event.start.date;
          }
          appendpre(event.summary + " (" + when + ")");
        }
      } else {
        appendpre("no upcoming events found.");
      }
    });
}
