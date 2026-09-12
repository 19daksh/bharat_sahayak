# Sahayak Citizen

Build a complete, production-quality MVP web application called:

BHARAT SAHAYAK

From Eligibility to Benefits

This is a real working application, NOT a static UI, design prototype, mockup, or frontend-only project.

The application should help citizens discover relevant government schemes, understand their eligibility, prepare required documents, create a personalized action plan, get AI assistance, and track their application progress.

The website must be simple enough for a person with limited technical knowledge to understand and use.

1. MAIN PRODUCT IDEA

Bharat Sahayak should guide a citizen through:

DISCOVER → VERIFY → PREPARE → APPLY → TRACK

The core message is:

"Don't just find a scheme. Know what to do next."

The website should feel like a trustworthy digital public-service platform, not a generic AI chatbot.

2. VERY IMPORTANT DEVELOPMENT RULE

Do NOT create only the frontend.

Everything shown in the interface should actually work.

Implement:

Functional navigation

Functional forms

Functional search

Functional scheme matching

Functional eligibility checking

Functional document checklist

Functional action plan

Functional application tracker

Functional AI assistant

Functional English/Hindi switching

Functional authentication

Functional database

Functional document upload where implemented

Proper loading states

Proper error handling

Form validation

Empty states

Responsive design

Secure API handling

Do not leave buttons that do nothing.

Do not create fake functionality just to make the interface look complete.

If a feature cannot be implemented safely, clearly label it as a prototype/future feature rather than pretending it works.

3. TECHNOLOGY STACK

Use a modern, maintainable stack.

Frontend

React

TypeScript

Tailwind CSS

shadcn/ui or similarly accessible component library

Backend

Use the backend/database infrastructure supported by Lovable.

Prefer:

Supabase

Supabase PostgreSQL

Supabase Authentication

Supabase Storage

Server-side/Edge Functions for sensitive API operations

Do NOT expose API keys in frontend code.

AI

Use a server-side AI API integration.

Structure the application so that the AI provider can be configured using environment variables.

Prefer Gemini or OpenAI, but do not hard-code secrets.

Deployment

Make the project deployment-ready.

4. DESIGN REQUIREMENTS

The website must be:

Simple

Clean

Friendly

Accessible

Professional

Modern

Trustworthy

Mobile responsive

Easy for non-technical citizens

Do NOT make it overly futuristic.

Do NOT use excessive glassmorphism.

Do NOT make the interface dark and complicated.

Use a clean light interface with good contrast, large readable text, clear cards, clear buttons, and generous spacing.

Use subtle Indian/Bharat-inspired visual elements without making the website look decorative or political.

The design should feel similar to a modern public-service + fintech + healthcare interface: trustworthy and easy to understand.

Use icons carefully.

Avoid unnecessary animations.

Use small, smooth animations only when they improve usability.

5. LANGUAGE SUPPORT

The entire application must support:

English | हिन्दी

Place the language selector clearly in the header.

Create a proper translation system rather than manually changing random text.

All important UI text should have translations:

Navigation

Buttons

Forms

Scheme information

Eligibility results

Documents

Action plans

AI assistant interface

Notifications

Errors

Empty states

The user's selected language should persist.

If the user selects Hindi, the AI assistant should also respond in Hindi when appropriate.

Use simple Hindi, not highly formal or complicated Hindi.

6. WEBSITE NAVIGATION

Create the following navigation:

Home

Dashboard

Find Schemes

Documents

Action Plan

Applications

AI Assistant

Profile

Header:

BHARAT SAHAYAK

Right side:

English | हिन्दी

User profile/login menu.

Do NOT add a "Try Demo" button anywhere.

Instead use:

Get Started

or

Check My Eligibility

as the primary CTA.

7. LANDING PAGE

Create a professional landing page.

Hero:

BHARAT SAHAYAK

From Eligibility to Benefits

Description:

"An AI-powered platform that helps citizens discover relevant government schemes, understand eligibility, prepare documents, and know what to do next."

Primary button:

Check My Eligibility

Secondary button:

Explore Schemes

Show the journey:

DISCOVER → VERIFY → PREPARE → APPLY → TRACK

Show:

Don't just find a scheme. Know what to do next.

8. USER REGISTRATION / LOGIN

Implement proper authentication using Supabase Auth.

Allow:

Email/password registration

Login

Logout

Password reset

Keep authentication simple.

After registration, ask the user to create their citizen profile.

Do not request unnecessary sensitive information.

9. CITIZEN PROFILE

Create a simple profile form.

Fields:

Full Name

Age

State

District

Occupation

Education

Annual Family Income

Gender

Rural/Urban

Preferred Language

Benefit Category

Use dropdowns wherever possible.

Validate:

Age must be valid

Income must be a valid number

Required fields cannot be empty

State must be selected from a proper list

Language must be selected

Allow users to edit their profile later.

Save profile information in the database.

10. DASHBOARD

After login, show a personalized dashboard.

Example:

"Good morning, Rahul 👋"

Show:

Potential Matches

Number of schemes matching the profile.

Potentially Eligible

Number of schemes where structured eligibility conditions appear satisfied.

Documents Ready

Example: 3/4

Application Progress

Example: 40%

Then show:

Your Benefit Journey

DISCOVER ✓
VERIFY ✓
PREPARE ●
APPLY ○
TRACK ○

Then show:

Next Action

"Complete your domicile certificate."

Button:

Continue

The dashboard must use real user data from the database.

Do not hard-code the dashboard statistics.

11. FIND SCHEMES

Create a functional scheme discovery page.

Users should be able to:

Search schemes

Filter schemes

Sort schemes

Open scheme details

Filters:

Category

State

Age

Income

Occupation

Education

Gender where applicable

Show scheme cards containing:

Scheme name

Category

Short description

Benefits

Profile Match

Eligibility status

Required documents

View Details

Do not call a profile matching score an official government score.

Use labels such as:

Profile Match

or

Potential Match

Add a small explanation:

"Profile Match is generated by Bharat Sahayak based on the information provided. It is not an official government eligibility score."

12. GOVERNMENT SCHEME DATABASE

Create a structured scheme database.

Each scheme should contain:

ID

Name

Short description

Detailed description

Category

Ministry/department

Benefits

Eligibility conditions

Age requirements

Income requirements

State requirements

Occupation requirements

Education requirements

Gender requirements if applicable

Rural/urban requirements if applicable

Other conditions

Required documents

Application process

Official source URL

Official application URL

Last verified date

Scheme status

IMPORTANT:

Do not invent government scheme information.

Use only verified information from official government sources.

Initially support a curated set of real schemes rather than pretending to contain every Indian government scheme.

Structure the database so additional schemes can easily be added later.

13. SCHEME DETAILS PAGE

Each scheme should have:

About the Scheme

Simple explanation.

Benefits

Clearly explain what the citizen may receive.

Eligibility

Show the actual conditions.

Your Eligibility

Compare the user's profile with the structured conditions.

Example:

✓ Age requirement satisfied

✓ Income requirement satisfied

✓ State requirement satisfied

✗ Domicile requirement needs verification

Explain every result in simple language.

Required Documents

Show all required documents.

Application Process

Give clear numbered steps.

Official Source

Provide the official government source.

Official Application

Provide the official application portal.

Make it clear that the official government portal is the final authority.

14. ELIGIBILITY ENGINE

This is one of the most important technical features.

Do NOT use an LLM to make the final eligibility decision.

Create a deterministic rule-based eligibility engine.

It should evaluate structured conditions such as:

Minimum age

Maximum age

Income limit

State

Occupation

Education

Gender

Rural/Urban

Other structured conditions

The engine should return:

Eligible based on available conditions

Not eligible based on available conditions

Potentially eligible / more information required

For every result, provide reasons.

Example:

Input:

Age = 20
State = Uttar Pradesh
Occupation = Student
Income = ₹2,00,000

Output:

✓ Age condition satisfied
✓ Income condition satisfied
✓ Occupation condition satisfied
✓ State condition satisfied

Result:

Potentially Eligible

IMPORTANT:

Use "Potentially Eligible" where the system cannot verify all real-world conditions.

Never claim:

"100% eligible"

The official government authority remains the final decision-maker.

15. SCHEME MATCHING

Create a transparent matching algorithm.

Use structured profile attributes to rank potentially relevant schemes.

For example:

Category match

State match

Occupation match

Education match

Age compatibility

Income compatibility

Calculate a system-generated profile match score only for ranking.

Do not present it as an official government score.

Show:

"Why this scheme matches you"

with 2–5 clear reasons.

16. DOCUMENT READINESS

Create a dedicated Documents page.

For the selected scheme show:

Required Documents

Example:

✓ Identity Proof — Ready

✓ Income Certificate — Ready

✓ Bank Account Proof — Ready

✗ Domicile Certificate — Missing

Show:

3 / 4 Documents Ready

Highlight missing documents.

For each document allow:

Mark as ready

Mark as missing

Upload document if supported

View instructions

IMPORTANT:

Do not claim that the system verifies document authenticity unless a real verification service is integrated.

If AI/OCR extracts information from a document, say:

"Information extracted from document."

not:

"Document verified."

17. DOCUMENT UPLOAD

Implement secure document upload using Supabase Storage if supported.

Allow common formats such as:

PDF

JPG

JPEG

PNG

Set reasonable file-size limits.

Validate file types.

Do not expose uploaded files publicly.

Do not permanently retain unnecessary documents.

Show upload progress.

Handle failed uploads gracefully.

If OCR/document AI is implemented:

Document
↓
OCR
↓
Extract information
↓
Display extracted information
↓
Allow user confirmation

Never automatically treat extracted information as officially verified.

18. PERSONALIZED ACTION PLAN

This is the main differentiating feature.

After the user selects a relevant scheme, automatically create an action plan based on:

Eligibility result

Required documents

Missing documents

Application steps

Example:

Your Action Plan

✓ 1. Prepare Identity Proof

✓ 2. Prepare Income Certificate

✓ 3. Prepare Bank Account Proof

● 4. Complete Domicile Certificate

○ 5. Open Official Application Portal

○ 6. Submit Application

○ 7. Track Application

Show:

Progress: 3/7

and:

Next Action

Complete your Domicile Certificate

Allow the user to mark tasks complete.

Save action-plan progress in the database.

19. APPLICATION TRACKER

Create a working user-managed application tracker.

Stages:

Scheme Discovered

Eligibility Checked

Documents Prepared

Application Preparation

Submitted

Verification

Decision

Allow the user to update their status.

Example:

Application Preparation ●

Submitted ○

IMPORTANT:

Unless an official government API is actually integrated, do NOT claim that this is real-time government application status.

Clearly label it:

User-managed Application Tracker

20. ADVANCED AI ASSISTANT

Create a powerful context-aware AI assistant.

This should NOT behave like a generic ChatGPT clone.

The assistant should understand the current user's:

Profile

Selected scheme

Eligibility result

Required documents

Missing documents

Action plan

Application stage

The AI should be able to answer questions such as:

"Am I eligible?"

"What documents am I missing?"

"What should I do next?"

"Explain this scheme simply."

"How do I apply?"

"Explain this in Hindi."

"What is the benefit?"

"Why am I not eligible?"

"Which scheme is better for my situation?"

The assistant should use structured scheme data and verified source information as context.

21. RAG FOR AI ASSISTANT

Implement Retrieval-Augmented Generation where appropriate.

The AI flow should be:

User question
↓
Identify relevant scheme/user context
↓
Retrieve relevant verified scheme information
↓
Send relevant context to AI
↓
Generate answer
↓
Show source information where possible

Do not allow the AI to freely invent government scheme information.

If information is not available:

"I couldn't verify that information from the available sources. Please check the official government portal."

The AI must not fabricate:

Eligibility requirements

Benefits

Application links

Deadlines

Government rules

Government decisions

22. AI SAFETY

The AI assistant must clearly communicate uncertainty.

Never say:

"You are officially eligible."

Instead:

"Based on the available eligibility conditions, you appear to meet the listed requirements."

Never say:

"Your application has been approved."

unless actual official API data confirms it.

Never invent application status.

Never claim government affiliation.

Include a small note:

"Bharat Sahayak provides guidance based on available information. Official government portals and authorities remain the final source for eligibility and application decisions."

23. HINDI AI SUPPORT

If the user asks in Hindi:

"Mujhe ab kya karna hai?"

The AI should respond naturally in Hindi.

Example:

"Aapke application ke liye abhi domicile certificate complete karna baaki hai. Iske baad aap official application portal par apply kar sakte hain."

If the user asks in English, respond in English.

Respect the selected language preference.

24. AI ASSISTANT UI

Create a modern but simple chat interface.

Show suggested questions:

Am I eligible?

What documents do I need?

What should I do next?

Explain this scheme

Explain in Hindi

The assistant should show useful source references where available.

Do not make it visually overwhelming.

25. SEARCH AND DISCOVERY

Make search functional.

Users can search things like:

"scholarship for students"

"support for farmers"

"education assistance"

"women welfare"

"health support"

Use keyword/semantic matching where appropriate.

If AI-powered semantic search is implemented, keep the final scheme information grounded in the structured database.

26. NOTIFICATIONS / REMINDERS

Add a simple notification/reminder system if feasible.

Examples:

"Your domicile certificate is still pending."

"Your action plan has 2 incomplete steps."

"Your application tracker has not been updated."

Do not send fake government notifications.

Clearly distinguish:

Bharat Sahayak Reminder

from official government communication.

27. PROFILE PAGE

Show:

Personal information

Language

Preferences

Account information

Edit profile

Logout

Allow users to update their information.

When profile information changes, recalculate scheme matches and eligibility results.

28. ADMIN / DATA MANAGEMENT

If practical, create a protected admin/data-management area.

Admin should be able to:

Add schemes

Edit schemes

Update eligibility rules

Update documents

Update official URLs

Set verification date

Mark scheme as active/inactive

Do not expose admin functionality to normal users.

29. DATA MODEL

Create appropriate database tables/collections.

At minimum:

users

profiles

schemes

scheme_eligibility_rules

scheme_documents

applications

action_plan_items

uploaded_documents

chat_history

notifications

Use proper relationships.

Avoid storing duplicate information unnecessarily.

30. SECURITY

Implement:

Authentication

Authorization

Database access policies

Protected admin routes

Secure file storage

API key protection

Input validation

File validation

Rate limiting where appropriate

Error handling

No secrets in frontend

No sensitive information in client logs

Use environment variables for:

AI API keys
Database credentials
Other secrets

Never hard-code secrets.

31. ERROR HANDLING

The application must not crash if:

AI API fails

Database is temporarily unavailable

User uploads an invalid file

Network fails

Search returns no results

Scheme information is missing

User submits invalid data

Show friendly messages.

Examples:

"Something went wrong. Please try again."

"No matching schemes were found. Try updating your profile or search terms."

"AI assistance is temporarily unavailable. You can still use the scheme and eligibility features."

The core application should remain usable even if AI is temporarily unavailable.

32. AI FALLBACK

This is very important.

If the AI API is unavailable, the website must NOT display technical errors such as:

"API key missing"

or

"500 Internal Server Error"

Instead:

"AI assistance is temporarily unavailable. You can still check eligibility, view scheme details, and follow your action plan."

The rule-based eligibility system and core website should continue working.

33. ACCESSIBILITY

Make the application accessible.

Use:

High contrast

Readable font sizes

Clear labels

Keyboard navigation

Accessible buttons

Proper form labels

Meaningful error messages

Mobile-friendly layouts

Keep language simple.

34. RESPONSIVE DESIGN

The website must work properly on:

Desktop

Laptop

Tablet

Mobile

Do not allow horizontal scrolling.

Test common screen sizes.

35. PERFORMANCE

Optimize:

Images

Database queries

API calls

AI requests

Page loading

Component rendering

Avoid unnecessary API calls.

Cache scheme data where appropriate.

36. REAL VS DEMO FEATURES

Clearly distinguish actual functionality from prototype functionality.

Implemented features should actually work.

If government API integration is not available, do not pretend it exists.

If application tracking is local/user-managed, label it clearly.

If OCR is only extraction and not authenticity verification, say so.

If scheme data is curated, show:

Last verified: [date]

and the official source.

37. HOME PAGE TRUST SECTION

Add a small section explaining:

How Bharat Sahayak Works

1. Tell us about yourself

2. Find relevant schemes

3. Understand your eligibility

4. Prepare your documents

5. Follow your action plan

6. Track your progress

Also show:

Important

"Bharat Sahayak is an assistance platform. Official government portals and authorities remain the final source for scheme eligibility, application decisions, and benefit approval."

38. DO NOT MAKE THESE CLAIMS

Never claim:

Official government partnership

Government ownership

Government endorsement

100% eligibility accuracy

Real-time government application status

Automatic government application submission

Official document verification

Complete coverage of all Indian schemes

unless those integrations actually exist.

39. INITIAL SCHEME DATA

Use a small set of genuine, verified government schemes for the initial working database.

Prioritize different categories:

Education

Employment

Agriculture

Health

Women/Child

Financial/Social Support

Use official government sources such as:

myScheme

India.gov.in

Relevant Ministry portals

Official State Government portals

Every scheme must have an official source URL.

Do not invent scheme details.

40. IMPORTANT DEMO USER

Do NOT create a "Try Demo" button.

However, for development/testing, create a clearly marked sample/test account or seed data internally if useful.

Example test profile:

Name: Rahul Kumar
Age: 20
State: Uttar Pradesh
District: Demo District
Occupation: Student
Education: Undergraduate
Annual Family Income: ₹2,00,000
Gender: Male
Urban
Preferred Language: Hindi
Benefit Category: Education / Financial Support

This should be test data only and should not be presented as a real citizen.

41. DASHBOARD FLOW

The complete working journey should be:

HOME
↓
GET STARTED
↓
REGISTER / LOGIN
↓
CREATE PROFILE
↓
DASHBOARD
↓
FIND SCHEMES
↓
SELECT SCHEME
↓
CHECK ELIGIBILITY
↓
VIEW REQUIRED DOCUMENTS
↓
DOCUMENT READINESS
↓
PERSONALIZED ACTION PLAN
↓
OFFICIAL APPLICATION PORTAL
↓
USER-MANAGED APPLICATION TRACKER
↓
AI ASSISTANT

Every step must work.

42. UI DETAILS

Use consistent components:

Cards

Progress bars

Status badges

Timeline

Buttons

Forms

Alerts

Modals

Tooltips where useful

Use status colors carefully:

Green = completed/positive

Yellow/amber = needs attention

Red = not satisfied/error

Blue/neutral = information

Do not overuse colors.

43. EMPTY STATES

Every major page needs a useful empty state.

Examples:

No schemes:

"No matching schemes found. Try changing your search or updating your profile."

No documents:

"No documents have been added yet."

No applications:

"You haven't started tracking an application yet."

No notifications:

"You're all caught up."

44. LOADING STATES

Add proper loading states for:

Scheme search

Eligibility calculation

AI response

Document upload

Database requests

Application updates

Use skeleton loaders or simple spinners.

45. DATABASE SEEDING

Create a seed mechanism for the initial verified scheme dataset.

Make it easy to add more schemes later.

Do not put all scheme data directly into frontend components.

Scheme data should come from the database/API.

46. CODE QUALITY

Write clean TypeScript.

Use reusable components.

Avoid duplicate code.

Use meaningful names.

Organize files logically.

Add comments only where useful.

Do not create unnecessarily complicated architecture.

The application should be easy for another developer to understand.

47. TESTING

Before considering the project complete:

Test:

Authentication

Registration

Login

Logout

Password reset

Profile

Create

Edit

Validation

Schemes

Search

Filter

Details

Eligibility

Eligible conditions

Not eligible conditions

Missing information

Documents

Add

Upload

Remove

Missing status

Action Plan

Create

Complete task

Progress update

Applications

Create

Update

Track

AI

English question

Hindi question

Context-aware questions

API failure fallback

Language

English

Hindi

Persistent selection

Responsive

Desktop

Tablet

Mobile

Fix all console errors, broken routes, failed API requests, layout problems, and non-working buttons before finalizing.

48. FINAL ACCEPTANCE CRITERIA

Do not consider the project finished until:

✓ Website builds successfully

✓ No critical console errors

✓ No broken routes

✓ No dead buttons

✓ Authentication works

✓ Profile works

✓ Scheme database works

✓ Scheme search works

✓ Eligibility engine works

✓ Eligibility explanations work

✓ Document checklist works

✓ Action plan works

✓ Application tracker works

✓ AI assistant works when API is available

✓ AI fallback works when API is unavailable

✓ English works

✓ Hindi works

✓ Mobile layout works

✓ Database security policies are configured

✓ Secrets are protected

✓ Official scheme sources are displayed

✓ No fake government claims

✓ README is included

✓ Environment variables are documented

✓ Project can be deployed

49. README

Create a professional README containing:

Project overview

Features

Architecture

Tech stack

Setup instructions

Environment variables

Database setup

AI API setup

Authentication setup

How to seed scheme data

How to run locally

How to deploy

What features are implemented

What features are prototype/future scope

Important limitations

Official data-source policy

50. FINAL INSTRUCTION TO LOVABLE

Build this as a real, functional application, not a visual mockup.

Prioritize functionality and reliability over excessive visual effects.

Do not create fake data where real verified information is required.

Do not invent government schemes, eligibility conditions, benefits, URLs, or application status.

Do not use "Try Demo" anywhere.

Use Get Started and Check My Eligibility instead.

Start by setting up the application architecture, database schema, authentication, core pages, and seed data.

Then implement the eligibility engine, scheme matching, documents, action plan, application tracker, and AI assistant.

After implementation, test the complete user journey from registration to scheme discovery to action planning.

Fix every error you encounter before declaring the project complete.

The final result should be a simple, trustworthy, bilingual, AI-assisted citizen service platform called:

BHARAT SAHAYAK

From Eligibility to Benefits                                                                                                                               OFFICIAL GOVERNMENT WEBSITE / DIRECT APPLICATION FEATURE

Add a prominent feature that allows users to go directly from Bharat Sahayak to the verified official government website for a selected scheme.

User Flow

When a user selects a scheme:

Show the complete Scheme Details page.

Display a prominent button:
"Apply on Official Website ↗"

When clicked, open the verified official application URL in a new browser tab.

Also provide:
"View Official Scheme Source ↗"
which opens the verified official source/information page.

Database Fields

Every scheme should support:

official_application_url

official_source_url

source_name

last_verified

url_status

Example:

scheme_name: Example Scheme
official_application_url: https://official-government-website.gov.in/apply
official_source_url: https://www.myscheme.gov.in/
source_name: Government of India
last_verified: 2026-09-12
url_status: verified


Security and Accuracy Rules

Never allow the AI assistant to invent or generate government URLs.

URLs must come from the structured scheme database.

Only verified official government sources should be stored.

Prefer official government domains such as .gov.in, .nic.in, or other clearly verified government portals where applicable.

Before redirecting, show a small notice:

"You're leaving Bharat Sahayak and opening the official government website. Application decisions and final eligibility are determined by the relevant government authority."

Open external government websites in a new tab using safe external-link handling.

If an official application URL is unavailable, do NOT create a fake URL.

Instead show:
"Official application link currently unavailable. Visit the official source for application instructions."

The Apply button should be disabled/hidden when no verified application URL exists.

Never claim that Bharat Sahayak itself submits the government application unless an actual government API integration has been implemented.

Scheme Details UI

Place the buttons prominently near the eligibility/action-plan section:

[ Apply on Official Website ↗ ]

[ View Official Source ↗ ]

Below them display:

"Official government website"

"Last verified: [date]"

Action Plan Integration

The personalized action plan should include:

Check eligibility

Prepare required documents

Review application instructions

Open Official Application Website ↗

Complete application on the official website

Return to Bharat Sahayak and update application status

After the user clicks the official application button, Bharat Sahayak should NOT pretend that the application was submitted.

The user can manually update their application tracker:

Not Started

Preparing

Submitted

Under Verification

Decision Received

Clearly label this as a User-managed Application Tracker unless a real government status API is connected.

AI Assistant Integration

The AI assistant should be able to answer:

"Where do I apply?"

"Give me the official application website."

"How do I apply for this scheme?"

"What should I prepare before opening the official website?"

The assistant must retrieve the URL from the scheme database rather than generating one.

Example response:

"According to the verified scheme information, you can apply through the official government website. [Open Official Application Website ↗]"

If the URL is unavailable:

"I couldn't find a verified official application link for this scheme. Please use the official source listed on the scheme page rather than relying on an unverified website."

Trust Indicator

For every scheme, clearly distinguish:

Bharat Sahayak Information

Personalized eligibility analysis

Document checklist

Action plan

User-managed tracking

Official Government Information

Scheme rules

Official benefits

Official application portal

Final eligibility decision

Application processing/status

This distinction must be visible throughout the application.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/c065b755-0d6d-400b-ae38-8cadacb019ad).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
