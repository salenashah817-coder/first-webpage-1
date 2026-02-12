# 🎯 EmailJS Setup - The BEST Option (No Installation!)

**✅ This is the BEST solution for you because:**
- No Node.js installation required
- Works immediately  
- 100% FREE (200 emails/month)
- No backend server needed
- Just needs 3 IDs from EmailJS

---

## 🚀 Setup in 5 Minutes

### Step 1: Create Free EmailJS Account (2 minutes)

1. **Go to EmailJS:**  
   👉 [https://www.emailjs.com](https://www.emailjs.com)

2. **Sign Up** (FREE account)
   - Use Google/GitHub or email
   - Verify your email

---

### Step 2: Add Email Service (1 minute)

1. **In EmailJS Dashboard, click "Add New Service"**

2. **Choose your email provider:**
   - Gmail (recommended)
   - Outlook
   - Yahoo
   - Or any other

3. **Connect your email:**
   - For Gmail: Click "Connect Account" and allow access
   - Note your **Service ID** (looks like: `service_abc123`)

---

### Step 3: Create Email Template (1 minute)

1. **Click "Email Templates" → "Create New Template"**

2. **Copy this template** (paste in the content editor):

```
Subject: 📋 Nueva Encuesta - Fundación JJID

Formulario: Encuesta sobre Apicultura
Fecha: {{submission_date}}

═══════════════════════════════════════
RESPUESTAS DE LA ENCUESTA
═══════════════════════════════════════

1. Experiencia en el sitio web:
{{q_experience}}

2. Secciones visitadas:
{{q_sections}}

3. Motivo de la visita:
{{q_reason}}

4. Contenido deseado:
{{q_content}}

5. Facilidad de navegación:
{{q_navigation}}

6. Encontró la información:
{{q_found_info}}

7. Impresión general:
{{q_impression}}

8. Volvería a visitar:
{{q_return}}

9. Aspecto de interés en apicultura:
{{q_interest}}

10. Sugerencias de mejora:
{{q_improve}}

═══════════════════════════════════════
INFORMACIÓN DE CONTACTO
═══════════════════════════════════════

Nombre: {{from_name}}
Email: {{from_email}}

═══════════════════════════════════════
```

3. **Configure "To Email":**
   - Set to: `{{to_email}}` (dynamic)
   - Or your fixed email address

4. **Save Template**
   - Note your **Template ID** (looks like: `template_xyz789`)

---

### Step 4: Get Public Key (30 seconds)

1. **Go to Account → General**
2. **Find "Public Key"** (looks like: `aBcDeFgH123456`)
3. **Copy it**

---

### Step 5: Update Your Code (1 minute)

**Edit these 3 files** with your EmailJS credentials:

#### File 1: `encuesta.html` (Line 12)
Find:
```javascript
emailjs.init('YOUR_PUBLIC_KEY');
```
Replace with:
```javascript
emailjs.init('aBcDeFgH123456'); // Your actual public key
```

#### File 2: `encuesta-emailjs.js` (Line 49-50)
Find:
```javascript
const response = await emailjs.send(
    'YOUR_SERVICE_ID',     // Replace with your Service ID
    'YOUR_TEMPLATE_ID',    // Replace with your Template ID
```
Replace with:
```javascript
const response = await emailjs.send(
    'service_abc123',      // Your Service ID
    'template_xyz789',     // Your Template ID
```

#### File 3: `encuesta-emailjs.js` (Line 53)
Find:
```javascript
to_email: 'your-email@example.com', // Where to receive emails
```
Replace with:
```javascript
to_email: 'fundacion@yourdomain.com', // Your actual email
```

---

## ✅ That's It! You're Done!

Now when someone fills out your survey:
1. Form submits
2. EmailJS sends you an email instantly
3. You receive all 10 answers + contact info

---

## 🧪 Testing

1. **Open `encuesta.html`** in your browser (double-click the file)
2. **Fill out all questions**
3. **Submit**
4. **Check your email!** 📧

---

## 📋 Quick Checklist

- [ ] Create EmailJS account
- [ ] Connect email service (Gmail/Outlook)
- [ ] Create email template
- [ ] Copy Service ID, Template ID, and Public Key
- [ ] Update `encuesta.html` with Public Key
- [ ] Update `encuesta-emailjs.js` with Service ID and Template ID  
- [ ] Update `encuesta-emailjs.js` with your email address
- [ ] Test the form!

---

## 🎯 What You Need:

1. **Public Key** → Put in `encuesta.html` line 12
2. **Service ID** → Put in `encuesta-emailjs.js` line 49
3. **Template ID** → Put in `encuesta-emailjs.js` line 50
4. **Your Email** → Put in `encuesta-emailjs.js` line 53

---

## 💡 Example Configuration:

```javascript
// encuesta.html line 12
emailjs.init('kL9mN2pQ5rS'); // Your public key

// encuesta-emailjs.js lines 49-50
await emailjs.send(
    'service_gmail_12ab',      // Your service ID
    'template_survey_34cd',    // Your template ID
    
// encuesta-emailjs.js line 53
to_email: 'contacto@fundacion-jjid.org',
```

---

## 🔥 Advantages

✅ No installation required  
✅ No backend server to maintain  
✅ Works on any hosting (including GitHub Pages)  
✅ Free forever (200 emails/month)  
✅ Reliable and fast  
✅ Easy to configure  

---

## ❓ Troubleshooting

**❌ "emailjs is not defined"**
- Make sure EmailJS script is loaded in `encuesta.html`

**❌ "Service/Template not found"**
- Double-check your Service ID and Template ID
- Make sure they match exactly

**❌ Email not arriving**
- Check spam folder
- Verify template has `{{to_email}}` or your email

---

**🎉 You're all set!** This is the easiest and best solution for your needs!
