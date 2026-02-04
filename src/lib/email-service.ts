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
        Le fichier Excel complet contenant TOUTES les 20 SECTIONS (Format SnowDev Audit) a été téléchargé sur l'ordinateur du client.
        
        ${data.sendToMe && data.userEmailForFile ? `
        ✅ Le client a également demandé à recevoir le fichier par email à : ${data.userEmailForFile}
        ` : ''}
        
        Merci de contacter le client pour récupérer le fichier Excel complet et valider la stratégie IT/Marketing.

        -- INFRASTRUCTURE RAPIDE --
        Domaine : ${data.domainProvider}
        Hébergement : ${data.hostingProvider}
        CMS préféré : ${data.cmsPreference}
      `,
    };

    // Send email to admin
    await emailjs.send(SERVICE_ID, TEMPLATE_ID, adminTemplateParams, PUBLIC_KEY);

    // 2. Send confirmation to user if requested
    if (data.sendToMe && data.userEmailForFile) {
      const userTemplateParams = {
        to_email: data.userEmailForFile,
        from_name: "SnowDev Tech Services",
        company_name: data.companyName,
        message: `
          Bonjour ${data.contactName},

          Merci d'avoir complété l'Audit d'Identité Visuelle & Digitale pour ${data.companyName} !

          📊 Votre dossier complet (Format Excel) a été généré avec succès.
          
          🚀 PROCHAINES ÉTAPES :
          1. Vérifiez que le fichier "Client_Identity_Form_${data.companyName}.xlsx" est bien dans vos téléchargements.
          2. Veuillez nous renvoyer ce fichier en réponse à cet email ou à : dimitritedom@gmail.com
          
          Nos experts vont analyser vos 20 sections (Tech, Design, Stratégie) et revenir vers vous avec un plan d'action concret.

          Cordialement,
          
          L'équipe SnowDev Tech Services
          dimitritedom@gmail.com
        `,
      };

      console.log("Sending Email to client:", userTemplateParams);
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
