const Legal_Links = require('../legal_link/legal_link.controller');
const Official = require('../official/official.controller');
const Generals = require('../general/general.controller');
const Airport = require('../airport/airport.controller');
const Airline = require('../airline/airline.controller');
const Flight = require('../flight/flight.controller');
const Sale = require('../sale/sale.controller');
const Users = require('./auth.controller');

module.exports = (router) => {
  /* Auth  Users*/
  router.post('/register', Users.createUser);
  router.post('/login', Users.loginUser);
  router.delete('/deleteUser/:id_user', Users.deleteUser);
  router.get('/readUser/:id_user', Users.readUser); // Get Admin info
  router.get('/getIdsUser_Official', Users.getIdsUser_Official); // Get all Id_user of officials
  router.get('/getNamesPassengers', Users.getNamesPassengers); // Get all Id_user of officials
  router.get('/getID_user/:name_user', Users.getID_user); // Get Admin info
  router.get('/getUserRange', Users.getUserRange); // Get Admin info
  
  /* Passenger */  
  router.get('/readPassenger/:id_user', Users.readPassenger); // Get Passenger info
  router.put('/updatePassenger/:id_user', Users.updatePassenger);
  router.get('/getEmail/:id_user', Users.getEmail); // Get Passenger info
  router.post('/sendEmail/:email/:_id/:id_flight', Users.sendEmail); // Get Passenger info


  /* Other : General*/
  router.get('/getWorkAreas', Generals.getWorkAreas);
  router.get('/getTypeOfficial', Generals.getTypeOfficial);
  router.get('/getFeatures', Generals.getFeatures);
  router.get('/getCountries', Generals.getCountries);
  router.get('/getRestrictions', Generals.getRestrictions);
  router.get('/getStatus', Generals.getStatus);

  /* Legal Link */
  router.get('/getNationalities', Legal_Links.getNationalities);
  router.get('/getResidences/:nationality', Legal_Links.getResidences);

  /* Airport */
  router.post('/createAirport', Airport.createAirport);
  router.get('/readAirport/:id_airport', Airport.readAirport);
  router.put('/updateAirport/:id_airport', Airport.updateAirport);
  router.delete('/deleteAirport/:id_airport', Airport.deleteAirport);
  router.get('/getIdsAirports', Airport.getIdsAirports); // Get all Id_Airport
  router.get('/getNameAirports', Airport.getNameAirports); // Get all Id_Airport

  /* Official */
  router.post('/createOfficial', Official.createOfficial);
  router.get('/readOfficial/:id_user', Users.readUser); // Get Official info ()
  router.put('/updateOfficial/:id_user', Official.updateOfficial);
  router.delete('/deleteOfficial/:id_user', Official.deleteOfficial);

  /* Airline */
  router.post('/createAirline', Airline.createAirline);
  router.get('/readAirline/:id_airline', Airline.readAirline);
  router.put('/updateAirline/:id_airline', Airline.updateAirline);
  router.delete('/deleteAirline/:id_airline', Airline.deleteAirline);
  router.get('/getIdsAirline', Airline.getIdsAirline); // Get all Id_Airport

  /* Flight */
  router.post('/createFlight', Flight.createFlight);
  router.get('/readFlight/:id_flight', Flight.readFlight);
  router.put('/updateFlight/:id_flight', Flight.updateFlight);
  router.delete('/deleteFlight/:id_flight', Flight.deleteFlight);
  router.get('/getIdsFlights', Flight.getIdsFlights); // Get all Id_Flight
  router.post('/getFlight_to_BuyTickecks', Flight.getFlight_to_BuyTickecks); // Get all Flight to buy one (buyTickets)
  router.get('/getAllFlightsSales', Airline.getAllFlightsSales);
  
  /* Sale */
  router.post('/createSale', Sale.createSale);
  router.get('/readSale/:id_user/:id_flight/:_id', Sale.readSale);
  router.get('/verifySale/:id_user/:_id', Sale.verifySale);  
  router.put('/updateSale/:_id/:status', Sale.updateSale);
  router.get('/getTopDestination', Sale.getTopDestination);

  /* Necesario para el reporte del usuario y el funcionario*/
  router.get('/getIdFlightsIdUser/:id_user', Sale.getIdFlightsIdUser);

   /* Report 1 Official */
   router.post('/getFlight_R1_dates', Flight.getFlight_R1_dates); // Get all Flight in range dates   
   router.post('/getFlight_R1_status', Flight.getFlight_R1_status); // Get all Flight by status
   router.post('/getFlight_R1_name', Flight.getFlight_R1_name); // Get all Flight by status

    /* Report 2 Passenger*/
  router.post('/getFlight_R2_dates', Flight.getFlight_R2_dates); // Get all Flight in range dates   
  router.post('/getFlight_R2_status', Flight.getFlight_R2_status); // Get all Flight by status

  /* Report 3 Admin */
  router.post('/getRA_Oper_IdUser', Sale.getRA_Oper_IdUser);
  router.post('/getRA_Oper_Dates', Sale.getRA_Oper_Dates);
  router.post('/getRA_Oper_Status', Sale.getRA_Oper_Status);

  router.get('/getRA_3Best', Sale.getRA_3Best);


}