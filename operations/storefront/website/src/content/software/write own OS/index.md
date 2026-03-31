---
type: "project"
title: "GABROS"
description: "Custom operating system with graph-based filesystem, native versioning, and a custom orchestration language."
status: "Idea"
category: "Software"
tags: ["Operating System", "Filesystem", "Programming Language", "Systems"]
published: false
---

## Overview

A custom operating system (GABROS) built around a fundamentally different filesystem concept — where files are nodes in a graph rather than a tree, with native versioning and a custom programming language for orchestration.

## Problem

Traditional filesystems use tree structures that force files into a single location. This doesn't reflect how knowledge and projects are actually organized — things naturally belong in multiple contexts. Versioning is bolted on after the fact (git), and metadata is second-class.

## Approach

### Filesystem

- Every folder is also a file that can have content
- Files are nodes stored and indexed as a flat list
- File structures are graph structures, not trees — files/nodes can be referenced in multiple locations
- Each file has native metadata (key-value storage), separated from content
- Native versioning system built into the filesystem

### Custom Programming Language

An orchestration/controller language with type annotations:

```
x ∈ string

handler(x ∈ string)
{
  validate(x)
  branch()
}
```

## Open Questions

- What kernel to start from? (Write from scratch, fork Linux, use a microkernel?)
- How to implement the graph filesystem efficiently?
- How does native versioning interact with the graph structure?
- What does the orchestration language compile to?
- MVP scope — filesystem-only prototype vs. full OS?

## References

## Log
