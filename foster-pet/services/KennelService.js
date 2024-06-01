class KennelService {
    constructor() {
      this.baseUrl = 'https://fosterpet.azurewebsites.net';
    }
  
    
//get kennel nearby
async getAllKennelNear(longitude, latitude, maxDistance, token) {
  console.warn("Calling api...");
    try {
      const response = await fetch(`${this.baseUrl}/api/kennel/near?longitude=${longitude}&latitude=${latitude}&maxDistance=${maxDistance}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Authorization': `Bearer ${token}`,
        },
        //mode: 'no-cors'
      });

      if (!response.ok) {
        console.warn('Error.........');
        throw new Error('Failed to get kennel data');
      }
     //console.warn("response " ,response);
      const data = await response.json();
      //console.warn(data);
      return data; 
    } catch (error) {
      throw error;
    }
  }

  //get kennel by id
async getKennelById(id,token) {
  try {
    const response = await fetch(`${this.baseUrl}/api/kennel/id?kennelId=${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      
    });

    if (!response.ok) {
      throw new Error('Failed to get kennel data');
    }

    const data = await response.json();
    console.warn(data);
    return data; 
  } catch (error) {
    throw error;
  }
}

//get kennel by user id
async getKennelsByUserId(id,token) {
  try {
    const response = await fetch(`${this.baseUrl}/api/kennel/owner?ownerId=${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      
    });

    if (!response.ok) {
      throw new Error('Failed to get kennels data');
    }


    const data = await response.json();
    console.warn(data);
    return data; 
  } catch (error) {
    throw error;
  }
}


//add new kennel
async addNewKennel(data,token) {
  // Assuming data is the data you want to send to the server
    console.log('kennel data:', data);
  // Make a POST request to the endpoint where the save method is defined
  fetch(`${this.baseUrl}/api/kennel`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: data
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
      console.log('Kennel saved successfully:', data);
  })
  .catch(error => {
      // Handle any errors that occurred during the fetch
      console.error('Error saving kennel:', error.message);
  });



    const data = await response.json();
    console.warn(data);
    return data; 
  } catch (error) {
    throw error;
  }
}





  

  //update kennel
async updateKennel(data,token) {
  // Assuming data is the data you want to send to the server
    console.log('kennel data:', data);
  // Make a POST request to the endpoint where the save method is defined
  fetch(`${this.baseUrl}/api/kennel/update`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: data
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
      console.log('Kennel saved successfully:', data);
  })
  .catch(error => {
      // Handle any errors that occurred during the fetch
      console.error('Error saving kennel:', error.message);
  });


  }
}
  export default new KennelService();
  