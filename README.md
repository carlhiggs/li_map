# Pilot Liveability Index visual interface
 
Carl Higgs 12 August 2017
Healthy Liveable Cities Group, RMIT

## Build the database

psql -U postgres -h localhost -d li_dev < li_soft.sql

## Getting this thing to run ...

nodeenv env
. env2/bin/activate
npm install
npm start

Should now be running localhost:3000
