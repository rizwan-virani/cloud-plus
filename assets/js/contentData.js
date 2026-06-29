/* ============================================================================
   cloud+  ::  contentData.js
   Exam facts, per-domain metadata + objectives, PBQ format definitions,
   curated external resources, the Exam-Mechanics and Career-Guidance readers,
   and the textbook-dense domain reading content (CLOUDPLUS.reading[1..6],
   appended from the lazy-loaded modules under content/domainN.js).

   This file loads first and establishes the global CLOUDPLUS namespace consumed
   by quizEngine.js and app.js.

   Authored by Professor Rizwan Virani, San Jacinto College.
   ========================================================================== */
window.CLOUDPLUS = window.CLOUDPLUS || {};

CLOUDPLUS.exam = {
  code: "CV0-004",
  name: "CompTIA Cloud+",
  minutes: 90,
  maxQuestions: 90,
  scaleLow: 100, scaleHigh: 900, passing: 750,
  domains: 6,
  launched: "2024",
  retiredPredecessor: "CV0-003"
};

/* Per-domain metadata. `objectives` mirror the official CV0-004 exam outline.
   `weight` is the official CV0-004 domain percentage. `cards` and `quiz` are the
   per-domain flashcard and question-bank sizes (sum to 500 each). */
CLOUDPLUS.domainMeta = [
  { id: 1, weight: 24, color: "d1", icon: "🏛", title: "Cloud Architecture", sectionCount: 18, cards: 100, quiz: 110,
    short: "The blueprint of the cloud: service models (IaaS/PaaS/SaaS/FaaS) and the shared responsibility line, service availability and DR, cloud networking, storage and database technologies, cloud-native and containerization/virtualization concepts, cost, workload optimization, and evolving tech.",
    objectives: [
      { id: "1.1", t: "Given a scenario, use the appropriate cloud service model" },
      { id: "1.2", t: "Explain concepts related to service availability" },
      { id: "1.3", t: "Explain cloud networking concepts" },
      { id: "1.4", t: "Compare and contrast storage resources and technologies" },
      { id: "1.5", t: "Explain the purpose of cloud-native design concepts" },
      { id: "1.6", t: "Compare and contrast containerization concepts" },
      { id: "1.7", t: "Compare and contrast virtualization concepts" },
      { id: "1.8", t: "Summarize cost considerations related to cloud usage" },
      { id: "1.9", t: "Explain the importance of database concepts" },
      { id: "1.10", t: "Compare and contrast methods for optimizing workloads using cloud resources" },
      { id: "1.11", t: "Identify evolving technologies in the cloud" }
    ] },
  { id: 2, weight: 17, color: "d2", icon: "🚀", title: "Deployment", sectionCount: 14, cards: 80, quiz: 85,
    short: "Turning the blueprint into running infrastructure: public/private/hybrid/community deployment models, deployment strategies (blue-green, canary, rolling, in-place), migration types and considerations, Infrastructure-as-Code and scripting, and requirement-driven resource provisioning.",
    objectives: [
      { id: "2.1", t: "Compare and contrast cloud deployment models" },
      { id: "2.2", t: "Given a scenario, implement appropriate deployment strategies" },
      { id: "2.3", t: "Summarize aspects of cloud migration" },
      { id: "2.4", t: "Given a scenario, use code to deploy and configure cloud resources" },
      { id: "2.5", t: "Given a set of requirements, provision the appropriate cloud resources" }
    ] },
  { id: 3, weight: 18, color: "d3", icon: "⚙", title: "Operations", sectionCount: 14, cards: 85, quiz: 90,
    short: "Keeping the cloud healthy: observability (logging, tracing, monitoring, alerting), scaling approaches (horizontal/vertical, triggered/scheduled/manual), backup and recovery methods and objectives, and managing the full life cycle of cloud resources from patching to decommissioning.",
    objectives: [
      { id: "3.1", t: "Given a scenario, configure appropriate resources to achieve observability" },
      { id: "3.2", t: "Given a scenario, configure appropriate scaling approaches" },
      { id: "3.3", t: "Given a scenario, use appropriate backup and recovery methods" },
      { id: "3.4", t: "Given a scenario, manage the life cycle of cloud resources" }
    ] },
  { id: 4, weight: 22, color: "d4", icon: "🛡", title: "Security", sectionCount: 18, cards: 100, quiz: 110,
    short: "Securing the cloud: vulnerability management, compliance and regulatory frameworks, identity and access management, security best practices (Zero Trust, hardening, encryption, secrets), cloud security controls (DLP, IPS/IDS, WAF, security groups), and monitoring suspicious activity to spot attacks.",
    objectives: [
      { id: "4.1", t: "Explain vulnerability management concepts" },
      { id: "4.2", t: "Compare and contrast aspects of compliance and regulation" },
      { id: "4.3", t: "Given a scenario, implement identity and access management" },
      { id: "4.4", t: "Given a scenario, apply security best practices" },
      { id: "4.5", t: "Given a scenario, apply security controls in the cloud" },
      { id: "4.6", t: "Given a scenario, monitor suspicious activities to identify common attacks" }
    ] },
  { id: 5, weight: 11, color: "d5", icon: "🔁", title: "DevOps Fundamentals", sectionCount: 12, cards: 75, quiz: 60,
    short: "The engineering culture of the cloud: source control and version management, CI/CD pipeline concepts and artifacts, integration of systems (event-driven architectures, web services, APIs), and the core DevOps toolchain (Git, Docker, Kubernetes, Ansible, Terraform, Jenkins, ELK, Grafana).",
    objectives: [
      { id: "5.1", t: "Explain source control concepts" },
      { id: "5.2", t: "Explain concepts related to continuous integration/continuous deployment (CI/CD) pipelines" },
      { id: "5.3", t: "Explain concepts related to integration of systems" },
      { id: "5.4", t: "Explain the importance of tools used in DevOps environments" }
    ] },
  { id: 6, weight: 8, color: "d6", icon: "🔧", title: "Troubleshooting", sectionCount: 11, cards: 60, quiz: 45,
    short: "Diagnosing what breaks: a structured troubleshooting methodology applied to deployment failures (misconfiguration, sizing, quotas, outages), network faults (DNS/DHCP/NTP/NAT, latency, routing, switching/VLANs), and security issues (authN/authZ, leaked credentials, cipher deprecations, unauthorized software).",
    objectives: [
      { id: "6.1", t: "Given a scenario, troubleshoot deployment issues" },
      { id: "6.2", t: "Given a scenario, troubleshoot network issues" },
      { id: "6.3", t: "Given a scenario, troubleshoot security issues" }
    ] }
];

/* The five PBQ formats (cloud-themed). `domainColor` just drives the badge tint. */
CLOUDPLUS.pbqFormats = [
  { id: 1, icon: "🧱", domainColor: 4, obj: "4.5 / 1.3", badge: "SECURITY GROUPS & NACLs", title: "Security Group & NACL Rule Builder",
    desc: "Interpret a VPC topology and write security-group and network-ACL rules — action, source/dest CIDR, port, protocol — to expose only what is required and rely on the implicit deny.",
    long: "Each scenario gives you a cloud network exhibit and a security requirement. Configure the rule set field by field: the <b>action</b> (allow/deny), the <b>source</b>/<b>destination</b> CIDR, the <b>port</b>, and the <b>protocol</b>. Apply least privilege, scope administrative ports to known sources, and remember that security groups are stateful allow-lists while NACLs are stateless and ordered." },
  { id: 2, icon: "📊", domainColor: 3, obj: "3.1 / 4.6", badge: "OBSERVABILITY & LOG TRIAGE", title: "Cloud Observability & Log Triage",
    desc: "Read CloudTrail/flow-log/metric exhibits (credential abuse, public-bucket access, crypto-mining, scaling storms), name the signal, set severity, and choose the correct response.",
    long: "You are the on-call cloud engineer. Read the log, metric, or trace exhibit, then declare the <b>indicator</b>, the <b>severity</b>, and the correct <b>response</b> — rotating keys, tightening a policy, blocking an indicator, or adjusting a scaling rule — in line with cloud detection-and-response practice." },
  { id: 3, icon: "🔑", domainColor: 4, obj: "4.3", badge: "IAM POLICY", title: "Identity & Access Management Policy",
    desc: "Inspect IAM policy documents and trust relationships, evaluate effective permissions, and select the change that enforces least privilege without breaking the workload.",
    long: "Identity is the new perimeter. Read the policy JSON, role, and trust exhibit: evaluate the <b>effect</b>, <b>actions</b>, <b>resources</b>, and <b>conditions</b>, spot over-broad wildcards and privilege-escalation paths, and choose the authentication/authorization model (RBAC, ABAC, federation, MFA) that satisfies the requirement." },
  { id: 4, icon: "🔐", domainColor: 4, obj: "4.4", badge: "ENCRYPTION & KMS", title: "Cloud Encryption & Key Management",
    desc: "Match the right algorithm, key type, and key-management approach to a requirement: data at rest, data in transit, customer-managed keys, envelope encryption, or secrets storage.",
    long: "Engineer the cryptographic solution. For each requirement — encrypting object/block storage at rest, protecting data in transit with TLS, managing keys in a KMS/HSM, rotating secrets, or choosing customer-managed vs provider-managed keys — select the correct <b>algorithm</b>, <b>key length/type</b>, and <b>management model</b>, balancing security, control, and operational cost." },
  { id: 5, icon: "🗺", domainColor: 1, obj: "1.3 / 2.5", badge: "VPC TOPOLOGY", title: "VPC Network Topology & Resource Placement",
    desc: "Place cloud resources — public/private subnets, load balancer, NAT gateway, bastion, VPC endpoints, transit gateway — into the correct tier of a VPC to satisfy reachability and isolation.",
    long: "A placement workspace. For each position in the VPC topology, choose the construct that belongs there — <b>public</b> vs <b>private subnet</b>, <b>internet/application load balancer</b>, <b>NAT gateway</b>, <b>bastion host</b>, <b>VPC peering/transit gateway</b>, <b>VPC endpoint</b> — to satisfy segmentation, internet exposure, high availability across zones, and least-privilege reachability." }
];

/* Curated free study resources for CV0-004. */
CLOUDPLUS.resources = [
  { icon: "📄", title: "Official CompTIA Cloud+ CV0-004 Exam Objectives (PDF)", host: "comptia.org",
    url: "https://www.comptia.org/en-us/certifications/cloud/",
    desc: "The authoritative exam outline — every objective and sub-bullet CompTIA can test. Download the objectives PDF from the certification page and use it as your master checklist for all six domains." },
  { icon: "🎥", title: "Professor Messer & Free Cloud+ Walkthroughs", host: "professormesser.com",
    url: "https://www.professormesser.com/",
    desc: "Free, objective-aligned video explanations of core cloud concepts — service models, networking, security, and operations — useful as a no-cost first pass over each domain." },
  { icon: "☁", title: "AWS / Azure / Google Cloud Free Tiers", host: "aws.amazon.com",
    url: "https://aws.amazon.com/free/",
    desc: "Cloud+ is vendor-neutral, but hands-on practice cements the concepts. Spin up free-tier VMs, VPCs, security groups, IAM policies, and storage buckets on any major provider to make the abstractions concrete." },
  { icon: "📐", title: "NIST SP 800-145 — The NIST Definition of Cloud Computing", host: "csrc.nist.gov",
    url: "https://csrc.nist.gov/pubs/sp/800/145/final",
    desc: "The canonical definition of the cloud service and deployment models and the five essential characteristics. Short, authoritative, and frequently the source of the exam's architecture vocabulary." },
  { icon: "🧩", title: "Kubernetes & Docker Official Docs", host: "kubernetes.io",
    url: "https://kubernetes.io/docs/home/",
    desc: "The containerization and orchestration objectives (1.6, 5.4) lean on Docker and Kubernetes concepts — images, registries, pods, persistent volumes, services. The official docs are the ground truth." },
  { icon: "👥", title: "r/CompTIA — Cloud+ Community Wiki & Study Threads", host: "reddit.com/r/CompTIA",
    url: "https://www.reddit.com/r/CompTIA/wiki/index/",
    desc: "Crowd-sourced study plans, recent 'passed CV0-004' write-ups, and discussion of question styles. Read recent experiences for current, real-world intel on the exam form." }
];

/* ---- Reader: Exam Mechanics card ---- */
CLOUDPLUS.examMechanics = [
  { heading: "Format, length, and delivery", body:
    "<p>The <strong>CompTIA Cloud+ CV0-004</strong> is a single exam of <strong>up to 90 questions</strong> to be completed in <strong>90 minutes</strong>. It is delivered either at a Pearson VUE testing center or via OnVUE online proctoring. Because the count is a <em>maximum</em>, your particular form may contain fewer scored items; CompTIA also seeds unscored experimental questions it is evaluating for future exams, and you cannot tell which is which — so treat every question as if it counts.</p>" +
    "<p>The exam mixes <strong>multiple-choice</strong> items (single- and multiple-response) with a handful of <strong>performance-based questions (PBQs)</strong>. PBQs are interactive tasks — building a security-group rule set, triaging cloud logs, evaluating an IAM policy, placing resources in a VPC — and they typically appear first. They are worth more and consume more time, which leads directly to the single most important time-management rule below.</p>" +
    "<div class='callout exam'><div class='lbl'>Exam tip</div>PBQs front-load the exam and can eat your clock. If a PBQ stalls you, <strong>flag it and move on</strong>. Bank the fast multiple-choice points first, then return with whatever time remains.</div>" },
  { heading: "Scoring: the 100–900 scale", body:
    "<p>Cloud+ is scored on a <strong>scaled range of 100 to 900</strong>, and the passing score is <strong>750</strong>. Scaled scoring is not a simple percentage: CompTIA weights items by difficulty and equates across exam forms so that no candidate is advantaged or disadvantaged by drawing a harder set. As a result you cannot reverse-engineer an exact 'number correct' from 750, and CompTIA does not publish the raw-to-scaled mapping.</p>" +
    "<p>Practically, strong candidates aim to answer roughly <strong>80% or more</strong> of questions correctly to give themselves comfortable margin. There is <strong>no penalty for guessing</strong> — an unanswered question is simply wrong — so you should never leave an item blank. Eliminate obviously wrong options, make your best choice, flag it if unsure, and move on.</p>" +
    "<blockquote>This platform's mock exam reports a scaled score using a transparent linear approximation of the 100–900 band. Use it as a <em>relative</em> readiness signal — 'am I trending toward 750?' — not as a literal prediction of your official score.</blockquote>" },
  { heading: "Question styles and how to read them", body:
    "<p>CompTIA writes 'best answer' questions. Often two or three options are <em>plausible</em> and only one is <em>best</em> for the scenario described. Read the <strong>last sentence first</strong> — it usually contains the actual ask ('which approach <em>best</em> reduces cost…', 'what should the engineer do <em>first</em>…'). Words like <strong>first</strong>, <strong>best</strong>, <strong>most likely</strong>, and <strong>least</strong> are decisive; circle them mentally.</p>" +
    "<ul><li><strong>Multiple-response</strong> items tell you how many to pick ('choose two'). You must get all of them right for credit.</li><li><strong>Scenario</strong> items bury the relevant detail in a paragraph — identify the workload, the requirement, and the constraint before looking at options.</li><li><strong>PBQs</strong> reward methodical work; partial credit is generally available, so complete every field you can even if unsure of one.</li></ul>" +
    "<div class='callout'><div class='lbl'>Strategy</div>Use the <strong>flag-and-review</strong> workflow. First pass: answer everything you know cold and flag the rest. Second pass: spend remaining minutes only on flagged items. This guarantees you never run out of time with easy points unanswered.</div>" },
  { heading: "Eligibility, cost, and renewal", body:
    "<p>There are <strong>no formal prerequisites</strong>, but CompTIA recommends <strong>2–3 years</strong> of experience in systems administration or cloud/networking roles, and holding <strong>Network+</strong> and <strong>Security+</strong> (or equivalent knowledge) first. The exam voucher cost varies by region (commonly in the US$390+ range). Academic and bundle discounts exist — ask your institution. There may also be funding available for a free voucher; connect with the Program Director or your professor for more information about funding opportunities.</p>" +
    "<p>Cloud+ is valid for <strong>three years</strong> and participates in CompTIA's <strong>Continuing Education (CE)</strong> program: you renew by earning continuing-education units, completing higher-level certifications, or related activities, rather than re-sitting the exam. Keep your certification active so it continues to count toward employer and role requirements.</p>" },
  { heading: "Exam-day logistics", body:
    "<p>Bring two forms of ID; for online proctoring you must show a clear workspace, a working webcam, and a stable connection. You cannot use notes, phones, or smartwatches. A simple on-screen whiteboard or provided scratch material may be available — use it to jot the acronym you'll otherwise lose under pressure (think RTO/RPO, or the order of a migration's phases).</p>" +
    "<div class='callout scenario'><div class='lbl'>Mindset</div>Arrive early, breathe, and remember: the exam tests <strong>judgment</strong>, not trivia recall. Most questions are answerable by applying core principles — shared responsibility, least privilege, elasticity, right-sizing, high availability — to the scenario in front of you.</div>" }
];

/* ---- Reader: Career Guidance card ---- */
CLOUDPLUS.careerGuidance = [
  { heading: "Where Cloud+ sits on the ladder", body:
    "<p><strong>Cloud+ is the vendor-neutral, operations-focused cloud certification.</strong> It sits above foundational certs (A+, Network+, Cloud Essentials+) and complements Security+. Where vendor certs (AWS, Azure, Google Cloud) prove you can operate one provider's console, Cloud+ proves you understand the <em>portable</em> concepts — service models, deployment models, virtualization, networking, security, and operations — that transfer across every provider.</p>" +
    "<p>For hiring managers, Cloud+ on a résumé is shorthand for 'this person can deploy, secure, operate, and troubleshoot cloud infrastructure in a multi-cloud world,' not just click through one vendor's UI. It is frequently listed as a <em>preferred</em> qualification for cloud and infrastructure roles.</p>" },
  { heading: "DoD 8140 / 8570 alignment", body:
    "<p>Cloud+ is approved under the U.S. Department of Defense workforce frameworks. Under the <strong>DoD 8140</strong> framework (which supersedes 8570.01-M), Cloud+ maps to several technical and infrastructure-support work roles. For many defense and federal-contractor positions, holding an approved baseline certification is a hard requirement, not a 'nice to have.'</p>" +
    "<p>In plain terms: a large number of government-adjacent infrastructure positions require an approved cert, and Cloud+ is a recognized, vendor-neutral way to meet that bar for cloud-focused roles. If a DoD or federal-contractor career interests you, an approved cert can be the difference between being eligible and being disqualified.</p>" +
    "<div class='callout exam'><div class='lbl'>Why it matters</div>The 8140 framework turns an approved certification from a 'nice to have' into a <strong>gatekeeping requirement</strong> for government-adjacent work. Pair Cloud+ with Security+ to cover both the operations and the security baselines.</div>" },
  { heading: "Roles Cloud+ opens", body:
    "<p>Cloud+ aligns with a cluster of infrastructure and cloud-operations roles. It will not, by itself, make you a principal architect — but it credibly qualifies you for:</p>" +
    "<ul>" +
    "<li><strong>Cloud Engineer / Cloud Administrator</strong> — provisioning, configuring, and operating compute, storage, networking, and security across cloud platforms. The Deployment and Operations domains map almost directly to this job.</li>" +
    "<li><strong>Systems Administrator (cloud-focused)</strong> — running virtualized and containerized workloads, patching, scaling, and backups.</li>" +
    "<li><strong>Cloud / Infrastructure Support &amp; NOC</strong> — monitoring observability dashboards and troubleshooting deployment, network, and security faults (Domain 6).</li>" +
    "<li><strong>DevOps / Site Reliability (junior)</strong> — CI/CD pipelines, IaC, and the DevOps toolchain from Domain 5.</li>" +
    "<li><strong>Cloud Security Analyst (entry)</strong> — IAM, compliance, and cloud security controls underpinned by Domain 4.</li>" +
    "</ul>" },
  { heading: "Building the path beyond Cloud+", body:
    "<p>Treat Cloud+ as a launch point, not a destination. A common trajectory: <em>Cloud+ → hands-on cloud engineering experience → a vendor specialization</em>. From here, learners typically add a provider-specific associate certification (<strong>AWS Solutions Architect / SysOps</strong>, <strong>Azure Administrator</strong>, or <strong>Google Cloud Engineer</strong>), then move toward professional-level architecture or specialty security and DevOps tracks as experience accumulates.</p>" +
    "<div class='callout scenario'><div class='lbl'>Practical advice</div>Pair the cert with <strong>demonstrable hands-on skill</strong> — a free-tier lab, a small Terraform project on GitHub, a containerized app you deployed and scaled, or documented cost-optimization work. Certifications get you past résumé filters; practical evidence gets you through interviews.</div>" }
];

/* Reading content is NO LONGER bundled here. To keep this file lean and to
   load only what a student opens, each domain's dense reading sections live in
   their own module under assets/js/content/domainN.js and are fetched on demand
   by app.js the first time a Domain Study card is opened. This object is the
   shared target those modules populate: CLOUDPLUS.reading[N] = [ ...sections ]. */
CLOUDPLUS.reading = CLOUDPLUS.reading || {};

/* Flashcard decks are likewise lazy-loaded from assets/js/content/flashN.js
   and populate this object: CLOUDPLUS.flash[N] = [ ...cards ]. */
CLOUDPLUS.flash = CLOUDPLUS.flash || {};
