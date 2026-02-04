import emailjs from "@emailjs/browser";

// NOTE: You need to replace these with your actual EmailJS Service ID, Template ID, and Public Key
// For now, these are placeholders.
const SERVICE_ID = "service_nspnbs4"; 
const TEMPLATE_ID = "template_lagfdco";
const PUBLIC_KEY = "maz6Ge-509Mrlt_IM";

export const sendSubmissionEmail = async (data: any) => {
  try {
    // 1. Send notification to admin (dimitritedom@gmail.com)
    const adminTemplateParams = {
      to_email: "dimitritedom@gmail.com",
      from_name: data.contactName,
      company_name: data.companyName,
      message: `
        Nouvelle soumission client de ${data.companyName} !

        -- 1. Contact --
        Nom : ${data.contactName}
        Email : ${data.contactEmail}
        Téléphone : ${data.phoneNumber}
        Site Web : ${data.companyWebsite}

        -- 2. Projet --
        Budget : ${data.projectBudget}
        Date de lancement : ${data.desiredLaunchDate}
        
        -- 3. Aperçu Rapide --
        Secteur : ${data.industry}
        Mission : ${data.missionStatement}
        Style Logo : ${data.logoStyle}
        Couleurs : ${data.primaryColor} / ${data.secondaryColor}

        -- NOTE IMPORTANTE --
        Le fichier Excel complet contenant TOUTES les 18 sections a été téléchargé sur l'ordinateur du client.
        
        ${data.sendToMe && data.userEmailForFile ? `
        ✅ Le client a également demandé à recevoir le fichier par email à : ${data.userEmailForFile}
        ` : ''}
        
        Merci de contacter le client pour récupérer le fichier Excel complet.
      `,
    };

    // 2. Send confirmation to user if requested
    if (data.sendToMe && data.userEmailForFile) {
      const userTemplateParams = {
        to_email: data.userEmailForFile,
        from_name: "Visual Identity Team",
        company_name: data.companyName,
        message: `
          Bonjour ${data.contactName},

          Merci d'avoir rempli notre formulaire d'identité visuelle pour ${data.companyName} !

          📊 Votre fichier Excel a été généré avec succès et téléchargé sur votre ordinateur.
          
          📧 Pour votre commodité, nous vous recommandons de nous envoyer ce fichier par email à : dimitritedom@gmail.com
          
          Nom du fichier : Client_Identity_Form_${data.companyName}.xlsx

          Notre équipe va analyser toutes vos réponses et vous contacter sous peu pour discuter de votre projet.

          À très bientôt !
          
          L'équipe Visual Identity
          dimitritedom@gmail.com
        `,
      };

      console.log("Mock Email envoyé au client:", userTemplateParams);
    }

    // Send email to admin
    await emailjs.send(SERVICE_ID, TEMPLATE_ID, adminTemplateParams, PUBLIC_KEY);
    
    // Send email to client if requested
    if (data.sendToMe && data.userEmailForFile) {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, userTemplateParams, PUBLIC_KEY);
    }

    console.log("Email Sent to dimitritedom@gmail.com:", adminTemplateParams);
    
    const confirmMsg = data.sendToMe && data.userEmailForFile 
      ? `✅ Notifications envoyées avec succès !\n\n- Admin: dimitritedom@gmail.com\n- Client: ${data.userEmailForFile}`
      : `✅ Notification envoyée avec succès à dimitritedom@gmail.com !`;
    
    alert(confirmMsg);
    return true;
  } catch (error) {
    console.error("Failed to send email:", error);
    return false;
  }
};
