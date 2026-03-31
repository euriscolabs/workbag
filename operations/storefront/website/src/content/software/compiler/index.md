---
type: "project"
title: "System Specification Compiler"
description: "A DSL compiler that translates system specifications into end-to-end tests using actors, resources, actions, and workflows."
status: "Design"
category: "Software"
tags: ["Compiler", "DSL", "Testing", "Developer Tools"]
published: false
---

## Overview

A custom specification language that defines systems declaratively using actors, resources, actions, and workflows — and compiles these definitions into executable end-to-end tests.

## Problem

Writing and maintaining end-to-end tests is tedious and error-prone. System behavior is often described informally, and there's a disconnect between how stakeholders describe workflows and how tests are implemented.

## Approach

### Language Components

- **Actors/Agents** — Define agents in a system that can act on their environments. They are entrypoints on workflows. Examples: system admin, business user, private user.
- **Resources/Systems/Interfaces** — Define a subset of a system that can be interacted with. Examples: frontend, email.
- **Actions/Ports** — Define how a system can be interacted with. Examples: open page, click button.
- **Workflows** — Define an end-to-end flow, always initiated by an actor. Every statement defines which actor performs which action on which system and returns a result (e.g. a new resource).

### Syntax Goal

The language should be as close to natural language as possible.

### Example Workflow

1. System admin opens the register page of the platform frontend → returns webpage
2. System admin clicks the sign up button on the register page → returns ...

## Open Questions

- What parser/compiler toolchain to use? (ANTLR, tree-sitter, custom?)
- How to map abstract actions to concrete test implementations (Playwright, Cypress, etc.)?
- How to handle async workflows and non-deterministic behavior?
- Should workflows support branching/conditional logic?

## References

## Log
