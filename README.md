# Pastest AI Search Prototype

## Overview

This is a lightweight interactive prototype exploring a new search experience for medical revision.

The core idea:

**Can we move from keyword search → structured learning guidance by turning a user query into a personalised study brief?**

Instead of returning links, the system generates:

- key concepts
- guideline highlights
- relevant questions
- a suggested learning path

---

## Problem

Traditional search in learning platforms is limited:

- Returns lists of content, not understanding
- Requires users to interpret and structure information themselves
- Slows down time to insight
- Creates friction between question → learning → action

Users often know what they struggled with, but not how to turn that into a structured revision plan.

---

## Solution

This prototype creates an AI-driven search experience that:

- accepts natural language input (e.g. clinical scenarios)
- routes the query to a relevant topic
- generates a structured study brief
- surfaces key concepts, guidelines, and questions
- recommends next learning steps

The goal is to reduce time from **question → clarity → action**.

---

## Key Features

- Natural language search input
- Topic routing logic
- AI-style structured study brief
- Key concepts with progressive reveal
- NICE guideline highlights
- Relevant question bank items
- Suggested learning pathway
- Action prompts (e.g. start Qbank, create plan)

---

## Product Principles

### Reduce time to insight  
Users immediately see structured understanding, not just content.

### From search → action  
Every result leads to a clear next step.

### Progressive disclosure  
Information is revealed in stages to avoid overload.

### Learning, not browsing  
Shifts mindset from “find content” to “build understanding”.

---

## Key Product Decisions

- Replaced traditional search results with a structured output
- Simulated AI behaviour using deterministic topic routing
- Focused on clarity and UX rather than model accuracy
- Designed as a **concept prototype**, not a production AI system
- Included action layer to connect insight → behaviour

---

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Vercel Analytics (event tracking)

---

## Vercel URL

pastest-ai-search.vercel.app

## How to Run Locally

```bash
npm install
npm run dev