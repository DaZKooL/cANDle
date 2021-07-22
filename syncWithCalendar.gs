// const calendarId = 'c_1q3lqus52bup2vb9jcvo27qn4k@group.calendar.google.com'

function syncWithCalendar(eventDetails, email, fullName) {
  // const title = `${fullName}'s birthday`
  const title = `${email}'s birthday`
  // console.log('EVENT Birthday Check LongForm', eventDetails['What is your date of birth?'])
  console.log('EVENT details', eventDetails)
  const calendar = CalendarApp.getCalendarById(calendarId);

  const birthdayDate = eventDetails.Birthday || eventDetails['What is your date of birth?']
  console.log('birthdayDate', birthdayDate)

  
  // Clean up old birthday if existing / if user changed a date
  const allEvents = getOldEvents(calendar, title)
  console.log('allEvents', allEvents)

  // delete old events
  if (allEvents.length) {
    console.log('DELETE triggered')
    try {
      allEvents.map(event => event.getEventSeries().deleteEventSeries())
    } catch (e) {
      console.error('Woopsie, something went wrong deleting old events', e)
    }
  }
  
  // Create new birthday event
  const eventSeries = calendar.createAllDayEventSeries(title,
      new Date(birthdayDate),
      CalendarApp.newRecurrence().addYearlyRule(),
      {guests: email});

  Logger.log('Created event Series with ID: ' + eventSeries.getId());
  return
}

const getOldEvents = (calendar, title) => {
  const now = new Date()
  const aYearAgo = new Date(now.getTime() - (366 * 24 * 60 * 60 * 1000));
  const oldEvents = calendar.getEvents(aYearAgo, now, { search: `${title}` })
  
  return oldEvents
}