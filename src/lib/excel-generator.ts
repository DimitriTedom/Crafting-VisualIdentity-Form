import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const generateAndDownloadExcel = (data: any) => {
  // 1. Flatten the data for better Excel structure
  // We'll create multiple sheets for different sections or just one big sheet with prefixes

  const flatData: Record<string, string> = {
    // 1. Contact
    "Nom du Contact": data.contactName,
    "Email du Contact": data.contactEmail,
    "Téléphone": data.phoneNumber || "",
    "Nom de l'Entreprise": data.companyName,
    "Site Web Actuel": data.companyWebsite || "",
    "Secteur d'Activité": data.industry || "",
    "Pays/Ville": data.country || "",

    // 2. Entreprise
    "Description Entreprise": data.companyDescription || "",
    "Années d'existence": data.yearsInBusiness || "",
    "Nombre d'employés": data.numberOfEmployees || "",
    "Mission": data.missionStatement || "",
    "Valeurs": data.coreValues || "",
    "Proposition de Valeur (USP)": data.uniqueSellingPoint || "",

    // 3. Public Cible
    "Client Idéal": data.targetAudience || "",
    "Tranche d'âge": data.targetAgeRange || "",
    "Genre Cible": data.targetGender || "",
    "Localisation Cible": data.targetLocation || "",
    "Problèmes Clients": data.customerPainPoints || "",

    // 4. Identité Visuelle - Couleurs
    "Couleur Primaire": data.primaryColor || "",
    "Couleur Secondaire": data.secondaryColor || "",
    "Couleur Accent": data.accentColor || "",
    "Préférences Couleurs": data.colorPreferences || "",
    "Couleurs à Éviter": data.colorsToAvoid || "",

    // 5. Identité Visuelle - Logo
    "Logo Existant ?": data.hasExistingLogo || "",
    "Style Logo": data.logoStyle || "",
    "Éléments Logo": data.logoElements || "",
    "Inspirations Logo": data.logoInspirations || "",

    // 6. Typographie & Style
    "Préférences Typo": data.typographyPreferences || "",
    "Style Design": data.designStyle || "",
    "Inspirations Design": data.designInspirations || "",
    "Exemples Concurrents": data.competitorExamples || "",
    
    // 7. Marque
    "Personnalité Marque": data.brandPersonality || "",
    "Archétype Marque": data.brandArchetype || "", // NEW
    "Ton de Voix": data.brandVoiceTone || "",
    "Slogan": data.taglineSlogan || "",
    "Messages Clés": data.keyMessages || "",

    // 8. Réseaux Sociaux
    "Plateformes Visées": data.socialPlatforms || "",
    "Facebook": data.facebookHandle || "",
    "Instagram": data.instagramHandle || "",
    "LinkedIn": data.linkedinHandle || "",
    "Twitter/X": data.twitterHandle || "",
    "TikTok": data.tiktokHandle || "",
    "YouTube": data.youtubeHandle || "",
    "Stratégie Contenu": data.contentStrategy || "",
    "Fréquence Post": data.postingFrequency || "",

    // 9. Site Web & Tech
    "Site Existant ?": data.hasExistingWebsite || "",
    "Domaine Souhaité": data.preferredDomain || "",
    "Objectifs Site": data.websiteGoals || "",
    "Fonctionnalités": data.websiteFeatures || "",
    "Pages Requises": data.requiredPages || "",
    "Besoins E-commerce": data.ecommerceNeeds || "",
    "Exigences Techniques": data.technicalRequirements || "",
    "Préférence CMS": data.cmsPreference || "", // NEW
    "Mobile First ?": data.mobileResponsiveness || "", // NEW

    // 10. Budget & Timeline
    "Budget": data.projectBudget || "",
    "Date Lancement": data.desiredLaunchDate || "",
    "Priorités": data.priorityServices || "",

    // 11. Concurrence
    "Concurrents": data.mainCompetitors || "",
    "Forces/Faiblesses Concurrents": data.competitorStrengths || "",
    "Différenciation": data.differentiationStrategy || "",

    // 12. Matériel Marketing
    "Matériel Requis": data.marketingMaterials || "",
    "Besoins Print": data.printNeeds || "",
    "Besoins Digital": data.digitalNeeds || "",

    // 13. Expérience Client
    "Parcours Client": data.customerJourney || "",
    "Approche Service Client": data.customerServiceApproach || "",
    "Politique Retour": data.returnPolicy || "",
    "Délai Livraison": data.deliveryTime || "",
    
    // 14. Contenu & Communication
    "Sujets Contenu": data.contentTopics || "",
    "Langues": data.languagePreferences || "",
    "Accessibilité": data.accessibilityNeeds || "",
    "Traductions": data.translationNeeds || "",
    "Rédacteur Contenu": data.contentWriter || "", // NEW
    "Photos Pros ?": data.hasProfessionalPhotos || "", // NEW
    
    // 15. SEO & Marketing Digital
    "Mots-clés SEO": data.seoKeywords || "",
    "Google My Business": data.googleMyBusiness || "",
    "Budget Publicité": data.advertisingBudget || "",
    "Email Marketing": data.emailMarketingNeeds || "",

    // 16. Infrastructure (NEW)
    "Fournisseur Domaine": data.domainProvider || "",
    "Hébergeur": data.hostingProvider || "",
    "Fournisseur Email": data.existingEmailProvider || "",
    "CRM": data.crmTool || "",

    // 17. Légal (NEW)
    "Conformité RGPD": data.gdprCompliance || "",
    "Mentions Légales": data.legalDisclaimer || "",
    
    // 18. Analyses & Métriques
    "Métriques Succès": data.successMetrics || "",
    "Outils Analytics": data.analyticsTools || "",
    "Fréquence Reporting": data.reportingFrequency || "",
    
    // 19. Inspiration & Références
    "Marques Aimées": data.brandsYouLove || "",
    "Marques Détestées": data.brandsYouDislike || "",
    "Références Visuelles": data.visualReferences || "",
    
    // 20. Notes Finales
    "Autres Exigences": data.additionalRequirements || "",
    "Liens Inspiration": data.inspirationLinks || "",
    "Questions/Doutes": data.questionsOrConcerns || "",
    "Demandes Spéciales": data.specialRequests || "",
  };

  // Convert to sheet
  const worksheet = XLSX.utils.json_to_sheet([flatData]);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Client Data");

  // Generate buffer
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const dataBlob = new Blob([excelBuffer], { type: "application/octet-stream" });

  // Download
  saveAs(dataBlob, `Client_Identity_Form_${data.companyName || "Submission"}.xlsx`);
};
