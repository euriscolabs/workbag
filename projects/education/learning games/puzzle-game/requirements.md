# Product Requirements Document: Exit-Style Puzzle Game

## 1. Executive Summary

### 1.1 Product Overview
A cross-platform puzzle game inspired by the Exit tabletop game series from Kosmos. Players solve escape room-style puzzles through item collection, combination, card-based validation, and progressive hint systems. The game combines narrative storytelling with challenging logic puzzles to create an immersive escape room experience.

### 1.2 Target Audience
- **Primary**: Puzzle game enthusiasts, escape room fans, tabletop gamers
- **Secondary**: Casual gamers looking for engaging single-player experiences
- **Age Range**: 13+ (teenagers and adults)
- **Platform**: Cross-platform (Windows, Mac, Linux, iOS, Android, WebGL)

### 1.3 Success Metrics
- Player completion rate > 60% for first puzzle
- Average play session duration: 30-60 minutes
- Player retention: > 40% return for additional puzzles
- User rating: > 4.0/5.0 on app stores
- Hint usage rate: 30-50% of players use at least one hint

## 2. Product Goals and Objectives

### 2.1 Primary Goals
1. **Engaging Gameplay**: Create challenging yet solvable puzzles that provide satisfaction upon completion
2. **Immersive Experience**: Deliver narrative-driven gameplay that draws players into each scenario
3. **Accessibility**: Provide hint systems and difficulty options to accommodate various skill levels
4. **Cross-Platform**: Ensure consistent experience across all target platforms
5. **Scalability**: Design systems that allow easy addition of new puzzles and scenarios

### 2.2 Business Objectives
- Establish foundation for potential sequel or expansion content
- Build player base for future puzzle game releases
- Create reusable game systems for other puzzle game projects
- Learn Unity game development best practices

## 3. Features and Requirements

### 3.1 Core Gameplay Features

#### 3.1.1 Puzzle System
**Description**: Modular puzzle system supporting multiple puzzle types with validation and progression tracking.

**Requirements**:
- Support multiple puzzle types:
  - Logic puzzles (deductive reasoning)
  - Pattern recognition (sequences, codes)
  - Item-based puzzles (combination, usage)
  - Code-breaking (decoder wheels, ciphers)
  - Spatial puzzles (arrangements, connections)
- Puzzle validation system with clear success/failure feedback
- Puzzle progression tracking (completed, in-progress, locked)
- Puzzle state persistence (save/load)
- Puzzle difficulty ratings (Easy, Medium, Hard)

**Acceptance Criteria**:
- Players can attempt puzzles in defined order or open exploration
- Puzzle completion triggers appropriate rewards and narrative progression
- Failed attempts provide feedback without revealing solution
- Puzzle state persists across game sessions

#### 3.1.2 Inventory System
**Description**: Item collection, storage, and combination mechanics.

**Requirements**:
- Visual inventory UI with grid or list layout
- Item collection from game world (click/pickup interactions)
- Item storage with capacity limits (configurable)
- Item combination system:
  - Drag-and-drop or click-to-combine interface
  - Validation of valid combinations
  - Creation of new items from combinations
  - Visual feedback for combination attempts
- Item usage system:
  - Use items on puzzles, objects, or other items
  - Context-sensitive usage validation
  - Item consumption where appropriate
- Item descriptions and tooltips
- Inventory persistence across sessions

**Acceptance Criteria**:
- Players can collect items from the environment
- Inventory UI is accessible and intuitive
- Item combinations work as designed
- Invalid combinations provide clear feedback
- Inventory state saves and loads correctly

#### 3.1.3 Card System (Decoder Wheel)
**Description**: Card-based answer validation system inspired by Exit games' decoder wheel mechanic.

**Requirements**:
- Decoder wheel interface:
  - Rotatable card/wheel mechanism
  - Visual representation of card positions
  - Smooth rotation animations
  - Multiple card layers (if applicable)
- Answer card system:
  - Answer cards with symbols/numbers/letters
  - Card matching validation
  - Visual card rendering
  - Card interaction (flip, rotate, select)
- Answer validation:
  - Check decoder wheel alignment
  - Validate answer card combinations
  - Provide feedback on correct/incorrect answers
  - Limit incorrect attempts (optional)
- Card collection/progression:
  - Unlock cards through puzzle progression
  - Card inventory management

**Acceptance Criteria**:
- Decoder wheel rotates smoothly and responsively
- Answer validation works correctly
- Visual feedback is clear for correct/incorrect answers
- Card system integrates seamlessly with puzzle completion

#### 3.1.4 Hint System
**Description**: Progressive hint system that provides assistance without revealing solutions directly.

**Requirements**:
- Three-tier hint system:
  - **Tier 1 (Subtle)**: General direction or area to focus on
  - **Tier 2 (Moderate)**: More specific guidance
  - **Tier 3 (Direct)**: Clear instruction without full solution
- Hint tracking:
  - Track which hints have been viewed per puzzle
  - Optional hint usage statistics
  - Prevent hint spoilers for unviewed hints
- Hint UI:
  - Accessible hint button/panel
  - Progressive reveal animations
  - Clear indication of hint tier
  - Option to dismiss hints
- Hint availability:
  - Configurable unlock conditions (time-based, attempt-based, or always available)
  - Optional hint cooldown periods

**Acceptance Criteria**:
- Players can access hints when stuck
- Hints provide appropriate level of assistance
- Hint system doesn't break puzzle immersion
- Hint usage is tracked and displayed

#### 3.1.5 Timer System
**Description**: Optional timer that tracks completion time and provides challenge mode.

**Requirements**:
- Timer display:
  - Visible timer in UI (hours:minutes:seconds format)
  - Pause/resume functionality
  - Timer stops when game is paused
- Timer modes:
  - **Off**: No timer (default for casual play)
  - **Standard**: Timer runs but no penalties
  - **Challenge**: Time-based scoring/rating
- Time tracking:
  - Per-puzzle time tracking
  - Total game time tracking
  - Best time records
- Time-based features:
  - Optional time-based ratings (1-5 stars based on completion time)
  - Time leaderboards (future feature)
  - Time-based achievements (future feature)

**Acceptance Criteria**:
- Timer displays accurately and updates in real-time
- Timer can be toggled on/off in settings
- Timer persists correctly across sessions
- Time-based ratings work as designed

#### 3.1.6 Narrative System
**Description**: Story-driven progression that provides context and motivation for puzzles.

**Requirements**:
- Narrative structure:
  - Story text for each scenario/puzzle
  - Character introductions and development
  - Environmental descriptions
  - Puzzle context and backstory
- Narrative delivery:
  - Dialog system with text display
  - Optional typewriter effect for text
  - Character portraits (optional)
  - Narrative triggers tied to puzzle completion
- Narrative progression:
  - Story unlocks with puzzle completion
  - Multiple narrative paths (if applicable)
  - Story state persistence
- Narrative integration:
  - Puzzles feel connected to story
  - Story provides motivation for puzzle solving
  - Narrative rewards for progression

**Acceptance Criteria**:
- Narrative text displays correctly
- Story progresses logically with puzzle completion
- Narrative enhances rather than distracts from gameplay
- Story state saves and loads properly

### 3.2 User Interface Features

#### 3.2.1 Main Menu
**Requirements**:
- Game title and branding
- "New Game" button
- "Continue" button (if save exists)
- "Settings" button
- "Credits" button
- "Quit" button
- Visual polish (animations, transitions)

#### 3.2.2 In-Game HUD
**Requirements**:
- Inventory button/panel toggle
- Hint button (always accessible)
- Timer display (if enabled)
- Pause menu button
- Settings access
- Progress indicator (optional)

#### 3.2.3 Inventory UI
**Requirements**:
- Grid or list layout for items
- Item icons with visual clarity
- Item tooltips on hover
- Drag-and-drop functionality
- Combination area/interface
- Close/minimize button
- Responsive design for different screen sizes

#### 3.2.4 Puzzle Interface
**Requirements**:
- Clear puzzle presentation
- Interactive elements (clickable objects, draggable items)
- Puzzle instructions/description area
- Answer input interface (for applicable puzzles)
- Visual feedback for interactions
- Progress indicators

#### 3.2.5 Settings Menu
**Requirements**:
- Audio settings:
  - Master volume slider
  - Music volume slider
  - SFX volume slider
  - Mute toggles
- Gameplay settings:
  - Timer toggle (on/off)
  - Difficulty selection (if applicable)
  - Hint availability settings
- Graphics settings:
  - Resolution selection
  - Fullscreen toggle
  - Quality settings
- Controls:
  - Key rebinding (if applicable)
  - Touch sensitivity (mobile)
- Accessibility:
  - Text size options
  - Colorblind mode (optional)
  - Subtitles/captions (if applicable)

### 3.3 Technical Features

#### 3.3.1 Save/Load System
**Requirements**:
- Save game state:
  - Puzzle completion status
  - Inventory contents
  - Narrative progression
  - Timer state
  - Settings preferences
- Multiple save slots (minimum 3)
- Auto-save functionality (optional)
- Save file validation and error handling
- Cross-platform save compatibility (if applicable)

#### 3.3.2 Scene Management
**Requirements**:
- Smooth scene transitions
- Scene loading screens (optional)
- Scene state management
- Proper cleanup between scenes

#### 3.3.3 Audio System
**Requirements**:
- Background music:
  - Themed music for different scenarios
  - Music transitions
  - Volume control
- Sound effects:
  - UI interactions (clicks, hovers)
  - Puzzle completion sounds
  - Item pickup/combination sounds
  - Error/incorrect attempt sounds
  - Ambient sounds
- Audio mixing and balancing
- Audio resource management

#### 3.3.4 Input System
**Requirements**:
- Mouse/touch input support
- Keyboard navigation (accessibility)
- Input validation and error handling
- Responsive input feedback

## 4. User Stories

### 4.1 Core User Stories

**US-001**: As a player, I want to start a new game so that I can begin solving puzzles.
- **Priority**: Critical
- **Acceptance**: New game button works, initializes fresh game state

**US-002**: As a player, I want to collect items from the environment so that I can use them to solve puzzles.
- **Priority**: Critical
- **Acceptance**: Items can be clicked/collected, appear in inventory

**US-003**: As a player, I want to combine items so that I can create new items needed for puzzles.
- **Priority**: Critical
- **Acceptance**: Valid combinations work, invalid combinations show feedback

**US-004**: As a player, I want to solve puzzles using collected items so that I can progress through the game.
- **Priority**: Critical
- **Acceptance**: Puzzle completion unlocks next content, provides feedback

**US-005**: As a player, I want to use the decoder wheel to validate answers so that I can complete puzzles.
- **Priority**: Critical
- **Acceptance**: Decoder wheel rotates, validates answers correctly

**US-006**: As a player, I want to access hints when stuck so that I can continue playing.
- **Priority**: High
- **Acceptance**: Hints are accessible, provide appropriate assistance

**US-007**: As a player, I want to save my progress so that I can continue later.
- **Priority**: High
- **Acceptance**: Save works, load restores game state correctly

**US-008**: As a player, I want to see a timer so that I can track my completion time.
- **Priority**: Medium
- **Acceptance**: Timer displays accurately, can be toggled

**US-009**: As a player, I want to experience a story so that I feel motivated to solve puzzles.
- **Priority**: High
- **Acceptance**: Narrative displays, progresses with puzzle completion

**US-010**: As a player, I want to adjust settings so that I can customize my experience.
- **Priority**: Medium
- **Acceptance**: Settings menu accessible, changes persist

### 4.2 Secondary User Stories

**US-011**: As a player, I want to see my inventory at all times so that I know what items I have.
- **Priority**: Medium

**US-012**: As a player, I want visual feedback for interactions so that I know my actions registered.
- **Priority**: Medium

**US-013**: As a player, I want smooth animations so that the game feels polished.
- **Priority**: Low

**US-014**: As a player, I want to pause the game so that I can take breaks.
- **Priority**: Medium

## 5. Technical Specifications

### 5.1 Technology Stack
- **Game Engine**: Unity 2022.3 LTS or newer
- **Programming Language**: C#
- **UI Framework**: Unity UI (uGUI)
- **Data Format**: ScriptableObjects, JSON for save data
- **Version Control**: Git

### 5.2 Platform Requirements

#### 5.2.1 Desktop (Windows, Mac, Linux)
- **Minimum**:
  - OS: Windows 10, macOS 10.14, Ubuntu 18.04
  - CPU: Dual-core 2.0 GHz
  - RAM: 4 GB
  - Graphics: DirectX 11 compatible
  - Storage: 500 MB
- **Recommended**:
  - OS: Latest version
  - CPU: Quad-core 2.5 GHz
  - RAM: 8 GB
  - Graphics: Dedicated GPU
  - Storage: 1 GB

#### 5.2.2 Mobile (iOS, Android)
- **Minimum**:
  - iOS: iOS 12+, iPhone 6s or newer
  - Android: Android 7.0+, 2 GB RAM, OpenGL ES 3.0
  - Storage: 500 MB
- **Recommended**:
  - iOS: iOS 14+, iPhone 8 or newer
  - Android: Android 10+, 4 GB RAM
  - Storage: 1 GB

#### 5.2.3 WebGL
- Modern browser with WebGL 2.0 support
- Chrome, Firefox, Safari, Edge (latest versions)

### 5.3 Architecture Patterns
- **Singleton Pattern**: For managers (GameManager, AudioManager, etc.)
- **Component-Based**: Unity's component system
- **ScriptableObjects**: For data-driven design (puzzles, items, narrative)
- **Event System**: UnityEvents or C# events for decoupled communication
- **State Machine**: For game state management
- **Observer Pattern**: For UI updates

### 5.4 Performance Requirements
- **Frame Rate**: Maintain 60 FPS on target hardware
- **Load Times**: Scene transitions < 3 seconds
- **Memory**: Efficient asset loading and unloading
- **Build Size**: Optimize for reasonable download sizes

## 6. Design Specifications

### 6.1 Visual Design
- **Art Style**: 2D, clean and modern aesthetic
- **Color Palette**: Themed per scenario, high contrast for readability
- **Typography**: Clear, readable fonts with multiple size options
- **UI Style**: Minimalist, non-intrusive, consistent across all screens
- **Animations**: Smooth transitions, subtle feedback animations

### 6.2 Audio Design
- **Music**: Ambient, atmospheric tracks that enhance mood without distraction
- **SFX**: Clear, distinct sounds for different interaction types
- **Volume Balance**: Music at 60-70%, SFX at 80-100% of master volume

### 6.3 User Experience Design
- **Onboarding**: Brief tutorial for first-time players
- **Feedback**: Clear visual and audio feedback for all actions
- **Error Handling**: Friendly error messages, graceful failure handling
- **Accessibility**: Keyboard navigation, clear visual indicators, text scaling

## 7. Development Phases

### 7.1 Phase 1: Foundation (Weeks 1-2)
- Project setup and folder structure
- Core scene management
- Basic UI framework
- GameManager singleton
- Save/load system foundation

### 7.2 Phase 2: Core Systems (Weeks 3-4)
- Inventory system implementation
- Puzzle system foundation
- Basic item interaction
- UI polish for core systems

### 7.3 Phase 3: Exit Mechanics (Weeks 5-6)
- Card system (decoder wheel)
- Hint system implementation
- Timer system
- Narrative system integration

### 7.4 Phase 4: First Puzzle (Weeks 7-8)
- Complete first puzzle implementation
- All systems integration
- Testing and bug fixes
- Playtesting and iteration

### 7.5 Phase 5: Polish & Expansion (Weeks 9-12)
- Additional puzzles (2-3 more)
- Audio integration
- Visual polish and animations
- Settings menu
- Cross-platform testing
- Performance optimization

## 8. Assumptions and Constraints

### 8.1 Assumptions
- Players have basic familiarity with puzzle games
- Target devices meet minimum requirements
- Unity LTS version remains stable throughout development
- Development team has Unity and C# experience
- Asset creation tools are available (or assets can be sourced)

### 8.2 Constraints
- **Time**: 12-week development timeline (adjustable)
- **Budget**: Limited budget for assets (prioritize free/self-created assets)
- **Scope**: Focus on core mechanics before expansion
- **Platform**: Prioritize desktop platforms, mobile optimization later
- **Team Size**: Solo or small team development

### 8.3 Risks and Mitigations
- **Risk**: Scope creep
  - **Mitigation**: Strict adherence to PRD, phase-based development
- **Risk**: Technical challenges with Unity
  - **Mitigation**: Prototype early, leverage Unity community resources
- **Risk**: Asset creation time
  - **Mitigation**: Use placeholder assets initially, iterate on visuals later
- **Risk**: Puzzle difficulty balancing
  - **Mitigation**: Early playtesting, hint system as safety net

## 9. Success Criteria

### 9.1 Functional Requirements
- All core gameplay systems functional
- At least 3 complete puzzles implemented
- Save/load system working reliably
- Cross-platform builds successful
- No critical bugs in core gameplay loop

### 9.2 Quality Requirements
- Smooth 60 FPS performance on target hardware
- Intuitive UI/UX (validated through playtesting)
- Polished visual and audio presentation
- Clear, helpful feedback for all player actions

### 9.3 Launch Readiness
- All planned features implemented
- Comprehensive testing completed
- Documentation for players (optional)
- Build process documented
- Version control properly maintained

## 10. Future Enhancements (Out of Scope)

### 10.1 Post-Launch Features
- Additional puzzle packs (DLC)
- Multiplayer/cooperative mode
- Puzzle editor/creation tools
- Achievement system
- Leaderboards
- Cloud save synchronization
- Localization (multiple languages)
- Accessibility features expansion

## 11. Appendices

### 11.1 Glossary
- **Decoder Wheel**: Rotating card mechanism for answer validation
- **ScriptableObject**: Unity's data container for game data
- **uGUI**: Unity's UI system (Unity UI)
- **HUD**: Heads-Up Display (in-game UI overlay)

### 11.2 References
- Exit game series by Kosmos (inspiration)
- Unity Documentation: https://docs.unity3d.com/
- Unity Learn: https://learn.unity.com/

### 11.3 Revision History
- **v1.0** (Initial): Comprehensive PRD for Exit-style puzzle game

---

**Document Status**: Draft v1.0  
**Last Updated**: [Current Date]  
**Next Review**: After Phase 1 completion


