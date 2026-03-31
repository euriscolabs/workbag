---
type: "project"
title: "Full-Spectrum Therapy Lamp"
description: "A research-backed light therapy lamp designed around circadian science, vitamin D synthesis, and seasonal wellness."
status: "In Progress"
category: "Health"
tags: ["Hardware", "Research", "Health"]
published: true
---

## Overview

A DIY full-spectrum desk lamp designed around circadian science — providing bright, balanced visible light to combat seasonal affective disorder (SAD), boost mood, and regulate circadian rhythm during winter months.

## Problem

Winter means dramatically less sunlight (down to ~8 hours in Switzerland, mostly spent indoors). This leads to vitamin D deficiency, mood dips, fatigue, and weakened immunity. Commercial daylight lamps either misrepresent their spectrum or have impractical form factors for desk use.

## Approach

- Full-spectrum LED light source mimicking sunlight's visible range
- 3D-printed housing designed for desk use (doesn't block keyboard, indirect light into eyes)
- Adjustable brightness via dimmer
- Adjustable positioning via hinges/rods
- Consider adjustable color temperature (warm for long use, cooler for therapy sessions)

### Design Priorities

- Safe: no UV emission, indirect light positioning
- Practical: usable while working at a desk
- Research-backed: targeting 10,000 lux (clinical standard for SAD treatment)

## Open Questions

- Which specific full-spectrum LED strips/chips to source?
- Power supply and dimmer electronics
- Final housing design (desk clamp + articulated arm?)
- How to measure and verify lux output at working distance?

## References

- [Brightower desk lamp (Amazon)](https://www.amazon.de/dp/B0CC19JP7N)
- [GAEFURY dual-head lamp (Amazon)](https://www.amazon.de/dp/B0F5Q41KGN)
- [EPABINA daylight lamp (Amazon)](https://www.amazon.de/dp/B0FGHPJ3TV)
- [Yaasa Lamp Essential](https://yaasa.ch/en/products/lamp-essential)

## Log
# Light therapy video storyboard draft
_Exported on 2/8/2026 at 18:59:41 GMT+1 from Cursor (2.4.28)_

---

**User**

@docs/videos/projects/light-therapy/storyboard.md i tried to write a very rough draft of a Storyboard for my first youtube video, tell me what you think and give me some notes on how i can improve in format structure and content

---

**Cursor**

Good, I now have a solid picture of the project and the storyboard. Here are my thoughts:

---

## Overall Impression

This is a solid start -- you clearly have a compelling personal angle and a real project to show. The core narrative arc is there: **relatable winter struggle -> problem (lack of sunlight) -> solution (full-spectrum desk lamp) -> build montage**. That's a proven YouTube maker-video structure. Now let's sharpen it.

---

## Format & Structure Notes

**1. Add clear section headers with timestamps/durations**

Right now the storyboard reads more like a stream-of-consciousness script. A proper storyboard should give you (and any collaborator) a quick overview of the video's pacing. Consider a format like:

```markdown
## Scene 1 — Cold Open / Hook (0:00 – 0:30)
**Visual:** Wide shot, snowy ridge, hiking toward cabin...
**Audio:** Snow crunching, wind howling. No narration yet.
**Text/Graphics:** None

## Scene 2 — Intro Monologue (0:30 – 1:30)
**Visual:** Cozy fireplace → hard cut to grim commute reality
**Voiceover:** "Is there a better feeling than..."
**Graphics:** Channel logo / subscribe animation
```

This lets you estimate total runtime, spot pacing issues, and plan your shoot list.

**2. Separate visuals from dialogue/voiceover**

You're currently mixing B-roll descriptions, spoken lines, and editorial notes in the same block. Splitting them into **Visual**, **Audio/VO**, and **Graphics/Text** columns (or labeled lines) makes it much easier to plan what you need to film vs. record vs. design in post.

**3. Add a clear hook in the first 5-10 seconds**

YouTube retention is won or lost in the first moments. Your snowy hiking intro is atmospheric but doesn't tell the viewer *what the video is about* or *why they should stay*. Consider front-loading a teaser of the finished lamp, or a bold claim like: *"I built a desk lamp that simulates real sunlight -- here's how."* Then cut to the scenic intro.

**4. Mark your TODOs more visibly**

You have a couple of `TODO:` notes inline. Consider using a dedicated section at the bottom or a checklist so they don't get lost:

```markdown
## Open Items
- [ ] Research light spectrum theory + comparison graphics
- [ ] Describe final lamp design
- [ ] Plan B-roll shot list for build montage
```

---

## Content Notes

**5. The "reality check" segment is great -- tighten it**

The contrast between the cozy cabin fantasy and the grim commute/doom-scrolling reality is funny and relatable. But the monologue block (lines 21-25) tries to cover too much in one breath: flu season, vitamin D, tanning beds, tropical vacations, taxes. Pick 2-3 beats max, and let the B-roll do some of the storytelling. For example:

- Beat 1: Winter = less sunlight (show dark commute, dark apartment)
- Beat 2: Common "solutions" don't work (quick montage: vitamin pills, tanning bed, expensive flight)
- Beat 3: Sunlight is the real answer -- but how? (transition to your solution)

**6. The science section needs a plan**

Lines 28-34 are the educational core of the video and currently the weakest part. This is where you earn viewer trust. Plan for:
- A simple graphic comparing UV/visible/IR spectra of: sunlight vs. tanning bed vs. typical "daylight" LED vs. full-spectrum LED
- One or two concrete claims with sources (e.g., "full-spectrum LEDs emit light in the 380-780nm range, closely matching solar output")
- Keep it short (60-90 seconds max) -- you're a maker, not a lecturer

**7. The build section is too vague**

Lines 40-58 are essentially "then I build it." This is your main content! Even at storyboard stage, sketch out:
- **Design rationale:** Why this form factor? What makes it better than commercial desk lamps?
- **Key build moments:** What's the trickiest part? (This creates tension/interest)
- **Testing/results:** Does it actually work? Show a lux meter reading, a before/after of your desk, your subjective experience after a week

**8. You're missing an outro/CTA**

Every YouTube video needs a closing: summarize what you built, share results, tease the next video, and ask for likes/subscribes. Even a placeholder section like `## Outro (testing results + CTA)` would help.

**9. Minor: spelling and grammar**

There are quite a few typos throughout (felling, cozing, sunnlight, heave, lightbull, etc.). Totally fine for a rough draft, but worth a cleanup pass before you use it as a shooting script so you don't stumble during recording.

---

## Suggested Revised Outline

Here's a tighter skeleton you could flesh out:

```markdown
## Hook (0:00 – 0:10)
Teaser of finished lamp on desk, warm glow. VO: "I built a lamp that simulates real sunlight."

## Cold Open – Fantasy vs. Reality (0:10 – 1:00)
Cozy cabin sequence → hard cut → grim winter commute → doom scrolling

## Problem (1:00 – 2:00)
Why winter sucks: less sun, low energy. Common fixes and why they fail.

## Science / Theory (2:00 – 3:30)
Light spectrum comparison. What "full-spectrum" actually means. Why it matters.

## The Idea / Design (3:30 – 5:00)
Sketching process, design rationale, parts list.

## The Build (5:00 – 10:00)
3D modeling → printing → electronics → soldering → assembly. Highlight challenges.

## Testing & Results (10:00 – 11:30)
Lux readings, desk setup, personal experience after using it.

## Outro + CTA (11:30 – 12:00)
Summary, link to files/BOM, subscribe, tease next video.
```

This is a really promising first video concept -- the personal angle, the DIY build, and the practical health benefit give it broad appeal. The main thing to focus on now is **planning the science section** and **fleshing out the build narrative** so you know exactly what to film.

---

**User**

ok could you revise the format and the spelling and wording mistakes

---

**Cursor**

Here's what I changed:

**Format**
- Added a title and clear `## Scene` headers with rough timestamps so you can estimate pacing at a glance
- Separated each scene into **Visual**, **Voiceover**, and **Graphics** labels so you know exactly what to film, record, and design in post
- Converted your inline TODOs into blockquote callouts within each scene, plus a consolidated **Open Items** checklist at the bottom
- Added placeholder scenes for **Testing & Results** and **Outro & CTA** that were missing

**Spelling & Wording**
- Fixed all typos: felling → feeling, cozing → cozying, sunnlight → sunlight, cristmass → Christmas, delicous → delicious, especialy → especially, heave → have, taning/tannig → tanning, lightbull → light bulb, fullspektrum → full-spectrum, electronincs → electronics, realy → really, eiter → either, planed → planned, etc.
- Cleaned up grammar and punctuation throughout (missing apostrophes, run-on sentences, capitalisation)
- Broke the long monologue wall (old lines 21-25) into shorter, punchier voiceover blocks that match distinct visual beats
- Tidied the parts list into a numbered list with bold labels

The content itself is unchanged -- just restructured and cleaned up so it works as an actual shooting/planning document.

---

**User**

what could be some other cool hooks for the first 10 seconds?

---

**Cursor**

Here are some hook ideas that could work for this video, roughly ordered from safest to boldest:

**The Result Tease**
Open on a close-up of the finished lamp clicking on — warm, full-spectrum light flooding your desk. VO: *"I built a lamp that gives me real sunlight — at my desk."* Quick, clean, tells the viewer exactly what they're getting.

**The Before/After Split**
Split screen: left side is you looking drained under harsh blue LED light, right side is you looking alive under your warm full-spectrum lamp. No words needed for 3-4 seconds, then VO: *"One of these lights is basically sunlight. I made it."*

**The Bold Claim**
Start on a black screen. Text appears: *"Tanning beds give you cancer. Vitamin D pills might be useless. I found a third option."* Cut to a shot of the lamp. This is a bit clickbaity, but it creates immediate curiosity.

**The Relatable Pain**
Open on a POV shot of your alarm going off at 7am — it's pitch black outside. You drag yourself out of bed, commute in the dark, come home in the dark. VO: *"I haven't seen the sun in three weeks."* Hard cut to the lamp turning on. This one leans into the emotional hook.

**The Science Teaser**
Quick 5-second animation of a light spectrum chart, with a finger pointing at the visible range. VO: *"This is what sunlight looks like. This is what your desk lamp looks like. And this... is what I built."* Three beats, fast, sets you up as someone who did their homework.

**The Absurd Cold Open**
You, fully bundled in winter gear, sitting at your desk with a giant UV lamp duct-taped to a broomstick over your keyboard. You look at the camera deadpan: *"There has to be a better way."* Funny, memorable, and it frames the whole video as solving a real (if slightly ridiculous) problem.

**The Contrast Gag**
Open on the cozy cabin scene from your storyboard — but only for 3 seconds. Then an alarm clock rips you out of the fantasy. You're actually on your couch in a dark apartment. VO: *"Yeah... that's not my life. But I figured out how to get a little closer."*

---

My personal picks would be **The Result Tease** or **The Absurd Cold Open**. The first is the safest — viewers know exactly what they're getting and can decide to stay. The second is riskier but more memorable and shareable, which matters a lot for a first video trying to find an audience. You could even film both and A/B test them with friends before publishing.

---

**User**

add the storyboard format again i accidentaly removed it

---

**Cursor**

Looks like you reverted back to the original content. Let me reapply the structured format with all the fixes.

Done -- the structured format is back with all the scene headers, Visual/Voiceover/Graphics labels, spelling fixes, and the open items checklist at the bottom.

---

**User**

lets do some research on sunlight and how it relates to vitamin d production and what does vitamin d for our body

---

**Cursor**

Here's a summary of the research, organized by how it maps to your storyboard sections:

---

## How Sunlight Produces Vitamin D

The key player is **UVB radiation** (280–315 nm wavelength). When UVB hits your skin, it converts a molecule called **7-dehydrocholesterol** (which is naturally present in your skin) into **previtamin D3**, which then transforms into **vitamin D3**. The sweet spot is around **295–300 nm** -- that's where conversion is most efficient (up to 65% of the precursor gets converted at 295 nm under ideal lab conditions, though real sunlight achieves roughly 20%).

How much vitamin D you produce depends on: season, time of day, latitude (big deal in Switzerland), skin pigmentation, age, and even air pollution.

## What Does Vitamin D Do?

- **Immune system** — Regulates immune cell function, helps fight infections, and protects against autoimmune conditions
- **Mood & mental health** — Deficiency is linked to depression and neurocognitive dysfunction; adequate levels are protective
- **Energy & muscles** — Supports glucose metabolism and neuromuscular function; deficiency causes muscle weakness and fatigue
- **Bone health** — The classic one: promotes calcium absorption, prevents rickets/osteomalacia/osteoporosis
- **Broader health** — Associated with lower risk of cardiovascular disease, type 2 diabetes, and certain cancers

## Tanning Beds vs. Sunlight — The Spectrum Problem

Natural sunlight UV at Earth's surface is roughly **90–95% UVA** (315–400 nm) and **5–10% UVB** (280–315 nm). Tanning beds are designed to maximize tanning (a UVA effect) while minimizing sunburn (a UVB effect), so they **skew heavily toward UVA**. This means:

- You tan (UVA), but you don't produce much vitamin D (that needs UVB)
- You still get the cancer risk — tanning beds deliver UV at **2–3x the intensity of equatorial noon sun**
- Starting before age 30 increases melanoma risk by ~75%

So the irony is: tanning beds are bad for you **and** don't even give you the vitamin D you're after.

## Important Nuance for Your Video: Full-Spectrum LEDs ≠ UV Light

This is a critical distinction you'll want to get right in the video. There are **two separate health benefits** at play:

1. **Vitamin D production** — requires **UVB radiation** (UV light). Full-spectrum desk LEDs typically do **not** emit significant UV. So your lamp won't directly produce vitamin D.

2. **Light therapy for SAD / mood / energy** — requires **bright visible light** (10,000 lux), especially in the blue-white range. This works through your **eyes** (not skin), influencing circadian rhythm, serotonin production, and melatonin suppression. This is what full-spectrum desk lamps actually deliver.

Light therapy at 10,000 lux for 30 minutes in the morning is the **first-line treatment for Seasonal Affective Disorder** and helps 60–90% of users, with some feeling improvement in 2–4 days. One study found it was more effective than the antidepressant Fluoxetine alone (44% symptom resolution vs. 20%).

## What This Means for Your Script

Your storyboard currently frames it as "tanning beds don't give you vitamin D, but full-spectrum lights do." The reality is slightly different and actually **more interesting**:

- Tanning beds: lots of UV (mostly UVA), cancer risk, minimal vitamin D
- Full-spectrum desk lamp: bright visible light mimicking sunlight's color spectrum, **no dangerous UV**, benefits mood/energy/circadian rhythm through your eyes
- Actual sunlight: the real deal — visible light + UVB for vitamin D + circadian reset

So the honest pitch for your lamp is: *"I can't bring UVB sunlight to my desk safely, but I can bring the next best thing — bright, full-spectrum visible light that keeps my brain thinking it's a sunny day."*

This is actually a stronger angle because it's honest, scientifically backed, and avoids making health claims you can't support.

Want me to update the storyboard's science section with these findings?

---

**User**

oh my bad, thas right lets add the following, i want the science section to be a bit more fleshed out i would like to have kind stream of consiusnes / reasoning, first the science on why we get sick more often in winter then, then on why vitamin d is so important and how we can get it, then on how the sun helps us create vitamin d  with its radiation on, then in comparison on why taning beds don't, then i ask the question why tanningbeds still feel good because of the light and the warmth then we get into the safer alternative fullspectrum light and through what mechanisms it helps improve our energy etc. the viewer should be able to follow my reasoning, if i missed a step call me out. please write a rough section in this style

---

**Cursor**

I see you've already been refining the format nicely. Your reasoning chain is solid — I'd just flag one small gap: between "tanning beds still feel good" and "full-spectrum light is the safer alternative," it helps to explicitly connect *why* the feel-good part doesn't need UV at all. That's the "aha" moment for the viewer.

Let me write the fleshed-out science section.

Done. Here's how the reasoning chain flows:

1. **Why do we get sick in winter?** — Less sunlight, more indoor time, dry air → sets up sunlight as the underappreciated factor
2. **Why is vitamin D important?** — Immune system, mood, energy, bones, cardiovascular → establishes the stakes
3. **How does the sun make vitamin D?** — UVB (295–300nm) hits skin → converts 7-dehydrocholesterol → vitamin D3 → teaches the mechanism
4. **Why don't tanning beds work?** — Designed for UVA (tanning), minimise UVB, so cancer risk without the vitamin D → the irony
5. **But why do they still feel good?** — It's the bright light hitting your eyes, not the UV on your skin → **this is the pivot point**, the "aha" moment
6. **The safer alternative** — If the feel-good effect comes from visible light, we don't need UV at all → full-spectrum LEDs give the mood/energy/circadian benefits without the cancer risk → honest about what it can and can't do (won't produce vitamin D, but will simulate a sunny day for your brain)

The one gap I mentioned: your original reasoning jumped from "tanning beds feel good" straight to "full-spectrum light." I added the explicit bridge in Part 5 — explaining that the feel-good effect comes through the *eyes*, not the skin — which makes the leap to "then we don't need UV at all" feel natural and logical rather than hand-wavy. That's the moment where the viewer should go "oh, that makes sense."

---

**User**

okay its good but it doesn't soundlike me and its difficult for me to reword it when its already writen in a different sytle, lets do it differntly instead of you writing the dialog, draft the scientific reasoning chains as formal text so that i can go through each section and write the dialog how i would word it. mark the sections as todo write dialog

---

**Cursor**

Done. Each of the six parts now has the factual content laid out as bullet points and key facts for you to reference, with `TODO: Write dialog` markers so you can go through them one by one and put it in your own words. The reasoning chain and visual suggestions are still there so you know what to hit — you just fill in how you'd actually say it.

---

**User**

while we are at it are there any uvb lamps and are they safe / benefitial

---

**Cursor**

Good question — and actually relevant to your video since it fills a gap in the story.

**Yes, UVB lamps exist and they work.** Here's the breakdown:

## What's Available

- **Narrowband UVB lamps** (310–311 nm) — These are the medical-grade ones. They target the specific UVB wavelength range that triggers vitamin D production while minimising burn risk. Used clinically for psoriasis and vitamin D deficiency for years.
- **Sperti Vitamin D Lamp** — An FDA-approved (Class II medical device) consumer product. Studies showed a ~47.5% increase in vitamin D levels with 5-minute sessions, 3x per week for 4 weeks.
- **SOLIUS system** — A newer device. A 2025 randomised controlled trial showed it raised serum vitamin D by ~10 ng/ml over 21 weeks with no serious side effects.
- **Wearable UVB LEDs** — Prototype devices worn on the wrist for just 2 minutes daily showed significant vitamin D improvements after 4 weeks.

## Are They Safe?

Broadly yes, **with caveats:**

- Narrowband UVB is much safer than broadband UVB or tanning beds because it targets a narrow slice of the spectrum rather than blasting you with everything.
- Minor side effects are common (~50% of users in one study): redness, itchiness — generally mild and self-limiting.
- Proper dosing is critical — start at ~3 minutes, cap at ~5 minutes, maintain recommended distance (~15 inches). Overuse still carries skin cancer risk.
- One study found narrowband UVB 3x/week was **more effective at treating vitamin D deficiency than 1,600 IU of daily oral vitamin D3**.

## Are They Worth It?

That depends on the person. They're more expensive than supplements (the Sperti lamp is ~$400–500), and you need to be disciplined about dosing. But for someone who has absorption issues with oral vitamin D, or who wants a more "natural" pathway, they're a legitimate option backed by real clinical evidence.

## How This Fits Your Video

This is actually a nice piece to mention briefly in Part 4 or Part 6 of your science segment — it strengthens your credibility. Something like: *"UVB lamps do exist, and they can genuinely produce vitamin D — but they're medical devices with strict dosing requirements, not something you casually put on your desk."* It reinforces why your project focuses on the visible-light side of the equation: it's the approach that's both safe for DIY and addresses the mood/energy problem most people actually feel day-to-day.

---

**User**

good points now that we are talking about safety, are there any safetey concerns regarding fullspectrum light therapy?

---

**Cursor**

Good instinct — this is worth knowing for yourself and definitely worth a brief mention in the video (builds trust with the audience). Here's the full picture:

## Generally Safe, But Not Risk-Free

Full-spectrum / bright light therapy is considered safe for most healthy people. Side effects when they occur are usually **mild and short-lived**: headaches, eye strain, nausea, irritability. That said, there are some real concerns:

## Blue Light and Eye Health

This is the biggest one for a desk lamp you'll be using daily:

- Full-spectrum and daylight-temperature lights (5000K+) contain significant blue light (400–490 nm range).
- Long-term intense blue light exposure can be a concern for **retinal health**, particularly the photoreceptors and pigment epithelium.
- **Over age 50**, there's elevated concern about blue light worsening age-related macular degeneration.
- The recommendation from the Center for Environmental Therapeutics: if you're using it as a daily lamp (not just a timed 30-minute therapy session), consider **soft-white (3000–4000K)** rather than full daylight temperature (5000K+), to reduce blue-light load.
- Key rule: **never stare directly at the light source.** The light should enter your eyes indirectly (lamp above or to the side, angled toward your face).

## Bipolar Disorder / Mania Risk

- Bright light therapy can **trigger manic episodes** in people with bipolar disorder (diagnosed or undiagnosed). This is the most serious psychiatric risk.
- It's why clinical protocols stress gradual ramp-up and medical supervision if there's any bipolar history.

## Photosensitising Medications

A surprisingly long list of common medications make your skin and retinas more sensitive to light:
- Psychiatric drugs (certain neuroleptics)
- Some antibiotics (tetracycline)
- Diuretics
- St. John's Wort (ironic, since people take it for mood)
- Certain heart medications (antiarrhythmics)

If you're on any of these, bright light therapy should be discussed with a doctor first.

## Medical Contraindications

Light therapy is **not recommended** for people with:
- Retinal dystrophies or inherited retinal degenerations
- Age-related macular degeneration
- Diabetic retinopathy
- Porphyria, lupus, chronic actinic dermatitis, solar urticaria
- Glaucoma or cataracts (consult eye specialist first)

## What This Means for Your Lamp Design

A few practical takeaways:

1. **Colour temperature matters.** You might want to include a note in the video about choosing the right LED strip — or even making the colour temperature adjustable (warm for long daily use, cooler for shorter therapy sessions).
2. **Brightness control is essential** — which you already have in your parts list (the dimmer dial). Good.
3. **Positioning matters** — your lamp design with adjustable rods/hinges is actually ideal. The light should come from above or the side, not be stared at head-on.
4. **Add a disclaimer in the video** — something brief like "I'm not a doctor, if you have eye conditions or take photosensitising medication, check with your doctor first." Standard YouTuber responsibility stuff, but it protects you and shows you've done your homework.

This could fit nicely as a brief aside at the end of Part 6 in your science segment — after you've sold the viewer on the benefits, a quick "now, a few things to be aware of" section keeps it honest without killing the momentum.

---

**User**

while we are at it I was thinking if we should make a extra lamp design or make the lampdesign generic so that we could also use infrarred lightbulb i know that infrared is also used in light therapy, what do you think about that, or would it make more sense to create another video explicitly for the infrared lamp

---

**Cursor**

Great question. I'd recommend **making it a separate video**, and here's why:

## They're Completely Different Technologies

Full-spectrum bright light therapy and red/infrared light therapy work through **entirely different biological mechanisms**:

| | Full-Spectrum (your current project) | Red / Near-Infrared |
|---|---|---|
| **Wavelengths** | Broad visible spectrum (380–780nm) | ~660nm (red) + ~850nm (NIR) |
| **How it's measured** | Brightness (lux) | Power density (mW/cm²) |
| **Pathway** | Through your **eyes** → brain → circadian rhythm | Through your **skin** → mitochondria → cellular energy (ATP) |
| **What it does** | Resets circadian clock, boosts serotonin, suppresses melatonin | Reduces inflammation, promotes tissue repair, collagen production, joint pain relief |
| **Used for** | SAD, mood, energy, sleep regulation | Skin aging, joint pain, hair regrowth, wound healing, muscle recovery |
| **Usage** | 20–30 min in the morning, facing the light | Varies wildly by application — different distances, durations, power levels |

They are **not interchangeable**. Red light therapy cannot treat SAD. Bright light therapy cannot heal joints. Combining them in one device would mean the lamp tries to do two unrelated things, which muddies your video's narrative and your design requirements.

## Why a Separate Video Is the Better Call

1. **Clearer story.** Your current video has a clean arc: winter sucks → sunlight matters → here's the science → I built a lamp that simulates daylight. Adding infrared would fork the narrative and confuse the viewer about what the lamp actually does.

2. **Two videos are better than one.** If people like the full-spectrum lamp video, an infrared lamp follow-up is a natural sequel. You already have the audience primed. "Last time we tackled mood and energy, this time let's tackle recovery and pain."

3. **Different design constraints.** An infrared therapy panel has very different requirements — specific wavelengths (660nm + 850nm), power density matters more than lux, distance and exposure time protocols vary by body part. It genuinely deserves its own design process.

4. **You could tease it.** At the end of your current video, mention: "Now, this lamp handles the visible light side of things. But sunlight also has infrared, and that has a whole other set of benefits — tissue repair, inflammation, recovery. I'm working on something for that too." Boom — instant hook for the next video.

## That Said — A Modular Design Is Still Smart

Even though the videos should be separate, designing your lamp's **hardware to be modular** (swappable light strips/bulbs, standardised mounting) is a great engineering choice. You just don't need to explain or justify it in video one. It becomes a satisfying callback in video two: "Remember the desk lamp from last time? I designed it so the light module is swappable — so let's snap in an infrared panel and turn it into a recovery lamp."

That modular reveal would actually be a fantastic hook for the second video.

---

**User**

@docs/videos/projects/infrared therapy lamp/storybook.md I made a storybook file for the infrared light lamp, add some quick notes to it so that i rember what we were trying to do for a future video

---

**Cursor**

Done. I put in everything we discussed — the science summary, how it differs from the full-spectrum lamp, the modular design callback idea, evidence-backed benefits, and a list of open questions for when you come back to it. Should be enough to pick it back up without having to re-research everything from scratch.

---

**User**

perfect now back to our full spectrum ligh video project i renamed the folder @docs/videos/projects/full spectrum therapy lamp/storyboard.md lets add the part about the uvb and sfety of the full spectrum lamp to the science part in the keynotes format we are already using

---

**Cursor**

Done. I added two new parts to the science segment:

- **Part 7 — What about UVB lamps?** — Addresses the obvious viewer question, acknowledges they work, but explains why they're medical devices with strict protocols and not a casual desk lamp. Reinforces why your project focuses on visible light.

- **Part 8 — Safety notes for full-spectrum light** — Covers blue light / eye health, bipolar mania risk, photosensitising medications, and medical contraindications. Also ties back to your lamp design (dimmer, adjustable positioning, potentially adjustable colour temperature). Ends with a disclaimer note.

Both follow the same key-points format with `TODO: Write dialog` markers so you can word them yourself.

---

**User**

lets search the web for good light sources for our lamp, i have looked around a bit but i am unsure what i have to whatch out for in order to find real full spectrum lights that are actually light therapy grade, also what kinds are there are ther like led strips or only bulbs?

---

**Cursor**

Here's everything I found, broken down into what matters for your build:

---

## What to Watch Out For — The Spec Sheet Checklist

When shopping for LED strips/bulbs, these are the specs that separate genuine full-spectrum from marketing fluff:

### 1. CRI (Color Rendering Index) — Minimum 95+
- CRI measures how accurately colours appear under the light vs. natural sunlight (scale of 0–100).
- **95+ is the threshold** for "light therapy grade." Below that, the spectrum has gaps.
- But CRI alone isn't enough — it's an average across colour samples. You also need...

### 2. R9 Value — Minimum 80, ideally 90+
- R9 specifically measures deep red rendering. Most cheap "high CRI" LEDs cheat here — they score well on the easier colour samples but tank on R9.
- If a listing doesn't mention R9, it's probably hiding something.

### 3. Spectral Power Distribution (SPD) Chart
- This is the gold standard. A genuine full-spectrum LED should publish an SPD chart showing a **smooth, continuous curve** across 380–780 nm, resembling sunlight.
- If the chart shows sharp spikes (especially a big blue spike around 450 nm with a gap in cyan/green) — that's a standard phosphor-converted LED pretending to be full spectrum.
- If there's no SPD chart at all, walk away.

### 4. Colour Temperature — 5000K–6500K for therapy
- **5000K** = neutral daylight. Good for extended daily use (less blue light load).
- **6500K** = cool daylight. Closer to midday sun, stronger circadian effect, but harsher for long sessions.
- Ideal for your lamp: **adjustable or tuneable white (e.g. 2700K–6500K)** so you can go warm in the evening, cool in the morning.

### 5. Flicker-Free
- Cheap LED strips can flicker at mains frequency, causing headaches and eye strain — exactly what you don't want in a therapy lamp.
- Look for strips/drivers explicitly labelled **flicker-free**. The power supply matters as much as the strip itself here.

### 6. Lumen Output — You need a lot
- To hit **10,000 lux at ~50 cm distance** (a reasonable desk distance), you need roughly **7,000–8,000 lumens** depending on beam angle and reflector design.
- For context, a typical 5m high-CRI LED strip puts out around 1,000–1,600 lumens total. So you'd need multiple strips, or a denser/higher-output option.
- Commercial SAD lamps cheat by having you sit very close (15–20 cm). At that distance you need far fewer lumens.

---

## What Form Factors Exist

### LED Strips (flexible tape)
- **Best for your project.** Easy to mount in custom shapes, cut to length, run on 12V or 24V DC.
- Available in standard density and high-density (COB — Chip on Board, gives a smooth dotless light).
- Can be soldered together, attached to aluminium extrusions for heat dissipation.
- Downside: may need multiple strips or high-density options to hit 10,000 lux at desk distance.

### COB LED Strips
- A subtype of LED strip where chips are packed so tightly you get a continuous line of light (no visible dots).
- Smoother, more uniform illumination — looks more professional and better for a diffused lamp.
- Available in high CRI options.

### LED Panels / COB Modules
- Pre-made flat panels with many LEDs packed together. Higher lumen output in a compact form factor.
- Easier to hit 10,000 lux but less flexible for custom lamp shapes.
- Often used in studio/photography lighting — those 100W COB panels can do 10,000+ lumens.

### LED Bulbs (E27/GU10 etc.)
- Simplest option — screw into a socket and done.
- Harder to build a custom lamp around. Limited directionality.
- Full-spectrum high-CRI bulbs exist (Waveform, Yuji) but output is typically 800–1600 lumens per bulb.

---

## Brands Worth Looking At

| Brand | Product | CRI | Notes | Price (approx.) |
|---|---|---|---|---|
| **Yuji (SunWave)** | LED strips, panels | 97–98 | 99% solar similarity claim, publishes SPD charts, popular in DIY SAD lamp builds | ~$225 / 5m strip |
| **Waveform Lighting** | Centric Home / Centric Daylight strips | 95+ (R9 >80) | Flicker-free, publishes SPD data, has an SPD simulator tool on their site, US-based | ~$50–80 / 5m strip |
| **Lumicrest (Spectrala)** | COB dotless strips | 95+ | Smooth light output, 24V, dimmable, premium tier | ~$100+ / 5m |
| **SuperBrightLEDs** | Lux Tape Light | 97 | Budget-friendlier high-CRI option, 24V | ~$50–70 / 5m |

Yuji SunWave is the most commonly recommended in DIY light therapy builds because they publish actual spectral data and the curve genuinely matches sunlight closely. Waveform is the best for flicker-free confidence and they have great educational content on their site about what the specs actually mean.

---

## Practical Recommendation for Your Build

Given your desk lamp form factor:

1. **Start with Yuji SunWave or Waveform Centric Daylight strips** in 5000K or 6500K. Both publish SPD charts so you can verify the spectrum.
2. **Use aluminium extrusion profiles** as the mounting surface — they act as heatsinks and keep the strips cool (heat kills LED lifespan and shifts colour).
3. **Budget for a quality 24V constant-voltage driver** that's flicker-free. Don't cheap out here.
4. **Do the lux math for your specific design** — measure the distance from the strip to your face in your lamp design, then calculate how many lumens you need. You can use the online calculators at lumistrips.com. You may need to double up strips or use a more compact, denser arrangement.
5. **Add a PWM dimmer** for brightness control (already in your parts list).

Want me to add any of this to the storyboard or to a separate research/BOM document?

---

**User**

hmm any tips on wher i can find lights that are a bit cheaper 200. for a 5m strip is quite pricey

---

**Cursor**

Yeah, $200+ for a strip is steep, especially when you might need more than one. Here's what I found for budget-friendlier options:

## Budget Tier — AliExpress (~$15–30 for 5m)

These are the cheapest options. Some DIY builders have used them successfully, but you need to be careful:

- **"Full Spectrum RA98" strips** — 24V, 120–240 LEDs/m, 3000K–6000K options. Around $15–25 for 5m. Claims RA98 but take that with a grain of salt — Chinese sellers often exaggerate CRI numbers.
- **Auxmer 2835 WWCW strips** — CRI >95 claimed, 120–240 LEDs/m, 2400K–6500K, 12V/24V. Around $25–30 for 5m.
- **"DIY LED U-HOME" SMD5630 strips** — CRI 90+/95+/97+ variants. Popular with photography DIYers.

**The catch:** These strips rarely publish SPD charts. The CRI claim might be measured under favourable conditions or simply made up. One YouTube reviewer (GreesLED review) actually tested an AliExpress 95+ CRI strip with a spectrometer and found it was *okay* but not as good as the spec sheet claimed.

**Tip if you go this route:** Order one strip first, and if you have access to a spectrometer (or know someone with one — maybe a university lab or a photography friend), verify the spectrum before building your whole lamp around it. You could also film the testing process for the video — that's actually great content.

## Mid Tier — Solid Options (~$50–100 for 5m)

- **Waveform Lighting Centric Home** — CRI 95+, flicker-free, publishes SPD data. Their 5m strips are typically around **$50–80** depending on density and colour temperature. Ships from the US, so factor in shipping to Switzerland, but the price-to-quality ratio is probably the best out there.
- **Lumicrest Spectrala** — COB dotless, CRI 95+, starts at **~$53** for 5m. Nice smooth light output. Multiple colour temperatures available.
- **SuperBrightLEDs Lux Tape** — CRI 97, starts at **~$70–100** for 5m. Solid middle ground.

## The Smart Play for Your Project

Given that you're building a desk lamp (not lighting a whole room), you probably don't need a full 5m strip. Depending on your lamp head dimensions, you might only need **0.5–1.5m** of strip. That changes the maths significantly:

| Brand | 5m price | Per-metre cost | Cost for 1m |
|---|---|---|---|
| AliExpress budget | ~$20 | ~$4/m | ~$4 |
| Waveform Centric | ~$65 | ~$13/m | ~$13 |
| Lumicrest Spectrala | ~$53 | ~$11/m | ~$11 |
| Yuji SunWave | ~$225 | ~$45/m | ~$45 |

At 1–1.5m, even the Waveform or Lumicrest strips are only $11–20. That's very reasonable for verified quality with published spectral data.

## My Suggestion

Go **Waveform or Lumicrest** for the actual build — at the length you'll need, the price difference versus AliExpress is only $5–15, and you get published SPD charts, flicker-free guarantees, and credibility when you talk about it in the video. Then **also order a cheap AliExpress strip** and do a comparison test on camera — that's content gold. "I tested a $4 strip vs. a $13 strip — here's what I found." Viewers love that kind of head-to-head.

Also worth noting: since you're in Switzerland, check shipping costs and import duties. Waveform ships from the US. Lumicrest is Canadian. AliExpress is usually duty-free under CHF 65. You might also search for European resellers of high-CRI strips to avoid customs hassle.

