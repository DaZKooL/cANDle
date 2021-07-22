const user = {};

// /**
//  * Gets user information
//  */
const getUserProfile = (email) => {
  const userProfile = People.People.get('people/me', {
    personFields: 'names,emailAddresses'
  });

  user.fullname = userProfile.names[0].displayName;
  user.firstName = userProfile.names[ 0].givenName;
  user.lastName = userProfile.names[0].familyName;
  user.email = userProfile.emailAddresses[0].value;
                  
  return user;
}