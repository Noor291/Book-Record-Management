// Data Transform Object

class IssuedBookFine {
    _id;
    name;
    genre;
    price;
    publisher;
    issuedBy;
    issuedDate;
    returnDate;
    fine;
  
    constructor(user) {
      this._id = user.issuedBook._id;
      this.name = user.issuedBook.name;
      this.genre = user.issuedBook.genre;
      this.price = user.issuedBook.price;
      this.publisher = user.issuedBook.publisher;
      this.issuedBy = user.name;
      this.issuedDate = user.issuedDate;
      this.returnDate = user.returnDate;
      this.fin=function(user){
        const getDateInDays=(data="")=>{
            let date;
            if(data===""){
                date= new Date();
            }else{
                date=new Date(data);
            }
            let days=Math.floor(date/(1000*60*60*24));
            return days;
        };
        
        const subscriptionType=(date)=>{
            if(user.subscriptionType==="Basic"){
                date=date+90;
            }else if(subscriptionType==="Standard"){
                date=date+180;
            }else if(user.subscriptionType==="Premium"){
                date=date+365;
            }
            return date;
        };
        //Subscription expiration calculation
        // January 1, 1970, UTC. in milliseconds
        let returnDate = getDateInDays(user.returnDate);
        let currentDate = getDateInDays();
        let subscriptionDate=getDateInDays(user.subscriptionDate);
        let subscriptionExpiration= subscriptionType(subscriptionDate);
    
        const fine= returnDate<currentDate ? subscriptionExpiration<=currentDate?200:100:0;
        return fine;
      };
      this.fine=this.fin(user);
    };
  }
  
  module.exports = IssuedBookFine;