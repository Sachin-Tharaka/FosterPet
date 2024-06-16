class ReviewService {
    constructor() {
      this.baseUrl = 'https://fosterpet.azurewebsites.net';
    }
  
    
//get reviews by kennel id
async getReviewsByKennelId(kennelId, token) {
  console.warn("Calling api...");
    try {
      const response = await fetch(`${this.baseUrl}/api/review/kennel?kennelId=${kennelId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Authorization': `Bearer ${token}`,
        },
        //mode: 'no-cors'
      });

      if (!response.ok) {
        console.warn('Error.........');
        throw new Error('Failed to get reviews data');
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
  export default new ReviewService();
  