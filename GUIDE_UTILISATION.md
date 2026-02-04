# 🎨 Guide d'Utilisation - Formulaire Identité Visuelle

## 📋 Présentation

Ce formulaire permet de collecter **toutes les informations nécessaires** pour créer l'identité visuelle complète d'un client, incluant :
- Logo & charte graphique
- Présence sur les réseaux sociaux  
- Site web
- Stratégie de marque
- Matériel marketing

## 🚀 Lancer l'Application

### Mode Développement
```bash
npm run dev
```
L'application sera accessible sur `http://localhost:5173`

### Build Production
```bash
npm run build
npm run preview
```

## 📝 Sections du Formulaire (18 au total)

1. **Informations de Contact** - Coordonnées du client
2. **Informations sur l'Entreprise** - ADN, mission, valeurs
3. **Public Cible** - Avatar client, démographie
4. **Identité Visuelle - Couleurs** - Palette chromatique
5. **Identité Visuelle - Logo** - Style et inspirations
6. **Typographie & Style** - Ambiance visuelle
7. **Marque & Positionnement** - Personnalité, ton, slogan
8. **Réseaux Sociaux** - Plateformes et stratégie
9. **Site Web** - Besoins et fonctionnalités
10. **Budget & Délais** - Contraintes projet
11. **Concurrence & Marché** - Analyse concurrentielle
12. **Matériel Marketing** - Supports print & digital
13. **Expérience Client** - Parcours et service
14. **Contenu & Communication** - Sujets, langues
15. **SEO & Marketing Digital** - Référencement
16. **Analyses & Métriques** - KPIs et reporting
17. **Inspiration & Références** - Marques aimées/détestées
18. **Notes Additionnelles** - Demandes spéciales

## 📊 Génération du Fichier Excel

Une fois le formulaire soumis :
1. Un fichier Excel est **automatiquement téléchargé** sur l'ordinateur du client
2. Le fichier contient **toutes les réponses organisées** par section
3. Nom du fichier : `Client_Identity_Form_[NomEntreprise].xlsx`

## 📧 Configuration de l'Email (EmailJS)

### Étape 1 : Créer un compte EmailJS
1. Aller sur [https://www.emailjs.com/](https://www.emailjs.com/)
2. S'inscrire (gratuit jusqu'à 200 emails/mois)

### Étape 2 : Configurer le Service
1. Créer un nouveau service email (Gmail recommandé)
2. Noter le **Service ID** (ex: `service_abc123`)

### Étape 3 : Créer un Template
1. Créer un nouveau template avec ces variables :
   ```
   {{to_email}} - dimitritedom@gmail.com
   {{from_name}} - Nom du client
   {{company_name}} - Nom entreprise
   {{message}} - Résumé du projet
   ```

2. Exemple de template email :
   ```
   Nouveau client : {{company_name}}

   De la part de : {{from_name}}

   {{message}}
   ```

3. Noter le **Template ID** (ex: `template_xyz789`)

### Étape 4 : Récupérer la clé publique
1. Aller dans "Account" → "General"
2. Copier la **Public Key**

### Étape 5 : Configurer le code
Éditer `src/lib/email-service.ts` :

```typescript
// Décommenter et remplacer ces lignes (lignes 1-7)
import emailjs from "@emailjs/browser";

const SERVICE_ID = "service_VOTRE_ID";  // ← Votre Service ID
const TEMPLATE_ID = "template_VOTRE_ID"; // ← Votre Template ID  
const PUBLIC_KEY = "VOTRE_CLE_PUBLIQUE";  // ← Votre Public Key

export const sendSubmissionEmail = async (data: any) => {
  try {
    const templateParams = {
      to_email: "dimitritedom@gmail.com",
      from_name: data.contactName,
      company_name: data.companyName,
      message: `...` // Le message est déjà configuré
    };

    // Décommenter cette ligne (ligne 45)
    await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);

    console.log("Email envoyé avec succès!");
    alert("Email de notification envoyé !");
    return true;
  } catch (error) {
    console.error("Erreur email:", error);
    return false;
  }
};
```

## 🎨 Personnalisation du Style

Le formulaire utilise :
- **Tailwind CSS** pour les styles
- **ShadCN/UI** pour les composants
- **Lucide React** pour les icônes

### Modifier les couleurs du gradient
Dans `ClientOnboardingForm.tsx` :
```tsx
// Header gradient
className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"

// Modifier vers :
className="bg-gradient-to-r from-green-600 via-teal-600 to-cyan-600"
```

### Ajouter une nouvelle section
1. Ajouter les champs dans le type `FormData`
2. Créer une nouvelle `<Card>` avec votre contenu
3. Ajouter les champs dans `excel-generator.ts`

## 🔐 Sécurité

⚠️ **IMPORTANT** : Ne jamais commit les clés API EmailJS dans Git !

Créer un fichier `.env.local` :
```env
VITE_EMAILJS_SERVICE_ID=service_xxx
VITE_EMAILJS_TEMPLATE_ID=template_xxx
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

Puis dans `email-service.ts` :
```typescript
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
```

## 🐳 Déploiement Docker

```bash
# Build l'image
npm run docker:build

# Run le conteneur
npm run docker:run
```

L'app sera accessible sur `http://localhost:80`

## 💡 Conseils d'Utilisation

### Pour le Client
- Prendre le temps de répondre à toutes les questions
- Inclure des liens vers des exemples/inspirations
- Être le plus précis possible

### Pour Vous (Développeur)
- Le fichier Excel contient TOUTES les informations
- Demander au client de vous l'envoyer par email
- Utiliser les données pour créer un brief complet

## 🆘 Support & Questions

Si vous rencontrez des problèmes :
1. Vérifier que toutes les dépendances sont installées : `npm install`
2. Vérifier les erreurs dans la console navigateur (F12)
3. Vérifier que les clés EmailJS sont correctes

## 📄 License

MIT - Libre d'utilisation et modification

---

**Développé avec ❤️ par DimitriTedom (SnowDev)**  
Email: dimitritedom@gmail.com
