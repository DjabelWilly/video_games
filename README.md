# Tableau de bord de vente

Ce projet est un tableau de bord de vente qui permet de gérer les données de vente et les performances des équipes de vente. 
Il est développé avec React, Node.js et MongoDB.

## Description

Le tableau de bord de vente est un outil de monitoring pour suivre et analyser les performances des équipes.
Il permet de visualiser les données de vente, d'ajouter de nouvelles données dans la BDD, de modifier et de supprimer les données existantes.

## Environnement

* Serveur : Node.js
* Base de données : MongoDB
* Langages de programmation : JavaScript, HTML, CSS
* Frameworks et bibliothèques : React, Express.js, Axios

## Installation

1. Cloner le dépôt Git
2. Créer une base de données sur MongoDB
3. Importer un des fichiers JSON contenant l'ensemble des jeux dans la base de données
4. Créer un fichier `.env` à la racine du répertoire `api`
5. Ajouter les constantes suivantes dans le fichier `.env` :
	* `MONGO_URI` : la chaîne de connexion du cluster MongoDB
	* `PORT` : le port sur lequel le serveur sera démarré
6. Installer les dépendances avec `npm install`
7. Démarrer le serveur avec `npm start`
8. Accéder à l'application à l'adresse `http://localhost:3000`

## Fonctionnalités

* Visualisation des données de vente
* Rechercher jeu en entrant le nom dans un champ
* Filter les jeux par plateforme 
* Ajout d'un nouveau jeu en base de donnée
* Modifier des données 
* Supprimer un jeu


