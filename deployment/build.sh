#!/bin/bash
git pull origin master
npm install
docker build -t dndapp-shared ../shared
docker build -t dndapp-client ../client
docker build -t dndapp-server ../server

