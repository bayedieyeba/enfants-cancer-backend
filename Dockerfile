# Utiliser l'image officielle Node.js 16.17.0 en tant qu'image de base
FROM node:16.17.0

# Définir le répertoire de travail à l'intérieur du conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json pour installer les dépendances
COPY package*.json ./

# Installer les dépendances du projet
RUN npm install

# Copier tout le code source du projet dans le conteneur
COPY . .

# Exposer le port utilisé par l'application Node.js (à adapter selon le besoin)
EXPOSE 5000

# Démarrer l'application Node.js
CMD ["node", "app/server.js"]
