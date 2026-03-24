---
title: "System Specification Compiler"
description: "A DSL compiler that translates system specifications into end-to-end tests using actors, resources, actions, and workflows."
status: "Design"
category: "Software"
tags: ["Compiler", "DSL", "Testing", "Developer Tools"]
published: false
---

I would like to build my own specification language that is used to define systems and is compiled into special e2e tests

language components
 - actors/agents
   - actors define agents in a system which can act on them their environments
   - they are entrypoints on workflows
   - examples: system admin, business user, private user
 - resources/systems/interfaces
   - a resource defines a subset of a system that can be interacted with
   - examples: frontend, email
 - actions/port
   - a action defines how a system can be interacted with
   - examples: open Page, click button, 
 - workflow
   - a workflow defines a flow from end to end, it is always initiated by a actor
   - every statement defines which actor, performs which action of which system and returns a result for example a new resource
   - example:
     - 1. system admin opens the register page of the plantform frontend -> returns webpage
     - 2. system admin clicks the sign up button on the register page -> returns

syntax: i would like the language to be as close to natural language as possible
