# FROM node:10.16.0-alpine
# WORKDIR /app
# COPY tsconfig.json ./
# COPY package.json ./
# COPY package-lock.json ./
# COPY . . 
# RUN npm install
# CMD ["npm", "run", "dev"]

FROM node

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY tsconfig.json ./
COPY package.json ./
COPY package-lock.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . ./

EXPOSE 8000
CMD ["npm", "run", "dev"]

