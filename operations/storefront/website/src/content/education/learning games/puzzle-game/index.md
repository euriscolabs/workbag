---
type: "project"
title: "Exit-Style Puzzle Game"
description: "Cross-platform escape room puzzle game inspired by the Exit tabletop series, built in Unity."
status: "Planning"
category: "Education"
tags: ["Game Dev", "Unity", "Puzzles", "C#"]
published: false
---

## Overview

A cross-platform puzzle game inspired by the Exit tabletop game series (Kosmos). Players solve escape room-style puzzles through item collection, combination, card-based validation (decoder wheel), and progressive hints — all wrapped in narrative storytelling.

## Problem

Escape room games are engaging but physical versions are single-use. A digital version can be replayed, expanded, and distributed — while preserving the satisfying tactile mechanics like the decoder wheel.

## Approach

- **Engine:** Unity 2022.3 LTS, C#
- **Core systems:** Puzzle engine, inventory, decoder wheel, 3-tier hint system, timer, narrative/dialog
- **Platforms:** Windows, Mac, Linux, iOS, Android, WebGL
- **Art style:** 2D, clean and modern
- **Data-driven:** ScriptableObjects for puzzles, items, narrative; JSON for saves

### Development Phases

1. Foundation (project setup, scene management, save/load)
2. Core systems (inventory, puzzle engine, item interaction)
3. Exit mechanics (decoder wheel, hints, timer, narrative)
4. First complete puzzle (integration, testing, playtesting)
5. Polish & expansion (additional puzzles, audio, cross-platform testing)

## Open Questions

- First puzzle theme/scenario?
- Asset pipeline — self-created or sourced?
- Monetization: free + DLC puzzle packs? One-time purchase?
- Scope for MVP: how many puzzles before first release?

## References

- Exit game series by Kosmos (inspiration)
- Detailed PRD in [requirements.md](requirements.md)

## Log
