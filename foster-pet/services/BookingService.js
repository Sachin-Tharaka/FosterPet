
class BookingService {
    constructor() {
      //base url
      this.baseUrl = 'https://fosterpet.azurewebsites.net';
    }
  

    //booking function
    async booking(petID,ownerID,kennelID,volunteerID,startDate,endDate,token) {
      try {
        const response = await fetch(`${this.baseUrl}/api/booking`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            petID,
            ownerID,
            kennelID,
            volunteerID,
            startDate,
            endDate,
          }),
        });
  
        if (!response.ok) {
          throw new Error('Error');
        }
  
        const data = await response.json();
        console.warn("response ",data);
        return data; 
      } catch (error) {
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
  
  }
  
  export default new BookingService();
  

