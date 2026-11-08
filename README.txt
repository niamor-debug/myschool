MYSCHOOL — VERSION 0.1

Cette archive contient une première maquette installable (PWA) de MySchool.

OUVRIR
- Pour un aperçu rapide : ouvrez index.html dans un navigateur.
- Pour l'installation PWA et les notifications, le site doit être hébergé en HTTPS (ou lancé sur localhost).
- Sur Android/Chrome : ouvrez le site hébergé, puis menu > Installer l'application / Ajouter à l'écran d'accueil.
- Sur PC : utilisez l'option Installer dans la barre d'adresse ou le menu du navigateur.

CE QUI FONCTIONNE
- Tableau de bord sombre et responsive.
- Notes d'exemple modifiables.
- Moyennes par matière calculées sur 20 avec coefficients.
- Ajout de notes et stockage local dans le navigateur.
- Demande d'autorisation et notifications de démonstration lors de l'ajout d'une note.

IMPORTANT — PAS ENCORE CONNECTÉ À ÉCOLE DIRECTE
Les notes présentes sont uniquement des exemples basés sur des valeurs évoquées dans la conversation. Elles ne sont pas synchronisées avec ton compte.
La récupération automatique des notes et les notifications lorsqu'une nouvelle note est publiée nécessitent un backend sécurisé qui vérifie les nouvelles notes périodiquement et envoie des notifications push.
Ne saisis pas ton mot de passe dans cette maquette et ne le partage pas dans une conversation. Avant toute intégration, il faudra vérifier les conditions d'utilisation d'École Directe et choisir une méthode d'accès autorisée. Les identifiants, s'ils sont un jour nécessaires, devront être traités uniquement par un serveur sécurisé, jamais intégrés au code public du navigateur.

FICHIERS
- index.html : interface
- styles.css : thème sombre responsive
- app.js : notes, calculs et interactions
- manifest.webmanifest : configuration PWA
- sw.js : service worker pour notifications
