
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

  //update user
  async updateUser(userData, token) {
    console.log('User data:', userData);
  
    try {
      const response = await fetch(`${this.baseUrl}/api/user/update`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json', // assuming userData is JSON
        },
        body: userData, // ensure userData is serialized to JSON
      });
  
   
  
      if (!response.ok) {
        console.log('Response from server:',response.status, response.statusText);
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }
  
      const data = await response.json();
      console.log('User Profile updated successfully:', data);
    } catch (error) {
      console.error('Error saving user:', error.message);
    }
  }
  
  


}
  
export default new UserService();