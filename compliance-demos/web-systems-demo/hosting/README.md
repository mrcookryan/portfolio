\# Hosting — Web Systems Demo



This section of the Web Systems Demo provides a practical overview of hosting environments and the deployment workflow used to bring a site online. It covers hosting models, server behavior, file structure, permissions, and the steps required to safely deploy updates.



\---



\## 📘 Purpose



The Hosting portion of the demo illustrates:



\- How hosting environments differ (shared hosting vs VPS)

\- How servers are structured and organized

\- How permissions and logs affect site behavior

\- How Apache or Nginx fits into the hosting layer

\- How to verify a deployment using a real-world checklist



This directory provides the operational foundation that supports DNS, Apache, and Routing.



\---



\## 📁 Included Files



\### \*\*1. hosting-overview.md\*\*

A high-level overview of hosting fundamentals, including:



\- Shared hosting vs VPS  

\- Apache vs Nginx  

\- File structure and directory layout  

\- Permissions (644 / 755 basics)  

\- Logs (access/error)  

\- Backups and recovery  



This file explains how hosting environments are organized and maintained.



\### \*\*2. deployment-checklist.md\*\*

A practical deployment workflow covering:



\- DNS propagation  

\- SSL certificate validation  

\- Apache configuration checks  

\- Redirect testing  

\- Security header verification  

\- Lighthouse performance audit  

\- WAVE / Axe accessibility checks  

\- Mobile responsiveness testing  

\- Uptime monitoring  



This checklist mirrors real-world deployment processes used by hosting providers and web developers.



\---



\## 🔗 How This Fits Into the Web Systems Demo



Hosting sits between DNS and Apache:



\- \*\*DNS\*\* → points the domain to the server  

\- \*\*Hosting\*\* → provides the environment where the site lives  

\- \*\*Apache\*\* → serves the correct site and handles routing  

\- \*\*Routing\*\* → directs requests to the correct resources or endpoints  



Together, these components form a complete, functional web system.



\---



\## 📌 Optional Additions (if expanding later)



You may add:



\- `notes.txt` — permissions, ownership, logs, backup strategies  

\- `environment.txt` — OS, server version, modules enabled  

\- `index.html` — simple landing page for GitHub Pages  



These are optional but can deepen the case study.



\---



\## ✅ Summary



This Hosting directory provides a clean, accurate, and portfolio-ready example of hosting fundamentals and deployment workflow. It complements the DNS, Apache, and Routing sections to demonstrate a complete Web Systems workflow.



