FROM ibmcom/ibmnode:8
RUN apt-get update && apt-get install -y wget
ENV PORT 3000
# Define env var mongo cnx
ENV MONGODB_HOST "mongodb"
ENV MONGODB_DATABASE ""
ENV MONGODB_LOGIN ""
ENV MONGODB_PWD ""
ENV MONGODB_PORT 27017
# Go to /app 
WORKDIR "/app"
# Install app dependencies
COPY package.json /app
RUN npm install
# Bundle app source
COPY . /app
#COPY server.js /app
EXPOSE 3000
CMD npm start