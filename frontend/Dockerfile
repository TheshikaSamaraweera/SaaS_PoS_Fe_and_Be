FROM node:20

WORKDIR /user/src/app

COPY . .

# Install all dependencies including devDependencies
RUN npm install

# Build the application
RUN npm run build

# Remove devDependencies to keep the final image smaller
RUN npm prune --production

# Run the application
CMD ["npm", "run"]
