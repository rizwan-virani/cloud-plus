window.LABS = [
  {
    "id": "Lab 01",
    "num": 1,
    "group": "CLOUD ARCHITECTURE",
    "title": "Provisioning a Compute Instance",
    "desc": "Stand up your first cloud virtual machine from the CLI, selecting the right instance size, image, and region for a workload. You compare instance families, launch a VM, and confirm it is reachable over SSH before declaring it production ready.",
    "objectives": [
      "Select the appropriate instance type and image for a given workload.",
      "Launch a compute instance using the cloud CLI.",
      "Verify instance health and SSH connectivity."
    ],
    "console": {
      "host": "cloud-compute01",
      "boot": [
        "[SYS] Compute provisioning lab online.",
        "[SYS] Region us-east-1 selected, credentials loaded.",
        "[SYS] Default VPC and key pair available."
      ],
      "tasks": [
        {
          "id": "t1",
          "label": "Select the instance family for a general-purpose web tier"
        },
        {
          "id": "t2",
          "label": "Choose the correct image type for a Linux workload"
        },
        {
          "id": "t3",
          "label": "Launch a compute instance via CLI"
        },
        {
          "id": "t4",
          "label": "Verify the instance is running and reachable"
        }
      ],
      "configs": [
        {
          "id": "c1",
          "label": "Instance family for a balanced general-purpose web tier",
          "options": [
            "Compute-optimized (c-family)",
            "General-purpose (t/m-family)",
            "Memory-optimized (r-family)",
            "GPU-accelerated (g-family)"
          ],
          "correct": "General-purpose (t/m-family)",
          "task": "t1"
        },
        {
          "id": "c2",
          "label": "Image to boot a standard Linux server",
          "options": [
            "Windows Server AMI",
            "Amazon Linux 2023 AMI",
            "Empty raw volume",
            "Container image only"
          ],
          "correct": "Amazon Linux 2023 AMI",
          "task": "t2"
        }
      ],
      "payload": {
        "label": "LAUNCH INSTANCE",
        "placeholder": "aws ec2 run-instances --image-id ami-0abcd --instance-type t3.medium --key-name lab-key",
        "button": "Launch",
        "response": "[EC2] Reservation r-0a1b2c created.\n[EC2] Instance i-0fed9 (t3.medium) state=pending -> running.\n[EC2] Public IP 54.21.10.7 assigned in subnet-public-1a.",
        "task": "t3"
      },
      "commands": [
        {
          "cmd": "aws ec2 describe-instances --instance-ids i-0fed9",
          "out": "[EC2] State: running\n[EC2] Type: t3.medium  AZ: us-east-1a\n[EC2] Status checks: 2/2 passed",
          "task": "t4"
        },
        {
          "cmd": "ssh ec2-user@54.21.10.7",
          "out": "[SSH] Connected to cloud-compute01.\n[SSH] Last login from lab workstation."
        },
        {
          "cmd": "show status",
          "out": "Compute provisioning engine nominal."
        }
      ]
    }
  },
  {
    "id": "Lab 02",
    "num": 2,
    "group": "CLOUD ARCHITECTURE",
    "title": "Building a VPC with Public and Private Subnets",
    "desc": "Design a virtual private cloud with segmented public and private subnets, an internet gateway, and a NAT gateway for outbound private traffic. You lay out the CIDR plan, attach routing, and validate that private instances can reach the internet without being exposed.",
    "objectives": [
      "Plan a non-overlapping CIDR block for a VPC and its subnets.",
      "Differentiate public and private subnets by route table.",
      "Configure an internet gateway and NAT gateway for correct egress."
    ],
    "console": {
      "host": "cloud-vpc01",
      "boot": [
        "[SYS] Network fabric console online.",
        "[SYS] Account quota: 5 VPCs available.",
        "[SYS] Region us-east-1, 3 availability zones."
      ],
      "tasks": [
        {
          "id": "t1",
          "label": "Identify what makes a subnet public"
        },
        {
          "id": "t2",
          "label": "Choose the device giving private subnets outbound access"
        },
        {
          "id": "t3",
          "label": "Create the VPC and its subnets via CLI"
        },
        {
          "id": "t4",
          "label": "Inspect the route tables"
        }
      ],
      "configs": [
        {
          "id": "c1",
          "label": "What makes a subnet public",
          "options": [
            "It has a NAT gateway",
            "Its route table points 0.0.0.0/0 at an internet gateway",
            "It uses a /16 CIDR",
            "It is in availability zone A"
          ],
          "correct": "Its route table points 0.0.0.0/0 at an internet gateway",
          "task": "t1"
        },
        {
          "id": "c2",
          "label": "Device giving private subnets outbound-only internet access",
          "options": [
            "Internet gateway",
            "NAT gateway",
            "VPN gateway",
            "Transit gateway"
          ],
          "correct": "NAT gateway",
          "task": "t2"
        }
      ],
      "payload": {
        "label": "CREATE VPC",
        "placeholder": "aws ec2 create-vpc --cidr-block 10.0.0.0/16",
        "button": "Create",
        "response": "[VPC] vpc-0a1 created with CIDR 10.0.0.0/16.\n[VPC] subnet-public-1a 10.0.1.0/24, subnet-private-1a 10.0.2.0/24.\n[VPC] Internet gateway igw-09 and NAT gateway nat-04 attached.",
        "task": "t3"
      },
      "commands": [
        {
          "cmd": "aws ec2 describe-route-tables --filters Name=vpc-id,Values=vpc-0a1",
          "out": "[RTB] rtb-public: 10.0.0.0/16 local, 0.0.0.0/0 -> igw-09\n[RTB] rtb-private: 10.0.0.0/16 local, 0.0.0.0/0 -> nat-04",
          "task": "t4"
        },
        {
          "cmd": "show subnets",
          "out": "[VPC] public-1a 10.0.1.0/24, private-1a 10.0.2.0/24, private-1b 10.0.3.0/24"
        },
        {
          "cmd": "show status",
          "out": "Network fabric nominal."
        }
      ]
    }
  },
  {
    "id": "Lab 03",
    "num": 3,
    "group": "CLOUD ARCHITECTURE",
    "title": "Configuring Load Balancing",
    "desc": "Distribute traffic across a fleet of instances using an application load balancer with health checks and a target group. You register backends, define a listener, and confirm that unhealthy targets are automatically drained from rotation.",
    "objectives": [
      "Differentiate Layer 4 and Layer 7 load balancing.",
      "Configure a target group with health checks.",
      "Verify traffic distribution and automatic failover."
    ],
    "console": {
      "host": "cloud-elb01",
      "boot": [
        "[SYS] Load balancing console online.",
        "[SYS] Two backend instances registered.",
        "[SYS] Listener config pending."
      ],
      "tasks": [
        {
          "id": "t1",
          "label": "Select the load balancer that routes on HTTP paths"
        },
        {
          "id": "t2",
          "label": "Choose the check that removes failed backends"
        },
        {
          "id": "t3",
          "label": "Create the load balancer and listener"
        },
        {
          "id": "t4",
          "label": "Inspect target group health"
        }
      ],
      "configs": [
        {
          "id": "c1",
          "label": "Load balancer type that routes by URL path and host",
          "options": [
            "Network Load Balancer (L4)",
            "Application Load Balancer (L7)",
            "Gateway Load Balancer",
            "Classic TCP forwarder"
          ],
          "correct": "Application Load Balancer (L7)",
          "task": "t1"
        },
        {
          "id": "c2",
          "label": "Mechanism that pulls failed backends out of rotation",
          "options": [
            "Sticky sessions",
            "Health checks",
            "Round robin",
            "TLS termination"
          ],
          "correct": "Health checks",
          "task": "t2"
        }
      ],
      "payload": {
        "label": "CREATE LOAD BALANCER",
        "placeholder": "aws elbv2 create-load-balancer --name web-alb --subnets subnet-1a subnet-1b",
        "button": "Create",
        "response": "[ELB] web-alb provisioned across 2 AZs.\n[ELB] HTTPS:443 listener forwards to tg-web.\n[ELB] DNS name web-alb-1234.elb.amazonaws.com active.",
        "task": "t3"
      },
      "commands": [
        {
          "cmd": "aws elbv2 describe-target-health --target-group-arn tg-web",
          "out": "[ELB] i-0aaa healthy\n[ELB] i-0bbb unhealthy (HTTP 503) -> draining\n[ELB] Traffic now served by 1 healthy target.",
          "task": "t4"
        },
        {
          "cmd": "show listeners",
          "out": "[ELB] HTTP:80 -> redirect HTTPS, HTTPS:443 -> tg-web"
        },
        {
          "cmd": "show status",
          "out": "Load balancing engine nominal."
        }
      ]
    }
  },
  {
    "id": "Lab 04",
    "num": 4,
    "group": "CLOUD ARCHITECTURE",
    "title": "Configuring DNS and Routing Policies",
    "desc": "Operate cloud DNS as the front door for your application: create a hosted zone, add records, and apply routing policies for failover and latency. You publish an A record alias to a load balancer and validate resolution with dig.",
    "objectives": [
      "Differentiate record types (A, AAAA, CNAME, alias) and TTL behavior.",
      "Configure routing policies (simple, failover, latency, weighted).",
      "Validate DNS resolution from the client side."
    ],
    "console": {
      "host": "cloud-dns01",
      "boot": [
        "[SYS] DNS management console online.",
        "[SYS] Domain example-cloud.com delegated.",
        "[SYS] Resolver cache warm."
      ],
      "tasks": [
        {
          "id": "t1",
          "label": "Select the record type pointing to another hostname"
        },
        {
          "id": "t2",
          "label": "Choose the policy that fails over to a standby region"
        },
        {
          "id": "t3",
          "label": "Create an alias record to the load balancer"
        },
        {
          "id": "t4",
          "label": "Resolve the record with dig"
        }
      ],
      "configs": [
        {
          "id": "c1",
          "label": "Record type that maps a name to another canonical name",
          "options": [
            "A record",
            "CNAME record",
            "MX record",
            "TXT record"
          ],
          "correct": "CNAME record",
          "task": "t1"
        },
        {
          "id": "c2",
          "label": "Routing policy that directs traffic to a standby on outage",
          "options": [
            "Weighted",
            "Latency-based",
            "Failover",
            "Geolocation"
          ],
          "correct": "Failover",
          "task": "t2"
        }
      ],
      "payload": {
        "label": "CREATE RECORD",
        "placeholder": "aws route53 change-resource-record-sets --hosted-zone-id Z123 --change-batch alias=web-alb",
        "button": "Apply",
        "response": "[DNS] www.example-cloud.com alias -> web-alb-1234.elb.amazonaws.com.\n[DNS] TTL 60s, routing policy simple.\n[DNS] Change INSYNC across all name servers.",
        "task": "t3"
      },
      "commands": [
        {
          "cmd": "dig www.example-cloud.com +short",
          "out": "[DNS] 54.21.10.7\n[DNS] Answer from authoritative NS, TTL 60.",
          "task": "t4"
        },
        {
          "cmd": "show records",
          "out": "[DNS] www A alias, api CNAME, mail MX 10"
        },
        {
          "cmd": "show status",
          "out": "DNS console nominal."
        }
      ]
    }
  },
  {
    "id": "Lab 05",
    "num": 5,
    "group": "CLOUD ARCHITECTURE",
    "title": "Deploying a Managed Database",
    "desc": "Provision a managed relational database with multi-AZ high availability and automated backups. You select the engine and class, enable encryption and failover, and confirm the standby replica is in sync before connecting an application.",
    "objectives": [
      "Choose between managed relational and NoSQL services for a workload.",
      "Enable multi-AZ high availability and automated backups.",
      "Validate connectivity and replica synchronization."
    ],
    "console": {
      "host": "cloud-rds01",
      "boot": [
        "[SYS] Managed database console online.",
        "[SYS] Subnet group spans 2 private subnets.",
        "[SYS] Parameter group default loaded."
      ],
      "tasks": [
        {
          "id": "t1",
          "label": "Select the service for a relational transactional workload"
        },
        {
          "id": "t2",
          "label": "Choose the feature giving synchronous standby failover"
        },
        {
          "id": "t3",
          "label": "Create the database instance via CLI"
        },
        {
          "id": "t4",
          "label": "Verify the standby replica status"
        }
      ],
      "configs": [
        {
          "id": "c1",
          "label": "Service best suited for a relational SQL workload",
          "options": [
            "Managed key-value store",
            "Managed relational database (RDS)",
            "Object storage",
            "Message queue"
          ],
          "correct": "Managed relational database (RDS)",
          "task": "t1"
        },
        {
          "id": "c2",
          "label": "Feature providing synchronous standby and automatic failover",
          "options": [
            "Read replica",
            "Multi-AZ deployment",
            "Single-AZ with snapshots",
            "Caching layer"
          ],
          "correct": "Multi-AZ deployment",
          "task": "t2"
        }
      ],
      "payload": {
        "label": "CREATE DB INSTANCE",
        "placeholder": "aws rds create-db-instance --db-instance-identifier app-db --engine postgres --multi-az",
        "button": "Create",
        "response": "[RDS] app-db (postgres 16) creating, class db.m6g.large.\n[RDS] Multi-AZ enabled, storage encrypted with KMS.\n[RDS] Automated backups retained 7 days, endpoint app-db.cluster.us-east-1.rds.amazonaws.com.",
        "task": "t3"
      },
      "commands": [
        {
          "cmd": "aws rds describe-db-instances --db-instance-identifier app-db",
          "out": "[RDS] Status: available\n[RDS] Multi-AZ: true, SecondaryAZ us-east-1b\n[RDS] Replica lag: 0 ms (in sync)",
          "task": "t4"
        },
        {
          "cmd": "psql -h app-db.cluster.us-east-1.rds.amazonaws.com -U appuser",
          "out": "[DB] Connected. Server version 16.2."
        },
        {
          "cmd": "show status",
          "out": "Managed database engine nominal."
        }
      ]
    }
  },
  {
    "id": "Lab 06",
    "num": 6,
    "group": "DEPLOYMENT",
    "title": "Writing Terraform Infrastructure as Code",
    "desc": "Codify your cloud infrastructure with Terraform so it is repeatable and version controlled. You write a configuration, preview the change with a plan, and apply it, then confirm the resource was created exactly as declared in state.",
    "objectives": [
      "Explain the IaC workflow: write, plan, apply, destroy.",
      "Differentiate declarative configuration from imperative scripting.",
      "Use plan to preview changes before applying."
    ],
    "console": {
      "host": "cloud-iac01",
      "boot": [
        "[SYS] IaC workstation online.",
        "[SYS] Terraform v1.8 initialized.",
        "[SYS] Backend: remote state in S3 with locking."
      ],
      "tasks": [
        {
          "id": "t1",
          "label": "Select the command that previews changes without applying"
        },
        {
          "id": "t2",
          "label": "Choose the paradigm Terraform uses"
        },
        {
          "id": "t3",
          "label": "Apply the Terraform configuration"
        },
        {
          "id": "t4",
          "label": "Inspect the resource in state"
        }
      ],
      "configs": [
        {
          "id": "c1",
          "label": "Command that previews changes without modifying infrastructure",
          "options": [
            "terraform apply",
            "terraform plan",
            "terraform destroy",
            "terraform import"
          ],
          "correct": "terraform plan",
          "task": "t1"
        },
        {
          "id": "c2",
          "label": "Configuration paradigm Terraform follows",
          "options": [
            "Imperative scripting",
            "Declarative desired state",
            "Manual console clicks",
            "Procedural batch jobs"
          ],
          "correct": "Declarative desired state",
          "task": "t2"
        }
      ],
      "payload": {
        "label": "APPLY CONFIG",
        "placeholder": "terraform apply -auto-approve",
        "button": "Apply",
        "response": "[TF] Plan: 3 to add, 0 to change, 0 to destroy.\n[TF] aws_instance.web: Creation complete after 22s [id=i-0fed9].\n[TF] Apply complete! Resources: 3 added. State written to backend.",
        "task": "t3"
      },
      "commands": [
        {
          "cmd": "terraform state show aws_instance.web",
          "out": "[TF] id = i-0fed9\n[TF] instance_type = t3.medium\n[TF] tags.Name = web-tier",
          "task": "t4"
        },
        {
          "cmd": "terraform plan",
          "out": "[TF] No changes. Your infrastructure matches the configuration."
        },
        {
          "cmd": "show status",
          "out": "IaC workstation nominal."
        }
      ]
    }
  },
  {
    "id": "Lab 07",
    "num": 7,
    "group": "DEPLOYMENT",
    "title": "Deploying a Container with Docker",
    "desc": "Package an application into a container image and run it portably. You build an image from a Dockerfile, map ports, run the container, and confirm the app responds, demonstrating consistent behavior across environments.",
    "objectives": [
      "Differentiate an image from a running container.",
      "Build, tag, and run a container with port mapping.",
      "Verify the containerized application responds."
    ],
    "console": {
      "host": "cloud-docker01",
      "boot": [
        "[SYS] Container host online.",
        "[SYS] Docker engine 26.0 running.",
        "[SYS] Dockerfile present in working directory."
      ],
      "tasks": [
        {
          "id": "t1",
          "label": "Select what a Docker image actually is"
        },
        {
          "id": "t2",
          "label": "Choose the flag that maps a host port to the container"
        },
        {
          "id": "t3",
          "label": "Build and run the container"
        },
        {
          "id": "t4",
          "label": "Confirm the running container and test it"
        }
      ],
      "configs": [
        {
          "id": "c1",
          "label": "What a Docker image represents",
          "options": [
            "A running process",
            "An immutable read-only template of app and dependencies",
            "A virtual machine with its own kernel",
            "A network bridge"
          ],
          "correct": "An immutable read-only template of app and dependencies",
          "task": "t1"
        },
        {
          "id": "c2",
          "label": "Flag that publishes a container port to the host",
          "options": [
            "-v",
            "-p",
            "-e",
            "--rm"
          ],
          "correct": "-p",
          "task": "t2"
        }
      ],
      "payload": {
        "label": "BUILD AND RUN",
        "placeholder": "docker build -t webapp:1.0 . && docker run -d -p 8080:80 webapp:1.0",
        "button": "Run",
        "response": "[DOCKER] Successfully built image webapp:1.0 (142MB).\n[DOCKER] Container c9f3 started, 0.0.0.0:8080->80/tcp.\n[DOCKER] App listening, health endpoint returning 200.",
        "task": "t3"
      },
      "commands": [
        {
          "cmd": "docker ps",
          "out": "[DOCKER] c9f3  webapp:1.0  Up 12s  0.0.0.0:8080->80/tcp\n[DOCKER] curl localhost:8080 -> HTTP 200 OK",
          "task": "t4"
        },
        {
          "cmd": "docker images",
          "out": "[DOCKER] webapp 1.0 142MB, nginx latest 187MB"
        },
        {
          "cmd": "show status",
          "out": "Container host nominal."
        }
      ]
    }
  },
  {
    "id": "Lab 08",
    "num": 8,
    "group": "DEPLOYMENT",
    "title": "Orchestrating Containers with Kubernetes",
    "desc": "Move from a single container to a self-healing cluster with Kubernetes. You apply a deployment manifest, expose it through a service, scale the replica count, and watch the control plane reconcile the desired state automatically.",
    "objectives": [
      "Explain the relationship among pods, deployments, and services.",
      "Apply a manifest and scale replicas declaratively.",
      "Observe the controller reconciling desired state."
    ],
    "console": {
      "host": "cloud-k8s01",
      "boot": [
        "[SYS] Kubernetes control plane online.",
        "[SYS] kubectl context: prod-cluster.",
        "[SYS] 3 worker nodes Ready."
      ],
      "tasks": [
        {
          "id": "t1",
          "label": "Select the smallest deployable unit in Kubernetes"
        },
        {
          "id": "t2",
          "label": "Choose the object giving pods a stable network endpoint"
        },
        {
          "id": "t3",
          "label": "Apply the deployment manifest"
        },
        {
          "id": "t4",
          "label": "Scale the deployment and verify"
        }
      ],
      "configs": [
        {
          "id": "c1",
          "label": "Smallest deployable unit in Kubernetes",
          "options": [
            "Container",
            "Pod",
            "Node",
            "Namespace"
          ],
          "correct": "Pod",
          "task": "t1"
        },
        {
          "id": "c2",
          "label": "Object providing a stable endpoint and load balancing for pods",
          "options": [
            "ConfigMap",
            "Service",
            "Secret",
            "Volume"
          ],
          "correct": "Service",
          "task": "t2"
        }
      ],
      "payload": {
        "label": "APPLY MANIFEST",
        "placeholder": "kubectl apply -f deployment.yaml",
        "button": "Apply",
        "response": "[K8S] deployment.apps/webapp created.\n[K8S] service/webapp-svc created (ClusterIP 10.96.0.42).\n[K8S] 3/3 pods Running and Ready.",
        "task": "t3"
      },
      "commands": [
        {
          "cmd": "kubectl scale deployment webapp --replicas=5",
          "out": "[K8S] deployment.apps/webapp scaled\n[K8S] Reconciling: 5/5 pods Running\n[K8S] Endpoints updated in webapp-svc.",
          "task": "t4"
        },
        {
          "cmd": "kubectl get pods",
          "out": "[K8S] webapp-7d9 Running, webapp-8a2 Running, webapp-9b4 Running"
        },
        {
          "cmd": "show status",
          "out": "Control plane nominal."
        }
      ]
    }
  },
  {
    "id": "Lab 09",
    "num": 9,
    "group": "OPERATIONS",
    "title": "Configuring Autoscaling",
    "desc": "Make your fleet elastic by attaching an autoscaling group with target-tracking policies. You set minimum, desired, and maximum capacity, define a CPU target, and watch the group scale out under load and back in when demand subsides.",
    "objectives": [
      "Differentiate horizontal and vertical scaling.",
      "Configure an autoscaling group with min, desired, and max capacity.",
      "Define a target-tracking scaling policy and observe scale events."
    ],
    "console": {
      "host": "cloud-asg01",
      "boot": [
        "[SYS] Autoscaling console online.",
        "[SYS] Launch template lt-web-09 selected.",
        "[SYS] Metrics stream connected."
      ],
      "tasks": [
        {
          "id": "t1",
          "label": "Select the scaling approach that adds more instances"
        },
        {
          "id": "t2",
          "label": "Choose the policy that holds a metric at a setpoint"
        },
        {
          "id": "t3",
          "label": "Create the autoscaling group"
        },
        {
          "id": "t4",
          "label": "Review scaling activity"
        }
      ],
      "configs": [
        {
          "id": "c1",
          "label": "Scaling approach that adds more instances to spread load",
          "options": [
            "Vertical scaling (scale up)",
            "Horizontal scaling (scale out)",
            "Diagonal scaling",
            "Manual reboot"
          ],
          "correct": "Horizontal scaling (scale out)",
          "task": "t1"
        },
        {
          "id": "c2",
          "label": "Policy that keeps a metric near a chosen value",
          "options": [
            "Scheduled scaling",
            "Target-tracking scaling",
            "Manual scaling",
            "No scaling"
          ],
          "correct": "Target-tracking scaling",
          "task": "t2"
        }
      ],
      "payload": {
        "label": "CREATE ASG",
        "placeholder": "aws autoscaling create-auto-scaling-group --name web-asg --min 2 --max 8 --desired 2",
        "button": "Create",
        "response": "[ASG] web-asg created: min 2, desired 2, max 8.\n[ASG] Target-tracking policy: keep avg CPU at 50 percent.\n[ASG] 2 instances launched across 2 AZs, registered to tg-web.",
        "task": "t3"
      },
      "commands": [
        {
          "cmd": "aws autoscaling describe-scaling-activities --auto-scaling-group-name web-asg",
          "out": "[ASG] CPU hit 78 percent -> scale out to 5 instances\n[ASG] CPU fell to 30 percent -> scale in to 2 instances\n[ASG] Cooldown 300s honored.",
          "task": "t4"
        },
        {
          "cmd": "show capacity",
          "out": "[ASG] min 2 / desired 2 / max 8, healthy 2"
        },
        {
          "cmd": "show status",
          "out": "Autoscaling engine nominal."
        }
      ]
    }
  },
  {
    "id": "Lab 10",
    "num": 10,
    "group": "OPERATIONS",
    "title": "Object Storage and Lifecycle Tiering",
    "desc": "Use object storage as a durable, scalable data layer and control its cost with lifecycle policies. You create a bucket, block public access, upload an object, then add rules that transition aging data to colder tiers and expire it.",
    "objectives": [
      "Differentiate object, block, and file storage.",
      "Apply a lifecycle policy to transition data across storage classes.",
      "Enforce secure defaults such as block-public-access."
    ],
    "console": {
      "host": "cloud-s3-01",
      "boot": [
        "[SYS] Object storage console online.",
        "[SYS] Region us-east-1, default encryption SSE-S3.",
        "[SYS] Block-public-access account default ON."
      ],
      "tasks": [
        {
          "id": "t1",
          "label": "Select the storage type for unstructured blobs at scale"
        },
        {
          "id": "t2",
          "label": "Choose the tier for rarely accessed archival data"
        },
        {
          "id": "t3",
          "label": "Create the bucket and upload an object"
        },
        {
          "id": "t4",
          "label": "Apply a lifecycle transition rule"
        }
      ],
      "configs": [
        {
          "id": "c1",
          "label": "Storage type best for unstructured data at massive scale",
          "options": [
            "Block storage",
            "Object storage",
            "File storage",
            "Local instance store"
          ],
          "correct": "Object storage",
          "task": "t1"
        },
        {
          "id": "c2",
          "label": "Storage class for cheapest long-term archival",
          "options": [
            "Standard",
            "Standard-IA",
            "Glacier Deep Archive",
            "One Zone-IA"
          ],
          "correct": "Glacier Deep Archive",
          "task": "t2"
        }
      ],
      "payload": {
        "label": "CREATE BUCKET",
        "placeholder": "aws s3api create-bucket --bucket app-data-2026 --region us-east-1",
        "button": "Create",
        "response": "[S3] Bucket app-data-2026 created, public access blocked.\n[S3] Default encryption SSE-S3 enabled, versioning ON.\n[S3] Uploaded report.csv (4.2MB) to s3://app-data-2026/report.csv.",
        "task": "t3"
      },
      "commands": [
        {
          "cmd": "aws s3api put-bucket-lifecycle-configuration --bucket app-data-2026 --lifecycle-configuration rules",
          "out": "[S3] Rule applied: transition to Standard-IA at 30 days.\n[S3] Transition to Glacier at 90 days, expire at 365 days.\n[S3] Lifecycle policy active.",
          "task": "t4"
        },
        {
          "cmd": "aws s3 ls s3://app-data-2026",
          "out": "[S3] report.csv 4.2MB, logs/ prefix, backups/ prefix"
        },
        {
          "cmd": "show status",
          "out": "Object storage nominal."
        }
      ]
    }
  },
  {
    "id": "Lab 11",
    "num": 11,
    "group": "OPERATIONS",
    "title": "Backup and Restore",
    "desc": "Protect data with scheduled snapshots and prove you can recover. You configure a backup plan with retention, take an on-demand snapshot of a volume, then restore it to a new volume and validate the data is intact and consistent.",
    "objectives": [
      "Differentiate snapshots, full backups, and incrementals.",
      "Define a backup plan with schedule and retention.",
      "Restore from a snapshot and validate data integrity."
    ],
    "console": {
      "host": "cloud-backup01",
      "boot": [
        "[SYS] Backup orchestration console online.",
        "[SYS] Volume vol-0app attached to i-0fed9.",
        "[SYS] Backup vault encrypted with KMS."
      ],
      "tasks": [
        {
          "id": "t1",
          "label": "Select the backup type capturing only changed blocks"
        },
        {
          "id": "t2",
          "label": "Choose the metric defining acceptable data loss"
        },
        {
          "id": "t3",
          "label": "Take an on-demand snapshot"
        },
        {
          "id": "t4",
          "label": "Restore from the snapshot and verify"
        }
      ],
      "configs": [
        {
          "id": "c1",
          "label": "Backup type that stores only blocks changed since the last backup",
          "options": [
            "Full backup",
            "Incremental backup",
            "Differential backup",
            "Mirror copy"
          ],
          "correct": "Incremental backup",
          "task": "t1"
        },
        {
          "id": "c2",
          "label": "Metric defining maximum acceptable data loss window",
          "options": [
            "RTO",
            "RPO",
            "MTTR",
            "SLA"
          ],
          "correct": "RPO",
          "task": "t2"
        }
      ],
      "payload": {
        "label": "CREATE SNAPSHOT",
        "placeholder": "aws ec2 create-snapshot --volume-id vol-0app --description nightly",
        "button": "Snapshot",
        "response": "[BACKUP] Snapshot snap-0c1 started for vol-0app.\n[BACKUP] Incremental, 1.1GB changed since last snapshot.\n[BACKUP] State completed, stored in vault, tagged retention=30d.",
        "task": "t3"
      },
      "commands": [
        {
          "cmd": "aws ec2 create-volume --snapshot-id snap-0c1 --availability-zone us-east-1a",
          "out": "[RESTORE] vol-0new created from snap-0c1.\n[RESTORE] Mounted /dev/xvdf, fsck clean.\n[RESTORE] Checksum matches source, data integrity verified.",
          "task": "t4"
        },
        {
          "cmd": "show backup-plan",
          "out": "[BACKUP] Daily 02:00 retain 30d, weekly retain 90d, monthly retain 1y"
        },
        {
          "cmd": "show status",
          "out": "Backup orchestration nominal."
        }
      ]
    }
  },
  {
    "id": "Lab 12",
    "num": 12,
    "group": "SECURITY",
    "title": "Configuring a Security Group and NACL",
    "desc": "Layer network access controls at the instance and subnet boundaries. You write stateful security group rules and stateless network ACL rules, then reason about how the two interact to permit or deny a connection end to end.",
    "objectives": [
      "Differentiate stateful security groups from stateless NACLs.",
      "Author least-privilege inbound and outbound rules.",
      "Predict the result when both layers are evaluated."
    ],
    "console": {
      "host": "cloud-sg01",
      "boot": [
        "[SYS] Network access control console online.",
        "[SYS] VPC vpc-0a1 selected.",
        "[SYS] Default deny in effect on new rules."
      ],
      "tasks": [
        {
          "id": "t1",
          "label": "Select the control that is stateful"
        },
        {
          "id": "t2",
          "label": "Choose the control that needs explicit return rules"
        },
        {
          "id": "t3",
          "label": "Add a security group ingress rule for HTTPS"
        },
        {
          "id": "t4",
          "label": "Inspect the effective rules"
        }
      ],
      "configs": [
        {
          "id": "c1",
          "label": "Control that automatically allows return traffic",
          "options": [
            "Network ACL",
            "Security group",
            "Route table",
            "Internet gateway"
          ],
          "correct": "Security group",
          "task": "t1"
        },
        {
          "id": "c2",
          "label": "Control that is stateless and needs explicit return rules",
          "options": [
            "Security group",
            "Network ACL",
            "IAM policy",
            "KMS key policy"
          ],
          "correct": "Network ACL",
          "task": "t2"
        }
      ],
      "payload": {
        "label": "ADD SG RULE",
        "placeholder": "aws ec2 authorize-security-group-ingress --group-id sg-0web --protocol tcp --port 443 --cidr 0.0.0.0/0",
        "button": "Commit",
        "response": "[SG] Ingress rule added to sg-0web: tcp/443 from 0.0.0.0/0.\n[SG] Stateful: matching return traffic auto-allowed.\n[SG] Effective with NACL allow on ephemeral ports 1024-65535.",
        "task": "t3"
      },
      "commands": [
        {
          "cmd": "aws ec2 describe-security-groups --group-ids sg-0web",
          "out": "[SG] Ingress: tcp/443 0.0.0.0/0, tcp/22 10.0.0.0/16\n[SG] Egress: all traffic allowed\n[SG] Attached to 3 instances.",
          "task": "t4"
        },
        {
          "cmd": "show nacl",
          "out": "[NACL] 100 allow 443 in, 200 allow 1024-65535 out, * deny"
        },
        {
          "cmd": "show status",
          "out": "Access control console nominal."
        }
      ]
    }
  },
  {
    "id": "Lab 13",
    "num": 13,
    "group": "SECURITY",
    "title": "Configuring IAM Users, Roles, and Policies",
    "desc": "Apply least-privilege identity and access management in the cloud. You create a role with a scoped policy, attach it to a workload rather than embedding keys, and verify that the permissions granted match exactly what the task requires.",
    "objectives": [
      "Differentiate users, groups, roles, and policies.",
      "Apply the principle of least privilege with scoped policies.",
      "Prefer roles over long-lived access keys for workloads."
    ],
    "console": {
      "host": "cloud-iam01",
      "boot": [
        "[SYS] IAM console online.",
        "[SYS] Account 123456789012.",
        "[SYS] Policy simulator available."
      ],
      "tasks": [
        {
          "id": "t1",
          "label": "Select the identity an EC2 workload should assume"
        },
        {
          "id": "t2",
          "label": "Choose the safest credential model for an instance"
        },
        {
          "id": "t3",
          "label": "Create a role and attach a scoped policy"
        },
        {
          "id": "t4",
          "label": "Simulate the policy to confirm permissions"
        }
      ],
      "configs": [
        {
          "id": "c1",
          "label": "Identity type a compute workload should assume",
          "options": [
            "IAM user with password",
            "IAM role",
            "Root account",
            "Anonymous principal"
          ],
          "correct": "IAM role",
          "task": "t1"
        },
        {
          "id": "c2",
          "label": "Safest credential model for an instance to call APIs",
          "options": [
            "Embed long-lived access keys",
            "Attach an instance profile role",
            "Hardcode root keys",
            "Share keys in user-data"
          ],
          "correct": "Attach an instance profile role",
          "task": "t2"
        }
      ],
      "payload": {
        "label": "CREATE ROLE",
        "placeholder": "aws iam create-role --role-name app-s3-read --assume-role-policy-document trust.json",
        "button": "Create",
        "response": "[IAM] Role app-s3-read created with EC2 trust policy.\n[IAM] Attached policy grants s3:GetObject on arn:aws:s3:::app-data-2026/*.\n[IAM] Least privilege: no write, no other buckets.",
        "task": "t3"
      },
      "commands": [
        {
          "cmd": "aws iam simulate-principal-policy --policy-source-arn app-s3-read --action-names s3:GetObject s3:DeleteObject",
          "out": "[IAM] s3:GetObject -> allowed\n[IAM] s3:DeleteObject -> implicitDeny\n[IAM] Least-privilege confirmed.",
          "task": "t4"
        },
        {
          "cmd": "aws iam list-attached-role-policies --role-name app-s3-read",
          "out": "[IAM] app-s3-read-policy attached"
        },
        {
          "cmd": "show status",
          "out": "IAM console nominal."
        }
      ]
    }
  },
  {
    "id": "Lab 14",
    "num": 14,
    "group": "SECURITY",
    "title": "Enabling Encryption with KMS",
    "desc": "Protect data at rest with managed keys and key policies. You create a customer-managed KMS key, enable encryption on a volume and bucket, and confirm that decryption requires the correct key grant, demonstrating envelope encryption in action.",
    "objectives": [
      "Differentiate data-at-rest and data-in-transit encryption.",
      "Explain envelope encryption and customer-managed keys.",
      "Enforce encryption with a KMS key policy and grants."
    ],
    "console": {
      "host": "cloud-kms01",
      "boot": [
        "[SYS] Key management service console online.",
        "[SYS] Region us-east-1, HSM-backed key store.",
        "[SYS] Audit logging to CloudTrail enabled."
      ],
      "tasks": [
        {
          "id": "t1",
          "label": "Select the protocol protecting data in transit"
        },
        {
          "id": "t2",
          "label": "Choose the technique KMS uses to encrypt large data"
        },
        {
          "id": "t3",
          "label": "Create a customer-managed key"
        },
        {
          "id": "t4",
          "label": "Verify the key policy and grants"
        }
      ],
      "configs": [
        {
          "id": "c1",
          "label": "Protection for data moving across the network",
          "options": [
            "TLS encryption in transit",
            "Volume encryption at rest",
            "Disk wiping",
            "Compression"
          ],
          "correct": "TLS encryption in transit",
          "task": "t1"
        },
        {
          "id": "c2",
          "label": "Technique using a data key wrapped by a master key",
          "options": [
            "Hashing",
            "Envelope encryption",
            "Base64 encoding",
            "Steganography"
          ],
          "correct": "Envelope encryption",
          "task": "t2"
        }
      ],
      "payload": {
        "label": "CREATE KEY",
        "placeholder": "aws kms create-key --description app-cmk --key-usage ENCRYPT_DECRYPT",
        "button": "Create",
        "response": "[KMS] Customer-managed key arn:aws:kms:...:key/abcd created.\n[KMS] Automatic annual rotation enabled.\n[KMS] Applied to vol-0app and bucket app-data-2026 (envelope encryption).",
        "task": "t3"
      },
      "commands": [
        {
          "cmd": "aws kms get-key-policy --key-id abcd --policy-name default",
          "out": "[KMS] Principal app-s3-read allowed kms:Decrypt\n[KMS] Deny without grant, root retains admin\n[KMS] Grants: 1 active for the role.",
          "task": "t4"
        },
        {
          "cmd": "aws kms list-keys",
          "out": "[KMS] app-cmk (customer), aws/s3 (managed), aws/ebs (managed)"
        },
        {
          "cmd": "show status",
          "out": "Key management nominal."
        }
      ]
    }
  },
  {
    "id": "Lab 15",
    "num": 15,
    "group": "SECURITY",
    "title": "Cloud Compliance and Configuration Auditing",
    "desc": "Continuously assess your environment against security baselines. You enable a config recorder, evaluate resources against rules, and remediate a non-compliant finding such as a public bucket or unencrypted volume to restore the baseline.",
    "objectives": [
      "Explain continuous compliance and configuration drift.",
      "Map controls to a compliance benchmark (CIS, PCI DSS).",
      "Detect and remediate a non-compliant resource."
    ],
    "console": {
      "host": "cloud-config01",
      "boot": [
        "[SYS] Compliance and config console online.",
        "[SYS] Recorder tracking 412 resources.",
        "[SYS] Conformance pack: CIS Benchmark loaded."
      ],
      "tasks": [
        {
          "id": "t1",
          "label": "Select the term for unauthorized change from baseline"
        },
        {
          "id": "t2",
          "label": "Choose the benchmark for hardened configuration"
        },
        {
          "id": "t3",
          "label": "Evaluate resources against the rules"
        },
        {
          "id": "t4",
          "label": "Remediate a non-compliant finding"
        }
      ],
      "configs": [
        {
          "id": "c1",
          "label": "Term for configuration deviating from an approved baseline",
          "options": [
            "Configuration drift",
            "Auto-scaling",
            "Failover",
            "Throttling"
          ],
          "correct": "Configuration drift",
          "task": "t1"
        },
        {
          "id": "c2",
          "label": "Benchmark providing hardened configuration guidance",
          "options": [
            "RFC 1918",
            "CIS Benchmark",
            "OSI model",
            "BGP standard"
          ],
          "correct": "CIS Benchmark",
          "task": "t2"
        }
      ],
      "payload": {
        "label": "REMEDIATE FINDING",
        "placeholder": "aws s3api put-public-access-block --bucket app-logs --public-access-block-configuration BlockPublicAcls=true",
        "button": "Remediate",
        "response": "[CONFIG] Finding s3-bucket-public-read-prohibited was NON_COMPLIANT.\n[CONFIG] Public access blocked on bucket app-logs.\n[CONFIG] Re-evaluated: status now COMPLIANT.",
        "task": "t4"
      },
      "commands": [
        {
          "cmd": "aws configservice describe-compliance-by-config-rule",
          "out": "[CONFIG] encrypted-volumes: COMPLIANT (412/412)\n[CONFIG] s3-public-read-prohibited: NON_COMPLIANT (1)\n[CONFIG] iam-no-root-access-key: COMPLIANT",
          "task": "t3"
        },
        {
          "cmd": "show rules",
          "out": "[CONFIG] 24 rules active from CIS conformance pack"
        },
        {
          "cmd": "show status",
          "out": "Compliance console nominal."
        }
      ]
    }
  },
  {
    "id": "Lab 16",
    "num": 16,
    "group": "DEVOPS FUNDAMENTALS",
    "title": "Building a CI/CD Pipeline",
    "desc": "Automate the path from commit to deploy with a continuous integration and delivery pipeline. You define build, test, and deploy stages, trigger a run on a commit, and confirm that a failing test halts promotion before code reaches production.",
    "objectives": [
      "Differentiate continuous integration, delivery, and deployment.",
      "Define pipeline stages with quality gates.",
      "Confirm a failing gate blocks promotion."
    ],
    "console": {
      "host": "cloud-cicd01",
      "boot": [
        "[SYS] Pipeline orchestrator online.",
        "[SYS] Source repo connected, webhook armed.",
        "[SYS] Build agents idle, ready."
      ],
      "tasks": [
        {
          "id": "t1",
          "label": "Select the practice of merging and testing code frequently"
        },
        {
          "id": "t2",
          "label": "Choose what a failing unit-test gate should do"
        },
        {
          "id": "t3",
          "label": "Trigger a pipeline run on a commit"
        },
        {
          "id": "t4",
          "label": "Inspect the stage results"
        }
      ],
      "configs": [
        {
          "id": "c1",
          "label": "Practice of frequently merging and automatically testing code",
          "options": [
            "Continuous integration",
            "Continuous monitoring",
            "Cold standby",
            "Manual release"
          ],
          "correct": "Continuous integration",
          "task": "t1"
        },
        {
          "id": "c2",
          "label": "Correct behavior when a quality gate fails",
          "options": [
            "Deploy anyway",
            "Halt the pipeline and block promotion",
            "Ignore the failure",
            "Delete the repo"
          ],
          "correct": "Halt the pipeline and block promotion",
          "task": "t2"
        }
      ],
      "payload": {
        "label": "TRIGGER PIPELINE",
        "placeholder": "git push origin main",
        "button": "Push",
        "response": "[CICD] Webhook fired on commit a1b2c3.\n[CICD] Stage build: passed (image webapp:a1b2c3).\n[CICD] Stage test: passed 142/142, stage deploy queued.",
        "task": "t3"
      },
      "commands": [
        {
          "cmd": "pipeline status",
          "out": "[CICD] build OK -> test OK -> deploy-staging OK -> deploy-prod (manual approval)\n[CICD] Last failed run blocked at test on commit f9e8 (1 test failed).",
          "task": "t4"
        },
        {
          "cmd": "show stages",
          "out": "[CICD] source, build, test, security-scan, deploy-staging, deploy-prod"
        },
        {
          "cmd": "show status",
          "out": "Pipeline orchestrator nominal."
        }
      ]
    }
  },
  {
    "id": "Lab 17",
    "num": 17,
    "group": "DEVOPS FUNDAMENTALS",
    "title": "Blue-Green and Canary Deployments",
    "desc": "Release changes safely using progressive delivery strategies. You stand up a parallel environment for an instant cutover, then shift a small percentage of traffic in a canary, monitor error rates, and roll forward or back based on what you observe.",
    "objectives": [
      "Differentiate blue-green from canary deployment strategies.",
      "Shift traffic gradually and monitor key metrics.",
      "Roll back automatically when error budgets are breached."
    ],
    "console": {
      "host": "cloud-deploy01",
      "boot": [
        "[SYS] Progressive delivery console online.",
        "[SYS] Blue (v1) live at 100 percent traffic.",
        "[SYS] Green (v2) deployed, 0 percent traffic."
      ],
      "tasks": [
        {
          "id": "t1",
          "label": "Select the strategy with two full parallel environments"
        },
        {
          "id": "t2",
          "label": "Choose the strategy sending a small traffic slice first"
        },
        {
          "id": "t3",
          "label": "Shift canary traffic to the new version"
        },
        {
          "id": "t4",
          "label": "Cut over or roll back based on metrics"
        }
      ],
      "configs": [
        {
          "id": "c1",
          "label": "Strategy running two identical environments for instant switch",
          "options": [
            "Canary",
            "Blue-green",
            "Rolling restart",
            "Big-bang"
          ],
          "correct": "Blue-green",
          "task": "t1"
        },
        {
          "id": "c2",
          "label": "Strategy exposing a small percentage of users first",
          "options": [
            "Blue-green",
            "Canary",
            "Recreate",
            "Cold deploy"
          ],
          "correct": "Canary",
          "task": "t2"
        }
      ],
      "payload": {
        "label": "SHIFT TRAFFIC",
        "placeholder": "aws deploy create-deployment --config Canary10Percent5Minutes --app webapp",
        "button": "Deploy",
        "response": "[DEPLOY] Canary started: 10 percent traffic to green (v2).\n[DEPLOY] Error rate 0.1 percent, latency p95 stable.\n[DEPLOY] Bake window passing, ready to promote.",
        "task": "t3"
      },
      "commands": [
        {
          "cmd": "deploy promote green",
          "out": "[DEPLOY] Shifting 100 percent traffic to green (v2).\n[DEPLOY] Blue (v1) kept warm for fast rollback.\n[DEPLOY] Cutover complete, deployment healthy.",
          "task": "t4"
        },
        {
          "cmd": "show metrics",
          "out": "[DEPLOY] green p95 180ms, 5xx 0.1 percent, within error budget"
        },
        {
          "cmd": "show status",
          "out": "Progressive delivery nominal."
        }
      ]
    }
  },
  {
    "id": "Lab 18",
    "num": 18,
    "group": "DEVOPS FUNDAMENTALS",
    "title": "Observability: Logging, Metrics, and Alerting",
    "desc": "Instrument your environment so you can see and respond to its behavior. You ship metrics and logs to a central service, build a dashboard, and create an alarm that notifies on-call when a threshold like CPU or error rate is breached.",
    "objectives": [
      "Differentiate metrics, logs, and traces (the three pillars).",
      "Create a metric alarm with a threshold and action.",
      "Validate that breaching the threshold fires a notification."
    ],
    "console": {
      "host": "cloud-obs01",
      "boot": [
        "[SYS] Observability platform online.",
        "[SYS] Ingesting metrics, logs, and traces.",
        "[SYS] Notification topic ops-oncall subscribed."
      ],
      "tasks": [
        {
          "id": "t1",
          "label": "Select the pillar that records discrete timestamped events"
        },
        {
          "id": "t2",
          "label": "Choose the component that follows a request across services"
        },
        {
          "id": "t3",
          "label": "Create a CPU alarm with a notification"
        },
        {
          "id": "t4",
          "label": "Confirm the alarm fired on breach"
        }
      ],
      "configs": [
        {
          "id": "c1",
          "label": "Observability pillar of discrete timestamped event records",
          "options": [
            "Metrics",
            "Logs",
            "Traces",
            "Dashboards"
          ],
          "correct": "Logs",
          "task": "t1"
        },
        {
          "id": "c2",
          "label": "Pillar that follows a request end to end across services",
          "options": [
            "Metrics",
            "Logs",
            "Distributed traces",
            "Snapshots"
          ],
          "correct": "Distributed traces",
          "task": "t2"
        }
      ],
      "payload": {
        "label": "CREATE ALARM",
        "placeholder": "aws cloudwatch put-metric-alarm --alarm-name high-cpu --metric CPUUtilization --threshold 80",
        "button": "Create",
        "response": "[OBS] Alarm high-cpu armed: CPUUtilization > 80 for 3 datapoints.\n[OBS] Action: notify SNS topic ops-oncall.\n[OBS] State INSUFFICIENT_DATA -> OK after first samples.",
        "task": "t3"
      },
      "commands": [
        {
          "cmd": "aws cloudwatch describe-alarms --alarm-names high-cpu",
          "out": "[OBS] high-cpu state: ALARM (CPU 91 percent)\n[OBS] Notification sent to ops-oncall at 14:22 UTC\n[OBS] PagerDuty incident opened.",
          "task": "t4"
        },
        {
          "cmd": "show dashboards",
          "out": "[OBS] fleet-health, latency-overview, error-budget panels live"
        },
        {
          "cmd": "show status",
          "out": "Observability platform nominal."
        }
      ]
    }
  },
  {
    "id": "Lab 19",
    "num": 19,
    "group": "TROUBLESHOOTING",
    "title": "Troubleshooting Connectivity",
    "desc": "Diagnose why an instance is unreachable by working methodically up the stack. You check security groups, NACLs, route tables, and DNS, isolating the layer at fault, then apply the fix and confirm the path is restored end to end.",
    "objectives": [
      "Apply a structured troubleshooting methodology to a network path.",
      "Distinguish security group, NACL, routing, and DNS causes.",
      "Validate the fix restores connectivity."
    ],
    "console": {
      "host": "cloud-tshoot01",
      "boot": [
        "[SYS] Connectivity diagnostics console online.",
        "[SYS] Incident: web tier unreachable from internet.",
        "[SYS] Reachability analyzer ready."
      ],
      "tasks": [
        {
          "id": "t1",
          "label": "Select the first layer to check for a blocked port"
        },
        {
          "id": "t2",
          "label": "Choose the cause when the name fails to resolve"
        },
        {
          "id": "t3",
          "label": "Run path analysis to find the blocking hop"
        },
        {
          "id": "t4",
          "label": "Apply the fix and re-test the path"
        }
      ],
      "configs": [
        {
          "id": "c1",
          "label": "First control to inspect when a port is unexpectedly blocked",
          "options": [
            "Security group rules",
            "BIOS settings",
            "Billing console",
            "Instance hostname"
          ],
          "correct": "Security group rules",
          "task": "t1"
        },
        {
          "id": "c2",
          "label": "Likely cause when the IP works but the name does not",
          "options": [
            "DNS resolution failure",
            "Disk full",
            "Expired TLS cert",
            "CPU throttling"
          ],
          "correct": "DNS resolution failure",
          "task": "t2"
        }
      ],
      "payload": {
        "label": "ANALYZE PATH",
        "placeholder": "aws ec2 start-network-insights-analysis --source igw-09 --destination i-0fed9 --destination-port 443",
        "button": "Analyze",
        "response": "[NET] Path: igw-09 -> rtb-public -> nacl-100 -> sg-0web -> i-0fed9.\n[NET] Blocked at nacl: inbound 443 not allowed.\n[NET] Root cause identified: missing NACL allow rule.",
        "task": "t3"
      },
      "commands": [
        {
          "cmd": "aws ec2 create-network-acl-entry --network-acl-id nacl-100 --rule-number 110 --protocol tcp --port-range 443 --rule-action allow --ingress",
          "out": "[NET] NACL rule 110 added: allow tcp/443 inbound.\n[NET] Re-running analysis: path REACHABLE.\n[NET] curl https://54.21.10.7 -> HTTP 200, connectivity restored.",
          "task": "t4"
        },
        {
          "cmd": "dig www.example-cloud.com +short",
          "out": "[DNS] 54.21.10.7 resolved, name resolution healthy"
        },
        {
          "cmd": "show status",
          "out": "Diagnostics console nominal."
        }
      ]
    }
  },
  {
    "id": "Lab 20",
    "num": 20,
    "group": "TROUBLESHOOTING",
    "title": "Troubleshooting a Failed Deployment",
    "desc": "Investigate why a release crash-loops in production and recover service. You read deployment events and pod logs, identify the misconfiguration such as a bad image tag or missing secret, roll back to a healthy revision, and verify stability.",
    "objectives": [
      "Read deployment events and container logs to localize a failure.",
      "Distinguish image, config, resource, and dependency failures.",
      "Roll back to a known-good revision and confirm recovery."
    ],
    "console": {
      "host": "cloud-tshoot02",
      "boot": [
        "[SYS] Deployment troubleshooting console online.",
        "[SYS] Incident: webapp rollout stuck, pods CrashLoopBackOff.",
        "[SYS] Revision history available."
      ],
      "tasks": [
        {
          "id": "t1",
          "label": "Select where to look first for the crash reason"
        },
        {
          "id": "t2",
          "label": "Choose the action to recover service fastest"
        },
        {
          "id": "t3",
          "label": "Inspect the failing pod logs"
        },
        {
          "id": "t4",
          "label": "Roll back and verify the rollout"
        }
      ],
      "configs": [
        {
          "id": "c1",
          "label": "First place to look for why a pod is crash-looping",
          "options": [
            "Container logs and events",
            "The billing dashboard",
            "DNS records",
            "The load balancer name"
          ],
          "correct": "Container logs and events",
          "task": "t1"
        },
        {
          "id": "c2",
          "label": "Fastest action to recover service from a bad release",
          "options": [
            "Delete the cluster",
            "Roll back to the last healthy revision",
            "Scale to zero permanently",
            "Wait for it to self-heal"
          ],
          "correct": "Roll back to the last healthy revision",
          "task": "t2"
        }
      ],
      "payload": {
        "label": "INSPECT LOGS",
        "placeholder": "kubectl logs webapp-8a2 --previous",
        "button": "Inspect",
        "response": "[K8S] Error: failed to read secret DB_PASSWORD (not found).\n[K8S] Event: Back-off restarting failed container.\n[K8S] Root cause: deploy referenced missing secret in revision 7.",
        "task": "t3"
      },
      "commands": [
        {
          "cmd": "kubectl rollout undo deployment/webapp",
          "out": "[K8S] Rolled back to revision 6 (image webapp:a1b2c3).\n[K8S] 3/3 pods Running and Ready.\n[K8S] rollout status: deployment successfully rolled out.",
          "task": "t4"
        },
        {
          "cmd": "kubectl get events --sort-by=.lastTimestamp",
          "out": "[K8S] Warning Failed CrashLoopBackOff on revision 7\n[K8S] Normal ScalingReplicaSet rolled back to 6"
        },
        {
          "cmd": "show status",
          "out": "Deployment troubleshooting nominal."
        }
      ]
    }
  }
];
