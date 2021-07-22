// function onSubmit will run once the form is submitted

function onSubmit(e) {
  console.log('Form submit triggered')
  
  const itemResponses = e.response.getItemResponses();
  const lastResponse = lastResponseLogger(itemResponses)
  const email = e.response.getRespondentEmail()
  console.log('email sumbitted', email);
  // console.log('lastResponse', lastResponse);
  
  const userProfile = getUserProfile(email);
  console.log('userProfile:', 'first name:', userProfile.firstName,'| last name:',userProfile.lastName ,'| full name:',userProfile.fullname, '| email:', userProfile.email);
  // const gif = getUserProfile(email);

  syncWithCalendar(lastResponse, email, userProfile.fullname)
  return

}

// function cronRunner is triggered once daily
function cronRunner() {
  console.log('Cron job triggered')

  sendBdayWishes()

}