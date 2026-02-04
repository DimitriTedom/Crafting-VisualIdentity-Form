import { useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { generateAndDownloadExcel } from "@/lib/excel-generator";
import { sendSubmissionEmail } from "@/lib/email-service";
import { 
  User, Mail, Phone, Building2, Globe, MapPin, FileText, Users, Target, 
  Calendar, CheckCircle2, Rocket, Briefcase, Star, Heart, Zap, Sparkles,
  Server, Shield, CreditCard, Layout, Key, PenTool, Image, Database
} from "lucide-react";

type FormData = {
  // 1. Informations de Contact
  contactName: string;
  contactEmail: string;
  phoneNumber: string;
  companyName: string;
  sendToMe: boolean;
  userEmailForFile: string;
  industry: string;
  companyWebsite: string;
  country: string;
  
  // 2. Informations sur l'Entreprise
  companyDescription: string;
  yearsInBusiness: string;
  numberOfEmployees: string;
  missionStatement: string;
  coreValues: string;
  uniqueSellingPoint: string;
  
  // 3. Public Cible
  targetAudience: string;
  targetAgeRange: string;
  targetGender: string;
  targetLocation: string;
  customerPainPoints: string;
  
  // 4. Identité Visuelle - Couleurs
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  colorPreferences: string;
  colorsToAvoid: string;
  
  // 5. Identité Visuelle - Logo
  hasExistingLogo: string;
  logoStyle: string;
  logoElements: string;
  logoInspirations: string;
  
  // 6. Identité Visuelle - Typography & Style
  typographyPreferences: string;
  designStyle: string;
  designInspirations: string;
  competitorExamples: string;
  
  // 7. Marque & Positionnement
  brandPersonality: string;
  brandVoiceTone: string;
  taglineSlogan: string;
  keyMessages: string;
  brandArchetype: string; // NEW
  
  // 8. Présence sur les Réseaux Sociaux
  socialPlatforms: string;
  facebookHandle: string;
  instagramHandle: string;
  linkedinHandle: string;
  twitterHandle: string;
  tiktokHandle: string;
  youtubeHandle: string;
  contentStrategy: string;
  postingFrequency: string;
  
  // 9. Site Web
  hasExistingWebsite: string;
  preferredDomain: string;
  websiteGoals: string;
  websiteFeatures: string;
  requiredPages: string;
  ecommerceNeeds: string;
  technicalRequirements: string;
  cmsPreference: string; // NEW: WordPress, Shopify, Custom...
  mobileResponsiveness: string; // NEW: Mobile first?
  
  // 10. Budget & Timeline
  projectBudget: string;
  desiredLaunchDate: string;
  priorityServices: string;
  
  // 11. Concurrence & Marché
  mainCompetitors: string;
  competitorStrengths: string;
  differentiationStrategy: string;
  
  // 12. Matériel Marketing
  marketingMaterials: string;
  printNeeds: string;
  digitalNeeds: string;
  
  // 13. Expérience Client & Service
  customerJourney: string;
  customerServiceApproach: string;
  returnPolicy: string;
  deliveryTime: string;
  
  // 14. Contenu & Communication
  contentTopics: string;
  languagePreferences: string;
  accessibilityNeeds: string;
  translationNeeds: string;
  contentWriter: string; // NEW: Who writes?
  hasProfessionalPhotos: string; // NEW: Yes/No
  
  // 15. SEO & Marketing Digital
  seoKeywords: string;
  googleMyBusiness: string;
  advertisingBudget: string;
  emailMarketingNeeds: string;

  // New Section: Infrastructure & Technique
  domainProvider: string; // NEW
  hostingProvider: string; // NEW
  existingEmailProvider: string; // NEW
  crmTool: string; // NEW (HubSpot, Salesforce...)
  
  // New Section: Légal & Conformité
  gdprCompliance: string; // NEW
  legalDisclaimer: string; // NEW
  
  // 16. Analyses & Métriques
  successMetrics: string;
  analyticsTools: string;
  reportingFrequency: string;
  
  // 17. Inspiration & Références
  brandsYouLove: string;
  brandsYouDislike: string;
  visualReferences: string;
  
  // 18. Notes Additionnelles
  additionalRequirements: string;
  inspirationLinks: string;
  questionsOrConcerns: string;
  specialRequests: string;
};

export default function ClientOnboardingForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      // 1. Generate and Download Excel
      generateAndDownloadExcel(data);

      // 2. Send Notification Email
      await sendSubmissionEmail(data);

      setIsSuccess(true);
    } catch (error) {
      console.error("Submission error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="container mx-auto p-4 flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <Card className="w-full max-w-md text-center shadow-2xl border-2 border-green-200">
          <CardHeader>
            <div className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <CardTitle className="text-3xl font-bold text-green-600">Succès !</CardTitle>
            <CardDescription className="text-lg">
              Vos informations ont été enregistrées avec succès.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm text-green-800">
                ✅ Un fichier Excel détaillé a été téléchargé sur votre ordinateur.
              </p>
              <p className="text-sm text-green-800 mt-2">
                📧 Une notification a été envoyée à notre équipe.
              </p>
            </div>
            <p className="text-muted-foreground text-sm">
              Merci de nous envoyer le fichier Excel par email si nécessaire.
            </p>
            <Button onClick={() => window.location.reload()} className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Rocket className="mr-2 h-4 w-4" />
              Soumettre un autre formulaire
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-white dark:from-gray-900 dark:via-blue-950/20 dark:to-gray-900 py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        
        {/* Header SPECTACULAIRE avec animation */}
        <div className="mb-16 text-center space-y-6 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 via-blue-400/10 to-indigo-400/10 blur-3xl -z-10 animate-pulse" />
          
          <div className="flex justify-center mb-6">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative p-6 bg-white dark:bg-gray-800 rounded-full shadow-xl border border-blue-100 dark:border-blue-900">
                <Sparkles className="w-16 h-16 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-black bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-blue-800 to-slate-900 dark:from-white dark:via-blue-200 dark:to-white mb-2 tracking-tight">
            SnowDev Tech Services
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400">
            Audit Identité Visuelle & Présence Digitale
          </h2>
          
          <div className="max-w-3xl mx-auto bg-white/50 dark:bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 border border-blue-100 dark:border-blue-900 shadow-sm mt-8">
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              🚀 <span className="text-blue-600 font-bold">Objectif : Zéro Friction.</span><br/>
              Ce formulaire est conçu pour capturer l'essence complète de votre projet. En le remplissant à 100%, vous permettez à notre équipe de déployer votre stratégie digitale complète <span className="italic">sans allers-retours inutiles</span>.
            </p>
          </div>

          <div className="flex justify-center gap-4 flex-wrap mt-8">
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg border border-blue-100 dark:border-blue-800">
              <CheckCircle2 className="w-5 h-5" />
              <span>Analyse 360°</span>
            </div>
             <div className="flex items-center gap-2 px-4 py-2 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg border border-purple-100 dark:border-purple-800">
              <Target className="w-5 h-5" />
              <span>Stratégie Sur-Mesure</span>
            </div>
             <div className="flex items-center gap-2 px-4 py-2 bg-cyan-50 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 rounded-lg border border-cyan-100 dark:border-cyan-800">
              <Rocket className="w-5 h-5" />
              <span>Déploiement Rapide</span>
            </div>
          </div>
        </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        
        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* 1. INFORMATIONS DE CONTACT - BLEU */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <Card className="border-l-4 border-l-blue-500 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
          <CardHeader className="bg-gradient-to-r from-blue-100 via-blue-50 to-transparent dark:from-blue-950/40 dark:via-blue-950/20 border-b border-blue-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
                <User className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <CardTitle className="text-3xl font-black text-blue-900 dark:text-blue-100">
                  1️⃣ Informations de Contact
                </CardTitle>
                <CardDescription className="text-base mt-1 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Vos coordonnées pour une communication fluide
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 pt-8 bg-gradient-to-br from-blue-50/30 to-transparent dark:from-blue-950/10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="contactName" className="flex items-center gap-2 text-base font-semibold">
                  <User className="w-5 h-5 text-blue-600" />
                  Nom Complet <span className="text-red-500">*</span>
                </Label>
                <Input 
                  id="contactName" 
                  {...register("contactName", { required: true })} 
                  placeholder="Ex: Jean Dupont - Directeur Marketing" 
                  className="border-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 h-12 text-base" 
                />
                {errors.contactName && <span className="text-red-500 text-sm font-medium flex items-center gap-1"><Zap className="w-4 h-4" /> Requis</span>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactEmail" className="flex items-center gap-2 text-base font-semibold">
                  <Mail className="w-5 h-5 text-blue-600" />
                  Email Professionnel <span className="text-red-500">*</span>
                </Label>
                <Input 
                  id="contactEmail" 
                  type="email" 
                  {...register("contactEmail", { required: true })} 
                  placeholder="contact@votreentreprise.com" 
                  className="border-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 h-12 text-base" 
                />
                {errors.contactEmail && <span className="text-red-500 text-sm font-medium flex items-center gap-1"><Zap className="w-4 h-4" /> Requis</span>}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="phoneNumber" className="flex items-center gap-2 text-base font-semibold">
                  <Phone className="w-5 h-5 text-blue-600" />
                  Téléphone (Mobile / Bureau)
                </Label>
                <Input 
                  id="phoneNumber" 
                  {...register("phoneNumber")} 
                  placeholder="+33 6 12 34 56 78 ou +1 (555) 123-4567" 
                  className="border-2 focus:border-blue-400 h-12 text-base" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="companyName" className="flex items-center gap-2 text-base font-semibold">
                  <Building2 className="w-5 h-5 text-blue-600" />
                  Nom de l'Entreprise / Marque <span className="text-red-500">*</span>
                </Label>
                <Input 
                  id="companyName" 
                  {...register("companyName", { required: true })} 
                  placeholder="Ma Super Entreprise Inc." 
                  className="border-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 h-12 text-base" 
                />
                {errors.companyName && <span className="text-red-500 text-sm font-medium flex items-center gap-1"><Zap className="w-4 h-4" /> Requis</span>}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="companyWebsite" className="flex items-center gap-2 text-base font-semibold">
                  <Globe className="w-5 h-5 text-blue-600" />
                  Site Web Actuel
                </Label>
                <Input 
                  id="companyWebsite" 
                  {...register("companyWebsite")} 
                  placeholder="www.votresite.com" 
                  className="border-2 focus:border-blue-400 h-12 text-base" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="industry" className="flex items-center gap-2 text-base font-semibold">
                  <Briefcase className="w-5 h-5 text-blue-600" />
                  Secteur d'Activité
                </Label>
                <Input 
                  id="industry" 
                  {...register("industry")} 
                  placeholder="Technologie, Mode, Santé, Finance..." 
                  className="border-2 focus:border-blue-400 h-12 text-base" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country" className="flex items-center gap-2 text-base font-semibold">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  Localisation Principale
                </Label>
                <Input 
                  id="country" 
                  {...register("country")} 
                  placeholder="Paris, France / NYC, USA" 
                  className="border-2 focus:border-blue-400 h-12 text-base" 
                />
              </div>
            </div>
            
            {/* Option pour recevoir le fichier Excel par email */}
            <div className="mt-6 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-2 border-blue-300 dark:border-blue-700 rounded-xl shadow-sm space-y-4">
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="sendToMe"
                  {...register("sendToMe")}
                  className="mt-1 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 cursor-pointer"
                />
                <div className="flex-1">
                  <Label htmlFor="sendToMe" className="flex items-center gap-2 cursor-pointer text-base font-bold text-blue-900 dark:text-blue-100">
                    <Mail className="w-5 h-5 text-blue-600" />
                    📧 Je souhaite également recevoir le fichier Excel par email
                  </Label>
                  <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                    Le fichier sera automatiquement téléchargé ET envoyé à votre email
                  </p>
                </div>
              </div>
              
              <div className="space-y-2 pl-8">
                <Label htmlFor="userEmailForFile" className="text-sm font-semibold text-blue-800 dark:text-blue-200">
                  Email où recevoir le fichier
                </Label>
                <Input 
                  id="userEmailForFile" 
                  type="email"
                  {...register("userEmailForFile")} 
                  placeholder="mon-email@exemple.com" 
                  className="border-2 border-blue-300 focus:border-blue-500 h-11 text-base bg-white dark:bg-gray-800"
                />
                <p className="text-xs text-blue-600 dark:text-blue-400 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Peut être différent de votre email de contact principal
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* 2. INFORMATIONS SUR L'ENTREPRISE - VIOLET */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <Card className="border-l-4 border-l-purple-500 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
          <CardHeader className="bg-gradient-to-r from-purple-100 via-purple-50 to-transparent dark:from-purple-950/40 dark:via-purple-950/20 border-b border-purple-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg">
                <Building2 className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <CardTitle className="text-3xl font-black text-purple-900 dark:text-purple-100">
                  2️⃣ Informations sur l'Entreprise
                </CardTitle>
                <CardDescription className="text-base mt-1 flex items-center gap-2">
                  <Rocket className="w-4 h-4" />
                  L'ADN et l'histoire de votre structure
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 pt-8 bg-gradient-to-br from-purple-50/30 to-transparent dark:from-purple-950/10">
            <div className="space-y-2">
              <Label htmlFor="companyDescription" className="flex items-center gap-2 text-base font-semibold">
                <FileText className="w-5 h-5 text-purple-600" />
                Description Détaillée de l'Entreprise
              </Label>
              <Textarea 
                id="companyDescription" 
                {...register("companyDescription")} 
                placeholder="Décrivez votre activité en détail : Que faites-vous ? Quels produits/services offrez-vous ? Quelle est votre expertise ? Comment aidez-vous vos clients au quotidien ?" 
                className="border-2 min-h-[120px] focus:border-purple-400 text-base" 
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="yearsInBusiness" className="flex items-center gap-2 text-base font-semibold">
                  <Calendar className="w-5 h-5 text-purple-600" />
                  Années d'Existence / Lancement
                </Label>
                <Input 
                  id="yearsInBusiness" 
                  {...register("yearsInBusiness")} 
                  placeholder="Startup (< 1 an), 2-5 ans, 10+ ans, 20+ ans..." 
                  className="border-2 h-12 text-base focus:border-purple-400" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="numberOfEmployees" className="flex items-center gap-2 text-base font-semibold">
                  <Users className="w-5 h-5 text-purple-600" />
                  Taille de l'Équipe
                </Label>
                <Input 
                  id="numberOfEmployees" 
                  {...register("numberOfEmployees")} 
                  placeholder="Solo, 2-5, 6-20, 21-100, 100+..." 
                  className="border-2 h-12 text-base focus:border-purple-400" 
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="missionStatement" className="flex items-center gap-2 text-base font-semibold">
                <Rocket className="w-5 h-5 text-purple-600" />
                Mission & Vision
              </Label>
              <Textarea 
                id="missionStatement" 
                {...register("missionStatement")} 
                placeholder="Quelle est votre raison d'être ? Quel changement voulez-vous apporter au monde ? Où vous voyez-vous dans 5-10 ans ? Quel impact souhaitez-vous créer dans votre industrie ?" 
                className="border-2 min-h-[100px] focus:border-purple-400 text-base" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="coreValues" className="flex items-center gap-2 text-base font-semibold">
                <Heart className="w-5 h-5 text-purple-600" />
                Valeurs Fondamentales & Culture
              </Label>
              <Textarea 
                id="coreValues" 
                {...register("coreValues")} 
                placeholder="Innovation, Intégrité, Excellence, Durabilité, Transparence, Collaboration, Passion... Listez les 3-5 valeurs qui définissent votre culture d'entreprise." 
                className="border-2 min-h-[80px] focus:border-purple-400 text-base" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="uniqueSellingPoint" className="flex items-center gap-2 text-base font-semibold">
                <Star className="w-5 h-5 text-purple-600" />
                Proposition de Valeur Unique (USP)
              </Label>
              <Textarea 
                id="uniqueSellingPoint" 
                {...register("uniqueSellingPoint")} 
                placeholder="Qu'est-ce qui vous distingue VRAIMENT de vos concurrents ? Quel est votre avantage compétitif ? Pourquoi les clients devraient-ils vous choisir VOUS plutôt qu'un autre ? Soyez spécifique et concret !" 
                className="border-2 min-h-[120px] focus:border-purple-400 text-base" 
              />
            </div>
          </CardContent>
        </Card>

        {/* 3. PUBLIC CIBLE */}
        <Card className="border-l-4 border-l-green-500 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="bg-gradient-to-r from-green-50 to-transparent dark:from-green-950/20">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Target className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <CardTitle className="text-2xl">3. Public Cible</CardTitle>
                <CardDescription>Connaître votre audience</CardDescription>
              </div>
            </div>
          </CardHeader>
           <CardContent className="space-y-4 pt-6">
             <div className="space-y-2">
              <Label htmlFor="targetAudience" className="flex items-center gap-2">
                <Users className="w-4 h-4 text-green-600" />
                Description du Client Idéal
              </Label>
              <Textarea id="targetAudience" {...register("targetAudience")} placeholder="Décrivez en détail votre client idéal : style de vie, comportements, valeurs..." className="border-2 min-h-[100px]" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               <div className="space-y-2">
                <Label htmlFor="targetAgeRange">Tranche d'âge</Label>
                <Input id="targetAgeRange" {...register("targetAgeRange")} placeholder="25-40 ans" className="border-2" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="targetGender">Genre</Label>
                <Input id="targetGender" {...register("targetGender")} placeholder="Tous, Femmes, Hommes..." className="border-2" />
              </div>
               <div className="space-y-2">
                <Label htmlFor="targetLocation">Localisation</Label>
                <Input id="targetLocation" {...register("targetLocation")} placeholder="Urbain, France, International..." className="border-2" />
              </div>
            </div>
             <div className="space-y-2">
              <Label htmlFor="customerPainPoints" className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-green-600" />
                Problèmes des clients
              </Label>
              <Textarea id="customerPainPoints" {...register("customerPainPoints")} placeholder="Quels sont leurs défis quotidiens ? Quels problèmes résolvez-vous pour eux ?" className="border-2 min-h-[80px]" />
            </div>
           </CardContent>
        </Card>

        {/* 4. IDENTITÉ VISUELLE - COULEURS */}
        <Card>
           <CardHeader>
            <CardTitle>4. Identité Visuelle - Couleurs</CardTitle>
            <CardDescription>Vos préférences chromatiques.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="primaryColor">Couleur Primaire</Label>
                <Input id="primaryColor" {...register("primaryColor")} placeholder="Bleu Royal (#4169E1)" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="secondaryColor">Couleur Secondaire</Label>
                <Input id="secondaryColor" {...register("secondaryColor")} placeholder="Or, Blanc..." />
              </div>
               <div className="space-y-2">
                <Label htmlFor="accentColor">Couleur d'Accent</Label>
                <Input id="accentColor" {...register("accentColor")} placeholder="Rouge vif..." />
              </div>
            </div>
             <div className="space-y-2">
              <Label htmlFor="colorPreferences">Préférences générales</Label>
              <Textarea id="colorPreferences" {...register("colorPreferences")} placeholder="Pastel, Vif, Sombre, Naturel..." />
            </div>
              <div className="space-y-2">
              <Label htmlFor="colorsToAvoid">Couleurs à éviter</Label>
              <Input id="colorsToAvoid" {...register("colorsToAvoid")} placeholder="Pas de rose, pas de vert..." />
            </div>
          </CardContent>
        </Card>

        {/* 5. IDENTITÉ VISUELLE - LOGO */}
        <Card>
            <CardHeader>
            <CardTitle>5. Identité Visuelle - Logo</CardTitle>
            <CardDescription>Conception de votre logo.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
               <Label htmlFor="hasExistingLogo">Avez-vous déjà un logo ?</Label>
               <Input id="hasExistingLogo" {...register("hasExistingLogo")} placeholder="Oui/Non/À refondre" />
            </div>
             <div className="space-y-2">
              <Label htmlFor="logoStyle">Style de Logo préféré</Label>
              <Input id="logoStyle" {...register("logoStyle")} placeholder="Minimaliste, Abstrait, Emblème, Typographique..." />
            </div>
             <div className="space-y-2">
              <Label htmlFor="logoElements">Éléments à inclure</Label>
              <Textarea id="logoElements" {...register("logoElements")} placeholder="Icône spécifique, initiales..." />
            </div>
             <div className="space-y-2">
              <Label htmlFor="logoInspirations">Inspirations Logo</Label>
              <Textarea id="logoInspirations" {...register("logoInspirations")} placeholder="Liens vers des logos que vous aimez..." />
            </div>
          </CardContent>
        </Card>

        {/* 6. IDENTITÉ VISUELLE - TYPOGRAPHIE & STYLE */}
         <Card>
            <CardHeader>
            <CardTitle>6. Typographie & Style</CardTitle>
            <CardDescription>L'ambiance visuelle.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="space-y-2">
              <Label htmlFor="typographyPreferences">Préférences Typographiques</Label>
              <Input id="typographyPreferences" {...register("typographyPreferences")} placeholder="Serif, Sans-Serif, Manuscrit, Moderne..." />
            </div>
             <div className="space-y-2">
              <Label htmlFor="designStyle">Style Général</Label>
              <Input id="designStyle" {...register("designStyle")} placeholder="Corporate, Ludique, Luxueux, Grunge..." />
            </div>
             <div className="space-y-2">
              <Label htmlFor="designInspirations">Liens d'inspiration Design</Label>
              <Textarea id="designInspirations" {...register("designInspirations")} placeholder="Pinterest board, Behance, Sites web..." />
            </div>
             <div className="space-y-2">
              <Label htmlFor="competitorExamples">Exemples Concurrents (Bien ou Mal)</Label>
              <Textarea id="competitorExamples" {...register("competitorExamples")} placeholder="Ce qu'ils font bien, ce que vous détestez..." />
            </div>
          </CardContent>
        </Card>

        {/* 7. MARQUE & POSITIONNEMENT */}
        <Card className="border-l-4 border-l-amber-500 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-amber-50 to-transparent dark:from-amber-950/20">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl shadow-lg">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold text-amber-900 dark:text-amber-100">7. Marque & Positionnement</CardTitle>
                <CardDescription>L'âme et la voix de votre marque.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
             <div className="space-y-2">
              <Label htmlFor="brandPersonality">Personnalité de la Marque</Label>
              <Input id="brandPersonality" {...register("brandPersonality")} placeholder="Amicale, Autoritaire, Rebelle, Sophistiquée..." className="border-2 focus:border-amber-400 h-11" />
            </div>
            <div className="space-y-2">
               <Label htmlFor="brandArchetype">Archétype de Marque (Optionnel)</Label>
               <Input id="brandArchetype" {...register("brandArchetype")} placeholder="Le Héros, Le Sage, L'Explorateur, Le Créateur..." className="border-2 focus:border-amber-400 h-11" />
               <p className="text-xs text-muted-foreground">Si vous connaissez votre archétype Jungien.</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="brandVoiceTone">Ton de Voix</Label>
              <Input id="brandVoiceTone" {...register("brandVoiceTone")} placeholder="Professionnel, Humoristique, Inspirant..." className="border-2 focus:border-amber-400 h-11" />
            </div>
             <div className="space-y-2">
              <Label htmlFor="taglineSlogan">Slogan / Tagline</Label>
              <Input id="taglineSlogan" {...register("taglineSlogan")} placeholder="Just Do It, Think Different..." className="border-2 focus:border-amber-400 h-11" />
            </div>
             <div className="space-y-2">
              <Label htmlFor="keyMessages">Messages Clés</Label>
              <Textarea id="keyMessages" {...register("keyMessages")} placeholder="Quels sont les 3 points principaux à communiquer ?" className="border-2 focus:border-amber-400 min-h-[100px]" />
            </div>
          </CardContent>
        </Card>

        {/* 8. PRÉSENCE RÉSEAUX SOCIAUX */}
        <Card>
          <CardHeader>
            <CardTitle>8. Réseaux Sociaux</CardTitle>
            <CardDescription>Où interagir avec votre audience ?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="space-y-2">
               <Label htmlFor="socialPlatforms">Quelles plateformes visez-vous ?</Label>
               <Input id="socialPlatforms" {...register("socialPlatforms")} placeholder="Instagram, LinkedIn, TikTok..." />
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="facebookHandle">Facebook</Label>
                <Input id="facebookHandle" {...register("facebookHandle")} placeholder="@page" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="instagramHandle">Instagram</Label>
                <Input id="instagramHandle" {...register("instagramHandle")} placeholder="@insta" />
              </div>
               <div className="space-y-2">
                <Label htmlFor="linkedinHandle">LinkedIn</Label>
                <Input id="linkedinHandle" {...register("linkedinHandle")} placeholder="profile url" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="twitterHandle">X (Twitter)</Label>
                <Input id="twitterHandle" {...register("twitterHandle")} placeholder="@handle" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tiktokHandle">TikTok</Label>
                <Input id="tiktokHandle" {...register("tiktokHandle")} placeholder="@handle" />
              </div>
               <div className="space-y-2">
                <Label htmlFor="youtubeHandle">YouTube</Label>
                <Input id="youtubeHandle" {...register("youtubeHandle")} placeholder="@channel" />
              </div>
            </div>
            <div className="space-y-2">
               <Label htmlFor="contentStrategy">Idées de Contenu</Label>
               <Textarea id="contentStrategy" {...register("contentStrategy")} placeholder="Tutoriels, coulisses, témoignages..." />
            </div>
             <div className="space-y-2">
               <Label htmlFor="postingFrequency">Fréquence de Publication</Label>
               <Input id="postingFrequency" {...register("postingFrequency")} placeholder="Quotidien, Hebdomadaire..." />
            </div>
          </CardContent>
        </Card>

        {/* 9. SITE WEB & TECH */}
        <Card className="border-l-4 border-l-cyan-500 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-cyan-50 to-transparent dark:from-cyan-950/20">
             <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl shadow-lg">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <div>
                 <CardTitle className="text-2xl font-bold text-cyan-900 dark:text-cyan-100">9. Besoins Site Web & Tech</CardTitle>
                 <CardDescription>Votre vitrine digitale et infrastructure.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="hasExistingWebsite">Site Web Existant ?</Label>
                  <Input id="hasExistingWebsite" {...register("hasExistingWebsite")} placeholder="Oui/Non (URL si oui)" className="border-2 focus:border-cyan-400 h-11" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="preferredDomain">Nom de Domaine Souhaité</Label>
                  <Input id="preferredDomain" {...register("preferredDomain")} placeholder="www.mamarque.com" className="border-2 focus:border-cyan-400 h-11" />
                </div>
             </div>
             
             <div className="space-y-2">
              <Label htmlFor="websiteGoals">Objectifs du Site</Label>
              <Textarea id="websiteGoals" {...register("websiteGoals")} placeholder="Vendre, Informer, Capturer des leads, Portfolio..." className="border-2 focus:border-cyan-400 min-h-[80px]" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="space-y-2">
                  <Label htmlFor="cmsPreference">Préférence CMS/Tech</Label>
                  <Input id="cmsPreference" {...register("cmsPreference")} placeholder="WordPress, Shopify, React/Next.js, Webflow..." className="border-2 focus:border-cyan-400 h-11" />
               </div>
               <div className="space-y-2">
                  <Label htmlFor="mobileResponsiveness">Expérience Mobile</Label>
                  <Input id="mobileResponsiveness" {...register("mobileResponsiveness")} placeholder="Mobile First ? App Native ?" className="border-2 focus:border-cyan-400 h-11" />
               </div>
            </div>

             <div className="space-y-2">
              <Label htmlFor="websiteFeatures">Fonctionnalités Clés</Label>
              <Textarea id="websiteFeatures" {...register("websiteFeatures")} placeholder="Blog, Boutique, Réservation, Espace Membre, Chatbot, Newsletter..." className="border-2 focus:border-cyan-400 min-h-[100px]" />
            </div>
             <div className="space-y-2">
              <Label htmlFor="requiredPages">Arborescence / Pages Requises</Label>
              <Input id="requiredPages" {...register("requiredPages")} placeholder="Accueil, À Propos, Services, Contact, CGV, Mentions Légales..." className="border-2 focus:border-cyan-400 h-11" />
            </div>
             <div className="space-y-2">
              <Label htmlFor="ecommerceNeeds">Besoins E-commerce (Détails)</Label>
              <Textarea id="ecommerceNeeds" {...register("ecommerceNeeds")} placeholder="Nombre de produits, types de paiement (Stripe/PayPal), expédition, taxes..." className="border-2 focus:border-cyan-400 min-h-[80px]" />
            </div>
             <div className="space-y-2">
              <Label htmlFor="technicalRequirements">Intégrations & API</Label>
              <Input id="technicalRequirements" {...register("technicalRequirements")} placeholder="Lien avec CRM, Outils Marketing, ERP..." className="border-2 focus:border-cyan-400 h-11" />
            </div>
          </CardContent>
        </Card>

        {/* 10. BUDGET & TIMELINE */}
        <Card>
          <CardHeader>
            <CardTitle>10. Budget & Délais</CardTitle>
            <CardDescription>Contraintes logistiques.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="projectBudget">Budget Estimé</Label>
                <Input id="projectBudget" {...register("projectBudget")} placeholder="ex: 2000€ - 5000€" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="desiredLaunchDate">Date de Lancement Souhaitée</Label>
                <Input id="desiredLaunchDate" {...register("desiredLaunchDate")} placeholder="JJ/MM/AAAA" />
              </div>
            </div>
             <div className="space-y-2">
                <Label htmlFor="priorityServices">Services Prioritaires</Label>
                <Input id="priorityServices" {...register("priorityServices")} placeholder="Logo d'abord, Site ensuite..." />
              </div>
          </CardContent>
        </Card>

         {/* 11. CONCURRENCE */}
         <Card>
          <CardHeader>
            <CardTitle>11. Concurrence & Marché</CardTitle>
            <CardDescription>Votre environnement.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
               <Label htmlFor="mainCompetitors">Principaux Concurrents</Label>
               <Textarea id="mainCompetitors" {...register("mainCompetitors")} placeholder="Noms et liens..." />
            </div>
             <div className="space-y-2">
               <Label htmlFor="competitorStrengths">Leurs Forces/Faiblesses</Label>
               <Textarea id="competitorStrengths" {...register("competitorStrengths")} placeholder="Ils sont bons en X, mauvais en Y..." />
            </div>
             <div className="space-y-2">
               <Label htmlFor="differentiationStrategy">Stratégie de Différenciation</Label>
               <Textarea id="differentiationStrategy" {...register("differentiationStrategy")} placeholder="Comment allez-vous les battre ?" />
            </div>
          </CardContent>
        </Card>

        {/* 12. MATÉRIEL MARKETING */}
        <Card>
          <CardHeader>
            <CardTitle>12. Matériel Marketing</CardTitle>
            <CardDescription>Supports physiques et digitaux.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="space-y-2">
               <Label htmlFor="marketingMaterials">Matériel Requis</Label>
               <Textarea id="marketingMaterials" {...register("marketingMaterials")} placeholder="Cartes de visite, Flyers, Brochures, Signatures email..." />
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="space-y-2">
                 <Label htmlFor="printNeeds">Besoins Print</Label>
                 <Input id="printNeeds" {...register("printNeeds")} placeholder="Affiches, Packaging..." />
               </div>
               <div className="space-y-2">
                 <Label htmlFor="digitalNeeds">Besoins Digital</Label>
                 <Input id="digitalNeeds" {...register("digitalNeeds")} placeholder="Bannières, Templates réseaux sociaux..." />
               </div>
             </div>
          </CardContent>
        </Card>

        {/* 13. EXPÉRIENCE CLIENT & SERVICE */}
        <Card className="border-l-4 border-l-teal-500 shadow-xl">
           <CardHeader className="bg-gradient-to-r from-teal-50 to-transparent dark:from-teal-950/20">
             <div className="flex items-center gap-3">
               <div className="p-3 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-xl shadow-lg">
                 <Heart className="w-6 h-6 text-white" />
               </div>
               <div>
                  <CardTitle className="text-2xl font-bold text-teal-900 dark:text-teal-100">13. Expérience Client (CX)</CardTitle>
                  <CardDescription>Comment chouchoutez-vous vos clients ?</CardDescription>
               </div>
             </div>
           </CardHeader>
           <CardContent className="space-y-4 pt-6">
              <div className="space-y-2">
                <Label htmlFor="customerJourney">Le Parcours Client Idéal</Label>
                <Textarea id="customerJourney" {...register("customerJourney")} placeholder="De la découverte à l'achat, décrivez les étapes..." className="border-2 focus:border-teal-400 min-h-[80px]" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="customerServiceApproach">Approche Service Client</Label>
                <Textarea id="customerServiceApproach" {...register("customerServiceApproach")} placeholder="Réactif, Premium, Automatisé, Personnalisé ?" className="border-2 focus:border-teal-400 min-h-[60px]" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="space-y-2">
                  <Label htmlFor="returnPolicy">Politique de Retour</Label>
                  <Input id="returnPolicy" {...register("returnPolicy")} placeholder="30 jours, Satisfait ou remboursé..." className="border-2 focus:border-teal-400 h-11" />
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="deliveryTime">Délais de Livraison Moyens</Label>
                  <Input id="deliveryTime" {...register("deliveryTime")} placeholder="24h, 1 semaine..." className="border-2 focus:border-teal-400 h-11" />
                </div>
              </div>
           </CardContent>
        </Card>

        {/* 14. CONTENU & COMMUNICATION */}
         <Card className="border-l-4 border-l-pink-500 shadow-xl">
           <CardHeader className="bg-gradient-to-r from-pink-50 to-transparent dark:from-pink-950/20">
             <div className="flex items-center gap-3">
               <div className="p-3 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl shadow-lg">
                 <PenTool className="w-6 h-6 text-white" />
               </div>
               <div>
                  <CardTitle className="text-2xl font-bold text-pink-900 dark:text-pink-100">14. Contenu & Communication</CardTitle>
                  <CardDescription>Mots et images.</CardDescription>
               </div>
             </div>
           </CardHeader>
           <CardContent className="space-y-4 pt-6">
             <div className="space-y-2">
                <Label htmlFor="contentTopics">Sujets Principaux</Label>
                <Textarea id="contentTopics" {...register("contentTopics")} placeholder="De quoi allez-vous parler ? (Expertise, Lifestyle...)" className="border-2 focus:border-pink-400 min-h-[80px]" />
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                   <Label htmlFor="contentWriter">Qui rédige le contenu ?</Label>
                   <Input id="contentWriter" {...register("contentWriter")} placeholder="Nous, Vous (Client), Prestataire externe..." className="border-2 focus:border-pink-400 h-11" />
                </div>
                <div className="space-y-2">
                   <Label htmlFor="hasProfessionalPhotos">Photos Professionnelles ?</Label>
                   <Input id="hasProfessionalPhotos" {...register("hasProfessionalPhotos")} placeholder="Oui j'ai une banque d'images / Non il faut un shooting" className="border-2 focus:border-pink-400 h-11" />
                </div>
             </div>

             <div className="space-y-2">
                <Label htmlFor="languagePreferences">Langues du Site</Label>
                <Input id="languagePreferences" {...register("languagePreferences")} placeholder="Français, Anglais, Espagnol..." className="border-2 focus:border-pink-400 h-11" />
             </div>
             <div className="space-y-2">
                <Label htmlFor="translationNeeds">Besoins en Traduction</Label>
                <Textarea id="translationNeeds" {...register("translationNeeds")} placeholder="Avez-vous besoin d'un service de traduction ?" className="border-2 focus:border-pink-400 min-h-[60px]" />
             </div>
             <div className="space-y-2">
                <Label htmlFor="accessibilityNeeds">Accessibilité (RGAA)</Label>
                <Input id="accessibilityNeeds" {...register("accessibilityNeeds")} placeholder="Standards spécifiques à respecter ?" className="border-2 focus:border-pink-400 h-11" />
             </div>
           </CardContent>
         </Card>

        {/* 15. SEO & MARKETING DIGITAL */}
        <Card className="border-l-4 border-l-orange-500 shadow-xl">
           <CardHeader className="bg-gradient-to-r from-orange-50 to-transparent dark:from-orange-950/20">
             <div className="flex items-center gap-3">
               <div className="p-3 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl shadow-lg">
                 <Target className="w-6 h-6 text-white" />
               </div>
               <div>
                  <CardTitle className="text-2xl font-bold text-orange-900 dark:text-orange-100">15. SEO & Marketing Digital</CardTitle>
                  <CardDescription>Être visible.</CardDescription>
               </div>
             </div>
           </CardHeader>
           <CardContent className="space-y-4 pt-6">
              <div className="space-y-2">
                <Label htmlFor="seoKeywords">Mots-clés cibles</Label>
                <Textarea id="seoKeywords" {...register("seoKeywords")} placeholder="Sur quels mots voulez-vous apparaître dans Google ?" className="border-2 focus:border-orange-400 min-h-[80px]" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="googleMyBusiness">Fiche Google (Maps)</Label>
                <Input id="googleMyBusiness" {...register("googleMyBusiness")} placeholder="Avez-vous une adresse physique à référencer ?" className="border-2 focus:border-orange-400 h-11" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="advertisingBudget">Budget Publicitaire (Mensuel)</Label>
                <Input id="advertisingBudget" {...register("advertisingBudget")} placeholder="Pour Google Ads / Facebook Ads..." className="border-2 focus:border-orange-400 h-11" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emailMarketingNeeds">Email Marketing</Label>
                <Textarea id="emailMarketingNeeds" {...register("emailMarketingNeeds")} placeholder="Newsletter, Automatisations, Outil actuel (Mailchimp...)" className="border-2 focus:border-orange-400 min-h-[60px]" />
              </div>
           </CardContent>
        </Card>

        {/* NEW SECTION: INFRASTRUCTURE & TECHNIQUE */}
        <Card className="border-l-4 border-l-slate-600 shadow-xl">
           <CardHeader className="bg-gradient-to-r from-slate-100 to-transparent dark:from-slate-800/40">
             <div className="flex items-center gap-3">
               <div className="p-3 bg-gradient-to-br from-slate-600 to-slate-800 rounded-xl shadow-lg">
                 <Server className="w-6 h-6 text-white" />
               </div>
               <div>
                  <CardTitle className="text-2xl font-bold text-slate-900 dark:text-slate-100">16. Infrastructure & Technique</CardTitle>
                  <CardDescription>Les fondations techniques.</CardDescription>
               </div>
             </div>
           </CardHeader>
           <CardContent className="space-y-4 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="domainProvider">Fournisseur de Nom de Domaine</Label>
                  <Input id="domainProvider" {...register("domainProvider")} placeholder="OVH, GoDaddy, Gandi..." className="border-2 focus:border-slate-400 h-11" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hostingProvider">Hébergeur Actuel / Souhaité</Label>
                  <Input id="hostingProvider" {...register("hostingProvider")} placeholder="Vercel, AWS, Hostinger..." className="border-2 focus:border-slate-400 h-11" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="space-y-2">
                  <Label htmlFor="existingEmailProvider">Fournisseur Email Pro</Label>
                  <Input id="existingEmailProvider" {...register("existingEmailProvider")} placeholder="Google Workspace, Outlook, Webmail..." className="border-2 focus:border-slate-400 h-11" />
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="crmTool">Outil CRM</Label>
                  <Input id="crmTool" {...register("crmTool")} placeholder="HubSpot, Salesforce, Notion, Excel..." className="border-2 focus:border-slate-400 h-11" />
                </div>
              </div>
           </CardContent>
        </Card>

         {/* NEW SECTION: LÉGAL & CONFORMITÉ */}
        <Card className="border-l-4 border-l-red-500 shadow-xl">
           <CardHeader className="bg-gradient-to-r from-red-50 to-transparent dark:from-red-950/20">
             <div className="flex items-center gap-3">
               <div className="p-3 bg-gradient-to-br from-red-500 to-red-600 rounded-xl shadow-lg">
                 <Shield className="w-6 h-6 text-white" />
               </div>
               <div>
                  <CardTitle className="text-2xl font-bold text-red-900 dark:text-red-100">17. Légal & Conformité</CardTitle>
                  <CardDescription>Protection et règles.</CardDescription>
               </div>
             </div>
           </CardHeader>
           <CardContent className="space-y-4 pt-6">
              <div className="space-y-2">
                <Label htmlFor="gdprCompliance">Conformité RGPD / Cookies</Label>
                <Input id="gdprCompliance" {...register("gdprCompliance")} placeholder="Avez-vous une politique de confidentialité ?" className="border-2 focus:border-red-400 h-11" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="legalDisclaimer">Mentions Légales Spécifiques</Label>
                <Textarea id="legalDisclaimer" {...register("legalDisclaimer")} placeholder="Numéros d'agrément, certifications obligatoires à afficher..." className="border-2 focus:border-red-400 min-h-[60px]" />
              </div>
           </CardContent>
        </Card>

        {/* 18. ANALYSES & MÉTRIQUES */}
        <Card className="border-l-4 border-l-indigo-500 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-indigo-50 to-transparent dark:from-indigo-950/20">
             <div className="flex items-center gap-3">
               <div className="p-3 bg-gradient-to-br from-indigo-500 to-violet-500 rounded-xl shadow-lg">
                 <Rocket className="w-6 h-6 text-white" />
               </div>
               <div>
                  <CardTitle className="text-2xl font-bold text-indigo-900 dark:text-indigo-100">18. Analyses & Métriques</CardTitle>
                  <CardDescription>KPIs et Suivi.</CardDescription>
               </div>
             </div>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <div className="space-y-2">
              <Label htmlFor="successMetrics">Indicateurs de Succès (KPIs)</Label>
              <Textarea id="successMetrics" {...register("successMetrics")} placeholder="Chiffre d'affaires, Trafic, Leads..." className="border-2 focus:border-indigo-400 min-h-[80px]" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="analyticsTools">Outils Analytics Actuels</Label>
                <Input id="analyticsTools" {...register("analyticsTools")} placeholder="GA4, Hotjar..." className="border-2 focus:border-indigo-400 h-11" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reportingFrequency">Besoin de Reporting</Label>
                <Input id="reportingFrequency" {...register("reportingFrequency")} placeholder="Mensuel, Hebdomadaire..." className="border-2 focus:border-indigo-400 h-11" />
              </div>
            </div>
          </CardContent>
        </Card>

         {/* 19. INSPIRATION & RÉFÉRENCES */}
        <Card className="border-l-4 border-l-fuchsia-500 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-fuchsia-50 to-transparent dark:from-fuchsia-950/20">
             <div className="flex items-center gap-3">
               <div className="p-3 bg-gradient-to-br from-fuchsia-500 to-pink-500 rounded-xl shadow-lg">
                 <Star className="w-6 h-6 text-white" />
               </div>
               <div>
                  <CardTitle className="text-2xl font-bold text-fuchsia-900 dark:text-fuchsia-100">19. Inspiration & Références</CardTitle>
                  <CardDescription>Ce que vous aimez (et détestez).</CardDescription>
               </div>
             </div>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <div className="space-y-2">
               <Label htmlFor="brandsYouLove">3 Marques que vous adorez</Label>
               <Textarea id="brandsYouLove" {...register("brandsYouLove")} placeholder="Apple (pour la simplicité), Nike (pour l'énergie)..." className="border-2 focus:border-fuchsia-400 min-h-[80px]" />
            </div>
             <div className="space-y-2">
               <Label htmlFor="brandsYouDislike">3 Marques que vous n'aimez pas</Label>
               <Textarea id="brandsYouDislike" {...register("brandsYouDislike")} placeholder="Pourquoi ?" className="border-2 focus:border-fuchsia-400 min-h-[80px]" />
            </div>
          </CardContent>
        </Card>

         {/* 20. NOTES FINALES */}
         <Card className="border-l-4 border-l-gray-500 shadow-xl bg-gray-50 dark:bg-gray-800/50">
          <CardHeader>
             <div className="flex items-center gap-3">
               <div className="p-3 bg-gray-200 dark:bg-gray-700 rounded-xl shadow-inner">
                 <FileText className="w-6 h-6 text-gray-600 dark:text-gray-300" />
               </div>
               <div>
                  <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">20. Notes Finales</CardTitle>
                  <CardDescription>L'espace libre.</CardDescription>
               </div>
             </div>
          </CardHeader>
           <CardContent className="space-y-4 pt-6">
             <div className="space-y-2">
               <Label htmlFor="additionalRequirements">Autres exigences non mentionnées</Label>
               <Textarea id="additionalRequirements" {...register("additionalRequirements")} placeholder="Tout ce qu'on a oublié..." className="border-2 focus:border-gray-400 min-h-[100px]" />
             </div>
             <div className="space-y-2">
               <Label htmlFor="specialRequests">Demandes Spéciales</Label>
               <Textarea id="specialRequests" {...register("specialRequests")} placeholder="Accessibilité, Urgence..." className="border-2 focus:border-gray-400 min-h-[80px]" />
             </div>
           </CardContent>
         </Card>

        <CardFooter className="flex justify-end pt-6">
          <Button type="submit" size="lg" disabled={isSubmitting} className="w-full md:w-auto bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 shadow-lg text-lg py-6">
            <Rocket className="mr-2 h-5 w-5" />
            {isSubmitting ? "Génération en cours..." : "Soumettre & Télécharger le Dossier"}
          </Button>
        </CardFooter>
      </form>
      </div>
    </div>
  );
}
