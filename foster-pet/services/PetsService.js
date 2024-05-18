
class PetsService {
    constructor() {
      this.baseUrl = 'https://fosterpet.azurewebsites.net';
    }

//get pets by owner id
async getPetsByOwnerId(id,token) {
    try {
      const response = await fetch(`${this.baseUrl}/api/pet/owner?ownerId=${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },

      });

      if (!response.ok) {

        throw new Error('Failed to get pets data');

      }

      const data = await response.json();
      console.warn(data);
      return data;
    } catch (error) {
      throw error;
    }
  }


  //get pet by id
  async getPetById(id,token) {
    try {
      const response = await fetch(`${this.baseUrl}/api/pet/id?petId=${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to get pet data');
      }

      const data = await response.json();
      console.warn(data);
      return data;
    } catch (error) {
      throw error;
    }
  }


  //add new pet
// async addNewPet(newPet, token) {
//   try {
//     const response = await fetch(`${this.baseUrl}/api/pet`, {
//       method: 'POST',
//       headers: {
//         'Authorization': `Bearer ${token}`,
//       },
//       body: newPet,
//     });

//     if (!response.ok) {
//       // throw new Error('Failed to add new pet');
//       console.log(response.body);
//     }

//     const data = await response.json();
//     console.warn(data);
//     return data;
//   } catch (error) {
//     throw error;
//   }
// }

// Assuming you have a function to save a pet in your JavaScript application
async addNewPet(petData,token) {
  // Assuming petData is the data you want to send to the server
    console.log('petData:', petData);
  // Make a POST request to the endpoint where the save method is defined
  fetch(`${this.baseUrl}/api/pet`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: petData
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
      console.log('Pet saved successfully:', data);
  })
  .catch(error => {
      // Handle any errors that occurred during the fetch
      console.error('Error saving pet:', error.message);
  });
}




}

export default new PetsService();