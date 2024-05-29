class VoulnteerService {
    constructor() {
      this.baseUrl = 'https://fosterpet.azurewebsites.net';
    }
  
    
//get volunteer nearby
async getAllVolunteerNear(longitude, latitude, maxDistance, token) {
  console.warn("Calling api...");
    try {
      const response = await fetch(`${this.baseUrl}/api/volunteer/location?longitude=${longitude}&latitude=${latitude}&maxDistance=${maxDistance}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Authorization': `Bearer ${token}`,
        },
        //mode: 'no-cors'
      });

      if (!response.ok) {
        console.warn('Error.........');
        console.log(response);
        throw new Error('Failed to get volunteer data');
      }
     console.warn("response " ,response);
      const data = await response.json();
      console.warn(data);
      return data; 
    } catch (error) {
      throw error;
    }
  }

  //get volunteer by id
async getVolunteerById(id,token) {
  try {
    const response = await fetch(`${this.baseUrl}/api/volunteer/id?volunteerId=${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      
    });

    if (!response.ok) {
      throw new Error('Failed to get volunteer data');
    }

    const data = await response.json();
    console.warn(data);
    return data; 
  } catch (error) {
    throw error;
  }
}


  }
  
  export default new VoulnteerService();
  