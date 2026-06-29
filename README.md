# cloud+

**A comprehensive, open-source CompTIA Cloud+ (CV0-004) study platform.**
In-depth coverage of all 6 exam domains, a 500-question bank with full per-distractor rationale, 500 Rapid Recall flashcards, 30 performance-based simulations, a drag-and-drop taxonomy classifier, 20 hands-on sandbox labs, and a full-length timed mock exam.

> Designed and authored by **Professor Rizwan Virani, San Jacinto College.**

---

## What this is

An academic preparation resource that tests your knowledge **dynamically** with original, randomized questions and hands-on simulators. It is a comprehensive study portal that covers every objective in the official CV0-004 exam outline, and it is completely free, self-paced, and offline-capable once loaded.

## What this is not

- **Not** a source of actual or copyrighted CompTIA exam questions, "brain dumps," or leaked items. **Every question in this repository is original.**
- **Not** an official CompTIA product, and not affiliated with, endorsed by, or sponsored by CompTIA.
- **Not** a guarantee of a passing score. It is a practice tool — the exam tests judgment, not memorization.

---

## Exam at a glance

| | |
| --- | --- |
| **Certification** | CompTIA Cloud+ |
| **Exam code** | CV0-004 |
| **Duration** | 90 minutes |
| **Questions** | up to 90 |
| **Passing score** | 750 / 900 |
| **Domains** | 6 |

## The 6 domains (CV0-004)

| # | Domain | Weight |
| --- | --- | --- |
| 1 | Cloud Architecture | 24% |
| 2 | Deployment | 17% |
| 3 | Operations | 18% |
| 4 | Security | 22% |
| 5 | DevOps Fundamentals | 11% |
| 6 | Troubleshooting | 8% |

## Features

| Area | What you get |
| --- | --- |
| **Domain study modules** | 6 rigorous reading interfaces, one per exam domain, with deep technical definitions, comparison tables, exam tips, and real-world scenarios. **87 sections** mapped to the official CV0-004 outline, lazy-loaded per domain. |
| **Rapid Recall flashcards** | **500 cards** with a **Leitner spaced-repetition** scheduler, per-domain decks, a Master Acronym Drill, and an All Due Today review. |
| **Practice quizzes** | A bank of **500 original questions**, each graded with a full rationale that explains the correct answer **and why every individual distractor is wrong**. Domain, quick, adaptive, and missed-question modes. |
| **PBQ simulators** | **30 performance-based questions** across 5 formats, plus a drag-and-drop **Technical Taxonomy Mapping** engine (10 classification activities). |
| **Hands-on labs** | **20 interactive sandbox labs** with a full-screen console, dropdown configuration, a live command terminal, and a progress log. |
| **Mock exam** | A full-length, timed simulation weighted to the official domain percentages, with a countdown timer, flagging, and a domain-by-domain scoring dashboard. |
| **Supplemental hub** | An Industry Certification Explorer and a curated external-resources library. |
| **Theme** | A global light/dark toggle with all state saved to your browser. |

## How to use it

1. **Read the Exam Mechanics & Career Guidance cards first** to understand scoring, timing, and question styles.
2. **Deep-dive the Domain Study cards** — one rigorous reading interface per domain.
3. **Lock in terms with Rapid Recall Flashcards**, graded on a spaced-repetition scheduler.
4. **Validate with the Domain Quizzes**, drawn at random and graded with full rationale.
5. **Train practical skills in the PBQ Simulators** and the Technical Taxonomy Mapping engine.
6. **Get hands-on in the Labs** — flip a card to review objectives, then launch the sandbox console.
7. **Benchmark readiness with the full-length, timed Mock Exam.**

## Run it locally

The site is fully static — no build step. Serve the folder with any static web server:

```bash
# from the repository root:
python -m http.server 8104
# then open http://localhost:8104
```

Best experienced on a desktop or laptop in Google Chrome; the labs, terminal simulations, and drag-and-drop activities require a mouse and keyboard.

## Project structure

```
.
├── index.html                  # shell: hero, onboarding, dashboard mount, script order
├── LICENSE                     # dual license (MIT code + CC BY-NC-SA content)
├── README.md
└── assets/
    ├── css/
    │   └── styles.css          # theme + study-platform components, dark & light
    └── js/
        ├── contentData.js      # exam facts, domain metadata, readers
        ├── quizEngine.js       # question bank + PBQs + assessment engines
        ├── flashEngine.js      # spaced-repetition flashcard engine
        ├── app.js              # router, theme manager, analytics, reading UI
        └── content/            # lazy-loaded modules
            ├── domain1..6.js      # dense reading per domain
            ├── flash1..6.js       # flashcard decks
            ├── labs.js             # hands-on sandbox labs
            ├── taxonomy.js         # drag-and-drop classification
            └── certs.js            # Industry Certification Explorer catalog
```

## License

This project is **dual-licensed**:

- The **software framework and interface code** are licensed under the **MIT License**.
- The **educational curriculum content** (study text modules, question banks, flashcards, and lab scenarios) is licensed under the **Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License** (CC BY-NC-SA 4.0).

See the [LICENSE](LICENSE) file for full terms.

---

*This is a personal educational resource. All views and content are entirely my own and do not represent the official positions of San Jacinto College. "CompTIA" and "Cloud+" are trademarks of CompTIA, Inc., used here only to identify the exam this resource helps you prepare for. All practice questions are original. Released for academic use.*
