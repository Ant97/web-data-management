const express = require('express');
const validator = require('validator');
const router = new express.Router();
var connection = require('./connected');
/**
 * Validate the sign up form
 *
 * @param {object} payload - the HTTP body message
 * @returns {object} The result of validation. Object contains a boolean validation result,
 *                   errors tips, and a global message for the whole form.
 */
router.post('/animal', (req, res) => {
const errors = {};
    var currentState = req.body;
    var sql  = "SELECT Name FROM FarmItem WHERE  Type = 'Animal' AND IsApproved = 1;";
    console.log('sql => ',sql);
    connection.query(sql, function(err,res){
       if(err){
        errors.animal = 'Cannot populate animals';
        console.log("errrorrrorroro");
        return res.status(200).json({Error: true, success: false, errors: errors});
       } else {
          console.log('res => ',res);
          res = res[0];
          console.log('currentState => ',currentState);
          currentState.animals = res;
       }
    });
});


router.get(`/getOwnerProperties/:name`, (req, response) => {
  var username = req.params.name;
  console.log('username in server => ',username);
const errors = {};
    var sql = `   SELECT    P.Name, P.street, P.City, P.Zip, P.Size, P.PropertyType, P.isPublic, P.isCommercial, P.ID, P.ApprovedBy, temp.numberofVisit, temp.avgRating  
                  FROM    Property AS P LEFT JOIN
                            ( SELECT    COUNT(V.propertyID) AS numberOfVisit, AVG(V.Rating) AS avgRating, P.ID
                              FROM    property AS P INNER JOIN visit AS V
                              ON        P.ID =  V.PropertyID AND P.owner = (?)
                              GROUP BY P.ID ) AS temp
                                          ON        P.ID =  temp.ID
                  WHERE P.owner = (?)
                  ORDER BY P.Name;`
    var body = [username, username];
    connection.query(sql, body, function(err,res){
      console.log('sql => ',sql);
       if(err){
        console.log('err => ',err);
        return errors;
       } else {
          var data = JSON.parse(JSON.stringify(res));
          console.log('data is => ',data);
          return response.json({"Error": false, "Message": "Success", "properties": data});
       }
    });
});

router.get(`/getOwnerOtherProperties/:name`, (req, response) => {
  var username = req.params.name;
  console.log('username in server => ',username);
const errors = {};
    var sql = `   SELECT    P.Name, P.street, P.City, P.Zip, P.Size, P.PropertyType, P.isPublic, P.isCommercial, P.ID, P.ApprovedBy, temp.numberofVisit, temp.avgRating  
                  FROM    Property AS P LEFT JOIN
                            ( SELECT    COUNT(V.propertyID) AS numberOfVisit, AVG(V.Rating) AS avgRating, P.ID
                              FROM    property AS P INNER JOIN visit AS V
                              ON        P.ID =  V.PropertyID AND P.owner = (?)
                              GROUP BY P.ID ) AS temp
                                          ON        P.ID =  temp.ID
                  WHERE P.owner != (?) AND P.ApprovedBy IS NOT NULL
                  ORDER BY P.Name;`
    var body = [username, username];
    connection.query(sql, body, function(err,res){
      console.log('sql => ',sql);
       if(err){
        console.log('err => ',err);
        return errors;
       } else {
          var data = JSON.parse(JSON.stringify(res));
          console.log('data is => ',data);
          return response.json({"Error": false, "Message": "Success", "properties": data});
       }
    });
});



router.get(`/getAllProperties/`, (req, response) => {
const errors = {};
    var sql =  `SELECT  P.Owner, P.Name, P.Street, P.City, P.Zip, P.Size, P.PropertyType, P.IsPublic, P.IsCommercial, P.ID, temp.numberofVisit, temp.avgRating 
 FROM     Property AS P LEFT JOIN
        ( SELECT    COUNT(V.propertyID) AS numberOfVisit, AVG(V.Rating) AS avgRating, P.ID
          FROM    property AS P INNER JOIN visit AS V
          ON        P.ID =  V.PropertyID 
          GROUP BY P.ID ) AS temp
                      ON        P.ID =  temp.ID
 WHERE P.ApprovedBy IS NOT NULL;`;
    connection.query(sql, function(err,res){
      console.log('sql => ',sql);
       if(err){
        console.log('err => ',err);
        return errors;
       } else {
          var data = JSON.parse(JSON.stringify(res));
          console.log('data => ',data);
          return response.json({"Error": false, "Message": "Success", "properties": data});
       }
    });
});


router.get(`/getVisitors/`, (req, response) => {
const errors = {};
    var sql =  `  SELECT        U.Username, U.Email, tempV.LoggedVisits
  FROM        user AS U
                LEFT JOIN (SELECT V.Username, COUNT(V.Username) AS LoggedVisits
                    FROM visit AS V INNER JOIN user AS U
                                      ON U.Username = V.Username
                                      GROUP BY V.Username) AS tempV
                ON U.Username = tempV.Username
  WHERE         UserType = 'VISITOR';`;
    connection.query(sql, function(err,res){
      console.log('sql => ',sql);
       if(err){
        console.log('err => ',err);
        return errors;
       } else {
          var data = JSON.parse(JSON.stringify(res));
          console.log('data => ',data);
          return response.json({"Error": false, "Message": "Success", "visitors": data});
       }
    });
});




router.get(`/getConfirmedProperties/`, (req, response) => {
const errors = {};
    var sql =  `  SELECT    P.name, P.street, P.City, P.Zip, P.Size, P.PropertyType, P.isPublic, P.isCommercial, P.ID, P.Approvedby, temp.avgRating  
      FROM    Property AS P LEFT JOIN
          ( SELECT      AVG(V.Rating) AS avgRating, P.ID
            FROM    property AS P INNER JOIN visit AS V
              ON        P.ID =  V.PropertyID 
            GROUP BY P.ID ) AS temp
            ON        P.ID =  temp.ID
WHERE P.ApprovedBy is not NULL 
      ORDER BY P.Name;`;
    connection.query(sql, function(err,res){
      console.log('sql => ',sql);
       if(err){
        console.log('err => ',err);
        return errors;
       } else {
          var data = JSON.parse(JSON.stringify(res));
          console.log('data => ',data);
          return response.json({"Error": false, "Message": "Success", "property": data});
       }
    });
});



router.get(`/getUnconfirmedProperties/`, (req, response) => {
const errors = {};
console.log( 'RUNNNUNGGG QUERIEESSS' );
console.log('req => ',req);
    var sql =  `SELECT      P.name, P.street, P.City, P.Zip, P.Size, P.PropertyType,
            P.isPublic, P.isCommercial, P.ID, P.owner
FROM        Property as P
WHERE P.ApprovedBy IS NULL
ORDER BY P.Name;`;
    connection.query(sql, function(err,res){
      console.log('sql => ',sql);
       if(err){
        console.log('err => ',err);
        return errors;
       } else {
          var data = JSON.parse(JSON.stringify(res));
          console.log('data => ',data);
          return response.json({"Error": false, "Message": "Success", "property": data});
       }
    });
});


router.get(`/getAllOwner/`, (req, response) => {
const errors = {};
    var sql =  `  SELECT        U.Username, U.Email, temp.NumProps
 FROM         user AS U
              LEFT JOIN (SELECT P.Owner, COUNT(P.Owner) AS NumProps
                  FROM property AS P INNER JOIN user AS U
                                     ON U.Username = P.Owner
                                     GROUP BY P.Owner) AS temp
              ON U.Username = temp.Owner
 WHERE        UserType = 'OWNER';`;
    connection.query(sql, function(err,res){
      console.log('sql => ',sql);
       if(err){
        console.log('err => ',err);
        return errors;
       } else {
          var data = JSON.parse(JSON.stringify(res));
          console.log('data => ',data);
          return response.json({"Error": false, "Message": "Success", "visitors": data});
       }
    });
});





router.get(`/getApprovedItems/`, (req, response) => {
const errors = {};
    var sql =  `  SELECT  F.Name, F.Type

FROM  FarmItem AS F

WHERE   F.IsApproved = '1'; 

`;
    connection.query(sql, function(err,res){
      console.log('sql => ',sql);
       if(err){
        console.log('err => ',err);
        return errors;
       } else {
          var data = JSON.parse(JSON.stringify(res));
          console.log('data => ',data);
          return response.json({"Error": false, "Message": "Success", "visitors": data});
       }
    });
});





router.get(`/getPendingItems/`, (req, response) => {
const errors = {};
    var sql =  `  SELECT  F.Name, F.Type

FROM  FarmItem AS F

WHERE   F.IsApproved = '0'; 

`;
    connection.query(sql, function(err,res){
      console.log('sql => ',sql);
       if(err){
        console.log('err => ',err);
        return errors;
       } else {
          var data = JSON.parse(JSON.stringify(res));
          console.log('data => ',data);
          return response.json({"Error": false, "Message": "Success", "visitors": data});
       }
    });
});









router.get(`/getFarmItem/`, (req, response) => {
  const errors = {};
    var sql = `SELECT Name, Type FROM FarmItem WHERE IsApproved = 1; `
    connection.query(sql, function(err,res){
      console.log('sql => ',sql);
       if(err){
        console.log('err => ',err);
        return errors;
       } else {
          // console.log('res => ',res);
          var rawData = JSON.parse(JSON.stringify(res));
          // console.log(rawData);
          // console.log('data => ',data);
          var animals = [];
          var gardenItems = [];
          var orchardItems = [];
          rawData.forEach((item) => {
            if (item.Type === 'ANIMAL') {
              animals.push(item.Name);
            } else {
              if (item.Type === 'FRUIT' || item.Type === 'NUT') {
                orchardItems.push(item.Name);
              } else {
                gardenItems.push(item.Name);
              }
            }
          })
          var data = [animals, gardenItems, orchardItems];
          console.log(data);
          return response.json({"Error": false, "Message": "Success", "properties": data});
       }
    });
});


router.get(`/getProperty/:propID`, (req, response) => {
  let id = req.params.propID;
  console.log('ggeofrkaiejfia');
  const errors = {};
    var sql = `SELECT Name, Type FROM FarmItem WHERE IsApproved = 1;`
    connection.query(sql, function(err,res){
       if(err){
        return errors;
       } else {
          var rawData = JSON.parse(JSON.stringify(res));
          var animals = [];
          var gardenItems = [];
          var orchardItems = [];
          var propInfo = {};
          rawData.forEach((item) => {
            if (item.Type === 'ANIMAL') {
              animals.push(item.Name);
            } else {
              if (item.Type === 'FRUIT' || item.Type === 'NUT') {
                orchardItems.push(item.Name);
              } else {
                gardenItems.push(item.Name);
              }
            }
          })

          var data = [animals, gardenItems, orchardItems];
          var propSql = `SELECT * FROM property WHERE ID = (?);`
          var propBody = id;
          connection.query(propSql,propBody, function(err1,response1){
                 if(err1){
                  console.log('err1 => ',err1);
                  return errors;
                 } else {
                    propInfo = response1[0];
                    var farmSQl = `SELECT ItemName FROM has WHERE PropertyID = (?);`
                    connection.query(farmSQl, id, function(err2,response2){
                      console.log('err2 => ',err2);
                      if (!err2) {
                        console.log('response2 => ',response2);
                        //  LATER 
                        return response.json({"Error": false, "Message": "Success", "properties": data, "propInfo": response1[0], "farmItems": response2});
                        //
                      }
                    })
                 }
              });
         }
    });




});



router.get(`/getVisitHistory/:username`, (req, response) => {
  console.log('req.param.username => ',req.params.username);
  const errors = {};
  var sql = `SELECT P.ID, P.Name, V.VisitDate, V.Rating FROM (Property AS P INNER JOIN Visit AS V ON P.ID = V.PropertyID) WHERE V.Username = (?) ORDER BY P.Name;`
  var body = req.params.username;
  connection.query(sql, body, function(err,res){
      console.log('sql => ',sql);
       if(err){
        console.log('err => ',err);
        return errors;
       } else {
          console.log(res);
          return response.json({"visitHistory": res});
       }
    });
});


router.get(`/getLogHistory/:username/:propid`, (req, response) => {
  console.log('req.param.username => ',req.params.username);
  const errors = {};
  var sql = `SELECT  V.Rating FROM (Property AS P INNER JOIN Visit AS V ON P.ID = V.PropertyID) WHERE V.Username = (?) AND P.ID = (?) ;`
  var body = [req.params.username, req.params.propid];
  connection.query(sql, body, function(err,res){
      console.log('sql => ',sql);
       if(err){
        console.log('err => ',err);
        return errors;
       } else {
          console.log(res);
          return response.json({"visitLog": res});
       }
    });
});


router.get(`/getDetailProperty/:name`, (req, response) => {
  console.log('req.param.name => ',req.params.name);
  const errors = {};
    var sql =  `SELECT   P.Owner, P.Name, P.Street, P.City, P.Zip, P.Size, P.PropertyType, P.IsPublic, P.IsCommercial, P.ID, temp.numberofVisit, temp.avgRating 
 FROM     Property AS P LEFT JOIN 
        ( SELECT    COUNT(V.propertyID) AS numberOfVisit, AVG(V.Rating) AS avgRating, P.ID
          FROM    property AS P INNER JOIN visit AS V
          ON        P.ID =  V.PropertyID 
          GROUP BY P.ID ) AS temp
                      ON        P.ID =  temp.ID 
 WHERE P.Name= (?) ORDER BY P.ID;`;
 var body = [req.params.name];
 console.log('ID => ',body);
    connection.query(sql, body, function(err,res){
      console.log('sql => ',sql);
       if(err){
        console.log('err => ',err);
        return errors;
       } else {
          // console.log('res => ',res);
          // var data = JSON.parse(JSON.stringify(res));
          // console.log('data => ',data);
          // data = [];
          console.log('res => ',res);
          var temp = JSON.parse(JSON.stringify(res));
          console.log('temp => ',temp[0]);
          console.log("temp.ID -> ", temp[0].ID);
          body = [JSON.stringify(temp[0].ID)];
          var sql1 = `SELECT  H.ItemName, FarmItem.Type  
              FROM    Has AS H LEFT JOIN FarmItem
              ON    H.ItemName = FarmItem.Name
              WHERE FarmItem.IsApproved = '1' AND H.PropertyID = (?); `;
          connection.query(sql1, body, function(err1,res1){
            console.log('sql => ',sql1);
            if(err1){
              console.log('err => ',err1);
              return errors;
            } else {
              var rawData = JSON.parse(JSON.stringify(res1));
              console.log('res1 => ',res1);
              console.log('data => ',rawData);
              const animals = [];
              const crops = [];
              rawData.forEach((item) => {
                if (item.Type === 'ANIMAL') {
                  animals.push(item.ItemName);
                } else {
                  crops.push(item.ItemName);
                }
              })
              console.log('detailProperty => ',res);
              console.log('crops => ',crops);
              console.log('animals => ',animals);
              return response.json({"Error": false, "Message": "Success", "detailProperty": res[0],"animals": animals, "crops": crops});
            }
        });
       }
    });
});


router.get(`/deleteProperty/:propertyId`, (req, response) => {
  var id = req.params.propertyId;
  var sql = `DELETE FROM Property WHERE ID = (?)`
  connection.query(sql, id, function(err,res){
    
     if(err){
      console.log('delete err => ',err);   
     } else {
      console.log('delete success');  
     }
     return null;
  });
})


module.exports = router;


