

##This app was made for creating API endpoint using NodeJS.


Main URL
https://quote-api-kohki.herokuapp.com/


##Method
###1) Retrive all the quotes list (GET)
endpoint : https://quote-api-kohki.herokuapp.com/quotes


you can specify the specific quote like below
endpoint : https://quote-api-kohki.herokuapp.com/quotes/:id

###2) posting new quotes (POST)
endpoint : https://quote-api-kohki.herokuapp.com/quotes

Header : 
Content-type - application/x-www-form-urlencoded

Body parameter : 
quote
author 
year


###3) https://quote-api-kohki.herokuapp.com/quotes/:id/delete

Header : 
Content-type - application/x-www-form-urlencoded