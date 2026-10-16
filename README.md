# See Cat — application Android (APK) via GitHub

Ce dossier contient ton site (dossier `www`) et tout ce qu'il faut pour que **GitHub fabrique l'APK automatiquement**.
Tu n'as rien à installer sur ton ordinateur.

## Obtenir l'APK (environ 10 minutes la première fois)

1. Crée un compte sur https://github.com puis clique sur **New repository**.
   Nom : `see-cat-app` (public ou privé, comme tu veux). Clique sur **Create repository**.
2. Envoie les fichiers :
   - Dézippe ce dossier sur ton ordinateur.
   - Dans ton dépôt, clique sur **uploading an existing file** (ou Add file > Upload files).
   - Glisse **tout le contenu** du dossier (dont `www`, `android-res`, `package.json`, `package-lock.json`, `capacitor.config.json`).
   - Clique sur **Commit changes**.
3. **Dossier caché `.github`** : certains ordinateurs ne le montrent pas. Si, après l'envoi, tu ne vois pas `.github/workflows` dans ton dépôt :
   - clique sur **Add file > Create new file**,
   - dans le nom, tape exactement `.github/workflows/build-apk.yml`,
   - colle le contenu du fichier `build-apk.yml.txt` (fourni dans ce dossier, à ouvrir avec le Bloc-notes), puis **Commit changes**.
4. Clique sur l'onglet **Actions**. Le travail **« Construire l'APK See Cat »** démarre tout seul
   (sinon : clique dessus puis **Run workflow**). Attends la coche verte (5 à 10 minutes).
5. Ouvre le travail terminé, descends à **Artifacts** et télécharge **SeeCat-APK**.
   Dézippe-le : tu obtiens **SeeCat.apk**.
6. Envoie `SeeCat.apk` sur ton téléphone Android et ouvre-le. Android te demandera d'autoriser
   « l'installation d'applications inconnues » : accepte, puis installe.

Chaque nouvel envoi de fichiers refait un APK avec la dernière version du site.

## Pour mettre à jour le site dans l'app
Remplace les fichiers dans le dossier `www` de ton dépôt (Upload files), puis attends que l'Action se termine
et télécharge le nouvel APK.

## À savoir
- **Connexion Google** : elle est masquée dans l'APK, car Google refuse la fenêtre de connexion dans une application
  Android intégrée. La connexion par email + mot de passe et le code de vérification fonctionnent normalement.
  Pour avoir la connexion Google dans l'APK, il faut un module Firebase natif (je peux l'ajouter).
- **APK de test** : cet APK est signé avec une clé de test, il s'installe sans problème sur n'importe quel téléphone
  Android. Pour le publier sur **Google Play**, il faut un compte développeur, un fichier `.aab` et une clé de signature
  personnelle (je peux ajouter ça au workflow).
- **iPhone** : un APK ne fonctionne que sur Android. Sur iPhone, utilise l'installation depuis Safari
  (Partager > Sur l'écran d'accueil) : il faut alors que le site soit en ligne en HTTPS.

## Site en ligne gratuit (optionnel)
Pour que ton site soit aussi accessible sur internet (et installable sur iPhone) :
1. Dans ton dépôt : **Settings > Pages > Source = GitHub Actions**.
2. **Actions > « Mettre le site en ligne (GitHub Pages, optionnel) » > Run workflow**.
3. Dans la console Firebase : **Authentication > Paramètres > Domaines autorisés**, ajoute
   `ton-pseudo.github.io` (sinon la connexion Google sera refusée sur ce domaine).

## Contenu du dossier
- `www/` : le site (pages, intro See Cat, manifeste, service worker, icônes).
- `android-res/` : icône de l'application, écran de démarrage et couleur d'icône (copiés dans le projet Android).
- `capacitor.config.json`, `package.json`, `package-lock.json` : configuration de l'outil qui emballe le site en app.
- `.github/workflows/build-apk.yml` : la recette qui fabrique l'APK.
- `.github/workflows/deploy-pages.yml` : mise en ligne sur GitHub Pages (optionnelle).
