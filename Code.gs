// this function will run once the form is submitted

function main() {
  // responseLogger()
  lastResponse()
  // syncWithCalendar()
  // sendEmails()

}

// /**
//  * Gets a list of people in the user's contacts.
//  */
// function getConnections() {
//   var people = People.People.Connections.list('people/me', {
//     personFields: 'names,emailAddresses'
//   });
//   Logger.log('Connections: %s', JSON.stringify(people, null, 2));
// }

// /**
//  * Gets the own user's profile.
//  */
// function getSelf() {
//   var people = People.People.getBatchGet({
//     resourceNames: ['people/me'],
//     personFields: 'names,emailAddresses'
//   });
//   Logger.log('Myself: %s', JSON.stringify(people, null, 2));
// }
function responseLogger() {

  // Open a form by ID and log the responses to each question.
  var form = FormApp.openById('121RGvMQ5WvRmP2P9kQwnnpuMpqsGKyk4ccqBWIilyaY');
  var formResponses = form.getResponses();
  console.log('FORM RESPONSES', formResponses)
  for (var i = 0; i < formResponses.length; i++) {
    var formResponse = formResponses[i];
    var itemResponses = formResponse.getItemResponses();
    for (var j = 0; j < itemResponses.length; j++) {
      var itemResponse = itemResponses[j];
      Logger.log('Response #%s to the question "%s" was "%s"',
          (i + 1).toString(),
          itemResponse.getItem().getTitle(),
          itemResponse.getResponse());
    }
  }

}

function lastResponse() {
  var formResponses = FormApp.getActiveForm().getResponses();
  Logger.log(formResponses.length);
  Logger.log(formResponses);
  console.log('HEREEE', formResponses)
  // var formResponse = formResponses[formResponses.length-1];
  // var itemResponses = formResponse.getItemResponses();
  // for (var j = 0; j < itemResponses.length; j++) {
  //   var itemResponse = itemResponses[j];
  //   Logger.log('Last response to the question "%s" was "%s"',
  //              itemResponse.getItem().getTitle(),
  //              itemResponse.getResponse());
  // }
}


function syncWithCalendar() {
  /**
 * Creates an event in the user's default calendar.
 */
// function createEvent() {
//   var calendarId = 'primary';
//   var start = getRelativeDate(1, 12);
//   var end = getRelativeDate(1, 13);
//   var event = {
//     summary: 'Lunch Meeting',
//     location: 'The Deli',
//     description: 'To discuss our plans for the presentation next week.',
//     start: {
//       dateTime: start.toISOString()
//     },
//     end: {
//       dateTime: end.toISOString()
//     },
//     attendees: [
//       {email: 'alice@example.com'},
//       {email: 'bob@example.com'}
//     ],
//     // Red background. Use Calendar.Colors.get() for the full list.
//     colorId: 11
//   };
//   event = Calendar.Events.insert(event, calendarId);
//   Logger.log('Event ID: ' + event.id);
// }

// /**
//  * Helper function to get a new Date object relative to the current date.
//  * @param {number} daysOffset The number of days in the future for the new date.
//  * @param {number} hour The hour of the day for the new date, in the time zone
//  *     of the script.
//  * @return {Date} The new date.
//  */
// function getRelativeDate(daysOffset, hour) {
//   var date = new Date();
//   date.setDate(date.getDate() + daysOffset);
//   date.setHours(hour);
//   date.setMinutes(0);
//   date.setSeconds(0);
//   date.setMilliseconds(0);
//   return date;
// }
}

// c_1q3lqus52bup2vb9jcvo27qn4k@group.calendar.google.com
