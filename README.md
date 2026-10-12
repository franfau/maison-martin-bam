# Maison Martin BAM — version Netlify et Decap

## Installer

Copiez les fichiers de ce dossier à la racine du dépôt GitHub. Conservez vos fichiers Markdown existants : ne remplacez pas vos vrais horaires par le fichier initial fourni. Incluez le dossier images (logo et illustrations) et package-lock.json. Ne copiez pas node_modules ni dist.

Netlify : dépôt relié à la branche main, commande `npm run build`, dossier publié `dist`, version Node 22. Ces réglages figurent dans netlify.toml. Les fichiers doivent se trouver dans le répertoire de base utilisé par Netlify.

La compilation regroupe tous les .md de content/carte et génère le HTML et content/data.json. Les prix sont des nombres YAML (ex. 12.50, sans guillemets et avec un point). Une catégorie doit correspondre à la configuration. Un fichier invalide interrompt la compilation : corriger le plat indiqué dans le journal Netlify et relancer.

## Administration

Ouvrez /admin/ sur votre adresse Netlify. Le backend git-gateway de votre configuration est conservé. Il requiert un service Identity et Git Gateway configurés et reliés au dépôt ; écrire `name: git-gateway` ne les active pas. Configurez l’inscription sur invitation uniquement, avec vos utilisateurs de gestion. Ne mettez aucun jeton GitHub ni mot de passe dans ces fichiers.

Git Gateway est déprécié selon Netlify : les sites où il est déjà activé continuent de fonctionner, mais une nouvelle configuration n’est plus recommandée. Si votre installation ne permet pas la connexion, il faudra choisir et configurer un autre backend Decap (par exemple GitHub avec un fournisseur OAuth). La connexion réelle à votre compte n’a pas été testée ici.

Publier dans Decap crée/modifie/supprime un fichier sur GitHub. Il faut ensuite attendre la fin du déploiement Netlify pour voir la modification sur le site. Le navigateur lit les fichiers générés sur Netlify, pas l’API privée GitHub. Les contenus ne sont pas enregistrés dans LocalStorage.

## Contenu et portée du transfert

- Carte : titre, prix, description Markdown et catégorie.
- Informations : téléphone, adresse, midi, soir, alerte.
- Rubriques supplémentaires : titre, texte Markdown, image facultative, ordre et visibilité. Elles apparaissent entre la carte et les coordonnées. Pour masquer, désactivez Afficher.
- Les autres textes et les couleurs de cette version se modifient dans index.html et style.css. Cette configuration Decap ne reprend pas tous les réglages visuels de l’ancienne administration.
- Les logos et les trois illustrations sont copiés depuis le projet existant. Les contenus enregistrés dans la base du site ChatGPT (textes personnalisés, plats, rubriques et images ajoutées) ne sont pas automatiquement exportés dans ce paquet : il faudra les récupérer et les saisir/importer si vous en avez.
- Aucun prix, téléphone ni horaire réel n’a été inventé. La carte est vide au départ.
- Cette version présente les services et la carte. Elle ne prend pas de commandes et n’encaisse pas de paiements.
- La phrase sur le traiteur invite à contacter le restaurant ; faites valider ce service par le client avant mise en ligne.
- Le code n’impose pas de protection des visiteurs sur Netlify : la confidentialité du site ChatGPT ne se transfère pas. Si vous souhaitez rester seule à consulter le site, configurez une protection d’accès Netlify avant de publier. Noindex n’est pas une protection d’accès.

## Vérification après transfert

Connectez-vous à /admin/, créez un plat temporaire, publiez, puis vérifiez le commit GitHub et la réussite du déploiement Netlify. Rechargez la carte pour confirmer le prix et la description. Vérifiez de même les horaires et une rubrique. Supprimez ensuite vos contenus de test. Ce test dépend de vos comptes et reste à faire.

## Développement local

`npm ci`, puis `npm run build` ; servir le dossier dist avec un serveur HTTP. L’administration locale, avec la configuration fournie, pointe vers le backend distant : ne pas y enregistrer de contenu de test par inadvertance.

Sources :
- https://decapcms.org/docs/install-decap-cms/
- https://decapcms.org/docs/configuration-options/
- https://docs.netlify.com/manage/security/secure-access-to-sites/git-gateway/

## Page Événement

La page est accessible à `/evenement/` et depuis la navigation de l’accueil. Dans Decap, ouvrir « Page Événement → Menus, carte et réservation ». Vous pouvez modifier le titre, la présentation, le téléphone, l’e-mail affiché, les instructions de réservation, les trois menus (noms, prix par personne, précisions et entrées/plats/desserts) et les plats à la carte. Les plats à la carte des événements sont indépendants de ceux de la carte habituelle. Les modifications sont publiées après le déploiement Netlify.

Le prix d’un menu peut rester vide : le site affiche « Tarif à venir ». Les exemples livrés n’inventent ni recettes ni tarifs.

Le formulaire `reservation-evenement` contient les coordonnées, la date, l’heure, le nombre de personnes, la formule et le message. Un champ anti-robot invisible est inclus. Le formulaire n’encaisse rien et ne confirme aucune disponibilité : la réservation doit être confirmée par le restaurant. Les détails des demandes sont conservés par Netlify Forms, pas dans le dépôt GitHub public.

### Activer les demandes et les e-mails

1. Dans le projet Netlify, aller dans Forms et activer « Enable form detection » avant de redéployer.
2. Après le déploiement, vérifier que le formulaire `reservation-evenement` est détecté.
3. Ajouter une notification e-mail de nouvelle soumission pour ce formulaire, destination `maisonmartin2020@gmail.com`, dans les notifications de formulaire Netlify. Le champ E-mail de contact de Decap change le lien affiché, pas le destinataire des notifications.
4. Envoyer une demande de test depuis le site déployé, vérifier qu’elle apparaît dans Netlify Forms et que l’e-mail est reçu (vérifier aussi les indésirables). Puis retirer la demande de test du tableau Netlify.
5. Vérifier les quotas et conditions Forms de votre offre Netlify avant l’ouverture au public.

Le code est prêt, mais aucune détection de formulaire, notification ni livraison d’e-mail n’a été activée ou vérifiée sur votre compte. L’aperçu local affiche un message de démonstration sans envoyer de demande.

Documentation : https://docs.netlify.com/manage/forms/setup/ et https://docs.netlify.com/manage/forms/notifications/
