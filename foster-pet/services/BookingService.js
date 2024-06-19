
class BookingService {
    constructor() {
      //base url
      this.baseUrl = 'https://fosterpet.azurewebsites.net';
    }
  

    //booking function
    async booking(petID,ownerID, kennelID, volunteerID, startDate, endDate, token) {
      try {
        const response = await fetch(`${this.baseUrl}/api/booking`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            petID,
           // ownerID,
            kennelID,
            volunteerID,
            startDate,
            endDate,
          }),
        });
    
        console.log('Response from server:', response);
    
        if (!response.ok) {
          console.error('Server returned error:', response.status, response.statusText);
          throw new Error('Failed to complete booking');
        }
    
        const data = await response.json();
        console.log('Booking successful:', data);
        return data;
      } catch (error) {
        console.error('Error booking:', error.message);
        throw error;
      }
    }
    

    //get booking by kennek id
    async getBookingByKennelId(kennelId, token) {
      console.warn("Calling api...");
        try {
          const response = await fetch(`${this.baseUrl}/api/booking/kennelId?kennelId=${kennelId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
              'Authorization': `Bearer ${token}`,
            },
            //mode: 'no-cors'
          });
    
          if (!response.ok) {
            console.warn('Error.........');
            throw new Error('Failed to get booking data');
          }
         //console.warn("response " ,response);
          const data = await response.json();
          //console.warn(data);
          return data; 
        } catch (error) {
          throw error;
        }
      }

      //get booking by volunteer id
    async getBookingByVolunteerId(id, token) {
      console.warn("Calling api...");
        try {
          const response = await fetch(`${this.baseUrl}/api/booking/volunteerId?volunteerId=${id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
              'Authorization': `Bearer ${token}`,
            },
            //mode: 'no-cors'
          });
    
          if (!response.ok) {
            console.warn('Error.........');
            throw new Error('Failed to get booking data');
          }
         //console.warn("response " ,response);
          const data = await response.json();
          //console.warn(data);
          return data; 
        } catch (error) {
          throw error;
        }
      }

  //get booking by user id
  async getBookingByUserId(id, token) {
    console.warn("Calling api...");
      try {
        const response = await fetch(`${this.baseUrl}/api/booking/owner?ownerId=${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Bearer ${token}`,
          },
          //mode: 'no-cors'
        });
  
        if (!response.ok) {
          console.warn('Error.........');
          throw new Error('Failed to get booking data');
        }
       //console.warn("response " ,response);
        const data = await response.json();
        //console.warn(data);
        return data; 
      } catch (error) {
        throw error;
      }
    } 
    
    //get all booking
    //get booking by user id
  async getBooking( token) {
    console.warn("Calling api...");
      try {
        const response = await fetch(`${this.baseUrl}/api/booking`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Bearer ${token}`,
          },
          //mode: 'no-cors'
        });
  
        if (!response.ok) {
          console.warn('Error.........');
          throw new Error('Failed to get booking data');
        }
       //console.warn("response " ,response);
        const data = await response.json();
        //console.warn(data);
        return data; 
      } catch (error) {
        throw error;
      }
    } 

    //cancel booking
    async cancelBooking(id,token) {
      try {
        const response = await fetch(`${this.baseUrl}/api/booking/cancel?bookingId=${id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          
        });
    
        console.log('Response from server:', response);
    
        if (!response.ok) {
          console.error('Server returned error:', response.status, response.statusText);
          throw new Error('Failed to cancel booking');
        }
    
        const data = await response.json();
        console.log('Booking successful:', data);
        return data;
      } catch (error) {
        console.error('Error booking:', error.message);
        throw error;
      }
    }
  }
  
  export default new BookingService();
  

