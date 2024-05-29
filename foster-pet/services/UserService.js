
class UserService {
    constructor() {
      this.baseUrl = 'https://fosterpet.azurewebsites.net';
    }
//get user by id
async getUserById(id,token) {
    try {
      const response = await fetch(`${this.baseUrl}/api/user/id?id=${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        
      });

      if (!response.ok) {
        throw new Error('Failed to get user data');
      }

      const data = await response.json();
      console.warn(data);
      return data; 
    } catch (error) {
      throw error;
    }
  }

  //update user profile
async updateUser(userData,token) {
  
    console.log('User data:', userData);
  // Make a POST request to the endpoint where the save method is defined
  fetch(`${this.baseUrl}/api/user/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({userData}),
  })
  .then(response => {
        console.log("response body: ",response.body)
      // Check if response status is OK
      if (!response.ok) {
          // If response status is not OK, handle the error
          return response.text().then(errorMessage => {
            throw new Error(errorMessage);
          })
      }
      // If response status is OK, return the JSON response
      return response.json();
  })
  .then(data => {
      // Handle successful response data here
      console.log('User Profile updated successfully:', data);
  })
  .catch(error => {
      // Handle any errors that occurred during the fetch
      console.error('Error saving user:', error.message);
  });
}



}
  
export default new UserService();