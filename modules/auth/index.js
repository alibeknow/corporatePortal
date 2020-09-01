const express = require("express");
const router = express.Router();
const auth = require("./authentication/auth");
var ldap = require("ldapjs");
const jwt = require("jsonwebtoken");
const { secret } = require("./config");
var client = ldap.createClient({
  url: `ldap://ldap-service:389`,
  connectTimeout: 30000,
  reconnect: true,
});
router.post("/login", function (req, res) {
  var LDAP_BASE_DN = "dc=scytalelabs, dc=com";
  var bdn_pass = "adminPassword";
  var username = req.body.username;
  var password = req.body.password;
  var opts = {
    filter: `(uid=${username})`,
    scope: "sub",
    attributes: ["gidNumber", "uidNumber", "cn", "givenName", "sn"],
  };
  try {
    client.bind("cn=admin, " + LDAP_BASE_DN, bdn_pass, function (error) {
      if (error) {
        res.status(500).send("Internal Server Error.");
      } else {
        client.search(LDAP_BASE_DN, opts, function (error, search) {
          var searchList = [];
          search.on("searchEntry", function (entry) {
            searchList.push(entry.object);
          });
          search.on("error", function (error) {
            res.status(500).send("Internal Server Error.");
          });
          search.on("end", (retVal) => {
            if (searchList.length === 1) {
              // Get a list of groups, try to bind after you get it
              var groupList = [];

              client.search(
                LDAP_BASE_DN,
                {
                  filter:
                    "((objectclass=posixGroup)(gidNumber=" +
                    searchList[0].gidNumber +
                    "))",
                  scope: "sub",
                  attributes: ["cn"],
                },
                (error, searchRes) => {
                  searchRes.on("searchEntry", (entry) => {
                    groupList.push(entry.object);
                  });
                  searchRes.on("error", (error) => {
                    res.status(500).send("Internal Server Error.");
                  });
                  searchRes.on("end", (entry) => {
                    if (groupList.length === 1) {
                      client.bind(
                        "cn=" + username + ",ou=users,dc=scytalelabs,dc=com",
                        password,
                        function (error) {
                          if (error) {
                            res.status(500).send("Internal Server Error.");
                          } else {
                            const token = jwt.sign(
                              { sub: username, role: groupList[0].cn },
                              secret,
                              { expiresIn: "1h" }
                            );
                            client.unbind(function (error) {
                              if (error) {
                                res.status(500).send("Internal Server Error.");
                              } else {
                                res.status(200).send(token);
                              }
                            });
                          }
                        }
                      );
                    } else {
                      res.status(404).send("Group Not Found...");
                    }
                  });
                }
              );
            } else {
              res.status(404).send("User Not Found...");
            }
          });
        });
      }
    });
  } catch (error) {
    client.unbind(function (error) {
      if (error) {
        console.log(error);
      } else {
        console.log("client disconnected");
      }
    });
  }
});
