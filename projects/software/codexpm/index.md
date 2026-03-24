---
title: "CodexPM"
description: "Formal specification language for computer systems enabling automated verification and standards compliance."
status: "Idea"
category: "Software"
tags: ["Formal Verification", "Specifications", "Architecture"]
published: false
---

- can we formalize specifications for computer systems to an unambiguous language
- differentiate between the implementation and the formalization/specification.
- a formalization can be verified and audited to comply with certain standards.
  Here an example formalize authentication processes with all systems involved the formal specification already defines certain structures, that need to be fulfilled in this case client, idp, protected resource etc. the code is then written to match the formalization, if it matches the software automatically complies with the standard given by the specification.
- trade off analysis

- flow specification: explicitly describe the way the user access the software:
  - user environment (internet / intranet)
  - browser
  - domain resolution / which hostarr / dns caps etc
  - reverse proxy
  - swa
  - api
  - idp
