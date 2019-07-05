#!/usr/bin/env bash

mkdir -p /data/rs1 /data/rs2 /data/rs3

mongod --replSet m101 --logpath "1.log" --dbpath /c/data/db/data/rs1 --port 27017 --oplogSize 64 --smallfiles

mongod --port 27017 --logpath "1.log" --dbpath /data/rs1 --replSet m101 --smallfiles --oplogSize 64


mongod --replSet m101 --logpath "2.log" --dbpath /c/data/db/rs2 --port 27018 --oplogSize 64 --smallfiles 
mongod --replSet m101 --logpath "3.log" --dbpath /c/data/db/rs3 --port 27019 --oplogSize 64 --smallfiles 
