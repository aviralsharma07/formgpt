# formGPT

**formGPT** is an AI-powered Google Form Builder that simplifies the process of creating and managing Google Forms. With integrated metrics dashboards, users can effortlessly track the performance of their forms while enjoying an intuitive and user-friendly interface.

## Features

### **Core Functionalities**

1. **AI-Powered Google Form Generation**  
   Build forms in seconds using natural language descriptions, making form creation fast and easy.

2. **Real-Time Live Previews**  
   Preview your generated Google Forms instantly in an iframe, complete with edit and share links for seamless workflows.

3. **Google Authentication Integration**  
   Ensure secure and seamless sign-ins with Google accounts, providing effortless access to all features while maintaining data privacy.

4. **Integrated Metrics Dashboard**  
   Gain insights into your forms' performance with detailed metrics, such as total responses, active forms, and more—all accessible from the dashboard.

---

## Technologies Used

formGPT leverages the following modern tools and frameworks:

- **React**: A JavaScript library for building user interfaces.
- **Next.js 15**: A powerful React framework for server-side rendering and optimized performance.
- **TailwindCSS**: A utility-first CSS framework for rapid UI development.
- **TypeScript**: Strongly typed programming language for better development efficiency.
- **ShadCN UI**: Component library for building aesthetically pleasing user interfaces.
- **Groq AI API**: Enables using the Laama Model for generating Google Forms Structure.

---

## Live Demo

Check out the live application here: [formGPT](https://formgpt-zeta.vercel.app/)

---

## The Basic Idea

Creating forms is often time-consuming and complex. We’re solving this by using AI to generate Google Forms from simple natural language descriptions, eliminating the need for manual creation. Users get an instant preview of their form, saving time and ensuring accuracy. With Google authentication integration, form creation is secure and easy. Since we don’t save user data, the forms are created directly in Google Forms, allowing users to leverage the full Google Workspace suite while keeping their data private. We make form creation fast, simple, and secure.

## Google Form Schema

![Google Form Schema](/public/googleFormSchema.png)

---

## Installation

### **Prerequisites**

- Node.js (ensure it's installed on your machine)
- `npm` or `yarn` package manager

### **Setup Guide**

Follow these steps to set up the project locally:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo/formGPT.git
   cd formGPT
   ```

2. Install the dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. SetUp Supabase:

   - Create an account on [Supabase](https://supabase.io/).
   - Create a new project and copy the `Supabase URL` and `Anon Key`.
   - Set up Google Authentication in the Supabase project.

4. SetUp Google Authentication:

   - Create a new project on the [Google Cloud Console](https://console.cloud.google.com/).
   - Enable the Google Sheets API and Google Drive API.
   - Create OAuth 2.0 credentials and copy the `Client ID` and `Client Secret`.
   - Add the authorized redirect URI as by copying it from your Supabase Project Dashboard under Authenticaton Tab.

5. Add Environment Variables:
   Create a `.env.local` file in the root directory and add the following environment variables:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   NEXT_PUBLIC_GOOGLE_API_KEY=your-google-api-key
   NEXT_PUBLIC_GROQ_API_KEY=your-groq-api-key
   ```

6. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

---

## Usage

### **How to Use**

1. **Sign In:**  
   Sign in using your Google account to access the form builder.

2. **Create a Form:**

   - Click on the "Create Form" button.
   - Enter a natural language description of your form.
   - Click "Generate Form" to create your Google Form.

3. **View Form Metrics:**
   - Navigate to the "Dashboard" tab to view detailed insights about your forms.
   - Track metrics such as total responses, active forms, and more.

### Known Issues

- **Form Generation Limitations**: The AI model may not always generate the desired form structure based on the input description.
- **Input Fields**: Not all Input fields are supported by the AI model, so some fields may not be generated correctly.

---

## Support

I'd love your feedback! Feel free to reach out with any questions, suggestions, or feedback.

- Email: [aviralsharma723@gmail.com](mailto:aviralsharma723@gmail.com)
- Twitter: [\_aviral07](https://twitter.com/_aviral07)
- LinkedIn: [aviral07](https://www.linkedin.com/in/your-linkedin-profile)
