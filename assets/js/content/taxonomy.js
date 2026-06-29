window.TAXONOMY = [
  {
    title: "Cloud Service Models",
    subtitle: "Sort each cloud offering into the service model that defines what the provider manages.",
    instructions: "Drag each chip from the pool into the correct category drop zone, then click Check Answers for instant feedback. Click a chip's x button to return it to the pool.",
    categories: [
      { id: "iaas", label: "IaaS" },
      { id: "paas", label: "PaaS" },
      { id: "saas", label: "SaaS" },
      { id: "faas", label: "FaaS" }
    ],
    items: [
      { text: "Provision raw virtual machines", cat: "iaas" },
      { text: "Rent block storage volumes", cat: "iaas" },
      { text: "Manage your own OS patching", cat: "iaas" },
      { text: "Configure virtual networks and subnets", cat: "iaas" },
      { text: "Managed application runtime", cat: "paas" },
      { text: "Database-as-a-service engine", cat: "paas" },
      { text: "Deploy code without managing servers", cat: "paas" },
      { text: "Container orchestration platform", cat: "paas" },
      { text: "Browser-based email suite", cat: "saas" },
      { text: "Salesforce CRM subscription", cat: "saas" },
      { text: "Hosted office productivity apps", cat: "saas" },
      { text: "Ready-to-use collaboration tool", cat: "saas" },
      { text: "AWS Lambda event handler", cat: "faas" },
      { text: "Pay-per-invocation function", cat: "faas" },
      { text: "Trigger code on an HTTP event", cat: "faas" },
      { text: "Stateless ephemeral compute", cat: "faas" }
    ]
  },
  {
    title: "Cloud Storage Types",
    subtitle: "Classify each workload or capability by the storage type that best fits it.",
    instructions: "Drag each chip from the pool into the correct category drop zone, then click Check Answers for instant feedback. Click a chip's x button to return it to the pool.",
    categories: [
      { id: "object", label: "Object Storage" },
      { id: "block", label: "Block Storage" },
      { id: "file", label: "File Storage" }
    ],
    items: [
      { text: "Store images via REST API", cat: "object" },
      { text: "Flat namespace with metadata", cat: "object" },
      { text: "Static website asset hosting", cat: "object" },
      { text: "Amazon S3 bucket", cat: "object" },
      { text: "Backup and archive repository", cat: "object" },
      { text: "Attach a volume to a single VM", cat: "block" },
      { text: "Low-latency database disk", cat: "block" },
      { text: "Boot volume for an instance", cat: "block" },
      { text: "Raw LUN presented to a server", cat: "block" },
      { text: "Shared NFS mount point", cat: "file" },
      { text: "Hierarchical folder structure", cat: "file" },
      { text: "SMB network share", cat: "file" },
      { text: "Concurrent access by many clients", cat: "file" }
    ]
  },
  {
    title: "Cloud Storage Tiers",
    subtitle: "Match each access pattern or cost profile to the correct storage tier.",
    instructions: "Drag each chip from the pool into the correct category drop zone, then click Check Answers for instant feedback. Click a chip's x button to return it to the pool.",
    categories: [
      { id: "hot", label: "Hot Tier" },
      { id: "warm", label: "Warm Tier" },
      { id: "cold", label: "Cold Tier" },
      { id: "archive", label: "Archive Tier" }
    ],
    items: [
      { text: "Frequently accessed live data", cat: "hot" },
      { text: "Highest storage cost per GB", cat: "hot" },
      { text: "Lowest retrieval latency", cat: "hot" },
      { text: "Active transactional dataset", cat: "hot" },
      { text: "Accessed a few times per month", cat: "warm" },
      { text: "Infrequent access tier", cat: "warm" },
      { text: "Lower cost than hot storage", cat: "warm" },
      { text: "Recent backups kept handy", cat: "warm" },
      { text: "Rarely accessed compliance data", cat: "cold" },
      { text: "Cheaper storage, higher retrieval fee", cat: "cold" },
      { text: "Data kept for occasional audits", cat: "cold" },
      { text: "Long-term retention, minutes to retrieve", cat: "cold" },
      { text: "Lowest cost per GB stored", cat: "archive" },
      { text: "Retrieval can take hours", cat: "archive" },
      { text: "Glacier Deep Archive vault", cat: "archive" },
      { text: "Seven-year legal hold records", cat: "archive" }
    ]
  },
  {
    title: "Deployment Strategies",
    subtitle: "Sort each release description into the deployment strategy it describes.",
    instructions: "Drag each chip from the pool into the correct category drop zone, then click Check Answers for instant feedback. Click a chip's x button to return it to the pool.",
    categories: [
      { id: "bluegreen", label: "Blue-Green" },
      { id: "canary", label: "Canary" },
      { id: "rolling", label: "Rolling" },
      { id: "inplace", label: "In-Place" }
    ],
    items: [
      { text: "Two identical environments swapped via router", cat: "bluegreen" },
      { text: "Instant cutover with fast rollback", cat: "bluegreen" },
      { text: "Idle standby environment goes live", cat: "bluegreen" },
      { text: "Flip traffic from old to new stack", cat: "bluegreen" },
      { text: "Release to five percent of users first", cat: "canary" },
      { text: "Gradually widen exposure if healthy", cat: "canary" },
      { text: "Small subset validates the new build", cat: "canary" },
      { text: "Monitor metrics before full rollout", cat: "canary" },
      { text: "Update servers a batch at a time", cat: "rolling" },
      { text: "Replace instances incrementally", cat: "rolling" },
      { text: "No extra environment needed", cat: "rolling" },
      { text: "Mixed old and new versions during update", cat: "rolling" },
      { text: "Upgrade directly on existing servers", cat: "inplace" },
      { text: "Overwrite the current version", cat: "inplace" },
      { text: "Brief downtime during the swap", cat: "inplace" },
      { text: "No spare capacity provisioned", cat: "inplace" }
    ]
  },
  {
    title: "The 6 R's of Migration",
    subtitle: "Map each migration action to the correct R strategy for moving workloads to the cloud.",
    instructions: "Drag each chip from the pool into the correct category drop zone, then click Check Answers for instant feedback. Click a chip's x button to return it to the pool.",
    categories: [
      { id: "rehost", label: "Rehost" },
      { id: "replatform", label: "Replatform" },
      { id: "refactor", label: "Refactor / Re-architect" },
      { id: "retire", label: "Retire" },
      { id: "retain", label: "Retain" }
    ],
    items: [
      { text: "Lift and shift VM as-is", cat: "rehost" },
      { text: "Move server with no code changes", cat: "rehost" },
      { text: "Image-copy to a cloud instance", cat: "rehost" },
      { text: "Swap self-managed DB for managed RDS", cat: "replatform" },
      { text: "Lift, tinker, and shift", cat: "replatform" },
      { text: "Minor optimizations without rewriting", cat: "replatform" },
      { text: "Rewrite monolith into microservices", cat: "refactor" },
      { text: "Re-architect to serverless functions", cat: "refactor" },
      { text: "Re-engineer the app for cloud-native scaling", cat: "refactor" },
      { text: "Decommission an unused application", cat: "retire" },
      { text: "Turn off redundant legacy system", cat: "retire" },
      { text: "Eliminate a workload no longer needed", cat: "retire" },
      { text: "Keep app on-prem for now", cat: "retain" },
      { text: "Leave it as-is due to compliance", cat: "retain" },
      { text: "Defer migration of a stable system", cat: "retain" }
    ]
  },
  {
    title: "Scaling Approaches",
    subtitle: "Classify each scaling action by its direction and how it is triggered.",
    instructions: "Drag each chip from the pool into the correct category drop zone, then click Check Answers for instant feedback. Click a chip's x button to return it to the pool.",
    categories: [
      { id: "horizontal", label: "Horizontal (Scale Out)" },
      { id: "vertical", label: "Vertical (Scale Up)" },
      { id: "triggered", label: "Triggered / Scheduled" },
      { id: "manual", label: "Manual" }
    ],
    items: [
      { text: "Add more identical instances", cat: "horizontal" },
      { text: "Distribute load across a fleet", cat: "horizontal" },
      { text: "Spin up extra web nodes", cat: "horizontal" },
      { text: "Scale out behind a load balancer", cat: "horizontal" },
      { text: "Add more CPU and RAM to a server", cat: "vertical" },
      { text: "Resize an instance to a larger type", cat: "vertical" },
      { text: "Increase capacity on one node", cat: "vertical" },
      { text: "Upgrade to a beefier VM", cat: "vertical" },
      { text: "Auto-scale on CPU threshold", cat: "triggered" },
      { text: "Pre-warm capacity before a sale", cat: "triggered" },
      { text: "Scale on a nightly schedule", cat: "triggered" },
      { text: "Metric-driven policy adds nodes", cat: "triggered" },
      { text: "Admin clicks to add a server", cat: "manual" },
      { text: "Operator resizes capacity by hand", cat: "manual" },
      { text: "On-demand human-initiated change", cat: "manual" }
    ]
  },
  {
    title: "Backup Types",
    subtitle: "Sort each backup behavior into the correct backup type.",
    instructions: "Drag each chip from the pool into the correct category drop zone, then click Check Answers for instant feedback. Click a chip's x button to return it to the pool.",
    categories: [
      { id: "full", label: "Full" },
      { id: "incremental", label: "Incremental" },
      { id: "differential", label: "Differential" }
    ],
    items: [
      { text: "Copies all data every time", cat: "full" },
      { text: "Longest backup window", cat: "full" },
      { text: "Fastest single-set restore", cat: "full" },
      { text: "Baseline for other backup types", cat: "full" },
      { text: "Copies changes since the last backup", cat: "incremental" },
      { text: "Smallest backup size", cat: "incremental" },
      { text: "Clears the archive bit each run", cat: "incremental" },
      { text: "Restore needs full plus every chain link", cat: "incremental" },
      { text: "Copies changes since the last full", cat: "differential" },
      { text: "Grows larger each day until next full", cat: "differential" },
      { text: "Does not clear the archive bit", cat: "differential" },
      { text: "Restore needs only full plus latest set", cat: "differential" }
    ]
  },
  {
    title: "IAM: AAA Concepts",
    subtitle: "Sort each identity term into authentication, authorization, or accounting.",
    instructions: "Drag each chip from the pool into the correct category drop zone, then click Check Answers for instant feedback. Click a chip's x button to return it to the pool.",
    categories: [
      { id: "authn", label: "Authentication" },
      { id: "authz", label: "Authorization" },
      { id: "accounting", label: "Accounting" }
    ],
    items: [
      { text: "MFA", cat: "authn" },
      { text: "SAML assertion proves identity", cat: "authn" },
      { text: "OIDC ID token", cat: "authn" },
      { text: "Username and password login", cat: "authn" },
      { text: "Biometric fingerprint scan", cat: "authn" },
      { text: "RBAC role grants access", cat: "authz" },
      { text: "OAuth scope permissions", cat: "authz" },
      { text: "Least-privilege policy enforcement", cat: "authz" },
      { text: "ABAC attribute-based rules", cat: "authz" },
      { text: "Permission boundary on an account", cat: "authz" },
      { text: "Audit trail of user actions", cat: "accounting" },
      { text: "CloudTrail API call logging", cat: "accounting" },
      { text: "Session duration records", cat: "accounting" },
      { text: "Usage metering for billing", cat: "accounting" },
      { text: "Login event history", cat: "accounting" }
    ]
  },
  {
    title: "Cloud Security Controls",
    subtitle: "Classify each control by the domain it primarily protects.",
    instructions: "Drag each chip from the pool into the correct category drop zone, then click Check Answers for instant feedback. Click a chip's x button to return it to the pool.",
    categories: [
      { id: "network", label: "Network" },
      { id: "endpoint", label: "Endpoint" },
      { id: "identity", label: "Identity" },
      { id: "data", label: "Data" }
    ],
    items: [
      { text: "Network ACL rules", cat: "network" },
      { text: "Web application firewall (WAF)", cat: "network" },
      { text: "Network security group (NSG)", cat: "network" },
      { text: "Security group port filtering", cat: "network" },
      { text: "Endpoint detection and response (EDR)", cat: "endpoint" },
      { text: "Data loss prevention agent (DLP)", cat: "endpoint" },
      { text: "Host antivirus scanning", cat: "endpoint" },
      { text: "Device posture compliance check", cat: "endpoint" },
      { text: "IAM role policies", cat: "identity" },
      { text: "Multifactor authentication (MFA)", cat: "identity" },
      { text: "Single sign-on federation", cat: "identity" },
      { text: "Privileged access management", cat: "identity" },
      { text: "Encryption at rest", cat: "data" },
      { text: "Key management service (KMS)", cat: "data" },
      { text: "Database field-level encryption", cat: "data" },
      { text: "TLS encryption in transit", cat: "data" }
    ]
  },
  {
    title: "DevOps Tools by Role",
    subtitle: "Sort each tool into the DevOps function it performs in the pipeline.",
    instructions: "Drag each chip from the pool into the correct category drop zone, then click Check Answers for instant feedback. Click a chip's x button to return it to the pool.",
    categories: [
      { id: "scm", label: "Source Control" },
      { id: "cicd", label: "CI / CD" },
      { id: "config", label: "Config & Orchestration" },
      { id: "observability", label: "Observability" }
    ],
    items: [
      { text: "Git", cat: "scm" },
      { text: "GitLab repository hosting", cat: "scm" },
      { text: "Branch and merge version history", cat: "scm" },
      { text: "Pull request code review", cat: "scm" },
      { text: "Jenkins", cat: "cicd" },
      { text: "GitHub Actions", cat: "cicd" },
      { text: "Automated build and test pipeline", cat: "cicd" },
      { text: "CircleCI deployment workflow", cat: "cicd" },
      { text: "Ansible", cat: "config" },
      { text: "Terraform", cat: "config" },
      { text: "Kubernetes", cat: "config" },
      { text: "Puppet desired-state config", cat: "config" },
      { text: "Grafana", cat: "observability" },
      { text: "ELK stack log aggregation", cat: "observability" },
      { text: "Prometheus metrics scraping", cat: "observability" },
      { text: "Distributed tracing dashboards", cat: "observability" }
    ]
  }
];
