import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Lang = "en" | "hi";

const STORAGE_KEY = "bharat-sahayak-lang";

/** Flat translation dictionary. Every user-visible string lives here. */
const dict = {
  "app.name": ["BHARAT SAHAYAK", "भारत सहायक"],
  "app.tagline": ["From Eligibility to Benefits", "पात्रता से लाभ तक"],
  "app.promise": [
    "Don't just find a scheme. Know what to do next.",
    "सिर्फ़ योजना ढूँढना काफ़ी नहीं। आगे क्या करना है, यह जानिए।",
  ],
  "app.disclaimer": [
    "Bharat Sahayak provides guidance based on available information. Official government portals and authorities remain the final source for eligibility and application decisions.",
    "भारत सहायक उपलब्ध जानकारी के आधार पर मार्गदर्शन देता है। पात्रता और आवेदन का अंतिम निर्णय आधिकारिक सरकारी पोर्टल और अधिकारी ही करते हैं।",
  ],
  "app.notGovernment": [
    "Bharat Sahayak is an independent assistance platform. It is not a government website and has no government affiliation.",
    "भारत सहायक एक स्वतंत्र सहायता मंच है। यह सरकारी वेबसाइट नहीं है और इसका सरकार से कोई संबंध नहीं है।",
  ],

  "nav.home": ["Home", "होम"],
  "nav.dashboard": ["Dashboard", "डैशबोर्ड"],
  "nav.schemes": ["Find Schemes", "योजनाएँ खोजें"],
  "nav.documents": ["Documents", "दस्तावेज़"],
  "nav.actionPlan": ["Action Plan", "कार्य योजना"],
  "nav.applications": ["Applications", "आवेदन"],
  "nav.assistant": ["AI Assistant", "एआई सहायक"],
  "nav.profile": ["Profile", "प्रोफ़ाइल"],
  "nav.admin": ["Manage Schemes", "योजना प्रबंधन"],
  "nav.menu": ["Menu", "मेन्यू"],

  "action.getStarted": ["Get Started", "शुरू करें"],
  "action.checkEligibility": ["Check My Eligibility", "मेरी पात्रता जाँचें"],
  "action.exploreSchemes": ["Explore Schemes", "योजनाएँ देखें"],
  "action.continue": ["Continue", "आगे बढ़ें"],
  "action.save": ["Save", "सहेजें"],
  "action.saving": ["Saving...", "सहेजा जा रहा है..."],
  "action.cancel": ["Cancel", "रद्द करें"],
  "action.login": ["Log in", "लॉग इन"],
  "action.logout": ["Log out", "लॉग आउट"],
  "action.signup": ["Create account", "खाता बनाएँ"],
  "action.viewDetails": ["View Details", "विवरण देखें"],
  "action.retry": ["Try again", "फिर कोशिश करें"],
  "action.send": ["Send", "भेजें"],
  "action.upload": ["Upload", "अपलोड करें"],
  "action.remove": ["Remove", "हटाएँ"],
  "action.markReady": ["Mark as ready", "तैयार बताएँ"],
  "action.markMissing": ["Mark as missing", "बाकी बताएँ"],
  "action.startTracking": ["Start my plan for this scheme", "इस योजना के लिए मेरी योजना बनाएँ"],
  "action.openPlan": ["Open action plan", "कार्य योजना खोलें"],
  "action.clear": ["Clear filters", "फ़िल्टर हटाएँ"],
  "action.edit": ["Edit", "बदलें"],

  "home.heroDescription": [
    "An AI-powered platform that helps citizens discover relevant government schemes, understand eligibility, prepare documents, and know what to do next.",
    "एक एआई-आधारित मंच जो नागरिकों को उपयुक्त सरकारी योजनाएँ खोजने, पात्रता समझने, दस्तावेज़ तैयार करने और आगे का कदम जानने में मदद करता है।",
  ],
  "home.journeyTitle": ["Your benefit journey", "आपकी लाभ यात्रा"],
  "home.howTitle": ["How Bharat Sahayak works", "भारत सहायक कैसे काम करता है"],
  "home.how1": ["Tell us about yourself", "अपने बारे में बताएँ"],
  "home.how2": ["Find relevant schemes", "उपयुक्त योजनाएँ खोजें"],
  "home.how3": ["Understand your eligibility", "अपनी पात्रता समझें"],
  "home.how4": ["Prepare your documents", "अपने दस्तावेज़ तैयार करें"],
  "home.how5": ["Follow your action plan", "अपनी कार्य योजना पर चलें"],
  "home.how6": ["Track your progress", "अपनी प्रगति देखें"],
  "home.importantTitle": ["Important", "महत्वपूर्ण"],
  "home.importantBody": [
    "Bharat Sahayak is an assistance platform. Official government portals and authorities remain the final source for scheme eligibility, application decisions, and benefit approval.",
    "भारत सहायक एक सहायता मंच है। योजना की पात्रता, आवेदन के निर्णय और लाभ की स्वीकृति का अंतिम स्रोत आधिकारिक सरकारी पोर्टल और अधिकारी ही हैं।",
  ],
  "home.trustTitle": ["What comes from where", "कौन सी जानकारी कहाँ से"],
  "home.schemeCount": ["verified schemes available today", "सत्यापित योजनाएँ आज उपलब्ध"],
  "home.bilingual": ["Works in English and Hindi", "अंग्रेज़ी और हिन्दी में उपलब्ध"],
  "home.ruleBased": [
    "Eligibility is checked by clear written rules, not by guesswork",
    "पात्रता स्पष्ट लिखित नियमों से जाँची जाती है, अंदाज़े से नहीं",
  ],

  "journey.discover": ["Discover", "खोजें"],
  "journey.verify": ["Verify", "जाँचें"],
  "journey.prepare": ["Prepare", "तैयारी"],
  "journey.apply": ["Apply", "आवेदन"],
  "journey.track": ["Track", "प्रगति"],

  "trust.ours": ["Bharat Sahayak information", "भारत सहायक की जानकारी"],
  "trust.oursItems": [
    "Personalised eligibility analysis · Document checklist · Action plan · User-managed tracking",
    "व्यक्तिगत पात्रता विश्लेषण · दस्तावेज़ सूची · कार्य योजना · स्वयं अपडेट किया जाने वाला ट्रैकर",
  ],
  "trust.official": ["Official government information", "आधिकारिक सरकारी जानकारी"],
  "trust.officialItems": [
    "Scheme rules · Official benefits · Application portal · Final eligibility decision · Application status",
    "योजना के नियम · आधिकारिक लाभ · आवेदन पोर्टल · अंतिम पात्रता निर्णय · आवेदन की स्थिति",
  ],

  "auth.title": ["Log in to Bharat Sahayak", "भारत सहायक में लॉग इन करें"],
  "auth.signupTitle": ["Create your free account", "अपना मुफ़्त खाता बनाएँ"],
  "auth.email": ["Email address", "ईमेल पता"],
  "auth.password": ["Password", "पासवर्ड"],
  "auth.fullName": ["Full name", "पूरा नाम"],
  "auth.forgot": ["Forgot password?", "पासवर्ड भूल गए?"],
  "auth.resetTitle": ["Reset your password", "पासवर्ड बदलें"],
  "auth.resetHelp": [
    "Enter your email and we will send you a reset link.",
    "अपना ईमेल भरें, हम आपको लिंक भेजेंगे।",
  ],
  "auth.resetSent": [
    "If an account exists for this email, a reset link has been sent.",
    "यदि इस ईमेल का खाता है तो रीसेट लिंक भेज दिया गया है।",
  ],
  "auth.newPassword": ["New password", "नया पासवर्ड"],
  "auth.passwordUpdated": ["Password updated. You can use it now.", "पासवर्ड बदल गया। अब इसका उपयोग करें।"],
  "auth.haveAccount": ["Already have an account?", "पहले से खाता है?"],
  "auth.noAccount": ["New to Bharat Sahayak?", "भारत सहायक पर नए हैं?"],
  "auth.confirmEmail": [
    "Account created. Please check your email to confirm your address, then log in.",
    "खाता बन गया। कृपया ईमेल में पुष्टि करें, फिर लॉग इन करें।",
  ],
  "auth.loggedOut": ["You have been logged out.", "आप लॉग आउट हो गए हैं।"],
  "auth.required": ["Please log in to continue.", "आगे बढ़ने के लिए लॉग इन करें।"],
  "auth.google": ["Continue with Google", "Google से जारी रखें"],
  "auth.or": ["or", "या"],

  "profile.title": ["Your citizen profile", "आपकी नागरिक प्रोफ़ाइल"],
  "profile.help": [
    "This information is used only to match schemes and check the written eligibility conditions.",
    "यह जानकारी केवल योजनाएँ मिलाने और लिखित पात्रता शर्तें जाँचने के लिए उपयोग होती है।",
  ],
  "profile.fullName": ["Full name", "पूरा नाम"],
  "profile.age": ["Age", "उम्र"],
  "profile.state": ["State", "राज्य"],
  "profile.district": ["District", "ज़िला"],
  "profile.occupation": ["Occupation", "व्यवसाय"],
  "profile.education": ["Education", "शिक्षा"],
  "profile.income": ["Annual family income (₹)", "वार्षिक पारिवारिक आय (₹)"],
  "profile.gender": ["Gender", "लिंग"],
  "profile.areaType": ["Rural or urban", "ग्रामीण या शहरी"],
  "profile.language": ["Preferred language", "पसंदीदा भाषा"],
  "profile.benefitCategory": ["Benefit category you need most", "आपको सबसे ज़्यादा किस श्रेणी की ज़रूरत है"],
  "profile.saved": ["Your profile has been saved.", "आपकी प्रोफ़ाइल सहेज दी गई है।"],
  "profile.account": ["Account", "खाता"],
  "profile.select": ["Select", "चुनें"],
  "profile.incomplete": [
    "Complete your profile to see personalised matches.",
    "व्यक्तिगत सुझाव देखने के लिए प्रोफ़ाइल पूरी करें।",
  ],
  "profile.completeNow": ["Complete profile", "प्रोफ़ाइल पूरी करें"],

  "validation.required": ["This field is required.", "यह जानकारी ज़रूरी है।"],
  "validation.age": ["Enter an age between 1 and 120.", "1 से 120 के बीच उम्र भरें।"],
  "validation.income": ["Enter a valid income amount (0 or more).", "सही आय राशि भरें (0 या अधिक)।"],
  "validation.email": ["Enter a valid email address.", "सही ईमेल पता भरें।"],
  "validation.password": ["Password must be at least 8 characters.", "पासवर्ड कम से कम 8 अक्षर का हो।"],
  "validation.name": ["Enter your full name.", "अपना पूरा नाम भरें।"],

  "dashboard.greetingMorning": ["Good morning", "सुप्रभात"],
  "dashboard.greetingAfternoon": ["Good afternoon", "नमस्कार"],
  "dashboard.greetingEvening": ["Good evening", "शुभ संध्या"],
  "dashboard.matches": ["Potential Matches", "संभावित मेल"],
  "dashboard.matchesHelp": ["Schemes matching your profile", "आपकी प्रोफ़ाइल से मेल खाती योजनाएँ"],
  "dashboard.eligible": ["Potentially Eligible", "संभावित रूप से पात्र"],
  "dashboard.eligibleHelp": [
    "Written conditions appear satisfied",
    "लिखित शर्तें पूरी दिखती हैं",
  ],
  "dashboard.documentsReady": ["Documents Ready", "तैयार दस्तावेज़"],
  "dashboard.progress": ["Application Progress", "आवेदन प्रगति"],
  "dashboard.journey": ["Your Benefit Journey", "आपकी लाभ यात्रा"],
  "dashboard.nextAction": ["Next Action", "अगला कदम"],
  "dashboard.allDone": [
    "You are up to date. Explore more schemes when you are ready.",
    "आप अपडेट हैं। जब चाहें और योजनाएँ देखें।",
  ],
  "dashboard.startHere": [
    "Start by finding schemes that match your profile.",
    "अपनी प्रोफ़ाइल से मेल खाती योजनाएँ खोजकर शुरुआत करें।",
  ],
  "dashboard.reminders": ["Bharat Sahayak Reminders", "भारत सहायक रिमाइंडर"],
  "dashboard.remindersNote": [
    "These are reminders from Bharat Sahayak, not official government communication.",
    "ये भारत सहायक के रिमाइंडर हैं, सरकारी सूचना नहीं।",
  ],

  "schemes.title": ["Find Schemes", "योजनाएँ खोजें"],
  "schemes.searchPlaceholder": [
    "Try: scholarship for students, support for farmers",
    "जैसे: छात्रों के लिए छात्रवृत्ति, किसानों के लिए मदद",
  ],
  "schemes.filters": ["Filters", "फ़िल्टर"],
  "schemes.category": ["Category", "श्रेणी"],
  "schemes.all": ["All", "सभी"],
  "schemes.sort": ["Sort by", "क्रम"],
  "schemes.sortMatch": ["Best profile match", "सबसे अच्छा मेल"],
  "schemes.sortName": ["Name (A–Z)", "नाम (अ–ज़)"],
  "schemes.sortVerified": ["Recently verified", "हाल में सत्यापित"],
  "schemes.useProfile": ["Use my profile", "मेरी प्रोफ़ाइल से"],
  "schemes.count": ["schemes found", "योजनाएँ मिलीं"],
  "schemes.profileMatch": ["Profile Match", "प्रोफ़ाइल मेल"],
  "schemes.matchNote": [
    "Profile Match is generated by Bharat Sahayak based on the information provided. It is not an official government eligibility score.",
    "प्रोफ़ाइल मेल भारत सहायक द्वारा दी गई जानकारी से बनाया गया है। यह कोई आधिकारिक सरकारी पात्रता अंक नहीं है।",
  ],
  "schemes.whyMatch": ["Why this scheme matches you", "यह योजना आपसे क्यों मेल खाती है"],
  "schemes.requiredDocs": ["Required documents", "ज़रूरी दस्तावेज़"],
  "schemes.benefits": ["Benefits", "लाभ"],
  "schemes.about": ["About the scheme", "योजना के बारे में"],
  "schemes.eligibility": ["Eligibility conditions", "पात्रता शर्तें"],
  "schemes.yourEligibility": ["Your eligibility", "आपकी पात्रता"],
  "schemes.applicationProcess": ["Application process", "आवेदन प्रक्रिया"],
  "schemes.ministry": ["Ministry / Department", "मंत्रालय / विभाग"],
  "schemes.lastVerified": ["Last verified", "अंतिम सत्यापन"],
  "schemes.officialWebsite": ["Official government website", "आधिकारिक सरकारी वेबसाइट"],
  "schemes.applyOfficial": ["Apply on Official Website", "आधिकारिक वेबसाइट पर आवेदन करें"],
  "schemes.viewSource": ["View Official Source", "आधिकारिक स्रोत देखें"],
  "schemes.noApplyUrl": [
    "Official application link currently unavailable. Visit the official source for application instructions.",
    "आधिकारिक आवेदन लिंक अभी उपलब्ध नहीं है। आवेदन के निर्देशों के लिए आधिकारिक स्रोत देखें।",
  ],
  "schemes.leaveNotice": [
    "You're leaving Bharat Sahayak and opening the official government website. Application decisions and final eligibility are determined by the relevant government authority.",
    "आप भारत सहायक से बाहर जाकर आधिकारिक सरकारी वेबसाइट खोल रहे हैं। आवेदन के निर्णय और अंतिम पात्रता संबंधित सरकारी अधिकारी तय करते हैं।",
  ],
  "schemes.leaveTitle": ["Opening the official website", "आधिकारिक वेबसाइट खोली जा रही है"],
  "schemes.leaveConfirm": ["Open official website", "आधिकारिक वेबसाइट खोलें"],
  "schemes.notFound": ["This scheme could not be found.", "यह योजना नहीं मिली।"],
  "schemes.finalAuthority": [
    "The official government portal is the final authority for this scheme.",
    "इस योजना के लिए आधिकारिक सरकारी पोर्टल ही अंतिम प्राधिकारी है।",
  ],

  "eligibility.potential": ["Potentially Eligible", "संभावित रूप से पात्र"],
  "eligibility.notEligible": [
    "Not eligible based on available conditions",
    "उपलब्ध शर्तों के आधार पर पात्र नहीं",
  ],
  "eligibility.needsInfo": ["More information required", "अधिक जानकारी आवश्यक"],
  "eligibility.needsProfile": [
    "Complete your profile to check the written conditions.",
    "लिखित शर्तें जाँचने के लिए प्रोफ़ाइल पूरी करें।",
  ],
  "eligibility.explainPotential": [
    "Based on the available eligibility conditions, you appear to meet the listed requirements. Some conditions can only be confirmed by the government authority.",
    "उपलब्ध पात्रता शर्तों के आधार पर आप सूचीबद्ध शर्तें पूरी करते दिखते हैं। कुछ शर्तों की पुष्टि केवल सरकारी अधिकारी कर सकते हैं।",
  ],
  "eligibility.explainNot": [
    "One or more written conditions do not appear to be satisfied. You can still read the scheme rules on the official portal.",
    "एक या अधिक लिखित शर्तें पूरी नहीं दिखतीं। आप आधिकारिक पोर्टल पर योजना के नियम पढ़ सकते हैं।",
  ],
  "eligibility.explainNeedsInfo": [
    "Some details are missing from your profile, so those conditions could not be checked.",
    "आपकी प्रोफ़ाइल में कुछ जानकारी नहीं है, इसलिए वे शर्तें जाँची नहीं जा सकीं।",
  ],
  "eligibility.needsVerification": ["Needs verification", "सत्यापन आवश्यक"],
  "eligibility.checking": ["Checking your eligibility...", "आपकी पात्रता जाँची जा रही है..."],

  "documents.title": ["Document readiness", "दस्तावेज़ की तैयारी"],
  "documents.subtitle": [
    "Mark each document as ready or missing. You may also keep a private copy here.",
    "हर दस्तावेज़ को तैयार या बाकी बताएँ। आप यहाँ निजी प्रति भी रख सकते हैं।",
  ],
  "documents.ready": ["Ready", "तैयार"],
  "documents.missing": ["Missing", "बाकी"],
  "documents.readyCount": ["Documents Ready", "दस्तावेज़ तैयार"],
  "documents.instructions": ["Instructions", "निर्देश"],
  "documents.uploaded": ["Saved copy", "सुरक्षित प्रति"],
  "documents.uploading": ["Uploading...", "अपलोड हो रहा है..."],
  "documents.uploadHint": [
    "PDF, JPG or PNG up to 5 MB. Files are private to your account.",
    "पीडीएफ, जेपीजी या पीएनजी, 5 एमबी तक। फ़ाइलें केवल आपके खाते में सुरक्षित रहती हैं।",
  ],
  "documents.notVerified": [
    "Bharat Sahayak does not verify document authenticity. Uploads are only a private copy to help you stay organised.",
    "भारत सहायक दस्तावेज़ की सत्यता की जाँच नहीं करता। अपलोड केवल आपकी सुविधा के लिए निजी प्रति है।",
  ],
  "documents.invalidType": ["Only PDF, JPG and PNG files are allowed.", "केवल पीडीएफ, जेपीजी और पीएनजी फ़ाइलें मान्य हैं।"],
  "documents.tooLarge": ["File is larger than 5 MB.", "फ़ाइल 5 एमबी से बड़ी है।"],
  "documents.uploadFailed": ["Upload failed. Please try again.", "अपलोड नहीं हो सका। फिर कोशिश करें।"],
  "documents.uploadDone": ["File saved privately.", "फ़ाइल निजी रूप से सहेज दी गई।"],
  "documents.download": ["Open my copy", "मेरी प्रति खोलें"],

  "plan.title": ["Your Action Plan", "आपकी कार्य योजना"],
  "plan.progress": ["Progress", "प्रगति"],
  "plan.nextAction": ["Next Action", "अगला कदम"],
  "plan.created": ["Your action plan is ready.", "आपकी कार्य योजना तैयार है।"],
  "plan.selectScheme": ["Choose a scheme", "योजना चुनें"],
  "plan.taskDone": ["Step completed", "कदम पूरा"],
  "plan.openLink": ["Open", "खोलें"],
  "plan.step.eligibility": ["Check eligibility", "पात्रता जाँचें"],
  "plan.step.reviewInstructions": ["Review application instructions", "आवेदन के निर्देश पढ़ें"],
  "plan.step.openPortal": ["Open official application website", "आधिकारिक आवेदन वेबसाइट खोलें"],
  "plan.step.completeApplication": [
    "Complete the application on the official website",
    "आधिकारिक वेबसाइट पर आवेदन पूरा करें",
  ],
  "plan.step.updateStatus": [
    "Return to Bharat Sahayak and update your application status",
    "भारत सहायक पर लौटकर आवेदन की स्थिति अपडेट करें",
  ],
  "plan.step.prepareDoc": ["Prepare", "तैयार करें"],

  "apps.title": ["User-managed Application Tracker", "स्वयं अपडेट किया जाने वाला आवेदन ट्रैकर"],
  "apps.note": [
    "You update these stages yourself. Bharat Sahayak does not read live government application status, and does not submit applications for you.",
    "इन चरणों को आप स्वयं अपडेट करते हैं। भारत सहायक सरकारी आवेदन की लाइव स्थिति नहीं देखता और आपकी ओर से आवेदन जमा नहीं करता।",
  ],
  "apps.stage": ["Stage", "चरण"],
  "apps.updated": ["Status updated.", "स्थिति अपडेट हो गई।"],
  "apps.stage.discovered": ["Scheme Discovered", "योजना मिली"],
  "apps.stage.eligibility_checked": ["Eligibility Checked", "पात्रता जाँची"],
  "apps.stage.documents_prepared": ["Documents Prepared", "दस्तावेज़ तैयार"],
  "apps.stage.preparing": ["Application Preparation", "आवेदन की तैयारी"],
  "apps.stage.submitted": ["Submitted", "जमा किया"],
  "apps.stage.verification": ["Under Verification", "सत्यापन में"],
  "apps.stage.decision": ["Decision Received", "निर्णय मिला"],

  "ai.title": ["AI Assistant", "एआई सहायक"],
  "ai.subtitle": [
    "Ask about your schemes, eligibility, documents and next steps.",
    "अपनी योजनाओं, पात्रता, दस्तावेज़ों और अगले कदम के बारे में पूछें।",
  ],
  "ai.placeholder": ["Type your question...", "अपना सवाल लिखें..."],
  "ai.context": ["Answering about", "जिस विषय पर उत्तर", ],
  "ai.suggested": ["Suggested questions", "सुझाए गए सवाल"],
  "ai.q1": ["Am I eligible?", "क्या मैं पात्र हूँ?"],
  "ai.q2": ["What documents do I need?", "मुझे कौन से दस्तावेज़ चाहिए?"],
  "ai.q3": ["What should I do next?", "मुझे अब क्या करना है?"],
  "ai.q4": ["Explain this scheme simply", "यह योजना आसान भाषा में समझाएँ"],
  "ai.q5": ["Where do I apply?", "मैं कहाँ आवेदन करूँ?"],
  "ai.thinking": ["Thinking...", "सोच रहा है..."],
  "ai.unavailable": [
    "AI assistance is temporarily unavailable. You can still check eligibility, view scheme details, and follow your action plan.",
    "एआई सहायता अभी उपलब्ध नहीं है। आप पात्रता जाँच, योजना विवरण और कार्य योजना का उपयोग जारी रख सकते हैं।",
  ],
  "ai.empty": [
    "Ask your first question, or pick one of the suggestions below.",
    "अपना पहला सवाल पूछें, या नीचे दिए सुझावों में से चुनें।",
  ],
  "ai.sources": ["Sources used", "उपयोग किए गए स्रोत"],
  "ai.safety": [
    "The assistant answers only from the verified scheme information stored in Bharat Sahayak. It cannot approve applications or confirm official eligibility.",
    "सहायक केवल भारत सहायक में सुरक्षित सत्यापित योजना जानकारी से उत्तर देता है। यह आवेदन स्वीकृत नहीं कर सकता और आधिकारिक पात्रता की पुष्टि नहीं कर सकता।",
  ],

  "empty.schemes": [
    "No matching schemes found. Try changing your search or updating your profile.",
    "कोई मेल खाती योजना नहीं मिली। खोज बदलें या प्रोफ़ाइल अपडेट करें।",
  ],
  "empty.documents": ["No documents have been added yet.", "अभी कोई दस्तावेज़ नहीं जोड़ा गया।"],
  "empty.applications": [
    "You haven't started tracking an application yet.",
    "आपने अभी कोई आवेदन ट्रैक करना शुरू नहीं किया।",
  ],
  "empty.notifications": ["You're all caught up.", "सब कुछ अपडेट है।"],
  "empty.plan": [
    "No action plan yet. Open a scheme and start your plan.",
    "अभी कोई कार्य योजना नहीं। कोई योजना खोलकर शुरू करें।",
  ],

  "error.generic": ["Something went wrong. Please try again.", "कुछ गड़बड़ हुई। कृपया फिर कोशिश करें।"],
  "error.load": [
    "We could not load this information right now.",
    "हम अभी यह जानकारी नहीं ला सके।",
  ],
  "error.loading": ["Loading...", "लोड हो रहा है..."],

  "admin.title": ["Scheme data management", "योजना डेटा प्रबंधन"],
  "admin.help": [
    "Admins can update scheme text, official links and verification dates.",
    "व्यवस्थापक योजना का विवरण, आधिकारिक लिंक और सत्यापन तिथि बदल सकते हैं।",
  ],
  "admin.noAccess": [
    "This area is only for administrators.",
    "यह भाग केवल व्यवस्थापकों के लिए है।",
  ],
  "admin.active": ["Active", "सक्रिय"],
  "admin.inactive": ["Inactive", "निष्क्रिय"],
  "admin.updated": ["Scheme updated.", "योजना अपडेट हो गई।"],

  "category.education": ["Education", "शिक्षा"],
  "category.employment": ["Employment", "रोज़गार"],
  "category.agriculture": ["Agriculture", "कृषि"],
  "category.health": ["Health", "स्वास्थ्य"],
  "category.women-child": ["Women & Child", "महिला एवं बाल"],
  "category.housing": ["Housing", "आवास"],
  "category.social-support": ["Financial / Social Support", "आर्थिक / सामाजिक सहायता"],

  "occupation.student": ["Student", "छात्र"],
  "occupation.farmer": ["Farmer", "किसान"],
  "occupation.daily-wage-worker": ["Daily wage worker", "दिहाड़ी मज़दूर"],
  "occupation.self-employed": ["Self-employed", "स्वरोज़गार"],
  "occupation.street-vendor": ["Street vendor", "रेहड़ी-पटरी विक्रेता"],
  "occupation.salaried": ["Salaried employee", "नौकरीपेशा"],
  "occupation.homemaker": ["Homemaker", "गृहिणी"],
  "occupation.unemployed": ["Not working right now", "अभी काम नहीं कर रहे"],
  "occupation.senior-citizen": ["Senior citizen", "वरिष्ठ नागरिक"],
  "occupation.other": ["Other", "अन्य"],

  "education.no-formal": ["No formal education", "औपचारिक शिक्षा नहीं"],
  "education.primary": ["Primary school", "प्राथमिक"],
  "education.class-10": ["Class 10", "कक्षा 10"],
  "education.class-12": ["Class 12", "कक्षा 12"],
  "education.diploma": ["Diploma / ITI", "डिप्लोमा / आईटीआई"],
  "education.undergraduate": ["Undergraduate", "स्नातक"],
  "education.postgraduate": ["Postgraduate", "स्नातकोत्तर"],

  "gender.female": ["Female", "महिला"],
  "gender.male": ["Male", "पुरुष"],
  "gender.other": ["Other", "अन्य"],

  "area.rural": ["Rural", "ग्रामीण"],
  "area.urban": ["Urban", "शहरी"],

  "lang.en": ["English", "English"],
  "lang.hi": ["हिन्दी", "हिन्दी"],
} as const satisfies Record<string, readonly [string, string]>;

export type TKey = keyof typeof dict;

type I18nValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: TKey) => string;
  /** Picks the field for the current language from a bilingual database row. */
  pick: <T>(row: Record<string, unknown>, base: string) => T;
};

const I18nContext = createContext<I18nValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "hi" || stored === "en") setLangState(stored);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage may be unavailable; language still applies for this session */
    }
  }, []);

  const value = useMemo<I18nValue>(() => {
    const index = lang === "hi" ? 1 : 0;
    return {
      lang,
      setLang,
      t: (key) => dict[key][index],
      pick: <T,>(row: Record<string, unknown>, base: string) =>
        (row[`${base}_${lang}`] ?? row[`${base}_en`]) as T,
    };
  }, [lang, setLang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside LanguageProvider");
  return ctx;
}

/** Formats a rupee amount in the Indian numbering system. */
export function formatRupees(value: number | null | undefined, lang: Lang) {
  if (value === null || value === undefined) return "—";
  return new Intl.NumberFormat(lang === "hi" ? "hi-IN" : "en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatDate(value: string | null | undefined, lang: Lang) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat(lang === "hi" ? "hi-IN" : "en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}
