---
type: "project"
title: "CIBATH Biofilter"
description: "DIY biofilter to remove micro- and nanoplastics from tap water using biological filtration media."
status: "Planning"
category: "Household"
tags: ["Water Filtration", "DIY", "Sustainability"]
published: false
---

## Overview

A DIY biofilter designed to remove micro- and nanoplastics from tap water using biological filtration media — a practical, home-scale approach to a growing environmental health concern.

## Problem

Micro- and nanoplastics are present in tap water worldwide. Commercial filters aren't designed to target particles at the nanoscale. There's no affordable, accessible home solution.

## Approach

- Design a gravity-fed or low-pressure biofilter using layered biological media
- Biofilms on sand/gravel media act as "irreversible traps" for nanoplastics
- Test before/after water quality (within the limits of home testing)
- Iterate on media types and flow rates

## Open Questions

- What filter media candidates for v1? (Sand, activated carbon, biochar?)
- What "success" measurement is feasible at home?
- Flow rate vs. filtration efficiency tradeoff
- Maintenance schedule — how often to clean/replace media?
- Safety — is the filtered water safe to drink, or demonstration-only?

## Research Plan

### Research Question

Can a gravity-fed layered biofilter using sand, gravel, and biochar achieve measurable reduction in micro- and nanoplastic concentrations in Swiss tap water at the home scale?

### Milestone 1 — Literature Review & Hypothesis

**Goal:** Formalize existing research into a structured review, define the experimental plan.

- Synthesize research notes into a proper literature review covering:
  - Nanoplastic composition and behavior in tap water
  - Biological filtration mechanisms (biofilm adhesion, enzymatic degradation)
  - Existing pilot projects (BIOFOS Copenhagen, Eawag Switzerland)
- Define a testable hypothesis and scope (what the filter targets, what it doesn't)
- Identify measurement strategy:
  - Home instruments: turbidity meter, TDS meter, particle counter
  - Professional: contact Eawag or a local Swiss lab for before/after water sample analysis
  - Be explicit about what home measurements can and cannot prove
- Write up experimental methodology (media selection rationale, test protocol, data collection plan)

**Publish:** Blog post — open lab notebook with literature review, hypothesis, and experimental plan
**Video:** "I'm building a biofilter to remove nanoplastics — here's what the science says"

### Milestone 2 — Filter Design & Build (v1)

**Goal:** First working prototype.

- Select and justify media stack from literature (sand, gravel, activated carbon, biochar)
- Design housing: gravity-fed, food-safe container, 3D-printed manifolds for inlet/outlet
- Document full BOM, CAD files, assembly process
- Begin biofilm conditioning (weeks of flowing water to establish biological layer)
- Log conditioning progress (visual changes, flow rate over time)

**Publish:** Open design files (CAD, BOM, assembly guide) on GitHub
**Video:** "Building the biofilter v1" — design decisions, science behind each media layer, biofilm timelapse

### Milestone 3 — Baseline Testing

**Goal:** Establish what the filter measurably does.

- Run before/after measurements over several weeks as biofilm matures:
  - Turbidity (NTU)
  - Total dissolved solids (ppm)
  - Flow rate (mL/min)
  - pH, temperature
- Send paired water samples (unfiltered + filtered) to a professional lab for particle analysis
  - Budget for 2-3 lab tests across the project lifecycle
- Log all data systematically (timestamped, raw values, conditions)
- Be transparent: state clearly what home instruments measure vs. what they don't

**Publish:** Raw data on GitHub, blog post with methodology and initial results
**Video:** "Does the biofilter actually work?" — testing process, explaining what each measurement means, honest about limitations

### Milestone 4 — Iteration & Optimization

**Goal:** Improve filtration performance based on data.

- Build a second filter to enable A/B testing
- Vary one parameter at a time:
  - Media composition and layer depth
  - Flow rate (adjust head height)
  - Biofilm maturity (age of filter)
- Track maintenance: clogging rates, backwash frequency, media replacement intervals
- Document failure modes (channeling, biological contamination, flow bypass)
- Send second round of lab samples after optimization

**Publish:** Updated dataset, iteration log with before/after comparisons
**Video:** "What went wrong and what I changed" — real engineering iteration, failure modes, improvements

### Milestone 5 — Formal Write-Up & Publication

**Goal:** Compile findings into a publishable paper.

- Structure: introduction, methods, results, discussion, limitations, conclusion
- Frame the contribution as citizen science methodology for home-scale water filtration assessment
- Preprint first on Zenodo or OSF (gets a DOI immediately)
- Target journals:
  - Citizen Science: Theory and Practice
  - PLoS ONE
  - JOSS (if significant software/tooling is produced)
- Include all raw data and design files as supplementary material

**Publish:** Preprint → journal submission
**Video:** "I published a research paper on my DIY biofilter" — the story of doing independent research, the process, what was learned

### Notes

- **Timeline estimate:** ~12 months total alongside other projects. M1-M2: ~2-3 months. M3: ~2 months (data collection takes time). M4: ~3 months. M5: ~2 months.
- **Key credibility move:** Professional lab analysis. Even 1-2 tests bridge the gap between home-instrument proxies and real nanoplastic measurement.
- **Eawag connection:** They are doing exactly this research in Switzerland. A cold email explaining the citizen science angle may open doors for collaboration, equipment access, or at minimum guidance on measurement methodology.
- **Videos are not a separate track.** The camera rolls during the research. Each milestone naturally produces both a publication artifact and video content.
- **Safety:** Until professional lab results confirm safety, all filtered water is for demonstration and measurement only — not drinking.

## References

## Log
