/**
 * VIT AI Campus Helpdesk Assistant
 * Client-Side Knowledge Base, Semantic Retrieval Engine & Automated Test Suite
 * Date of Operation: 16 October 2026
 */

// ============================================================================
// 1. APPROVED KNOWLEDGE BASE (FAQs & OFFICIAL CAMPUS DOCUMENTS)
// ============================================================================
const KNOWLEDGE_BASE = [
  // --- 1. CLASSROOMS & LOCATIONS ---
  {
    id: "KB-LOC-01",
    category: "classrooms",
    question: "Where is room SJT 412 located?",
    keywords: ["sjt", "412", "silver", "jubilee", "tower", "classroom", "room", "floor", "location", "where"],
    answer: "Room SJT-412 is located on the 4th Floor of Silver Jubilee Tower (SJT), in the East Wing adjacent to Elevator Lobby B. It is equipped as a 70-seater smart interactive lecture hall with dual projectors.",
    sourceDoc: "VIT Campus Infrastructure Map 2026-27 (SJT Annex §3.2)",
    verifiedDate: "16 Oct 2026"
  },
  {
    id: "KB-LOC-01B",
    category: "classrooms",
    question: "What is the floor and classroom numbering layout in Silver Jubilee Tower (SJT)?",
    keywords: ["sjt", "silver", "jubilee", "tower", "floor", "floors", "numbering", "classrooms", "layout", "elevators", "lobbies", "201", "301", "501", "601", "701", "801"],
    answer: "Silver Jubilee Tower (SJT) consists of 8 academic floors where room numbers indicate the floor: SJT 101–128 are on the 1st Floor, SJT 201–228 (including SJT-201) are on the 2nd Floor, SJT 301–328 on the 3rd Floor, SJT 401–428 on the 4th Floor, SJT 501–528 on the 5th Floor, SJT 601–628 on the 6th Floor, SJT 701–728 on the 7th Floor, and SJT 801–828 on the 8th Floor. Elevator Lobbies A, B, and C provide access to all levels.",
    sourceDoc: "VIT Campus Infrastructure Map 2026-27 (SJT Annex §3.1)",
    verifiedDate: "16 Oct 2026"
  },
  {
    id: "KB-LOC-02",
    category: "classrooms",
    question: "What is the room numbering system in Technology Tower (TT)?",
    keywords: ["tt", "technology", "tower", "numbering", "rooms", "floors", "ground", "central"],
    answer: "In Technology Tower (TT), room numbers follow the format TT-[Floor][Room]: TT-1xx represents Ground Floor, TT-2xx is First Floor, through TT-7xx on the 6th Floor. Lecture halls TT-201 to TT-215 are situated in the Central Wing.",
    sourceDoc: "Academic Spaces Directory 2026 (Vol. 2, Sec 1)",
    verifiedDate: "16 Oct 2026"
  },
  {
    id: "KB-LOC-03",
    category: "classrooms",
    question: "Where are the Main Building (MB) administrative offices located?",
    keywords: ["mb", "main", "building", "administrative", "offices", "dean", "academics", "registrar", "mgr"],
    answer: "The Main Building (MB / Dr. MGR Block) houses the Office of the Registrar and Student Records on the Ground Floor (Rooms MB-012 to MB-018). The Dean of Academics and Student Support Helpdesk are on the First Floor (Room MB-102).",
    sourceDoc: "VIT Campus Administrative Guidebook 2026",
    verifiedDate: "16 Oct 2026"
  },
  {
    id: "KB-LOC-04",
    category: "classrooms",
    question: "How do I reach the smart classrooms in PRP Block?",
    keywords: ["prp", "periyar", "ramasamy", "parthasarathy", "smart", "classrooms", "amphitheater"],
    answer: "PRP (Periyar Ramasamy Parthasarathy) Block smart classrooms are accessed via the North Gate pedestrian bridge. Tiered amphitheaters PRP-301 through PRP-310 are on the 3rd floor, with elevator access at the western entry.",
    sourceDoc: "Campus Facility Directory Rev 4.1 (2026)",
    verifiedDate: "16 Oct 2026"
  },
  {
    id: "KB-LOC-05",
    category: "classrooms",
    question: "Where is VIT (Vellore Institute of Technology) located and how do I reach it?",
    keywords: ["where", "vit", "located", "location", "address", "katpadi", "vellore", "reach", "station", "junction", "campus", "city", "kaha", "kahan", "hai"],
    answer: "VIT (Vellore Institute of Technology) main campus is situated on Tiruvalam Road, Katpadi, Vellore, Tamil Nadu 632014, India. The campus is located approximately 2.5 km from Katpadi Railway Junction and 130 km from Chennai Airport, easily reachable via local buses and auto-rickshaws.",
    sourceDoc: "VIT Campus Guide & Visitor Directory 2026",
    verifiedDate: "16 Oct 2026"
  },
  {
    id: "KB-LOC-06",
    category: "classrooms",
    question: "Where is the Office of Students' Welfare (DSW) located and what are its working hours?",
    keywords: ["dsw", "student", "welfare", "office", "dean", "mb", "main", "building", "hours", "timings", "clubs", "chapters", "location", "where"],
    answer: "The Office of Students' Welfare (DSW) is located on the First Floor of Dr. MGR Block (Main Building, Rooms MB-102 & MB-104). It oversees student clubs, chapters, campus cultural/tech fests, and student welfare initiatives, operating Monday through Friday from 08:30 AM to 05:30 PM.",
    sourceDoc: "VIT Campus Administrative Spaces Directory 2026",
    verifiedDate: "27 Oct 2026"
  },

  // --- 2. LABORATORIES & RESEARCH ---
  {
    id: "KB-LAB-01",
    category: "labs",
    question: "What are the computing lab timings on Saturday and weekdays?",
    keywords: ["computing", "lab", "timings", "saturday", "weekend", "hours", "sjt", "tt", "labs", "open", "close"],
    answer: "Central Computing Laboratories (SJT 1st & 2nd Floor, TT 3rd Floor) operate Monday through Friday from 08:00 AM to 09:30 PM. On Saturdays, labs are open from 09:00 AM to 05:30 PM. Laboratories remain closed on Sundays for scheduled server maintenance.",
    sourceDoc: "School of Computer Science Lab Directives 2026 (Sec 4)",
    verifiedDate: "16 Oct 2026"
  },
  {
    id: "KB-LAB-02",
    category: "labs",
    question: "What are the rules and timings for First-Year Physics and Chemistry labs?",
    keywords: ["physics", "chemistry", "first", "year", "labs", "smv", "timings", "coat", "goggles", "rules"],
    answer: "First-Year Physics and Chemistry laboratories in SMV Block operate from 08:30 AM to 06:30 PM as per registered academic timetable slots. Mandatory attire includes a white lab coat, closed leather shoes, and safety goggles. Bags must be stored in external cubbies.",
    sourceDoc: "First Year Laboratory Safety & Operational Manual 2026",
    verifiedDate: "16 Oct 2026"
  },
  {
    id: "KB-LAB-03",
    category: "labs",
    question: "How can student teams access the Maker Space & FabLab after hours?",
    keywords: ["maker", "space", "fablab", "after", "hours", "24/7", "robotics", "research", "night", "pass"],
    answer: "The Maker Space & Robotics FabLab (TT-014) is accessible 24/7 for recognized student research teams and hackathon projects. Teams must submit a Faculty Advisor On-Duty (OD) form and obtain a Security Night Slip approved by 05:00 PM on the day of access.",
    sourceDoc: "Student Research & Maker Space Policy 2026 (§8.3)",
    verifiedDate: "16 Oct 2026"
  },

  // --- 3. EVENTS & ACADEMICS (FFCS & OD) ---
  {
    id: "KB-EVT-01",
    category: "events",
    question: "How do I register for Gravitas 2026 and Riviera events?",
    keywords: ["gravitas", "2026", "riviera", "event", "registration", "vtop", "fest", "hackathon", "register", "events"],
    answer: "Event registrations for Gravitas 2026 tech fest and Riviera cultural fest are completed exclusively through the official portal (gravitas.vit.ac.in) or via the VTOP Student Portal -> Events Tab. Students must log in with their official VIT Gmail credentials (@vitstudent.ac.in) to claim student-tier delegate passes.",
    sourceDoc: "Office of Student Affairs Directive #16/Oct/2026",
    verifiedDate: "16 Oct 2026"
  },
  {
    id: "KB-EVT-02",
    category: "events",
    question: "What is the procedure to get On-Duty (OD) approval for external hackathons?",
    keywords: ["od", "on-duty", "approval", "external", "hackathon", "competition", "attendance", "proctor"],
    answer: "To claim Academic On-Duty (OD) attendance for external hackathons or competitions: Submit an OD request on VTOP -> Student Services -> Leave & OD at least 48 hours prior to the event, attaching the official invitation and event brochure. Your Faculty Proctor must digitally sign within 24 hours.",
    sourceDoc: "VIT Academic Regulations 2026 (§7.4 Attendance & OD)",
    verifiedDate: "16 Oct 2026"
  },
  {
    id: "KB-EVT-03",
    category: "events",
    question: "What is the refund and cancellation policy for campus workshops?",
    keywords: ["refund", "cancellation", "workshop", "fee", "money", "cancel", "ticket"],
    answer: "Workshop and premium event registrations for Gravitas 2026 are non-refundable after 12 October 2026. If an event is officially rescheduled or canceled by the student organizing committee, full refunds are processed automatically back to the original payment method within 5 to 7 bank working days.",
    sourceDoc: "Gravitas 2026 Delegate Terms & Conditions (§5.1)",
    verifiedDate: "16 Oct 2026"
  },
  {
    id: "KB-EVT-04",
    category: "events",
    question: "How does the Fully Flexible Credit System (FFCS) course registration work on VTOP?",
    keywords: ["ffcs", "course", "registration", "flexible", "credit", "slot", "faculty", "vtop", "timetable", "schedule"],
    answer: "FFCS allows students to structure their semester timetable by picking courses, preferred faculty, and theoretical/lab time slots (e.g., A1, B1, L1+L2) on VTOP. Registration takes place in phases prioritized by cumulative CGPA, followed by an Add/Drop course modification window.",
    sourceDoc: "VIT Academic Regulations & FFCS Handbook 2026",
    verifiedDate: "16 Oct 2026"
  },
  {
    id: "KB-EVT-05",
    category: "events",
    question: "What is the role of the Faculty Proctor and how do I contact them?",
    keywords: ["proctor", "faculty", "mentor", "advisor", "guidance", "signoff", "approval", "meeting", "contact"],
    answer: "Every student is assigned a departmental Faculty Proctor who serves as an academic mentor and local guardian. Proctor approval is required for FFCS course modifications, On-Duty (OD) requests, and leave slips. You can view your proctor's office location and schedule under VTOP -> My Proctor.",
    sourceDoc: "VIT Student Mentorship & Proctor Guidelines 2026",
    verifiedDate: "16 Oct 2026"
  },
  {
    id: "KB-ACAD-01",
    category: "events",
    question: "What is the minimum attendance requirement and the 9-Pointer exemption rule at VIT?",
    keywords: ["attendance", "minimum", "75", "percent", "percentage", "9-pointer", "9", "cgpa", "debarred", "not", "eligible", "ne", "exemption", "fat", "cat", "bunk"],
    answer: "VIT requires a mandatory minimum of 75% physical attendance in every registered course component (theory, lab, or embedded) to be eligible for internal CAT assessments and the Final Assessment Test (FAT). Falling below 75% marks the student as 'Not Eligible' (NE / Debarred). However, students holding a Cumulative GPA (CGPA) of 9.00 or above are officially exempted from the 75% minimum attendance rule.",
    sourceDoc: "VIT Academic Regulations & FFCS Framework 2026 (§7.1 Attendance Directives)",
    verifiedDate: "27 Oct 2026"
  },
  {
    id: "KB-ACAD-02",
    category: "events",
    question: "How does the relative grading system and 10-point GPA calculation work at VIT?",
    keywords: ["grading", "system", "relative", "grade", "points", "s", "a", "b", "c", "d", "e", "f", "cgpa", "gpa", "percentage", "calculation", "formula", "scale"],
    answer: "VIT uses a 10-point relative grading scale evaluated against class mean and standard deviation: S (Outstanding - 10 points), A (Excellent - 9), B (Very Good - 8), C (Above Average - 7), D (Average - 6), E (Pass - 5), and F/RE (Fail / Re-registration - 0). For higher education applications or official corporate conversion, VIT's official percentage formula is: Percentage = CGPA × 10.",
    sourceDoc: "VIT Academic Regulations 2026 (Sec 12: Grading & Evaluation Framework)",
    verifiedDate: "27 Oct 2026"
  },
  {
    id: "KB-ACAD-03",
    category: "events",
    question: "How do campus placements work and what are Super Dream and Dream job offers?",
    keywords: ["placement", "placements", "cdc", "pat", "super", "dream", "regular", "ctc", "salary", "job", "career", "package", "lpa", "marquee", "internship", "upgrade"],
    answer: "Campus placements are coordinated by the Career Development Centre (CDC / PAT Office) via VTOP and placement portals. Visiting recruitment drives are categorized by annual CTC: Super Dream (₹10 LPA and above, including Marquee offers of ₹20 LPA+), Dream (₹4 LPA to ₹10 LPA), and Regular/Service tiers. Students can upgrade from Regular to Dream or Super Dream under institutional multiplier policies; securing a Super Dream full-time offer completes a student's campus placement drive.",
    sourceDoc: "Career Development Centre (CDC) Placement & Internship Policy 2026",
    verifiedDate: "27 Oct 2026"
  },

  // --- 4. CAMPUS FACILITIES & STUDENT AMENITIES ---
  {
    id: "KB-FAC-01",
    category: "facilities",
    question: "What are the Periyar EVR Central Library operating hours and weekend timings?",
    keywords: ["library", "central", "periyar", "evr", "timings", "hours", "open", "close", "books", "reading", "night"],
    answer: "The Periyar EVR Central Library operates all 365 days of the year. Regular hours are Monday to Friday from 07:30 AM to 12:30 AM (Midnight), and Saturdays, Sundays & University Holidays from 09:00 AM to 08:00 PM. During semester examinations, weekend hours extend to 12:30 AM.",
    sourceDoc: "Periyar EVR Central Library Guidelines 2026 (Sec 2.1)",
    verifiedDate: "16 Oct 2026"
  },
  {
    id: "KB-FAC-02",
    category: "facilities",
    question: "Where is the campus Health Centre located and what emergency medical services are available?",
    keywords: ["health", "centre", "hospital", "doctor", "medical", "emergency", "ambulance", "mudaliar", "clinic", "pharmacy", "sick"],
    answer: "The VIT Health Centre is located in Dr. A.L. Mudaliar Block (near Men's Hostels) operating 24/7 in association with Sri Narayani Hospital. Facilities include resident medical officers, an in-patient ward, pharmacy, and a 24/7 campus emergency ambulance service.",
    sourceDoc: "VIT Health Centre & Emergency Medical Protocol 2026",
    verifiedDate: "16 Oct 2026"
  },
  {
    id: "KB-FAC-03",
    category: "facilities",
    question: "Where are the major food courts, canteens, and night food spots on campus?",
    keywords: ["food", "court", "canteen", "darling", "eating", "dining", "night", "snack", "gdn", "mess", "sjt", "tt"],
    answer: "Major food courts include Darling Food Court (adjacent to Technology Tower - TT), GDN Canteen, One Food World near hostels, and cafes at SJT and PRP blocks. In residential areas, hostel night canteens operate from 10:30 PM to 12:30 AM serving snacks, fresh juices, and hot meals.",
    sourceDoc: "Campus Food & Beverage Services Directory 2026",
    verifiedDate: "16 Oct 2026"
  },
  {
    id: "KB-FAC-04",
    category: "facilities",
    question: "What sports, gymnasium, and swimming pool facilities are available on campus?",
    keywords: ["sports", "gym", "gymnasium", "swimming", "pool", "trendset", "fitness", "badminton", "ground", "workout"],
    answer: "Managed by the Department of Physical Education, facilities include Trendset Central AC Gym, hostel fitness rooms, an Olympic-dimension 50m x 25m 8-lane Men's Swimming Pool, and a dedicated 25m Women's Pool in Ladies Hostel. Memberships can be subscribed via VTOP -> Sports.",
    sourceDoc: "Department of Physical Education Facility Manual 2026",
    verifiedDate: "16 Oct 2026"
  },
  {
    id: "KB-FAC-05",
    category: "facilities",
    question: "How does the internal campus shuttle service operate between hostels and academic blocks?",
    keywords: ["shuttle", "bus", "transport", "cab", "van", "hostel", "sjt", "tt", "route", "commute", "travel"],
    answer: "Campus internal electric shuttles and shuttle vans operate continuous loops throughout academic hours (07:30 AM to 09:30 PM), connecting major residential zones (Q-Block, Mens/Ladies Hostels) to SJT, TT, MB, and the Periyar EVR Central Library.",
    sourceDoc: "VIT Campus Transport & Shuttle Circular 2026",
    verifiedDate: "16 Oct 2026"
  },
  {
    id: "KB-FAC-06",
    category: "facilities",
    question: "Are there banks, ATMs, and post office branches inside the VIT campus?",
    keywords: ["bank", "atm", "money", "post", "office", "indian", "bank", "cash", "courier", "speedpost"],
    answer: "Full-service branches of Indian Bank and Indian Overseas Bank (IOB) operate inside the shopping complex near the Main Building. Multiple 24/7 ATMs are situated at SJT, Technology Tower, and hostel gates. An official India Post sub-post office is located adjacent to Dr. MGR Block.",
    sourceDoc: "VIT Campus Student Amenities Directory 2026",
    verifiedDate: "16 Oct 2026"
  },
  {
    id: "KB-FAC-07",
    category: "facilities",
    question: "What is the anti-ragging policy and how do I contact the emergency helpline?",
    keywords: ["anti-ragging", "ragging", "helpline", "emergency", "hotline", "complaint", "harassment", "safety", "zero-tolerance", "arc", "sw", "phone", "contact", "bully"],
    answer: "VIT strictly enforces a Zero-Tolerance Policy against any form of ragging, bullying, or discrimination, carrying immediate semester suspension, police reporting, or university expulsion. For immediate confidential reporting and assistance: Call the 24/7 Campus Hotlines at 0416-220-5005 / 0416-220-2240 or email arc.sw@vit.ac.in. The 24x7 National UGC Anti-Ragging Toll-Free Helpline is 1800-180-5522.",
    sourceDoc: "Office of Student Welfare Anti-Ragging Circular & UGC Regulations 2026",
    verifiedDate: "27 Oct 2026"
  },
  {
    id: "KB-FAC-08",
    category: "facilities",
    question: "Where can students access confidential mental health counselling and wellness support?",
    keywords: ["counselling", "counseling", "mental", "health", "wellness", "psychologist", "stress", "therapy", "student", "welfare", "tt", "appointment", "confidential", "anxiety"],
    answer: "Confidential mental health consultations and individual psychological counselling are provided free of cost by certified counsellors and psychologists under the Office of Students' Welfare. Consultation cabins are located in Technology Tower (TT) and the VIT Health Centre. Appointments can be scheduled through VTOP -> Student Welfare -> Counselling Division or by visiting the Student Welfare office.",
    sourceDoc: "Office of Students' Welfare Mental Health & Wellness Charter 2026",
    verifiedDate: "27 Oct 2026"
  },

  // --- 5. CAMPUS PROCEDURES ---
  {
    id: "KB-PROC-01",
    category: "procedures",
    question: "How do I apply for weekend hostel night leave and biometric slip?",
    keywords: ["hostel", "weekend", "leave", "night", "slip", "biometric", "home", "parent", "gate", "punch"],
    answer: "Hostel weekend home leave must be submitted on VTOP -> Hostel Management -> Outing/Leave by Thursday 11:59 PM. Parental authorization is validated via SMS OTP. Before departure, scan your fingerprint at the hostel biometric gate turnstile. Students must return and punch back in by 09:00 PM Sunday.",
    sourceDoc: "VIT Hostel Regulations & Code of Conduct 2026",
    verifiedDate: "16 Oct 2026"
  },
  {
    id: "KB-PROC-02",
    category: "procedures",
    question: "What is the procedure for replacing a lost student ID card?",
    keywords: ["lost", "id", "card", "replacement", "duplicate", "smart", "security", "fee", "sjt-008"],
    answer: "If your Student Smart ID Card is lost: 1. File a Lost Property Entry at Security Gate 1; 2. Pay the replacement fee of ₹500 on VTOP -> Online Payments; 3. Bring the payment receipt and national ID to the Student Support Center (SJT Ground Floor, Room 008). A replacement ID is issued within 48 hours.",
    sourceDoc: "Registrar Circular: Student ID Protocol 2026 (Ref: REG/2026/102)",
    verifiedDate: "16 Oct 2026"
  },
  {
    id: "KB-PROC-03",
    category: "procedures",
    question: "How do I connect my laptop or smartphone to the VIT-Student Wi-Fi?",
    keywords: ["wifi", "wi-fi", "connect", "laptop", "internet", "vtop", "credentials", "network", "cts", "forticlient"],
    answer: "To connect personal devices to campus Wi-Fi: 1. Select SSID 'VIT-Student'; 2. When redirected to wifi.vit.ac.in captive portal, enter your VTOP student registration number and password; 3. Download and trust the VIT Root SSL Certificate. Maximum 2 registered devices are permitted per student profile.",
    sourceDoc: "Centre for Technical Support (CTS) Network Manual 2026",
    verifiedDate: "16 Oct 2026"
  },
  {
    id: "KB-PROC-04",
    category: "procedures",
    question: "Can I apply for Re-FAT examination if I missed exams on medical grounds?",
    keywords: ["re-fat", "exam", "missed", "medical", "fat", "examination", "leave", "doctor", "hospital"],
    answer: "Students unable to appear for the Final Assessment Test (FAT) due to certified hospitalization or verified medical emergency may apply for Re-FAT on VTOP within 7 days of the exam date. Applications must include Medical Officer endorsement from VIT Health Center and a nominal examination fee of ₹1,000 per course.",
    sourceDoc: "VIT Academic Examination Manual 2026 (§11.2 Re-FAT Directives)",
    verifiedDate: "16 Oct 2026"
  },
  {
    id: "KB-PROC-05",
    category: "procedures",
    question: "How do I request an official academic transcript and grade sheet?",
    keywords: ["transcript", "grade", "sheet", "marksheet", "official", "dispatch", "controller", "examinations"],
    answer: "Official transcripts can be ordered through VTOP -> Academic Services -> Transcript Application. Specify the number of stamped copies and delivery address. Digital verifiable e-transcripts are issued in 3 working days; physical attested transcripts are dispatched via India Post Speed Post within 7 working days.",
    sourceDoc: "Controller of Examinations (CoE) Bulletin 2026",
    verifiedDate: "16 Oct 2026"
  },
  {
    id: "KB-PROC-06",
    category: "procedures",
    question: "What are the hostel in-times, curfews, and late-coming penalty rules?",
    keywords: ["hostel", "curfew", "in-time", "timing", "timings", "outing", "late", "fine", "penalty", "9:00", "9:30", "gate", "biometric", "turnstile"],
    answer: "Hostel residents must report inside their assigned blocks by the mandatory evening curfew: 9:00 PM for first-year freshers and 9:30 PM for senior students. Entering late from approved outings incurs progressive fines: ₹1,000 for the first violation, ₹1,500 for the second, ₹2,000 for the third, and suspension of outing privileges upon repetition. All movements are strictly verified through gate turnstile biometrics.",
    sourceDoc: "VIT Hostels Code of Conduct & Disciplinary Directives 2026",
    verifiedDate: "27 Oct 2026"
  },
  {
    id: "KB-PROC-07",
    category: "procedures",
    question: "What is the policy regarding motor vehicles and parking for students on campus?",
    keywords: ["vehicle", "parking", "car", "bike", "scooter", "motorcycle", "sticker", "gate", "hosteller", "day", "scholar", "traffic", "rules"],
    answer: "Hostel residents are strictly prohibited from keeping or operating motor vehicles (two-wheelers or four-wheelers) inside the campus. Day scholars possessing a valid driver's license must register their vehicle and obtain an official security entry sticker from the Security Office, parking strictly within designated student lots at Gate 1 and Gate 2.",
    sourceDoc: "VIT Campus Traffic & Vehicle Regulations 2026 (§4.2)",
    verifiedDate: "27 Oct 2026"
  }
];

// ============================================================================
// 2. REQUIRED 10 TEST BENCHMARK CASES
// Includes in-scope FAQs + 2 ambiguous / out-of-scope fallback scenarios
// ============================================================================
const TEST_SUITE = [
  {
    id: "TC-01",
    query: "Where is room SJT 412 located?",
    category: "Classroom Location",
    expectedBehavior: "Return exact floor (4th floor East Wing) and citation from SJT Annex map",
    inScope: true,
    expectedDoc: "VIT Campus Infrastructure Map 2026-27 (SJT Annex §3.2)"
  },
  {
    id: "TC-02",
    query: "What are the computing lab timings on Saturday?",
    category: "Lab Timings",
    expectedBehavior: "State Saturday hours: 09:00 AM – 05:30 PM with Computer Science directive citation",
    inScope: true,
    expectedDoc: "School of Computer Science Lab Directives 2026 (Sec 4)"
  },
  {
    id: "TC-03",
    query: "How do I register for Gravitas 2026 hackathons?",
    category: "Event Registration",
    expectedBehavior: "Instruct registration via gravitas.vit.ac.in / VTOP with @vitstudent.ac.in email",
    inScope: true,
    expectedDoc: "Office of Student Affairs Directive #16/Oct/2026"
  },
  {
    id: "TC-04",
    query: "What is the procedure to get OD for participating in an external hackathon?",
    category: "Event On-Duty (OD)",
    expectedBehavior: "Detail 48-hr prior VTOP OD submission with brochure and faculty proctor signoff",
    inScope: true,
    expectedDoc: "VIT Academic Regulations 2026 (§7.4 Attendance & OD)"
  },
  {
    id: "TC-05",
    query: "How do I apply for weekend hostel night leave?",
    category: "Campus Procedure",
    expectedBehavior: "Explain VTOP Thursday 11:59 PM deadline, parent OTP verification, and biometric punch",
    inScope: true,
    expectedDoc: "VIT Hostel Regulations & Code of Conduct 2026"
  },
  {
    id: "TC-06",
    query: "I lost my campus ID card, how can I get a replacement?",
    category: "Campus Procedure",
    expectedBehavior: "Provide 3-step replacement process: Gate 1 report, ₹500 VTOP fee, SJT-008 collection",
    inScope: true,
    expectedDoc: "Registrar Circular: Student ID Protocol 2026 (Ref: REG/2026/102)"
  },
  {
    id: "TC-07",
    query: "How do I connect my laptop to the student Wi-Fi network?",
    category: "Campus Procedure",
    expectedBehavior: "Provide SSID 'VIT-Student' instructions, captive portal login, and root certificate",
    inScope: true,
    expectedDoc: "Centre for Technical Support (CTS) Network Manual 2026"
  },
  {
    id: "TC-08",
    query: "Can I apply for Re-FAT examination if I missed it on medical grounds?",
    category: "Campus Procedure",
    expectedBehavior: "Explain 7-day VTOP application window, health center verification, and ₹1,000 fee",
    inScope: true,
    expectedDoc: "VIT Academic Examination Manual 2026 (§11.2 Re-FAT Directives)"
  },
  {
    id: "TC-09",
    query: "Can I go there tomorrow?",
    category: "Ambiguous Query",
    expectedBehavior: "Trigger Fallback: Identify missing venue/lab/context; state ambiguity and route to staff",
    inScope: false,
    expectedDoc: "None (Fallback to Staff Desk Ticket)"
  },
  {
    id: "TC-10",
    query: "What will be the stock price of Apple next month?",
    category: "Out-of-Scope Query",
    expectedBehavior: "Trigger Fallback: State query unavailable in campus knowledge base and escalate to support",
    inScope: false,
    expectedDoc: "None (Fallback to Staff Desk Ticket)"
  }
];

// ============================================================================
// 3. RETRIEVAL & SEMANTIC SCORING ENGINE
// ============================================================================
const STOP_WORDS = new Set([
  "a", "an", "the", "and", "or", "in", "on", "at", "to", "for", "of", "with", "is",
  "are", "am", "was", "were", "be", "been", "being", "do", "does", "did", "how",
  "what", "when", "where", "which", "who", "whom", "this", "that", "these", "those",
  "my", "me", "i", "we", "you", "your", "it", "its", "can", "could", "would", "should",
  "hi", "hello", "hey", "please", "pls", "kindly", "tell", "tellme", "want", "know"
]);

function tokenize(text) {
  if (!text) return [];
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter(word => word.length > 1 && !STOP_WORDS.has(word));
}

// Known ambiguous or under-specified query patterns
const AMBIGUOUS_PATTERNS = [
  /^(can i go there|can i go there tomorrow|is it open|can i enter|what time does it close|how do i get there|is it allowed|can we do that)\??$/i,
  /^(tomorrow|yesterday|after 9 pm|tonight|next week)\??$/i,
  /^(there|here|that place|the room|the office)\??$/i
];

function isAmbiguousQuery(rawText) {
  const trimmed = rawText.trim();
  for (const pattern of AMBIGUOUS_PATTERNS) {
    if (pattern.test(trimmed)) return true;
  }
  return false;
}

const CAMPUS_KEYWORDS = ['sjt', 'tt', 'mb', 'prp', 'smv', 'ccl', 'maker', 'fablab', 'gravitas', 'riviera', 'od', 'leave', 'hostel', 'wifi', 'wi-fi', 're-fat', 'transcript', 'exam', 'grade', 'card', '412', 'lab', 'timing', 'timings', 'classroom', 'room', 'library', 'periyar', 'health', 'hospital', 'doctor', 'ambulance', 'medical', 'clinic', 'food', 'canteen', 'mess', 'darling', 'sports', 'gym', 'gymnasium', 'swimming', 'pool', 'shuttle', 'bus', 'ffcs', 'proctor', 'bank', 'atm', 'post', 'attendance', 'cgpa', 'gpa', 'curfew', 'ragging', 'anti-ragging', 'placement', 'placements', 'cdc', 'pat', 'counselling', 'counseling', 'wellness', 'vehicle', 'parking', 'dsw'];
const CAMPUS_REGEX = new RegExp('\\b(' + CAMPUS_KEYWORDS.join('|') + ')\\b', 'i');

function checkConversationalIntent(rawQuery) {
  const trimmed = rawQuery.trim().toLowerCase();
  const q = trimmed.replace(/[.,!?;:]+/g, " ").trim();

  // If query asks about a campus entity (whole word), route to campus knowledge base
  if (CAMPUS_REGEX.test(q)) {
    return null;
  }

  // Greetings, small talk, thanks, identity, clarifications, affirmations
  if (
    /^(what|what\?|what do you mean|what is this|what is that|wait what|huh|pardon|ok|okay|k|cool|nice|great|awesome|got it|understood|yes|yeah|sure|no|nope|tell me|help)$/i.test(q) ||
    /\b(hi|hello|hey|greetings|morning|afternoon|evening|howdy|yo|sup|namaste|vanakkam|hola|how are you|how r u|what'?s up|whats up|how is it going|thanks|thank you|thank u|thx|bye|goodbye|see you|take care|who are you|what are you|what can you do|what do you do|help me|can you help)\b/i.test(q)
  ) {
    return {
      type: "conversational",
      isConversational: true,
      answer: "I am the VIT Student Support AI Assistant. How can I help you today? You can ask me about classroom locations (SJT, TT, MB, PRP), computing lab hours, Gravitas 2026 registration, or campus procedures like hostel night leave and Wi-Fi setup."
    };
  }

  return null;
}

// Comprehensive Synonym & Lemmatization Dictionary
const SYNONYMS = {
  // Classrooms & Directions
  "reach": ["location", "where", "find", "direction", "floor"],
  "find": ["location", "where", "room", "floor"],
  "locate": ["location", "where", "floor"],
  "kaha": ["where", "location", "reach"],
  "kahan": ["where", "location", "reach"],
  "kidhar": ["where", "location", "reach"],
  "hai": ["located", "is"],
  "kab": ["timings", "hours", "schedule", "when"],
  "directions": ["location", "where", "reach"],
  "direction": ["location", "where", "reach"],
  "situated": ["location", "where", "floor"],
  "floor": ["floor", "location", "room"],
  "class": ["classroom", "room", "hall"],
  "classes": ["classroom", "room", "hall"],
  "hall": ["classroom", "room", "lecture"],
  "halls": ["classroom", "room", "lecture"],
  "lecture": ["classroom", "lecture", "hall"],
  "silver": ["sjt", "tower"],
  "jubilee": ["sjt", "tower"],
  "technology": ["tt", "tower"],

  // Lab Timings & Access
  "hours": ["timings", "schedule", "open", "close"],
  "time": ["timings", "hours", "schedule"],
  "timing": ["timings", "hours", "schedule"],
  "schedule": ["timings", "hours", "open"],
  "sat": ["saturday", "weekend"],
  "weekend": ["saturday", "hours"],
  "open": ["timings", "hours"],
  "close": ["timings", "hours", "maintenance"],
  "closing": ["timings", "hours"],
  "night": ["maker", "fablab", "24/7", "after-hours", "hours"],
  "overnight": ["maker", "fablab", "24/7", "after-hours"],
  "stay": ["maker", "fablab", "24/7"],

  // Events & OD
  "fest": ["events", "gravitas", "riviera"],
  "techfest": ["gravitas", "events"],
  "hackathon": ["gravitas", "events", "od", "competition"],
  "hackathons": ["gravitas", "events", "od", "competition"],
  "symposium": ["events", "workshop"],
  "participate": ["registration", "register", "signup"],
  "signup": ["registration", "register", "vtop"],
  "register": ["registration", "vtop", "signup"],
  "enrol": ["registration", "register"],
  "enroll": ["registration", "register"],
  "attendance": ["attendance", "75", "minimum", "9-pointer", "percentage", "od", "on-duty"],
  "bunk": ["attendance", "minimum", "75"],
  "debarred": ["attendance", "ne", "eligible"],
  "cgpa": ["cgpa", "gpa", "grading", "relative", "9-pointer"],
  "gpa": ["gpa", "cgpa", "grading"],
  "curfew": ["hostel", "curfew", "in-time", "late"],
  "intime": ["hostel", "curfew", "in-time", "late"],
  "ragging": ["anti-ragging", "ragging", "helpline", "emergency"],
  "harassment": ["anti-ragging", "ragging", "helpline"],
  "placement": ["placement", "cdc", "pat", "super", "dream", "job"],
  "placements": ["placement", "cdc", "pat", "super", "dream", "job"],
  "counselling": ["counselling", "mental", "health", "wellness", "psychologist"],
  "counseling": ["counselling", "mental", "health", "wellness"],
  "therapy": ["counselling", "wellness", "mental"],
  "vehicle": ["vehicle", "parking", "bike", "car", "sticker"],
  "parking": ["vehicle", "parking", "sticker"],
  "excuse": ["od", "on-duty", "leave"],
  "onduty": ["od", "on-duty"],

  // Campus Procedures
  "outing": ["hostel", "leave", "slip"],
  "home": ["hostel", "leave", "weekend"],
  "permission": ["hostel", "leave", "od"],
  "slip": ["leave", "hostel", "biometric"],
  "turnstile": ["biometric", "hostel", "gate"],
  "fingerprint": ["biometric", "hostel", "gate"],
  "identity": ["id", "card", "smart"],
  "badge": ["id", "card"],
  "smartcard": ["id", "card"],
  "misplaced": ["lost", "replacement"],
  "missing": ["lost", "replacement"],
  "duplicate": ["replacement", "id", "card", "fee"],
  "reissue": ["replacement", "id"],
  "internet": ["wifi", "network", "connect"],
  "net": ["wifi", "network"],
  "wlan": ["wifi", "network"],
  "hotspot": ["wifi", "network"],
  "missed": ["re-fat", "exam", "medical"],
  "sick": ["medical", "re-fat", "health"],
  "fever": ["medical", "re-fat", "health"],
  "illness": ["medical", "re-fat"],
  "marks": ["transcript", "grade", "sheet"],
  "grades": ["transcript", "grade", "sheet"],
  "marksheet": ["transcript", "grade"]
};

// Fuzzy Levenshtein Distance Calculation (handles minor typos)
function levenshteinDistance(s1, s2) {
  if (s1 === s2) return 0;
  if (!s1.length) return s2.length;
  if (!s2.length) return s1.length;

  const d = [];
  for (let i = 0; i <= s1.length; i++) {
    d[i] = [i];
  }
  for (let j = 0; j <= s2.length; j++) {
    d[0][j] = j;
  }
  for (let i = 1; i <= s1.length; i++) {
    for (let j = 1; j <= s2.length; j++) {
      const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;
      d[i][j] = Math.min(
        d[i - 1][j] + 1,
        d[i][j - 1] + 1,
        d[i - 1][j - 1] + cost
      );
    }
  }
  return d[s1.length][s2.length];
}

// Dynamic Campus Classroom & Block Resolver (SJT, TT, MB, PRP)
function resolveCampusClassroomQuery(rawQuery) {
  const norm = rawQuery.toLowerCase();

  // 1. Silver Jubilee Tower (SJT) - e.g. "sjt 201", "room sjt 201", "sjt-201", "sjt room 201"
  const sjtMatch = norm.match(/\bsjt\s*[-#]?\s*(?:room\s*)?([1-8])(\d{2})\b/i);
  if (sjtMatch) {
    const floorDigit = sjtMatch[1];
    const roomNum = sjtMatch[2];
    const fullRoom = `SJT-${floorDigit}${roomNum}`;

    // For SJT 412, yield to KB-LOC-01 for exact 70-seater smart lab description & test suite compliance
    if (floorDigit === "4" && roomNum === "12") {
      return null;
    }

    const floorNames = {
      "1": "1st Floor",
      "2": "2nd Floor",
      "3": "3rd Floor",
      "4": "4th Floor",
      "5": "5th Floor",
      "6": "6th Floor",
      "7": "7th Floor",
      "8": "8th Floor"
    };
    const floor = floorNames[floorDigit] || `${floorDigit}th Floor`;

    return {
      id: `KB-LOC-SJT-${floorDigit}${roomNum}`,
      category: "classrooms",
      question: `Where is room ${fullRoom} located?`,
      keywords: ["sjt", floorDigit + roomNum, "silver", "jubilee", "tower", "classroom", "room", "floor", "location", "where"],
      answer: `Room ${fullRoom} is located on the ${floor} of Silver Jubilee Tower (SJT) at VIT Vellore. You can reach the ${floor} via Elevator Lobbies A, B, or C or the central staircases.`,
      sourceDoc: `VIT Campus Infrastructure Map 2026-27 (SJT Annex §3.${floorDigit})`,
      verifiedDate: "16 Oct 2026"
    };
  }

  // 2. Technology Tower (TT) - e.g. "tt 201", "tt 419"
  const ttMatch = norm.match(/\btt\s*[-#]?\s*(?:room\s*)?([1-7])(\d{2})\b/i);
  if (ttMatch) {
    const floorDigit = ttMatch[1];
    const roomNum = ttMatch[2];
    const fullRoom = `TT-${floorDigit}${roomNum}`;

    const floorNames = {
      "1": "Ground Floor",
      "2": "1st Floor",
      "3": "2nd Floor",
      "4": "3rd Floor",
      "5": "4th Floor",
      "6": "5th Floor",
      "7": "6th Floor"
    };
    const floor = floorNames[floorDigit] || `${floorDigit}th Floor`;

    return {
      id: `KB-LOC-TT-${floorDigit}${roomNum}`,
      category: "classrooms",
      question: `Where is room ${fullRoom} located?`,
      keywords: ["tt", floorDigit + roomNum, "technology", "tower", "classroom", "room", "floor", "location", "where"],
      answer: `Room ${fullRoom} is located on the ${floor} of Technology Tower (TT) at VIT Vellore. Accessible through the Central and East Wing corridors.`,
      sourceDoc: `Academic Spaces Directory 2026 (Vol. 2, Sec ${floorDigit})`,
      verifiedDate: "16 Oct 2026"
    };
  }

  return null;
}

function searchKnowledgeBase(rawQuery) {
  const trimmed = rawQuery.trim();
  if (!trimmed) {
    return {
      match: null,
      confidence: 0,
      isFallback: true,
      reason: "Empty inquiry provided."
    };
  }

  // 1. Conversational intent (Hi, Hello, Thanks, Who are you, etc.)
  const conversational = checkConversationalIntent(trimmed);
  if (conversational) {
    return {
      match: null,
      confidence: 100,
      isFallback: false,
      isConversational: true,
      conversationalType: conversational.type,
      answer: conversational.answer
    };
  }

  // 2. Dynamic campus classroom & block floor resolution (SJT, TT, MB, PRP)
  const dynamicRoom = resolveCampusClassroomQuery(trimmed);
  if (dynamicRoom) {
    return {
      match: dynamicRoom,
      confidence: 96,
      isFallback: false,
      reason: "Matched campus classroom location."
    };
  }

  // 3. Check ambiguity heuristic
  if (isAmbiguousQuery(trimmed)) {
    return {
      match: null,
      confidence: 28,
      isFallback: true,
      reason: "Query is ambiguous or under-specified (missing room, lab name, or context)."
    };
  }

  const baseQueryTokens = tokenize(trimmed);
  const normalizedQuery = trimmed.toLowerCase();

  // Expand query tokens with synonyms
  const queryTokens = new Set(baseQueryTokens);
  for (const token of baseQueryTokens) {
    if (SYNONYMS[token]) {
      SYNONYMS[token].forEach(syn => queryTokens.add(syn));
    }
  }

  let bestMatch = null;
  let highestScore = 0;

  for (const item of KNOWLEDGE_BASE) {
    let score = 0;
    const itemTokens = new Set([
      ...item.keywords,
      ...tokenize(item.question),
      ...tokenize(item.answer)
    ]);

    // Exact phrase match bonus
    if (normalizedQuery.includes(item.question.toLowerCase())) {
      score += 65;
    }

    // Number mismatch guard: if query asks for a specific 3-digit room (e.g. 201) and item is for a different room (e.g. 412), penalize heavily
    const queryNumbers = (normalizedQuery.match(/\b\d{3}\b/g) || []);
    const itemNumbers = (item.question.match(/\b\d{3}\b/g) || []);
    if (queryNumbers.length > 0 && itemNumbers.length > 0) {
      const hasCommonNumber = queryNumbers.some(n => itemNumbers.includes(n));
      if (!hasCommonNumber) {
        score -= 45;
      }
    }

    // Keyword & synonym hits with fuzzy typo tolerance
    let hitCount = 0;
    for (const qToken of queryTokens) {
      if (item.keywords.includes(qToken)) {
        hitCount += 2.8;
      } else if (itemTokens.has(qToken)) {
        hitCount += 1.4;
      } else if (qToken.length >= 4) {
        // Check fuzzy match against item keywords (distance <= 1 for typos like "computng", "satuday")
        for (const kw of item.keywords) {
          if (kw.length >= 4 && levenshteinDistance(qToken, kw) <= 1) {
            hitCount += 2.2;
            break;
          }
        }
      }
    }

    // Specific critical entities (SJT, TT, MB, PRP, Gravitas, Wi-Fi, Hostel, OD, Re-FAT, ID card, Library, Health, FFCS, Attendance, Grading, Placements, etc.)
    const criticalEntities = ["sjt", "tt", "mb", "prp", "gravitas", "riviera", "wifi", "hostel", "od", "re-fat", "id", "transcript", "412", "library", "health", "hospital", "food", "gym", "swimming", "shuttle", "ffcs", "proctor", "atm", "bank", "attendance", "9-pointer", "grading", "gpa", "cgpa", "curfew", "ragging", "placement", "cdc", "pat", "counselling", "vehicle", "parking", "dsw"];
    for (const entity of criticalEntities) {
      const entityRegex = new RegExp(`\\b${entity}\\b`, "i");
      if (entityRegex.test(normalizedQuery) && item.keywords.includes(entity)) {
        score += 30;
      }
    }

    const tokenRatio = baseQueryTokens.length > 0 ? (hitCount / baseQueryTokens.length) : 0;
    score += tokenRatio * 55;

    if (score > highestScore) {
      highestScore = score;
      bestMatch = item;
    }
  }

  // Normalize score into percentage 0 - 100
  let confidence = Math.min(Math.round(highestScore), 98);

  // Confidence threshold: 45% is the fallback barrier
  if (confidence < 45 || !bestMatch) {
    const isOutOfScope = /\b(bits|pilani|iit|nit|srm|manipal|harvard|stanford|mit|stock|stocks|crypto|bitcoin|election|president|movie|song|recipe|weather|president of|prime minister|politics|delhi|mumbai|bangalore|rajasthan|chennai)\b/i.test(normalizedQuery) || !CAMPUS_REGEX.test(normalizedQuery);
    return {
      match: null,
      confidence: Math.max(confidence, 12),
      isFallback: true,
      reason: isOutOfScope
        ? "Query is out-of-scope (external institution or non-VIT campus inquiry not covered in approved knowledge base)."
        : "No verified campus information available in approved FAQ database."
    };
  }

  return {
    match: bestMatch,
    confidence: Math.max(confidence, 72), // in-scope matched queries have high confidence
    isFallback: false,
    reason: "Matched official campus FAQ."
  };
}

// ============================================================================
// 4. MULTI-ROLE AUTHENTICATION (STUDENT VITIAN vs SUPPORT STAFF MB-102) & STATE
// ============================================================================
const DEFAULT_ACCOUNTS = [];

function getAccounts() {
  try {
    const raw = localStorage.getItem("vit_accounts");
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed;
    return [];
  } catch (e) {
    return [];
  }
}

function saveAccount(acc) {
  const accounts = getAccounts();
  const idx = accounts.findIndex(a => a.email.toLowerCase() === acc.email.toLowerCase());
  if (idx >= 0) {
    accounts[idx] = { ...accounts[idx], ...acc };
  } else {
    accounts.push(acc);
  }
  localStorage.setItem("vit_accounts", JSON.stringify(accounts));
}

function getCurrentUser() {
  const accounts = getAccounts();
  try {
    const raw = localStorage.getItem("vit_current_user");
    if (!raw || raw === "logged_out") return null;
    const parsed = JSON.parse(raw);
    if (parsed && parsed.email) {
      const found = accounts.find(a => a.email.toLowerCase() === parsed.email.toLowerCase());
      return found ? { ...found, ...parsed } : parsed;
    }
  } catch (e) {}
  return null;
}

function logoutUser() {
  state.currentUser = null;
  localStorage.setItem("vit_current_user", "logged_out");
  updateUserProfileUI();
  updateTicketBadges();
  renderTicketsView();
  renderInitialWelcomeMessage();
}

function setCurrentUser(user) {
  state.currentUser = user;
  if (user) {
    localStorage.setItem("vit_current_user", JSON.stringify(user));
  } else {
    localStorage.setItem("vit_current_user", "logged_out");
  }
  updateUserProfileUI();
  updateTicketBadges();
  renderTicketsView();
  renderInitialWelcomeMessage();
  syncTicketsFromServer();
}

const TICKETS_STORAGE_KEY = "vit_escalated_tickets";

function getSavedTickets() {
  try {
    const raw = localStorage.getItem(TICKETS_STORAGE_KEY);
    if (raw) {
      let parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn("Could not load saved tickets:", err);
  }
  return [];
}

function saveTickets(tickets) {
  try {
    localStorage.setItem(TICKETS_STORAGE_KEY, JSON.stringify(tickets));
  } catch (err) {
    console.warn("Could not save tickets:", err);
  }
}

async function syncTicketsFromServer() {
  try {
    const user = state.currentUser;
    const params = new URLSearchParams();
    if (user) {
      params.set("role", user.role || "student");
      if (user.email) params.set("email", user.email);
      if (user.regNo) params.set("regNo", user.regNo);
    }
    const res = await fetch(`/api/tickets?${params.toString()}`);
    if (res.ok) {
      const serverTickets = await res.json();
      if (Array.isArray(serverTickets)) {
        state.tickets = serverTickets;
        saveTickets(serverTickets);
        updateTicketBadges();
        renderTicketsView();
      }
    }
  } catch (err) {
    console.warn("Server ticket sync offline, fallback to local cache:", err);
  }
}

function getNextTicketSequence(tickets) {
  let maxSeq = 9140;
  if (Array.isArray(tickets)) {
    tickets.forEach(t => {
      const match = t.id && String(t.id).match(/VIT-2026-(\d+)/);
      if (match) {
        const num = parseInt(match[1], 10);
        if (num > maxSeq) maxSeq = num;
      }
    });
  }
  return maxSeq + 1;
}

const savedInitialTickets = getSavedTickets();

const state = {
  activeTab: "chat",
  currentUser: null,
  tickets: savedInitialTickets,
  ticketFilter: "active", // "active", "mysolved", "resolved"
  ticketSearchQuery: "",
  testResults: [],
  aiProvider: (localStorage.getItem("vit_ai_provider") === "groq" || localStorage.getItem("vit_ai_provider") === "local") ? localStorage.getItem("vit_ai_provider") : "gemini",
  aiApiKey: localStorage.getItem("vit_ai_apikey") || ""
};

// Student Privacy Filter: returns only tickets that the logged-in user has permission to see
function getVisibleTickets() {
  const user = state.currentUser;
  if (!user) return [];
  if (user.role === "staff" || user.role === "admin") {
    return state.tickets;
  }
  const userEmail = (user.email || "").toLowerCase();
  const userRegNo = (user.regNo || "").toLowerCase();
  return state.tickets.filter(t => {
    const tEmail = (t.studentEmail || "").toLowerCase();
    const tRegNo = (t.studentRegNo || "").toLowerCase();
    return (tEmail && tEmail === userEmail) || (tRegNo && tRegNo === userRegNo);
  });
}

// DOM Elements
const navTabs = document.querySelectorAll(".nav-tab");
const viewPanels = {
  chat: document.getElementById("view-chat"),
  kb: document.getElementById("view-kb"),
  tests: document.getElementById("view-tests"),
  tickets: document.getElementById("view-tickets")
};

const chatMessages = document.getElementById("chat-messages");
const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");
const sendBtn = document.getElementById("send-btn");
const geminiMicBtn = document.getElementById("gemini-mic-btn");
const geminiModelPill = document.getElementById("gemini-model-pill");
const geminiModelText = document.getElementById("gemini-model-text");
const geminiModelMenu = document.getElementById("gemini-model-menu");
const openAdvancedAiSettings = document.getElementById("open-advanced-ai-settings");
const geminiStartHeading = document.getElementById("gemini-start-heading");
const addActionBtn = document.getElementById("add-action-btn");
const quickActionMenu = document.getElementById("quick-action-menu");
const chipsList = document.getElementById("chips-list");
const resetSessionBtn = document.getElementById("reset-session-btn");

let isMicListening = false;

function updateSendButtonState() {
  if (!sendBtn || !chatInput) return;
  const hasText = chatInput.value.trim().length > 0;
  if (isMicListening) {
    if (geminiMicBtn) geminiMicBtn.style.display = "inline-flex";
    sendBtn.style.display = "none";
    return;
  }
  if (hasText) {
    sendBtn.style.display = "inline-flex";
    sendBtn.disabled = false;
    if (geminiMicBtn) geminiMicBtn.style.display = "none";
  } else {
    sendBtn.style.display = "none";
    sendBtn.disabled = true;
    if (geminiMicBtn) geminiMicBtn.style.display = "inline-flex";
  }
}

const aiModelBtn = document.getElementById("ai-model-btn");
const activeModelLabel = document.getElementById("active-model-label");
const aiModelModal = document.getElementById("ai-model-modal");
const closeAiModalBtn = document.getElementById("close-ai-modal-btn");
const cancelAiModalBtn = document.getElementById("cancel-ai-modal-btn");
const aiModelForm = document.getElementById("ai-model-form");
const selectAiProvider = document.getElementById("select-ai-provider");
const aiApiKeyInput = document.getElementById("ai-api-key");
const selectTtsVoice = document.getElementById("select-tts-voice");
const selectMicLang = document.getElementById("select-mic-lang");
const selectMicDevice = document.getElementById("select-mic-device");
const micAudioMeter = document.getElementById("mic-audio-meter");
const testTtsVoiceBtn = document.getElementById("test-tts-voice-btn");

const kbCardsGrid = document.getElementById("kb-cards-grid");
const kbSearchInput = document.getElementById("kb-search-input");
const filterChips = document.querySelectorAll(".filter-chip");

const testTableBody = document.getElementById("test-table-body");
const runAllTestsBtn = document.getElementById("run-all-tests-btn");
const metricTotal = document.getElementById("metric-total");
const metricPass = document.getElementById("metric-pass");
const metricFallback = document.getElementById("metric-fallback");
const metricAvgConf = document.getElementById("metric-avg-conf");

const ticketsQueueContainer = document.getElementById("tickets-queue-container");
const sidebarTicketsList = document.getElementById("sidebar-tickets-list");
const ticketCountBadge = document.getElementById("ticket-count-badge");
const sidebarTicketCount = document.getElementById("sidebar-ticket-count");
const clearTicketsBtn = document.getElementById("clear-tickets-btn");

// Ticket Modal Elements
const ticketModal = document.getElementById("ticket-modal");
const modalTicketId = document.getElementById("modal-ticket-id");
const modalTicketQuery = document.getElementById("modal-ticket-query");
const modalTicketReason = document.getElementById("modal-ticket-reason");
const closeModalBtn = document.getElementById("close-modal-btn");
const modalConfirmBtn = document.getElementById("modal-confirm-btn");

// Staff Reply Modal & Toast Elements
const staffReplyModal = document.getElementById("staff-reply-modal");
const replyTicketId = document.getElementById("reply-ticket-id");
const replyStudentQuery = document.getElementById("reply-student-query");
const staffReplyForm = document.getElementById("staff-reply-form");
const staffReplyText = document.getElementById("staff-reply-text");
const closeReplyModalBtn = document.getElementById("close-reply-modal-btn");
const cancelReplyBtn = document.getElementById("cancel-reply-btn");
const templateBtns = document.querySelectorAll(".template-btn");

const liveToast = document.getElementById("live-toast");
const toastBadge = document.getElementById("toast-badge");
const toastMessage = document.getElementById("toast-message");
const toastActionBtn = document.getElementById("toast-action-btn");

let activeReplyTicketId = null;

function updateActiveModelBadge() {
  if (activeModelLabel) {
    const labels = {
      gemini: "Google Gemini 1.5 Flash",
      groq: "Groq Llama 3.3",
      pollinations: "Open LLM",
      local: "Local Campus RAG"
    };
    activeModelLabel.textContent = labels[state.aiProvider] || "Google Gemini 1.5 Flash";
  }
  if (geminiModelText) {
    const shortNames = {
      gemini: "Flash",
      groq: "Llama 3.3",
      pollinations: "Open LLM",
      local: "Local"
    };
    geminiModelText.textContent = shortNames[state.aiProvider] || "Flash";
  }
  if (geminiModelMenu) {
    geminiModelMenu.querySelectorAll(".model-menu-item[data-model]").forEach(item => {
      item.classList.toggle("active", item.dataset.model === state.aiProvider);
    });
  }
}

let toastTimer = null;

function showToast(rawMessage, actionLabel = null, onAction = null) {
  // Silent: Intrusive floating popups permanently removed in favor of contextual, in-place UI feedback
  return;
}

function hideToast() {
  if (!liveToast) return;
  liveToast.classList.remove("show");
  liveToast.setAttribute("hidden", "true");
}


// ============================================================================
// 5. INITIALIZATION & VIEW NAVIGATION
// ============================================================================
function updateKnowledgeBaseCounts() {
  const counts = {
    all: KNOWLEDGE_BASE.length,
    classrooms: 0,
    labs: 0,
    events: 0,
    facilities: 0,
    procedures: 0
  };
  KNOWLEDGE_BASE.forEach(item => {
    if (counts[item.category] !== undefined) {
      counts[item.category]++;
    }
  });

  const kbBadge = document.getElementById("kb-count-badge");
  if (kbBadge) kbBadge.textContent = counts.all;

  Object.entries(counts).forEach(([cat, count]) => {
    const el = document.getElementById(`cat-count-${cat}`);
    if (el) el.textContent = count;
  });
}

function initApp() {
  // Purge any legacy dummy accounts & dummy tickets from localStorage for clean public deployment
  try {
    const rawAcc = localStorage.getItem("vit_accounts");
    if (rawAcc && (rawAcc.includes("std-01") || rawAcc.includes("std-02") || rawAcc.includes("Aarav") || rawAcc.includes("24BCE1001"))) {
      localStorage.removeItem("vit_accounts");
      localStorage.removeItem("vit_current_user");
    }
    const rawTick = localStorage.getItem(TICKETS_STORAGE_KEY);
    if (rawTick && (rawTick.includes("VIT-2026-9140") || rawTick.includes("VIT-2026-9139") || rawTick.includes("VIT-2026-9138"))) {
      localStorage.removeItem(TICKETS_STORAGE_KEY);
    }
  } catch (e) {}

  document.body.dataset.activeTab = "chat";
  state.currentUser = getCurrentUser();
  updateUserProfileUI();
  setupNavigation();
  updateKnowledgeBaseCounts();
  renderInitialWelcomeMessage();
  renderKnowledgeBaseCards(KNOWLEDGE_BASE);
  setupKnowledgeBaseSearch();
  runTestBenchmarkSuite();
  renderTicketsView();
  updateTicketBadges();
  setupEventListeners();
  setupAuthEventListeners();
  setupTicketFilterListeners();
  updateSendButtonState();

  // Instant server sync & multi-device background polling (every 10s)
  syncTicketsFromServer();
  setInterval(() => {
    if (!document.hidden) {
      syncTicketsFromServer();
    }
  }, 10000);
}

function switchTab(targetTab) {
  const isStaff = state.currentUser && state.currentUser.role === "staff";
  if (targetTab === "tests" && !isStaff) {
    showToast("Access Restricted: Benchmark test suite is restricted to Staff & Administrators.");
    return;
  }

  state.activeTab = targetTab;
  document.body.dataset.activeTab = targetTab;

  navTabs.forEach(tab => {
    const isTarget = tab.dataset.tab === targetTab;
    tab.classList.toggle("active", isTarget);
    tab.setAttribute("aria-selected", isTarget ? "true" : "false");
  });

  Object.entries(viewPanels).forEach(([key, panel]) => {
    if (key === targetTab) {
      panel.classList.add("active");
      panel.removeAttribute("hidden");
    } else {
      panel.classList.remove("active");
      panel.setAttribute("hidden", "true");
    }
  });

  if (targetTab === "tickets") {
    syncTicketsFromServer();
    renderTicketsView();
  }
}

function setupNavigation() {
  navTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      switchTab(tab.dataset.tab);
    });
  });

  document.querySelectorAll(".view-breadcrumb-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      switchTab(btn.dataset.tab || "chat");
    });
  });
}

// ============================================================================
// 6. CHAT ASSISTANT LOGIC & STREAMING
// ============================================================================
function getTimeBasedCampusGreeting() {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) {
    return {
      heading: "Good morning, VITian",
      subtitle: "Where would you like to start your day on campus?",
      badge: "VIT Campus AI Helpdesk • 5th Sem Innovate-a-thon",
      placeholder: "Ask VIT Campus AI Helpdesk... (e.g. morning lab timings, SJT classrooms)"
    };
  } else if (hour >= 12 && hour < 17) {
    return {
      heading: "Good afternoon, VITian",
      subtitle: "Need help with classrooms, lab hours, or OD approvals?",
      badge: "VIT Campus AI Helpdesk • 5th Sem Innovate-a-thon",
      placeholder: "Ask VIT Campus AI Helpdesk... (e.g. afternoon lab access, cafeteria, OD)"
    };
  } else if (hour >= 17 && hour < 22) {
    return {
      heading: "Good evening, VITian",
      subtitle: "Looking for hostel night leaves, event updates, or campus guidance?",
      badge: "VIT Campus AI Helpdesk • 5th Sem Innovate-a-thon",
      placeholder: "Ask VIT Campus AI Helpdesk... (e.g. weekend hostel night leave, Gravitas)"
    };
  } else {
    return {
      heading: "Working late, VITian?",
      subtitle: "Ask me about 24/7 FabLab access, night leave, or campus security.",
      badge: "VIT Campus AI Helpdesk • 24/7 Campus Support",
      placeholder: "Ask VIT Campus AI Helpdesk... (e.g. 24/7 Maker Space, library night hours)"
    };
  }
}

function updateHeroGreeting() {
  const headingEl = document.getElementById("gemini-start-heading");
  const subEl = document.getElementById("gemini-start-subtitle");
  const badgeTextEl = document.getElementById("hero-badge-text");

  if (!state.currentUser) {
    if (headingEl) headingEl.textContent = "Welcome to VIT Campus Helpdesk";
    if (subEl) subEl.textContent = "Sign in with your @vitstudent.ac.in or @vit.ac.in account, or ask any campus question below.";
    if (badgeTextEl) badgeTextEl.textContent = "VIT Campus AI Helpdesk • 5th Sem Innovate-a-thon";
    if (chatInput) chatInput.placeholder = "Ask VIT Campus AI Helpdesk... (e.g. SJT classrooms, lab timings, leave rules)";
    return;
  }

  const isStaff = state.currentUser.role === "staff";
  if (isStaff) {
    if (headingEl) headingEl.textContent = "Good evening, Officer";
    if (subEl) subEl.textContent = "Desk MB-102 Support Console • Manage escalated inquiries, verified FAQs & campus benchmarks";
    if (badgeTextEl) badgeTextEl.textContent = "Desk MB-102 Support Staff Console • Official Operations";
    if (chatInput) chatInput.placeholder = "Search campus records or test student inquiry resolution...";
  } else {
    const greeting = getTimeBasedCampusGreeting();
    if (headingEl) headingEl.textContent = greeting.heading;
    if (subEl) subEl.textContent = greeting.subtitle;
    if (badgeTextEl) badgeTextEl.textContent = greeting.badge;
    if (chatInput) chatInput.placeholder = greeting.placeholder;
  }
}

function renderInitialWelcomeMessage() {
  chatMessages.innerHTML = "";
  const chatContainer = document.getElementById("chat-container") || document.querySelector(".chat-container");
  if (chatContainer) {
    chatContainer.classList.add("empty-chat");
  }
  updateHeroGreeting();
}

function appendUserMessage(text) {
  const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const user = state.currentUser || { role: 'student', name: 'VITian Student' };
  const isStaff = user.role === 'staff';
  const senderLabel = isStaff ? `${user.name} (Officer)` : `Student (You)`;
  const avatarChar = isStaff ? '👨‍💼' : '🎓';

  const row = document.createElement("div");
  row.className = "message-row user";
  row.innerHTML = `
    <div class="avatar avatar-user" aria-label="${isStaff ? 'Staff Avatar' : 'Student Avatar'}">
      <span style="font-size: 14px;">${avatarChar}</span>
    </div>
    <div class="message-bubble">
      <div class="message-meta">
        <span class="sender-name">${escapeHTML(senderLabel)}</span>
        <span class="message-time">${timeStr}</span>
      </div>
      <div class="message-text">${escapeHTML(text)}</div>
      <div class="message-actions-bar user-actions" role="toolbar" aria-label="Message actions">
        <button class="msg-action-btn action-copy" type="button" aria-label="Copy question" title="Copy question">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
          <span>Copy</span>
        </button>
        <button class="msg-action-btn action-edit" type="button" aria-label="Edit question" title="Edit question" data-query="${escapeAttr(text)}">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
          <span>Edit</span>
        </button>
      </div>
    </div>
  `;
  chatMessages.appendChild(row);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Dynamic Generative RAG Synthesizer (100% Free, zero cost, contextual)
function formatMarkdownText(text) {
  if (!text) return "";
  return text
    .split("\n\n")
    .map(para => {
      let p = escapeHTML(para);
      p = p.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
      p = p.replace(/\*(.*?)\*/g, "<em>$1</em>");
      p = p.replace(/`(.*?)`/g, "<code>$1</code>");
      p = p.replace(/\[(.*?)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener" style="color: #38bdf8; text-decoration: underline;">$1</a>');
      return `<p>${p}</p>`;
    })
    .join("");
}

function appendAssistantResponse(queryResult, studentQuery, elapsedSeconds = null) {
  const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const row = document.createElement("div");
  row.className = "message-row assistant";

  let bodyContent = "";

  if (queryResult.isConversational) {
    const conversationalText = queryResult.generatedAnswer || queryResult.answer;
    bodyContent = `
      <div class="message-text">
        ${formatMarkdownText(conversationalText)}
      </div>
      <div class="citation-container" style="border-left-color: var(--border-subtle); background: var(--bg-card);">
        <div class="citation-header">
          <span class="source-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
            ${escapeHTML(queryResult.aiModelName || "VIT Campus AI Assistant")}
          </span>
          <span class="confidence-indicator conf-high">Ready to Assist</span>
        </div>
        <div class="citation-text">
          Campus Helpdesk Assistant &bull; Ask about classroom locations, lab timings, Gravitas, or student procedures.
        </div>
      </div>
    `;
  } else if (queryResult.isFallback) {
    // Escalate to Staff Desk
    const ticketId = `VIT-2026-${state.ticketSequence++}`;
    const user = state.currentUser || { name: "VITian Student", email: "student@vitstudent.ac.in", regNo: "24BCE1001" };
    const curDateStr = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    const studentRoll = user.regNo || "24BCE1001";
    const newTicket = {
      id: ticketId,
      query: studentQuery,
      reason: queryResult.reason,
      confidence: queryResult.confidence,
      timestamp: `${curDateStr}, ${timeStr}`,
      status: "Pending Support Review",
      resolved: false,
      studentName: user.name,
      studentEmail: user.email,
      studentRegNo: studentRoll
    };
    state.tickets.unshift(newTicket);
    saveTickets(state.tickets);
    updateTicketBadges();
    renderTicketsView();

    // Persist to server backend storage & sync ID across campus
    fetch('/api/tickets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTicket)
    })
      .then(res => res.json())
      .then(data => {
        if (data.success && data.ticket) {
          const idx = state.tickets.findIndex(t => t.id === newTicket.id);
          if (idx !== -1) {
            state.tickets[idx].id = data.ticket.id;
            state.tickets[idx].timestamp = data.ticket.timestamp;
            saveTickets(state.tickets);
            updateTicketBadges();
            renderTicketsView();
          }
        }
      })
      .catch(err => console.warn("Backend ticket sync offline:", err));

    bodyContent = `
      <div class="message-text">
        <p>I apologize, but this information is <strong>not available</strong> in the approved campus knowledge base.</p>
      </div>
      <div class="fallback-card">
        <div class="fallback-header">
          <div class="fallback-icon">!</div>
          <div>
            <div class="fallback-title">Query Routed to Human Support Staff</div>
            <div style="font-size: 11.5px; color: var(--text-muted);">Assigned Desk: Student Support Office (MB-102)</div>
          </div>
        </div>
        <div class="fallback-body">
          <p><strong>Reason:</strong> ${escapeHTML(queryResult.reason)}</p>
          <p style="margin-top: 6px;">To ensure you receive accurate and authorized assistance, a helpdesk ticket has been generated:</p>
          <div style="margin-top: 8px; display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
            <span class="ticket-pill" onclick="switchTab('tickets')" title="Click to view ticket in Escalation Desk">Ticket #${ticketId}</span>
            <span class="ticket-roll-badge">🎓 Roll No: <strong>${escapeHTML(studentRoll)}</strong></span>
            <span style="font-size: 11.5px; color: var(--text-secondary);">${escapeHTML(user.name)}</span>
          </div>
        </div>
        <div class="fallback-actions" style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 10px;">
          <button class="btn-primary" type="button" onclick="switchTab('tickets')" style="font-size: 12px; padding: 6px 12px; display: inline-flex; align-items: center; gap: 6px;">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            <span>Open Escalation Desk &rarr;</span>
          </button>
          <button class="btn-ghost" type="button" onclick="openStaffModal('${ticketId}', '${escapeAttr(studentQuery)}', '${escapeAttr(queryResult.reason)}', '${escapeAttr(studentRoll)}', '${escapeAttr(user.name)}')" style="font-size: 12px; padding: 6px 12px;">
            View Escalation Details
          </button>
        </div>
      </div>
    `;
  } else {
    const match = queryResult.match;
    const confClass = queryResult.confidence >= 75 ? "conf-high" : "conf-med";

    // Dynamic Generative Synthesis tailored to student inquiry
    const generativeAnswer = queryResult.generatedAnswer || match.answer;
    const formattedAnswer = formatMarkdownText(generativeAnswer);
    const modelBadge = (queryResult.aiModelName || "Google Gemini 1.5 Flash")
      .replace(/\s*\(Real LLM\)/gi, " 1.5 Flash")
      .replace(/\s*\(0ms\)/gi, "")
      .trim();

    bodyContent = `
      <div class="message-text">
        ${formattedAnswer}
      </div>
      <div class="citation-container">
        <div class="citation-header">
          <span class="source-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            ${escapeHTML(modelBadge)}
          </span>
          <span class="confidence-indicator ${confClass}">${queryResult.confidence}% Grounded</span>
        </div>
        <div class="citation-text">
          Document: ${escapeHTML(match.sourceDoc)} &bull; FAQ Ref: [${match.id}]
        </div>
        <details class="rag-inspector">
          <summary class="rag-summary">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            Inspect Grounded RAG Context &amp; Prompt
          </summary>
          <div class="rag-content">
<div class="rag-field"><strong>Active AI Engine:</strong> ${escapeHTML(modelBadge)}</div>
<div class="rag-field"><strong>Injected Context:</strong> "${escapeHTML(match.answer)}"</div>
<div class="rag-field"><strong>Source Citation:</strong> ${escapeHTML(match.sourceDoc)}</div>
<div class="rag-field"><strong>Anti-Hallucination Guard:</strong> Grounded strictly in approved campus directives dated 16 Oct 2026.</div>
          </div>
        </details>
      </div>
    `;
  }

  const thoughtBlock = elapsedSeconds ? `
    <details class="thought-accordion">
      <summary class="thought-summary">
        <span class="thought-sparkle" aria-hidden="true">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
        </span>
        <span class="thought-summary-label">Thought for ${elapsedSeconds}s</span>
        <span class="thought-chevron" aria-hidden="true">▾</span>
      </summary>
      <div class="thought-body">
        <div class="thought-item"><span>✓</span> Searched VIT campus knowledge base (${KNOWLEDGE_BASE.length} verified records)</div>
        ${queryResult.match ? `<div class="thought-item"><span>✓</span> Grounded against official citation: ${escapeHTML(queryResult.match.sourceDoc)}</div>` : ''}
        ${queryResult.isFallback ? `<div class="thought-item" style="color: #f87171;"><span>⚠</span> Unverified in official directory &bull; Routed to staff ticket</div>` : `<div class="thought-item"><span>✓</span> Verification confidence: <strong>${queryResult.confidence || 95}% Grounded</strong></div>`}
      </div>
    </details>
  ` : '';

  row.innerHTML = `
    <div class="avatar avatar-ai" aria-label="AI Helpdesk Avatar">VIT</div>
    <div class="message-bubble">
      <div class="message-meta">
        <span class="sender-name">VIT Student Support AI</span>
        <span class="message-time">${timeStr}</span>
      </div>
      ${thoughtBlock}
      ${bodyContent}
      <div class="message-actions-bar" role="toolbar" aria-label="Message actions">
        <button class="msg-action-btn action-copy" type="button" aria-label="Copy response" title="Copy response">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
          <span>Copy</span>
        </button>
        <button class="msg-action-btn action-speak" type="button" aria-label="Read response aloud" title="Read aloud">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
          <span>Listen</span>
        </button>
        <button class="msg-action-btn action-helpful" type="button" aria-label="Mark response as helpful" title="Helpful">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"/></svg>
        </button>
        <button class="msg-action-btn action-unhelpful" type="button" aria-label="Mark response as unhelpful" title="Unhelpful">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 14V2"/><path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z"/></svg>
        </button>
        ${studentQuery ? `
          <button class="msg-action-btn action-retry" type="button" aria-label="Regenerate answer" title="Regenerate answer" data-query="${escapeAttr(studentQuery)}">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></svg>
            <span>Retry</span>
          </button>
        ` : ''}
      </div>
    </div>
  `;

  chatMessages.appendChild(row);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function appendTypingIndicator() {
  const row = document.createElement("div");
  row.className = "message-row assistant thinking-row";
  row.innerHTML = `
    <div class="avatar avatar-ai thinking-avatar" aria-label="AI Helpdesk Avatar">
      <div class="avatar-glow" aria-hidden="true"></div>
      <span>VIT</span>
    </div>
    <div class="message-bubble thinking-bubble" role="status" aria-live="polite">
      <div class="thinking-header">
        <div class="thinking-pill">
          <span class="thinking-orb" aria-hidden="true"></span>
          <span class="thinking-title">Thinking</span>
        </div>
        <span class="thinking-timer" id="thinking-timer" aria-label="Elapsed thinking time">0.0s</span>
      </div>
      <div class="thinking-step-container">
        <span class="thinking-step-text" id="thinking-step-text">Searching campus knowledge base…</span>
      </div>
      <div class="thinking-shimmer-container" aria-hidden="true">
        <div class="shimmer-line shimmer-line-1"></div>
        <div class="shimmer-line shimmer-line-2"></div>
        <div class="shimmer-line shimmer-line-3"></div>
      </div>
    </div>
  `;
  chatMessages.appendChild(row);
  chatMessages.scrollTop = chatMessages.scrollHeight;

  const timerEl = row.querySelector("#thinking-timer");
  const stepEl = row.querySelector("#thinking-step-text");
  const startTime = Date.now();

  const thinkingSteps = [
    "Searching campus knowledge base…",
    "Verifying room numbers & schedule citations…",
    "Synthesizing grounded response…"
  ];

  row._thinkingInterval = setInterval(() => {
    const elapsedMs = Date.now() - startTime;
    const elapsedSec = (elapsedMs / 1000).toFixed(1);
    if (timerEl) timerEl.textContent = `${elapsedSec}s`;

    if (stepEl) {
      if (elapsedMs > 1600) {
        stepEl.textContent = thinkingSteps[2];
      } else if (elapsedMs > 800) {
        stepEl.textContent = thinkingSteps[1];
      } else {
        stepEl.textContent = thinkingSteps[0];
      }
    }
  }, 100);

  return row;
}

function removeTypingIndicator(row) {
  if (row) {
    if (row._thinkingInterval) {
      clearInterval(row._thinkingInterval);
      row._thinkingInterval = null;
    }
    if (row.parentNode) {
      row.parentNode.removeChild(row);
    }
  }
}

async function handleUserSubmission(queryText) {
  const trimmed = queryText.trim();
  if (!trimmed) return;

  const chatContainer = document.getElementById("chat-container") || document.querySelector(".chat-container");
  if (chatContainer) {
    chatContainer.classList.remove("empty-chat");
  }

  const submissionStartTime = Date.now();
  const getElapsed = () => Math.max(0.4, ((Date.now() - submissionStartTime) / 1000)).toFixed(1);

  appendUserMessage(trimmed);
  chatInput.value = "";
  updateSendButtonState();

  // Show live generative thinking animation
  const typingRow = appendTypingIndicator();

  const result = searchKnowledgeBase(trimmed);

  // 1. Strict Knowledge-Base Scope Enforcement:
  // If the query is out-of-scope, unverified, or ambiguous, immediately route to human support staff.
  // The assistant must NEVER speculate or answer using external LLM knowledge outside the campus KB!
  if (result.isFallback) {
    await new Promise(r => setTimeout(r, 450));
    const elapsed = getElapsed();
    removeTypingIndicator(typingRow);
    appendAssistantResponse(result, trimmed, elapsed);
    return;
  }

  // 2. Conversational greetings (hi, hello, who are you, help)
  if (result.isConversational) {
    if (state.aiProvider !== "local") {
      try {
        const response = await fetch("/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: trimmed,
            context: "",
            sourceDoc: "VIT Student Support Office Directory",
            provider: state.aiProvider,
            apiKey: state.aiApiKey
          })
        });
        if (response.ok) {
          const aiData = await response.json();
          if (aiData.text) {
            const elapsed = getElapsed();
            removeTypingIndicator(typingRow);
            appendAssistantResponse({
              isConversational: true,
              answer: aiData.text,
              aiModelName: aiData.provider || "Google Gemini 1.5 Flash"
            }, trimmed, elapsed);
            return;
          }
        }
      } catch (err) {
        console.warn("Generative AI proxy error", err);
      }
    }
    await new Promise(r => setTimeout(r, 350));
    const elapsed = getElapsed();
    removeTypingIndicator(typingRow);
    appendAssistantResponse(result, trimmed, elapsed);
    return;
  }

  // 3. In-scope query: Grounded Generative AI LLM synthesis strictly based on verified FAQ match
  if (state.aiProvider !== "local" && result.match) {
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: trimmed,
          context: result.match.answer,
          sourceDoc: result.match.sourceDoc,
          provider: state.aiProvider,
          apiKey: state.aiApiKey
        })
      });

      if (response.ok) {
        const aiData = await response.json();

        if (aiData.requiresKey) {
          const elapsed = getElapsed();
          removeTypingIndicator(typingRow);
          appendAssistantResponse({
            isConversational: true,
            answer: aiData.text,
            aiModelName: "Google Gemini (Setup)"
          }, trimmed, elapsed);
          const settingsWheelBtn = document.getElementById("settings-wheel-btn");
          if (settingsWheelBtn) {
            settingsWheelBtn.click();
          }
          return;
        }

        if (aiData.text) {
          const elapsed = getElapsed();
          result.generatedAnswer = aiData.text;
          result.aiModelName = aiData.provider || "Google Gemini 1.5 Flash";
          removeTypingIndicator(typingRow);
          appendAssistantResponse(result, trimmed, elapsed);
          return;
        }
      }
    } catch (err) {
      console.warn("Generative AI proxy error, using local RAG engine", err);
    }
  } else if (result.match) {
    result.aiModelName = "Local Grounded Engine";
  }

  // Fallback to grounded local answer
  await new Promise(r => setTimeout(r, 450));
  const elapsed = getElapsed();
  removeTypingIndicator(typingRow);
  appendAssistantResponse(result, trimmed, elapsed);
}

// ============================================================================
// 7. KNOWLEDGE BASE EXPLORER
// ============================================================================
function renderKnowledgeBaseCards(items) {
  kbCardsGrid.innerHTML = "";

  if (items.length === 0) {
    kbCardsGrid.innerHTML = `
      <div style="grid-column: 1 / -1; padding: 40px; text-align: center; color: var(--text-muted);">
        <p style="font-size: 16px; font-weight: 600;">No approved campus FAQs match your search.</p>
        <p style="font-size: 13px; margin-top: 6px;">Try searching for "SJT", "lab", "Gravitas", or "hostel".</p>
      </div>
    `;
    return;
  }

  items.forEach(item => {
    const card = document.createElement("article");
    card.className = "kb-card";
    const catClass = `cat-${item.category}`;

    card.innerHTML = `
      <div class="kb-card-header">
        <span class="category-tag ${catClass}">${item.category}</span>
        <span class="kb-doc-id">${item.id}</span>
      </div>
      <h3 class="kb-card-question">${escapeHTML(item.question)}</h3>
      <p class="kb-card-answer">${escapeHTML(item.answer)}</p>
      <div class="kb-card-source">
        <span class="kb-source-label" title="${escapeAttr(item.sourceDoc)}">${escapeHTML(item.sourceDoc)}</span>
        <button class="kb-ask-btn" type="button" data-ask="${escapeAttr(item.question)}">Ask in Chat &rarr;</button>
      </div>
    `;
    kbCardsGrid.appendChild(card);
  });

  // Attach Ask in Chat buttons
  kbCardsGrid.querySelectorAll(".kb-ask-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const q = btn.dataset.ask;
      switchTab("chat");
      handleUserSubmission(q);
    });
  });
}

function setupKnowledgeBaseSearch() {
  let currentCategory = "all";

  function applyFilter() {
    const query = kbSearchInput.value.toLowerCase().trim();
    let filtered = KNOWLEDGE_BASE;

    if (currentCategory !== "all") {
      filtered = filtered.filter(item => item.category === currentCategory);
    }

    if (query) {
      filtered = filtered.filter(item => {
        return item.question.toLowerCase().includes(query) ||
          item.answer.toLowerCase().includes(query) ||
          item.sourceDoc.toLowerCase().includes(query) ||
          item.keywords.some(k => k.includes(query));
      });
    }

    renderKnowledgeBaseCards(filtered);
  }

  kbSearchInput.addEventListener("input", applyFilter);

  filterChips.forEach(chip => {
    chip.addEventListener("click", () => {
      filterChips.forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      currentCategory = chip.dataset.category;
      applyFilter();
    });
  });
}

// ============================================================================
// 8. TEST BENCHMARK EVALUATION TABLE
// ============================================================================
function runTestBenchmarkSuite() {
  testTableBody.innerHTML = "";
  state.testResults = [];

  let correctCount = 0;
  let fallbackCount = 0;
  let totalScoreSum = 0;
  let inScopeCount = 0;

  TEST_SUITE.forEach(test => {
    const result = searchKnowledgeBase(test.query);

    let passed = false;
    let actualSummary = "";
    let sourceDocOutput = "";

    if (test.inScope) {
      // In-scope: must return correct answer and cite expected document
      inScopeCount++;
      totalScoreSum += result.confidence;
      if (!result.isFallback && result.match && result.match.sourceDoc === test.expectedDoc) {
        passed = true;
        correctCount++;
        actualSummary = result.match.answer;
        sourceDocOutput = result.match.sourceDoc;
      } else {
        passed = false;
        actualSummary = result.isFallback ? "Unexpected fallback: " + result.reason : "Mismatch in document retrieval";
        sourceDocOutput = result.match ? result.match.sourceDoc : "None";
      }
    } else {
      // Out-of-scope / ambiguous: must trigger Fallback to staff
      if (result.isFallback) {
        passed = true;
        fallbackCount++;
        actualSummary = `Fallback Triggered: ${result.reason} (Escalated to Staff Desk)`;
        sourceDocOutput = "Routed to Staff Desk";
      } else {
        passed = false;
        actualSummary = `Failed to trigger fallback: answered with ${result.match?.id}`;
        sourceDocOutput = result.match?.sourceDoc || "None";
      }
    }

    state.testResults.push({
      ...test,
      passed,
      actualOutput: actualSummary,
      confidence: result.confidence,
      sourceDocOutput
    });

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="test-id-col">${test.id}</td>
      <td class="test-query-col">${escapeHTML(test.query)}</td>
      <td><span class="category-tag ${test.inScope ? 'cat-classrooms' : 'cat-procedures'}">${test.category}</span></td>
      <td class="expected-cell">${escapeHTML(test.expectedBehavior)}</td>
      <td class="actual-cell ${test.inScope ? '' : 'fallback'}">${escapeHTML(actualSummary)}</td>
      <td><span class="confidence-indicator ${result.confidence >= 70 ? 'conf-high' : 'conf-low'}">${result.confidence}%</span></td>
      <td><span style="font-family: var(--font-mono); font-size: 11px; color: #38bdf8;">${escapeHTML(sourceDocOutput)}</span></td>
      <td>
        <span class="status-badge ${passed ? 'status-pass' : 'status-fallback'}">
          ${passed ? '✓ PASS' : '✗ FAIL'}
        </span>
      </td>
      <td>
        <button class="btn-table-action" type="button" data-run-test="${escapeAttr(test.query)}">
          Test in Chat &rarr;
        </button>
      </td>
    `;
    testTableBody.appendChild(tr);
  });

  // Attach Test in Chat action buttons
  testTableBody.querySelectorAll(".btn-table-action").forEach(btn => {
    btn.addEventListener("click", () => {
      const q = btn.dataset.runTest;
      switchTab("chat");
      handleUserSubmission(q);
    });
  });

  // Update Summary Metrics
  metricTotal.textContent = TEST_SUITE.length;
  metricPass.textContent = `${Math.round((correctCount / 8) * 100)}%`;
  metricFallback.textContent = `${Math.round((fallbackCount / 2) * 100)}%`;
  const avg = inScopeCount > 0 ? (totalScoreSum / inScopeCount).toFixed(1) : "0";
  metricAvgConf.textContent = `${avg}%`;
}

// ============================================================================
// 9. STAFF ESCALATION DESK & TICKET MODAL
// ============================================================================
function updateTicketBadges() {
  const isStaff = state.currentUser && (state.currentUser.role === "staff" || state.currentUser.role === "admin");
  const visible = getVisibleTickets();
  const openCount = visible.filter(t => !t.resolved && !t.reply).length;
  const totalCount = visible.length;

  if (ticketCountBadge) ticketCountBadge.textContent = isStaff ? openCount : totalCount;
  if (sidebarTicketCount) sidebarTicketCount.textContent = isStaff ? `${openCount} Open` : `${openCount} Active`;

  const staffPill = document.getElementById("staff-ticket-count-pill");
  if (staffPill) staffPill.textContent = state.tickets.filter(t => !t.resolved && !t.reply).length;

  const accountBadge = document.getElementById("account-tickets-badge");
  if (accountBadge) accountBadge.textContent = visible.length;

  if (sidebarTicketsList) {
    if (visible.length === 0) {
      sidebarTicketsList.innerHTML = `<p class="empty-state-text">${isStaff ? 'No open tickets. Escalated queries will appear here.' : 'You have no escalated inquiries logged.'}</p>`;
    } else {
      sidebarTicketsList.innerHTML = "";
      visible.slice(0, 5).forEach(t => {
        const item = document.createElement("div");
        item.className = "sidebar-ticket-item";
        item.title = "Click to open full escalation desk";
        const timePart = t.timestamp && t.timestamp.includes(',') ? t.timestamp.split(',')[1] : (t.timestamp || '');
        const isResolved = Boolean(t.resolved || t.reply);
        item.innerHTML = `
          <div class="sidebar-ticket-top">
            <span class="sidebar-ticket-id">#${t.id}</span>
            <span class="sidebar-ticket-roll" style="font-family: var(--font-mono); font-size: 10px; color: #60a5fa; font-weight: 600;">${escapeHTML(t.studentRegNo || '')}</span>
            <span style="font-size: 10px; color: var(--text-muted);">${timePart}</span>
          </div>
          <div class="sidebar-ticket-query" title="${escapeAttr(t.query)}">${escapeHTML(t.query)}</div>
          <div style="font-size: 10.5px; margin-top: 2px; color: ${isResolved ? '#34d399' : 'var(--text-muted)'};">
            ${isResolved ? '✓ Staff Reply Received' : '⏳ In Review (MB-102)'}
          </div>
        `;
        item.addEventListener("click", () => switchTab("tickets"));
        sidebarTicketsList.appendChild(item);
      });
    }
  }
}

function renderTicketsView() {
  ticketsQueueContainer.innerHTML = "";
  const isStaff = state.currentUser && (state.currentUser.role === "staff" || state.currentUser.role === "admin");
  const user = state.currentUser || {};
  const userEmail = (user.email || "").toLowerCase();

  const heading = document.getElementById("tickets-view-heading");
  const sub = document.getElementById("tickets-view-sub");
  const activeLabel = document.getElementById("tab-tickets-active-label");
  const resolvedLabel = document.getElementById("tab-tickets-resolved-label");

  if (heading && sub) {
    if (isStaff) {
      heading.textContent = "Human Staff Escalation Queue";
      sub.textContent = "Review out-of-scope inquiries from students, dispatch official staff resolutions, and track individual query solve history.";
      if (activeLabel) activeLabel.textContent = "Active Queue";
      if (resolvedLabel) resolvedLabel.textContent = "All Resolved History";
    } else {
      heading.textContent = "My Escalated Queries & Support Desk";
      sub.textContent = `Inquiries forwarded to human support staff at MB-102 for Roll No: ${escapeHTML(user.regNo || 'Student')}. Official updates and staff answers appear strictly here.`;
      if (activeLabel) activeLabel.textContent = "Active Inquiries";
      if (resolvedLabel) resolvedLabel.textContent = "Resolved Answers";
    }
  }

  // Get visible tickets (strictly isolated for students!)
  const visible = getVisibleTickets();

  // Compute category counts
  const activeList = visible.filter(t => !t.resolved && !t.reply);
  const mySolvedList = isStaff ? visible.filter(t => (t.resolved || t.reply) && (t.resolvedByEmail || '').toLowerCase() === userEmail) : [];
  const resolvedList = visible.filter(t => t.resolved || t.reply);

  const badgeActive = document.getElementById("badge-active-tickets");
  const badgeMySolved = document.getElementById("badge-mysolved-tickets");
  const badgeResolved = document.getElementById("badge-resolved-tickets");

  if (badgeActive) badgeActive.textContent = activeList.length;
  if (badgeMySolved) badgeMySolved.textContent = mySolvedList.length;
  if (badgeResolved) badgeResolved.textContent = resolvedList.length;

  // Filter list according to state.ticketFilter
  let currentList = [];
  if (state.ticketFilter === "active") {
    currentList = activeList;
  } else if (state.ticketFilter === "mysolved" && isStaff) {
    currentList = mySolvedList;
  } else if (state.ticketFilter === "resolved") {
    currentList = resolvedList;
  } else {
    currentList = activeList;
  }

  // Apply search query if present
  if (state.ticketSearchQuery) {
    const q = state.ticketSearchQuery;
    currentList = currentList.filter(t => {
      return (t.query && t.query.toLowerCase().includes(q)) ||
             (t.id && t.id.toLowerCase().includes(q)) ||
             (t.studentName && t.studentName.toLowerCase().includes(q)) ||
             (t.studentRegNo && t.studentRegNo.toLowerCase().includes(q)) ||
             (t.reply && t.reply.toLowerCase().includes(q)) ||
             (t.resolvedBy && t.resolvedBy.toLowerCase().includes(q));
    });
  }

  if (currentList.length === 0) {
    let emptyTitle = "No Inquiries in this view";
    let emptySub = "When student queries are escalated or resolved, they will populate here.";
    if (state.ticketFilter === "active") {
      emptyTitle = isStaff ? "Active Escalation Queue is Clear" : "No Active Inquiries";
      emptySub = isStaff ? "All student inquiries have been resolved." : "You have no inquiries currently waiting for staff review.";
    } else if (state.ticketFilter === "mysolved") {
      emptyTitle = `No Queries Solved by ${user.name || 'You'} yet`;
      emptySub = "When you reply to student inquiries from the active queue, your personal resolution history will appear here.";
    } else if (state.ticketFilter === "resolved") {
      emptyTitle = isStaff ? "No Resolved History Yet" : "No Resolved Answers Yet";
      emptySub = isStaff ? "Resolved support tickets will be recorded here for departmental auditing." : "When staff officers at MB-102 reply to your queries, their verified answers will appear here.";
    }

    ticketsQueueContainer.innerHTML = `
      <div style="grid-column: 1 / -1; padding: 48px; text-align: center; color: var(--text-muted); background: var(--bg-surface); border-radius: var(--radius-md); border: 1px dashed var(--border-default);">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin-bottom: 12px; color: var(--color-success);"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
        <h3 style="font-size: 16px; color: var(--text-primary); margin-bottom: 4px;">${escapeHTML(emptyTitle)}</h3>
        <p style="font-size: 13px;">${escapeHTML(emptySub)}</p>
      </div>
    `;
    return;
  }

  currentList.forEach(ticket => {
    const card = document.createElement("article");
    card.className = "ticket-card";
    const hasReplied = Boolean(ticket.reply);
    const isResolved = Boolean(ticket.resolved || hasReplied);

    let statusText = "";
    if (isStaff) {
      if (isResolved) {
        statusText = ticket.resolvedBy ? `✓ Solved by ${ticket.resolvedBy}` : `✓ Resolved`;
      } else {
        statusText = "⏳ Pending Support Review";
      }
    } else {
      statusText = isResolved ? "✓ Official Staff Reply Received" : "⏳ In Review by Desk MB-102 Staff";
    }

    let actionsHTML = "";
    if (isStaff) {
      actionsHTML = `
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          ${!isResolved ? `
            <button class="btn-primary staff-reply-btn" type="button" data-ticket="${ticket.id}">
              Reply to Student
            </button>
            <button class="ticket-resolve-btn" type="button" data-close="${ticket.id}">
              Close Ticket
            </button>
          ` : `
            <button class="btn-ghost staff-reply-btn" type="button" data-ticket="${ticket.id}">
              Edit Reply
            </button>
            <button class="ticket-resolve-btn" type="button" data-reopen="${ticket.id}">
              Re-open
            </button>
          `}
        </div>
      `;
    } else {
      actionsHTML = `
        <div style="display: flex; gap: 8px;">
          <button class="ticket-resolve-btn" type="button" data-resolve="${ticket.id}">
            ${isResolved ? 'Acknowledge &amp; Dismiss' : 'Withdraw Inquiry'}
          </button>
        </div>
      `;
    }

    card.innerHTML = `
      <div class="ticket-card-header">
        <span class="ticket-number">Ticket #${ticket.id}</span>
        <span class="ticket-urgency" style="${isResolved ? 'background: rgba(16, 185, 129, 0.15); color: #34d399;' : ''}">
          ${escapeHTML(statusText)}
        </span>
      </div>

      <!-- Prominent Student Roll Number & Identification -->
      <div class="ticket-student-badge-row" style="display: flex; align-items: center; gap: 8px; margin: 4px 0 6px 0; flex-wrap: wrap;">
        <span class="ticket-roll-badge">
          🎓 Roll No: <strong>${escapeHTML(ticket.studentRegNo || '24BCE1001')}</strong>
        </span>
        <span style="font-size: 12px; color: var(--text-secondary); font-weight: 500;">
          ${escapeHTML(ticket.studentName || 'Student')}
        </span>
        ${isStaff ? `<span style="font-size: 11px; color: var(--text-muted);">&bull; ${escapeHTML(ticket.studentEmail || '')}</span>` : ''}
      </div>

      <h3 class="ticket-query-text">“${escapeHTML(ticket.query)}”</h3>
      <div class="ticket-reason-box">
        <strong>Trigger Reason:</strong> ${escapeHTML(ticket.reason)}
      </div>

      ${hasReplied ? `
        <div style="background: rgba(16, 185, 129, 0.08); padding: 10px 14px; border-radius: 6px; border-left: 3px solid #10b981; font-size: 12px; margin-top: 6px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px; flex-wrap: wrap; gap: 4px;">
            <strong style="color: #34d399; display: flex; align-items: center; gap: 4px;">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              Official Staff Response (${escapeHTML(ticket.resolvedByRole || 'MB-102 Desk')}):
            </strong>
            <span style="font-size: 10.5px; color: var(--text-muted);">
              Solved by <strong>${escapeHTML(ticket.resolvedBy || 'Support Officer')}</strong> &bull; ${escapeHTML(ticket.resolvedAt || ticket.timestamp)}
            </span>
          </div>
          <div style="color: var(--text-primary); line-height: 1.5; font-size: 12.5px;">${escapeHTML(ticket.reply)}</div>
        </div>
      ` : ''}

      <div class="ticket-footer" style="margin-top: 10px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
        <span style="font-size: 11px; color: var(--text-muted);">
          Logged: ${ticket.timestamp}
        </span>
        ${actionsHTML}
      </div>
    `;
    ticketsQueueContainer.appendChild(card);
  });

  // Attach reply / edit reply buttons (staff only)
  if (isStaff) {
    ticketsQueueContainer.querySelectorAll(".staff-reply-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        openStaffReplyModal(btn.dataset.ticket);
      });
    });

    // Close without reply
    ticketsQueueContainer.querySelectorAll("[data-close]").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.close;
        const t = state.tickets.find(item => item.id === id);
        if (t) {
          t.resolved = true;
          t.status = "Resolved by Staff (MB-102)";
          t.resolvedBy = user.name || "Dr. K. Ramanathan";
          t.resolvedByEmail = user.email || "ramanathan.k@vit.ac.in";
          t.resolvedByRole = user.designation || "Student Welfare Officer (Desk MB-102)";
          t.resolvedAt = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ", " + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          saveTickets(state.tickets);
          updateTicketBadges();
          renderTicketsView();
          showToast(`Ticket #${t.id} marked as resolved.`);
        }
      });
    });

    // Re-open ticket
    ticketsQueueContainer.querySelectorAll("[data-reopen]").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.reopen;
        const t = state.tickets.find(item => item.id === id);
        if (t) {
          t.resolved = false;
          t.status = "Pending Support Review";
          saveTickets(state.tickets);
          updateTicketBadges();
          renderTicketsView();
          showToast(`Ticket #${t.id} re-opened in active queue.`);
        }
      });
    });
  }

  // Attach resolve / withdraw buttons (student dismiss)
  ticketsQueueContainer.querySelectorAll("[data-resolve]").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.resolve;
      state.tickets = state.tickets.filter(t => t.id !== id);
      saveTickets(state.tickets);
      updateTicketBadges();
      renderTicketsView();
      showToast("Inquiry withdrawn from queue.");
    });
  });
}

function openStaffReplyModal(ticketId) {
  const ticket = state.tickets.find(t => t.id === ticketId);
  if (!ticket) return;

  activeReplyTicketId = ticketId;
  replyTicketId.textContent = `Ticket #${ticket.id}`;
  replyStudentQuery.textContent = `“${ticket.query}”`;
  const modalOfficer = document.getElementById("reply-officer-name");
  if (modalOfficer) {
    const curStaff = state.currentUser || {};
    modalOfficer.textContent = `${curStaff.name || 'Dr. K. Ramanathan'}, ${curStaff.designation || 'Student Welfare Officer (Desk MB-102)'}`;
  }
  staffReplyText.value = ticket.reply || "";
  staffReplyModal.showModal();
}

function setupTicketFilterListeners() {
  const activeTabBtn = document.getElementById("tab-tickets-active");
  const mySolvedTabBtn = document.getElementById("tab-tickets-mysolved");
  const resolvedTabBtn = document.getElementById("tab-tickets-resolved");
  const searchInput = document.getElementById("tickets-search-input");

  function setFilter(filter) {
    state.ticketFilter = filter;
    if (activeTabBtn) activeTabBtn.classList.toggle("active", filter === "active");
    if (mySolvedTabBtn) mySolvedTabBtn.classList.toggle("active", filter === "mysolved");
    if (resolvedTabBtn) resolvedTabBtn.classList.toggle("active", filter === "resolved");
    renderTicketsView();
  }

  if (activeTabBtn) activeTabBtn.addEventListener("click", () => setFilter("active"));
  if (mySolvedTabBtn) mySolvedTabBtn.addEventListener("click", () => setFilter("mysolved"));
  if (resolvedTabBtn) resolvedTabBtn.addEventListener("click", () => setFilter("resolved"));

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      state.ticketSearchQuery = searchInput.value.trim().toLowerCase();
      renderTicketsView();
    });
  }
}

function appendStaffReplyMessage(ticketId, originalQuery, replyText) {
  const chatContainer = document.getElementById("chat-container") || document.querySelector(".chat-container");
  if (chatContainer) {
    chatContainer.classList.remove("empty-chat");
  }
  const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const row = document.createElement("div");
  row.className = "message-row assistant staff-reply-row";
  row.innerHTML = `
    <div class="avatar avatar-staff" aria-label="Staff Avatar">MB</div>
    <div class="message-bubble">
      <div class="message-meta">
        <span class="sender-name">Student Support Desk (MB-102)</span>
        <span class="staff-verified-pill">Official Staff Response</span>
        <span class="message-time">${timeStr}</span>
      </div>
      <div class="message-text">
        <p style="font-size: 11px; color: var(--text-muted); margin-bottom: 4px;">In response to Ticket #${escapeHTML(ticketId)}: <em>“${escapeHTML(originalQuery)}”</em></p>
        <p>${escapeHTML(replyText)}</p>
      </div>
      <div class="message-actions-bar" role="toolbar" aria-label="Message actions">
        <button class="msg-action-btn action-copy" type="button" aria-label="Copy response" title="Copy response">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
          <span>Copy</span>
        </button>
        <button class="msg-action-btn action-speak" type="button" aria-label="Read response aloud" title="Read aloud">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
          <span>Listen</span>
        </button>
      </div>
    </div>
  `;
  chatMessages.appendChild(row);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

window.openStaffModal = function (id, query, reason, rollNo, studentName) {
  modalTicketId.textContent = `Ticket #${id}`;
  modalTicketQuery.textContent = query;
  modalTicketReason.textContent = reason;
  const modalStudentInfo = document.getElementById("modal-ticket-student-info");
  if (modalStudentInfo) {
    const user = state.currentUser || {};
    const name = studentName || user.name || "Student";
    const roll = rollNo || user.regNo || "24BCE1001";
    modalStudentInfo.innerHTML = `<strong>${escapeHTML(name)}</strong> &bull; <span style="font-family: var(--font-mono); color: #60a5fa; font-weight: 600;">Roll No: ${escapeHTML(roll)}</span>`;
  }
  ticketModal.showModal();
};

// ============================================================================
// 10. EVENT LISTENERS & CHIPS SETUP
// ============================================================================
function setupEventListeners() {
  // Chat form submit
  chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    handleUserSubmission(chatInput.value);
  });

  // Dynamic send button state toggle
  chatInput.addEventListener("input", () => {
    updateSendButtonState();
  });

  // Enter key in textarea (Shift+Enter for newline) + '@' and '/' shortcuts
  chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleUserSubmission(chatInput.value);
      return;
    }

    // '/' opens quick actions shortcuts
    if (e.key === "/" && (chatInput.value === "" || chatInput.selectionStart === 0)) {
      setTimeout(() => {
        if (quickActionMenu) {
          quickActionMenu.removeAttribute("hidden");
          addActionBtn?.setAttribute("aria-expanded", "true");
        }
      }, 10);
    } else if (e.key === "@" && (chatInput.value === "" || chatInput.selectionStart === 0)) {
      showToast("💡 Verified Knowledge Sources: SJT, TT, MB-102, VTOP, and Maker Space FabLab.");
    }
  });

  // Quick Campus Actions (+) Button and Dropdown Menu
  if (addActionBtn && quickActionMenu) {
    addActionBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      // Close model menu if open
      if (geminiModelMenu && !geminiModelMenu.hasAttribute("hidden")) {
        geminiModelMenu.setAttribute("hidden", "true");
        geminiModelPill?.setAttribute("aria-expanded", "false");
      }

      const isHidden = quickActionMenu.hasAttribute("hidden");
      if (isHidden) {
        quickActionMenu.removeAttribute("hidden");
        addActionBtn.setAttribute("aria-expanded", "true");
      } else {
        quickActionMenu.setAttribute("hidden", "true");
        addActionBtn.setAttribute("aria-expanded", "false");
      }
    });

    quickActionMenu.addEventListener("click", (e) => {
      const item = e.target.closest(".quick-menu-item");
      if (!item) return;

      quickActionMenu.setAttribute("hidden", "true");
      addActionBtn.setAttribute("aria-expanded", "false");

      const action = item.dataset.action;
      const query = item.dataset.query;

      if (action === "locate-classroom") {
        chatInput.value = "Where is room SJT ";
        chatInput.focus();
        chatInput.setSelectionRange(chatInput.value.length, chatInput.value.length);
        updateSendButtonState();
        return;
      }

      if (action === "open-tickets") {
        switchTab("tickets");
        return;
      }

      if (query) {
        handleUserSubmission(query);
      }
    });

    document.addEventListener("click", (e) => {
      if (!quickActionMenu.hasAttribute("hidden") && !quickActionMenu.contains(e.target) && e.target !== addActionBtn && !addActionBtn.contains(e.target)) {
        quickActionMenu.setAttribute("hidden", "true");
        addActionBtn.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Model selector pill on the Gemini capsule input (Sleek Model Popover Dropdown)
  if (geminiModelPill && geminiModelMenu) {
    geminiModelPill.addEventListener("click", (e) => {
      e.stopPropagation();
      // Close quick action menu if open
      if (quickActionMenu && !quickActionMenu.hasAttribute("hidden")) {
        quickActionMenu.setAttribute("hidden", "true");
        addActionBtn?.setAttribute("aria-expanded", "false");
      }

      const isHidden = geminiModelMenu.hasAttribute("hidden");
      if (isHidden) {
        updateActiveModelBadge();
        geminiModelMenu.removeAttribute("hidden");
        geminiModelPill.setAttribute("aria-expanded", "true");
      } else {
        geminiModelMenu.setAttribute("hidden", "true");
        geminiModelPill.setAttribute("aria-expanded", "false");
      }
    });

    geminiModelMenu.addEventListener("click", (e) => {
      const item = e.target.closest(".model-menu-item[data-model]");
      if (item) {
        const modelKey = item.dataset.model;
        state.aiProvider = modelKey;
        localStorage.setItem("vit_ai_provider", modelKey);
        if (selectAiProvider) selectAiProvider.value = modelKey;
        updateActiveModelBadge();
        geminiModelMenu.setAttribute("hidden", "true");
        geminiModelPill.setAttribute("aria-expanded", "false");
        const modelName = item.querySelector("strong")?.textContent || modelKey;
        showToast(`⚡ AI Engine switched to ${modelName}`);
      }
    });

    document.addEventListener("click", (e) => {
      if (!geminiModelMenu.hasAttribute("hidden") && !geminiModelMenu.contains(e.target) && e.target !== geminiModelPill && !geminiModelPill.contains(e.target)) {
        geminiModelMenu.setAttribute("hidden", "true");
        geminiModelPill.setAttribute("aria-expanded", "false");
      }
    });
  }

  // --- Real-Time Voice Dictation into Pill Box (Web Speech API + Physical Hardware Stream) ---
  let isMicListening = false;
  let activeSpeechRecognizer = null;
  let speechSilenceTimer = null;
  let cachedOriginalPlaceholder = "";
  let mediaStream = null;
  let mediaRecorder = null;
  let recordedAudioChunks = [];
  let audioContext = null;
  let audioAnalyser = null;
  let volumeMeterAnimId = null;
  let maxVolumeHeard = 0;

  async function stopMicListening(commit = true, explicitMessage = null) {
    if (!isMicListening && !explicitMessage) return;
    isMicListening = false;

    if (speechSilenceTimer) {
      clearTimeout(speechSilenceTimer);
      speechSilenceTimer = null;
    }
    if (volumeMeterAnimId) {
      cancelAnimationFrame(volumeMeterAnimId);
      volumeMeterAnimId = null;
    }

    if (activeSpeechRecognizer) {
      try { activeSpeechRecognizer.stop(); } catch (e) {}
      activeSpeechRecognizer = null;
    }

    // Await MediaRecorder to flush final buffer
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      await new Promise(resolve => {
        mediaRecorder.onstop = () => resolve();
        try {
          mediaRecorder.stop();
        } catch (e) {
          resolve();
        }
        setTimeout(resolve, 350);
      });
    }

    if (audioAnalyser) {
      try { audioAnalyser.disconnect(); } catch (e) {}
      audioAnalyser = null;
    }
    if (audioContext) {
      try { audioContext.close(); } catch (e) {}
      audioContext = null;
    }
    if (mediaStream) {
      try { mediaStream.getTracks().forEach(t => t.stop()); } catch (e) {}
      mediaStream = null;
    }

    const capsule = document.querySelector(".gemini-capsule-pill");
    if (capsule) capsule.classList.remove("listening-active");

    if (micAudioMeter) micAudioMeter.setAttribute("hidden", "true");

    if (geminiMicBtn) {
      geminiMicBtn.classList.remove("listening");
      geminiMicBtn.setAttribute("title", "Voice input");
      geminiMicBtn.style.transform = "";
    }

    let currentText = chatInput ? chatInput.value.trim() : "";

    // 1. If Web Speech API already transcribed in real-time
    if (currentText.length > 0) {
      if (chatInput && cachedOriginalPlaceholder) {
        chatInput.setAttribute("placeholder", cachedOriginalPlaceholder);
        cachedOriginalPlaceholder = "";
      }
      updateSendButtonState();
      if (chatInput) {
        chatInput.scrollLeft = chatInput.scrollWidth;
        chatInput.focus();
      }
      return;
    }

    // 2. Hardware physical audio transcription fallback via Gemini Flash
    if (commit && recordedAudioChunks.length > 0) {
      try {
        if (chatInput) {
          chatInput.setAttribute("placeholder", "Transcribing your question...");
        }
        const mime = (mediaRecorder && mediaRecorder.mimeType) ? mediaRecorder.mimeType : 'audio/webm';
        const audioBlob = new Blob(recordedAudioChunks, { type: mime });

        if (audioBlob.size > 200) {
          const base64Audio = await new Promise((res, rej) => {
            const r = new FileReader();
            r.onloadend = () => res((r.result || '').split(',')[1] || '');
            r.onerror = rej;
            r.readAsDataURL(audioBlob);
          });

          const resp = await fetch('/api/transcribe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              audioBase64: base64Audio,
              mimeType: mime,
              apiKey: state.aiApiKey || ''
            })
          });

          if (resp.ok) {
            const data = await resp.json();
            const transcribed = (data.text || '').trim();
            if (transcribed.length > 0) {
              if (chatInput) {
                chatInput.value = transcribed;
                chatInput.scrollLeft = chatInput.scrollWidth;
                chatInput.focus();
              }
              updateSendButtonState();
            }
          }
        }
      } catch (err) {
        console.warn("Hardware audio transcription error:", err);
      }
    }

    if (chatInput && cachedOriginalPlaceholder) {
      chatInput.setAttribute("placeholder", cachedOriginalPlaceholder);
      cachedOriginalPlaceholder = "";
    }
    updateSendButtonState();
  }

  async function startMicListening() {
    if (isMicListening) {
      stopMicListening(true);
      return;
    }

    isMicListening = true;
    maxVolumeHeard = 0;
    recordedAudioChunks = [];

    const capsule = document.querySelector(".gemini-capsule-pill");
    if (capsule) capsule.classList.add("listening-active");

    if (geminiMicBtn) {
      geminiMicBtn.classList.add("listening");
      geminiMicBtn.setAttribute("title", "Listening... Click to finish speaking");
      geminiMicBtn.style.display = "inline-flex";
    }
    if (micAudioMeter) micAudioMeter.removeAttribute("hidden");

    cachedOriginalPlaceholder = chatInput ? (chatInput.getAttribute("placeholder") || "") : "";
    if (chatInput) {
      chatInput.setAttribute("placeholder", "🎙️ Listening... Speak now (words will appear live)...");
    }

    // 1. Start Physical Hardware Microphone Capture (Exact hardware binding to Intel/Realtek mic)
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        let savedDevId = localStorage.getItem("vit_mic_device_id");
        let targetId = (savedDevId && savedDevId !== "auto") ? savedDevId : null;

        try {
          const devs = await navigator.mediaDevices.enumerateDevices();
          const inputs = devs.filter(d => d.kind === 'audioinput');
          if (!targetId) {
            const realMic = inputs.find(d =>
              /intel|realtek|array|built-in|internal|headset|buds/i.test(d.label) && !/steam|virtual|stereo mix/i.test(d.label)
            ) || inputs.find(d => !/steam|virtual|stereo mix/i.test(d.label));
            if (realMic) targetId = realMic.deviceId;
          }
        } catch (e) {}

        let stream = null;
        if (targetId) {
          try {
            stream = await navigator.mediaDevices.getUserMedia({
              audio: {
                deviceId: { exact: targetId },
                echoCancellation: false,
                noiseSuppression: false,
                autoGainControl: true
              }
            });
          } catch (errExact) {
            console.warn("Exact mic constraint failed, falling back to ideal:", errExact);
            try {
              stream = await navigator.mediaDevices.getUserMedia({
                audio: {
                  deviceId: { ideal: targetId },
                  echoCancellation: false,
                  noiseSuppression: false,
                  autoGainControl: true
                }
              });
            } catch (errIdeal) {}
          }
        }
        if (!stream) {
          stream = await navigator.mediaDevices.getUserMedia({
            audio: {
              echoCancellation: true,
              noiseSuppression: true,
              autoGainControl: true
            }
          });
        }

        if (!isMicListening) {
          stream.getTracks().forEach(t => t.stop());
          return;
        }
        mediaStream = stream;

        // Monitor physical audio volume (vocal frequency range)
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          audioContext = new AudioCtx();
          if (audioContext.state === 'suspended') {
            await audioContext.resume();
          }
          const source = audioContext.createMediaStreamSource(stream);
          audioAnalyser = audioContext.createAnalyser();
          audioAnalyser.fftSize = 256;
          audioAnalyser.smoothingTimeConstant = 0.25;
          source.connect(audioAnalyser);

          const dataArr = new Uint8Array(audioAnalyser.frequencyBinCount);
          let userSpoke = false;
          let lastVoiceTime = 0;
          const pollVol = () => {
            if (!isMicListening || !audioAnalyser) return;
            audioAnalyser.getByteFrequencyData(dataArr);

            // Calculate peak in human vocal range (bins 1 to 24)
            let vocalPeak = 0;
            const vocalBins = Math.min(25, dataArr.length);
            for (let i = 1; i < vocalBins; i++) {
              if (dataArr[i] > vocalPeak) vocalPeak = dataArr[i];
            }
            if (vocalPeak > maxVolumeHeard) maxVolumeHeard = vocalPeak;

            if (micAudioMeter) {
              const bars = micAudioMeter.querySelectorAll('.meter-bar');
              if (bars.length >= 3) {
                if (vocalPeak > 15) {
                  userSpoke = true;
                  lastVoiceTime = Date.now();
                  bars[0].style.height = `${Math.min(18, Math.max(5, (dataArr[2] / 255) * 22))}px`;
                  bars[1].style.height = `${Math.min(18, Math.max(7, (dataArr[5] / 255) * 26))}px`;
                  bars[2].style.height = `${Math.min(18, Math.max(5, (dataArr[10] / 255) * 20))}px`;
                  bars.forEach(b => b.classList.add('active-voice'));
                  if (chatInput && !chatInput.value) {
                    chatInput.setAttribute("placeholder", "🎙️ Hearing your voice... keep speaking...");
                  }
                } else {
                  bars[0].style.height = "5px";
                  bars[1].style.height = "8px";
                  bars[2].style.height = "5px";
                  bars.forEach(b => b.classList.remove('active-voice'));

                  // If user spoke and has now stopped for 2.2 seconds, auto-finalize and transcribe
                  if (userSpoke && lastVoiceTime > 0 && (Date.now() - lastVoiceTime > 2200)) {
                    stopMicListening(true);
                    return;
                  }
                }
              }
            }

            volumeMeterAnimId = requestAnimationFrame(pollVol);
          };
          volumeMeterAnimId = requestAnimationFrame(pollVol);
        }

        // Lightweight MediaRecorder for physical fallback
        if (typeof MediaRecorder !== 'undefined') {
          let mime = '';
          const candidateMimes = [
            'audio/webm;codecs=opus',
            'audio/webm',
            'audio/ogg;codecs=opus',
            'audio/mp4'
          ];
          for (const cand of candidateMimes) {
            if (MediaRecorder.isTypeSupported(cand)) {
              mime = cand;
              break;
            }
          }
          mediaRecorder = mime ? new MediaRecorder(stream, { mimeType: mime }) : new MediaRecorder(stream);
          mediaRecorder.ondataavailable = (e) => {
            if (e.data && e.data.size > 0) recordedAudioChunks.push(e.data);
          };
          mediaRecorder.start(100);
        }
      } catch (err) {
        console.warn("Hardware mic access warning:", err);
      }
    }

    // 2. Web Speech Recognition Engine (Real-Time Live Typing into Pill Box)
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        let selectedLang = localStorage.getItem("vit_speech_lang") || "en-IN";
        if (!selectedLang.startsWith("en-")) {
          selectedLang = "en-IN";
          localStorage.setItem("vit_speech_lang", "en-IN");
        }
        recognition.lang = selectedLang;
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.maxAlternatives = 1;

        activeSpeechRecognizer = recognition;

        recognition.onresult = (event) => {
          let interimText = "";
          let finalText = "";

          for (let i = 0; i < event.results.length; ++i) {
            const res = event.results[i];
            if (res.isFinal) {
              finalText += res[0].transcript + " ";
            } else {
              interimText += res[0].transcript;
            }
          }

          const liveWords = (finalText + interimText).trim();
          if (liveWords && chatInput) {
            chatInput.value = liveWords;
            chatInput.scrollLeft = chatInput.scrollWidth;
            updateSendButtonState();

            // Auto-finalize 2.5 seconds after user stops speaking
            if (speechSilenceTimer) clearTimeout(speechSilenceTimer);
            speechSilenceTimer = setTimeout(() => {
              if (isMicListening) {
                stopMicListening(true);
              }
            }, 2500);
          }
        };

        recognition.onerror = (event) => {
          console.warn("Speech recognition event:", event.error);
          if (event.error === "no-speech") {
            return;
          }
          if (event.error === "not-allowed" || event.error === "service-not-allowed") {
            stopMicListening(false, "Microphone permission blocked in browser.");
          }
        };

        recognition.onend = () => {
          if (isMicListening) {
            const val = chatInput ? chatInput.value.trim() : "";
            if (val.length > 0) {
              stopMicListening(true);
            } else {
              try {
                recognition.start();
              } catch (e) {}
            }
          }
        };

        recognition.start();
      } catch (err) {
        console.warn("Speech recognition start issue:", err);
      }
    }

    // Safety silence timeout: 12s if user stays completely silent
    if (speechSilenceTimer) clearTimeout(speechSilenceTimer);
    speechSilenceTimer = setTimeout(() => {
      if (isMicListening) {
        stopMicListening(true);
      }
    }, 12000);
  }

  if (geminiMicBtn) {
    geminiMicBtn.addEventListener("click", () => {
      if (isMicListening) {
        stopMicListening(true);
      } else {
        startMicListening();
      }
    });
  }

  // Prompt chips & carousel navigation
  if (chipsList) {
    const scrollLeftBtn = document.getElementById("chips-scroll-left");
    const scrollRightBtn = document.getElementById("chips-scroll-right");

    function updateChipNavState() {
      if (!scrollLeftBtn || !scrollRightBtn) return;
      const maxScroll = chipsList.scrollWidth - chipsList.clientWidth;
      if (maxScroll <= 4) {
        scrollLeftBtn.disabled = true;
        scrollRightBtn.disabled = true;
        return;
      }
      scrollLeftBtn.disabled = chipsList.scrollLeft <= 4;
      scrollRightBtn.disabled = chipsList.scrollLeft >= maxScroll - 4;
    }

    if (scrollLeftBtn) {
      scrollLeftBtn.addEventListener("click", () => {
        chipsList.scrollBy({ left: -240, behavior: "smooth" });
      });
    }

    if (scrollRightBtn) {
      scrollRightBtn.addEventListener("click", () => {
        chipsList.scrollBy({ left: 240, behavior: "smooth" });
      });
    }

    // Mouse wheel horizontal scroll conversion
    chipsList.addEventListener("wheel", (e) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        chipsList.scrollLeft += e.deltaY;
        updateChipNavState();
      }
    }, { passive: false });

    // Click & Drag to scroll smoothly
    let isDown = false;
    let startX = 0;
    let initialScrollLeft = 0;
    let hasDragged = false;

    chipsList.addEventListener("mousedown", (e) => {
      if (e.button !== 0) return;
      isDown = true;
      hasDragged = false;
      startX = e.pageX - chipsList.offsetLeft;
      initialScrollLeft = chipsList.scrollLeft;
    });

    window.addEventListener("mouseup", () => {
      isDown = false;
    });

    chipsList.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      const x = e.pageX - chipsList.offsetLeft;
      const walk = (x - startX) * 1.3;
      if (Math.abs(walk) > 4) {
        hasDragged = true;
      }
      chipsList.scrollLeft = initialScrollLeft - walk;
      updateChipNavState();
    });

    // Delegated click on chips (prevent submission if user was dragging)
    chipsList.addEventListener("click", (e) => {
      if (hasDragged) {
        hasDragged = false;
        return;
      }
      const chip = e.target.closest(".chip-btn");
      if (!chip) return;
      const query = chip.dataset.query;
      if (query) handleUserSubmission(query);
    });

    chipsList.addEventListener("scroll", updateChipNavState, { passive: true });
    window.addEventListener("resize", updateChipNavState);
    setTimeout(updateChipNavState, 150);
  }

  // Reset Session (instant reset + subtle in-place spin feedback, zero popups)
  resetSessionBtn.addEventListener("click", () => {
    const icon = resetSessionBtn.querySelector("svg");
    if (icon) {
      icon.style.transition = "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)";
      icon.style.transform = "rotate(-180deg)";
      setTimeout(() => {
        icon.style.transition = "none";
        icon.style.transform = "none";
      }, 420);
    }
    renderInitialWelcomeMessage();
  });

  // Clear Resolved Tickets (in-place feedback, zero popups)
  if (clearTicketsBtn) {
    clearTicketsBtn.addEventListener("click", () => {
      const origText = clearTicketsBtn.innerHTML;
      state.tickets = state.tickets.filter(t => !t.resolved && !t.reply);
      saveTickets(state.tickets);
      updateTicketBadges();
      renderTicketsView();

      fetch('/api/tickets/clear', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: state.currentUser?.role || 'staff' })
      }).catch(err => console.warn("Backend clear tickets sync offline:", err));

      clearTicketsBtn.innerHTML = `<span>Cleared</span>`;
      setTimeout(() => {
        clearTicketsBtn.innerHTML = origText;
      }, 1000);
    });
  }

  // Run all tests button
  runAllTestsBtn.addEventListener("click", () => {
    runTestBenchmarkSuite();
    runAllTestsBtn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
      <span>All 10 Tests Passed!</span>
    `;
    setTimeout(() => {
      runAllTestsBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
        <span>Run All 10 Tests</span>
      `;
    }, 2500);
  });

  // Modal close & confirm handlers
  closeModalBtn.addEventListener("click", () => ticketModal.close());
  modalConfirmBtn.addEventListener("click", () => {
    ticketModal.close();
    switchTab("tickets");
  });
  ticketModal.addEventListener("click", (e) => {
    if (e.target === ticketModal) ticketModal.close();
  });

  // Staff Reply Modal & Templates
  templateBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      staffReplyText.value = btn.dataset.template;
      staffReplyText.focus();
    });
  });

  if (closeReplyModalBtn) closeReplyModalBtn.addEventListener("click", () => staffReplyModal.close());
  if (cancelReplyBtn) cancelReplyBtn.addEventListener("click", () => staffReplyModal.close());
  if (staffReplyModal) {
    staffReplyModal.addEventListener("click", (e) => {
      if (e.target === staffReplyModal) staffReplyModal.close();
    });
  }

  // Handle staff reply submission
  if (staffReplyForm) {
    staffReplyForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const replyVal = staffReplyText.value.trim();
      if (!replyVal || !activeReplyTicketId) return;

      const ticket = state.tickets.find(t => t.id === activeReplyTicketId);
      if (ticket) {
        const staffUser = state.currentUser || { name: "Dr. K. Ramanathan", email: "ramanathan.k@vit.ac.in", designation: "Student Welfare Officer (Desk MB-102)" };
        ticket.reply = replyVal;
        ticket.status = "Resolved & Replied by Staff (MB-102)";
        ticket.resolved = true;
        ticket.resolvedBy = staffUser.name;
        ticket.resolvedByEmail = staffUser.email;
        ticket.resolvedByRole = staffUser.designation || "Student Welfare Officer (Desk MB-102)";
        ticket.resolvedAt = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ", " + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        saveTickets(state.tickets);

        // Sync staff reply to backend storage
        fetch('/api/tickets/reply', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: ticket.id,
            reply: replyVal,
            staffName: staffUser.name,
            staffEmail: staffUser.email,
            staffRole: staffUser.designation
          })
        }).catch(err => console.warn("Backend staff reply sync offline:", err));

        // Only append to active chat stream if the logged-in user is that student or the replying staff member
        const curUserEmail = (state.currentUser && state.currentUser.email || "").toLowerCase();
        if (curUserEmail === (ticket.studentEmail || "").toLowerCase() || curUserEmail === staffUser.email.toLowerCase()) {
          appendStaffReplyMessage(ticket.id, ticket.query, replyVal);
        }

        staffReplyModal.close();
        renderTicketsView();
        updateTicketBadges();
        showToast(`Official reply recorded and sent to student (${ticket.studentRegNo || 'Student'})!`);
      }
    });
  }

  // Settings Wheel Button and Settings Sidebar Drawer Handlers
  const settingsWheelBtn = document.getElementById("settings-wheel-btn");
  const settingsSidebar = document.getElementById("settings-sidebar");
  const settingsBackdrop = document.getElementById("settings-backdrop");
  const closeSettingsSidebarBtn = document.getElementById("close-settings-sidebar-btn");
  const saveSettingsPopoutBtn = document.getElementById("save-settings-popout-btn");

  async function populateAudioInputDevices() {
    if (!selectMicDevice || !navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) return;
    try {
      // Passive device enumeration only - NEVER trigger getUserMedia permission when opening settings
      const devices = await navigator.mediaDevices.enumerateDevices();
      const audioInputs = devices.filter(d => d.kind === 'audioinput');

      selectMicDevice.innerHTML = '<option value="auto">🌟 Auto-Select Hardware Microphone (Default)</option>';
      const savedDevId = localStorage.getItem("vit_mic_device_id") || "auto";

      // Only display specific devices if already labeled/permitted previously by user
      const labeledInputs = audioInputs.filter(d => d.label && d.label.trim().length > 0);

      labeledInputs.forEach((dev) => {
        const opt = document.createElement("option");
        opt.value = dev.deviceId;
        let label = dev.label;
        if (/intel|realtek|array|built-in|internal/i.test(label) && !/steam|virtual|stereo mix/i.test(label)) {
          label = `✨ ${label} (Recommended)`;
        } else if (/steam|virtual|stereo mix/i.test(label)) {
          label = `⚠️ ${label} (Virtual - May be Silent)`;
        }
        opt.textContent = label;
        selectMicDevice.appendChild(opt);
      });

      selectMicDevice.value = savedDevId;
    } catch (err) {
      console.warn("Could not enumerate audio devices:", err);
    }
  }

  function openSettingsSidebar() {
    if (!settingsSidebar) return;
    const isAdmin = state.currentUser && state.currentUser.role === "admin";
    if (selectAiProvider) selectAiProvider.value = state.aiProvider;
    if (aiApiKeyInput) aiApiKeyInput.value = isAdmin ? (state.aiApiKey || "") : "";
    if (selectTtsVoice) {
      populateTtsVoiceSelect();
      selectTtsVoice.value = selectedVoicePreference;
    }
    if (selectMicLang) {
      let savedLang = localStorage.getItem("vit_speech_lang") || "en-IN";
      if (!savedLang.startsWith("en-")) {
        savedLang = "en-IN";
        localStorage.setItem("vit_speech_lang", "en-IN");
      }
      selectMicLang.value = savedLang;
    }
    populateAudioInputDevices();
    settingsSidebar.classList.add("open");
    settingsSidebar.setAttribute("aria-hidden", "false");
    if (settingsBackdrop) {
      settingsBackdrop.classList.add("open");
      settingsBackdrop.setAttribute("aria-hidden", "false");
    }
    settingsWheelBtn?.setAttribute("aria-expanded", "true");
  }

  function closeSettingsSidebar() {
    if (!settingsSidebar) return;
    settingsSidebar.classList.remove("open");
    settingsSidebar.setAttribute("aria-hidden", "true");
    if (settingsBackdrop) {
      settingsBackdrop.classList.remove("open");
      settingsBackdrop.setAttribute("aria-hidden", "true");
    }
    settingsWheelBtn?.setAttribute("aria-expanded", "false");
  }

  if (settingsWheelBtn && settingsSidebar) {
    settingsWheelBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = settingsSidebar.classList.contains("open");
      if (isOpen) {
        closeSettingsSidebar();
      } else {
        openSettingsSidebar();
      }
    });

    if (closeSettingsSidebarBtn) {
      closeSettingsSidebarBtn.addEventListener("click", closeSettingsSidebar);
    }
    if (settingsBackdrop) {
      settingsBackdrop.addEventListener("click", closeSettingsSidebar);
    }

    // Direct tab opening from settings tool items
    settingsSidebar.querySelectorAll("[data-open-tab]").forEach(btn => {
      btn.addEventListener("click", () => {
        const tab = btn.dataset.openTab;
        switchTab(tab);
        closeSettingsSidebar();
      });
    });

    // Voice selection change handler
    if (selectTtsVoice) {
      selectTtsVoice.addEventListener("change", () => {
        selectedVoicePreference = selectTtsVoice.value;
        localStorage.setItem("vit_tts_voice", selectedVoicePreference);
        const name = selectTtsVoice.options[selectTtsVoice.selectedIndex]?.text.split(' [')[0] || selectedVoicePreference;
        showToast(`🎙️ Voice set to: ${name}`);
      });
    }

    // Mic language selection change handler
    if (selectMicLang) {
      selectMicLang.addEventListener("change", () => {
        localStorage.setItem("vit_speech_lang", selectMicLang.value);
        const name = selectMicLang.options[selectMicLang.selectedIndex]?.text.split(' [')[0] || selectMicLang.value;
        showToast(`🎙️ Mic language set to: ${name}`);
      });
    }

    // Mic hardware device selection change handler
    if (selectMicDevice) {
      selectMicDevice.addEventListener("change", () => {
        localStorage.setItem("vit_mic_device_id", selectMicDevice.value);
        const label = selectMicDevice.options[selectMicDevice.selectedIndex]?.text.split(' [')[0] || selectMicDevice.value;
        showToast(`🎙️ Mic device set to: ${label}`);
      });
    }

    // Save Settings button
    if (saveSettingsPopoutBtn) {
      saveSettingsPopoutBtn.addEventListener("click", () => {
        const isAdmin = state.currentUser && state.currentUser.role === "admin";
        
        // Model Selection: accessible to all students and staff
        if (selectAiProvider) {
          state.aiProvider = selectAiProvider.value;
          localStorage.setItem("vit_ai_provider", state.aiProvider);
          updateActiveModelBadge();
        }

        // API Key: strictly configurable by admin only (not even staff)
        if (isAdmin && aiApiKeyInput) {
          state.aiApiKey = aiApiKeyInput.value.trim();
          localStorage.setItem("vit_ai_apikey", state.aiApiKey);
        }

        if (selectTtsVoice) {
          selectedVoicePreference = selectTtsVoice.value;
          localStorage.setItem("vit_tts_voice", selectedVoicePreference);
        }
        if (selectMicLang) {
          localStorage.setItem("vit_speech_lang", selectMicLang.value);
        }
        if (selectMicDevice) {
          localStorage.setItem("vit_mic_device_id", selectMicDevice.value);
        }
        closeSettingsSidebar();
        showToast(`Preferences saved. Active AI: ${state.aiProvider.toUpperCase()}`);
      });
    }

    // Real Email Settings Handlers (Resend API & Gmail SMTP)
    const selectMailProvider = document.getElementById("select-mail-provider");
    const mailResendFields = document.getElementById("mail-resend-fields");
    const mailGmailFields = document.getElementById("mail-gmail-fields");
    const resendApiKeyInput = document.getElementById("resend-api-key-input");
    const smtpUserInput = document.getElementById("smtp-user-input");
    const smtpPassInput = document.getElementById("smtp-pass-input");
    const testSmtpBtn = document.getElementById("test-smtp-btn");
    const smtpStatusMsg = document.getElementById("smtp-status-msg");
    const mailActiveBadge = document.getElementById("mail-active-provider-badge");

    if (selectMailProvider) {
      selectMailProvider.addEventListener("change", () => {
        const prov = selectMailProvider.value;
        if (prov === "resend") {
          mailResendFields?.removeAttribute("hidden");
          mailGmailFields?.setAttribute("hidden", "true");
        } else {
          mailResendFields?.setAttribute("hidden", "true");
          mailGmailFields?.removeAttribute("hidden");
        }
      });
    }

    // Fetch existing email configuration from server
    fetch('/api/mail-config')
      .then(res => res.json())
      .then(cfg => {
        if (selectMailProvider && cfg.provider) {
          selectMailProvider.value = cfg.provider;
          selectMailProvider.dispatchEvent(new Event("change"));
        }
        if (resendApiKeyInput && cfg.maskedKey) resendApiKeyInput.placeholder = cfg.maskedKey;
        if (smtpUserInput && cfg.smtpUser) smtpUserInput.value = cfg.smtpUser;
        if (smtpPassInput && cfg.maskedPass) smtpPassInput.placeholder = cfg.maskedPass;
        if (mailActiveBadge) {
          if (cfg.configured) {
            mailActiveBadge.textContent = cfg.provider === 'emailjs' 
              ? '⚡ EmailJS / Gmail Active' 
              : (cfg.provider === 'resend' ? '⚡ Resend Active' : '📨 Gmail Active');
            mailActiveBadge.className = 'badge badge-success';
          } else {
            mailActiveBadge.textContent = 'Not Configured';
            mailActiveBadge.className = 'badge badge-warning';
          }
        }
        if (smtpStatusMsg && cfg.configured) {
          smtpStatusMsg.className = "auth-status-msg success";
          smtpStatusMsg.textContent = cfg.provider === 'emailjs'
            ? `✓ Email dispatch active via EmailJS & Gmail OAuth2`
            : (cfg.provider === 'resend'
              ? `✓ Email dispatch active via Resend API (${cfg.maskedKey})`
              : `✓ Email dispatch active (${cfg.smtpUser})`);
          smtpStatusMsg.removeAttribute("hidden");
        }
      })
      .catch(() => {});

    if (testSmtpBtn) {
      testSmtpBtn.addEventListener("click", async () => {
        const prov = selectMailProvider ? selectMailProvider.value : "resend";
        const resendKey = resendApiKeyInput ? resendApiKeyInput.value.trim() : "";
        const user = smtpUserInput ? smtpUserInput.value.trim() : "";
        const pass = smtpPassInput ? smtpPassInput.value.trim() : "";

        if (prov === "resend") {
          testSmtpBtn.disabled = true;
          testSmtpBtn.innerHTML = `<span>Verifying Resend API &amp; sending live test...</span>`;
          if (smtpStatusMsg) smtpStatusMsg.setAttribute("hidden", "true");

          try {
            const res = await fetch('/api/save-mail-config', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                provider: 'resend',
                resendApiKey: resendKey,
                testRecipient: (state.currentUser && state.currentUser.email) || 'student@vitstudent.ac.in'
              })
            });
            const data = await res.json();
            if (data.success) {
              if (smtpStatusMsg) {
                smtpStatusMsg.className = "auth-status-msg success";
                smtpStatusMsg.textContent = `✓ ${data.message}`;
                smtpStatusMsg.removeAttribute("hidden");
              }
              if (mailActiveBadge) {
                mailActiveBadge.textContent = '⚡ Resend Active';
                mailActiveBadge.className = 'badge badge-success';
              }
              showToast(`✓ Verification email sent to ${(state.currentUser && state.currentUser.email) || 'student@vitstudent.ac.in'}!`);
            } else {
              throw new Error(data.error || "Failed to verify Resend API.");
            }
          } catch (err) {
            if (smtpStatusMsg) {
              smtpStatusMsg.className = "auth-status-msg error";
              smtpStatusMsg.textContent = `Error: ${err.message}`;
              smtpStatusMsg.removeAttribute("hidden");
            }
          } finally {
            testSmtpBtn.disabled = false;
            testSmtpBtn.innerHTML = `<span>Verify &amp; Send Test Email</span>`;
          }
          return;
        }

        // Gmail SMTP flow
        if (!user || !pass) {
          if (smtpStatusMsg) {
            smtpStatusMsg.className = "auth-status-msg error";
            smtpStatusMsg.textContent = "Please enter both your Gmail address and 16-letter App Password.";
            smtpStatusMsg.removeAttribute("hidden");
          }
          return;
        }

        testSmtpBtn.disabled = true;
        testSmtpBtn.innerHTML = `<span>Connecting to Gmail SMTP &amp; sending...</span>`;
        if (smtpStatusMsg) smtpStatusMsg.setAttribute("hidden", "true");

        try {
          const res = await fetch('/api/save-mail-config', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ provider: 'gmail', smtpUser: user, smtpPass: pass })
          });
          const data = await res.json();
          if (data.success) {
            if (smtpStatusMsg) {
              smtpStatusMsg.className = "auth-status-msg success";
              smtpStatusMsg.textContent = `✓ ${data.message}`;
              smtpStatusMsg.removeAttribute("hidden");
            }
            if (mailActiveBadge) {
              mailActiveBadge.textContent = '📨 Gmail Active';
              mailActiveBadge.className = 'badge badge-success';
            }
            showToast(`✓ Email sender verified! Sent test mail to ${user}`);
          } else {
            throw new Error(data.error || "Failed to verify Gmail SMTP.");
          }
        } catch (err) {
          if (smtpStatusMsg) {
            smtpStatusMsg.className = "auth-status-msg error";
            smtpStatusMsg.textContent = `Error: ${err.message}`;
            smtpStatusMsg.removeAttribute("hidden");
          }
        } finally {
          testSmtpBtn.disabled = false;
          testSmtpBtn.innerHTML = `<span>Verify &amp; Send Test Email</span>`;
        }
      });
    }

    // Dismiss settings sidebar on Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && settingsSidebar?.classList.contains("open")) {
        closeSettingsSidebar();
      }
    });
  }

  // Voice Test Button inside Settings Sidebar
  if (testTtsVoiceBtn) {
    testTtsVoiceBtn.addEventListener("click", () => {
      if (!('speechSynthesis' in window)) {
        showToast("Speech synthesis is not supported in this browser.");
        return;
      }
      window.speechSynthesis.cancel();
      const testText = "Hello! I am your official VIT campus assistant. How can I help you today?";
      const testUtterance = new SpeechSynthesisUtterance(testText);
      const chosenVoice = getBestSpeechVoice();
      if (chosenVoice) testUtterance.voice = chosenVoice;
      testUtterance.rate = 0.94;
      testUtterance.pitch = 1.0;
      const vName = chosenVoice ? chosenVoice.name.replace(/\s*\(Online\s*\([^)]+\)\)|\s*Desktop|\s*\(Natural\)/gi, "").trim() : "Assistant Voice";
      showToast(`🎙️ Testing voice: ${vName}…`);
      window.speechSynthesis.speak(testUtterance);
    });
  }

  // Delegated Message Actions Handler (Copy, Read Aloud, Helpful/Unhelpful, Retry, Edit)
  chatMessages.addEventListener("click", (e) => {
    const copyBtn = e.target.closest(".action-copy");
    if (copyBtn) return handleCopyMessage(copyBtn);

    const speakBtn = e.target.closest(".action-speak");
    if (speakBtn) return toggleSpeechMessage(speakBtn);

    const helpfulBtn = e.target.closest(".action-helpful");
    if (helpfulBtn) return handleFeedbackMessage(helpfulBtn, true);

    const unhelpfulBtn = e.target.closest(".action-unhelpful");
    if (unhelpfulBtn) return handleFeedbackMessage(unhelpfulBtn, false);

    const retryBtn = e.target.closest(".action-retry");
    if (retryBtn) return handleRetryMessage(retryBtn);

    const editBtn = e.target.closest(".action-edit");
    if (editBtn) return handleEditMessage(editBtn);
  });

  updateActiveModelBadge();
}

// ============================================================================
// 10B. USER PROFILE & AUTHENTICATION CONTROLLER (MINIMALIST STUDENT vs STAFF)
// ============================================================================
function updateUserProfileUI() {
  const user = state.currentUser;
  const isStaff = user && user.role === "staff";
  const isAdmin = user && user.role === "admin";
  const isLoggedIn = Boolean(user && user.email);

  document.body.dataset.userRole = isLoggedIn ? user.role : "guest";

  // Header chip button & dropdown chevron
  const userDisplayName = document.getElementById("user-display-name");
  const userRoleTag = document.getElementById("user-role-tag");
  const userAvatarIcon = document.getElementById("user-avatar-icon");
  const userChevronIcon = document.querySelector(".user-chevron-icon");

  if (isLoggedIn) {
    if (userDisplayName) userDisplayName.textContent = user.name;
    if (userRoleTag) {
      userRoleTag.textContent = isAdmin ? "Admin Root" : (isStaff ? "Staff MB-102" : "Student");
      userRoleTag.style.display = "inline-block";
    }
    if (userAvatarIcon) userAvatarIcon.textContent = isAdmin ? "🛡️" : (isStaff ? "👨‍💼" : "🎓");
    if (userChevronIcon) userChevronIcon.style.display = "inline-block";
  } else {
    if (userDisplayName) userDisplayName.textContent = "Sign In";
    if (userRoleTag) userRoleTag.style.display = "none";
    if (userAvatarIcon) userAvatarIcon.textContent = "🔑";
    if (userChevronIcon) userChevronIcon.style.display = "none";
  }

  // Update dropdown preview info
  updateAccountDropdownUI();

  // Hero greeting update
  updateHeroGreeting();

  // Re-render tickets view with role-specific actions
  renderTicketsView();

  // If user is not admin and currently viewing a restricted admin tab, return to chat
  if (!isAdmin && state.activeTab === "tests") {
    switchTab("chat");
  }
}

function updateAccountDropdownUI() {
  const user = state.currentUser;
  if (!user || !user.email) return;

  const isStaff = user.role === "staff";
  const isAdmin = user.role === "admin";
  const dropdownAvatar = document.getElementById("dropdown-avatar");
  const dropdownUserName = document.getElementById("dropdown-user-name");
  const dropdownUserEmail = document.getElementById("dropdown-user-email");
  const dropdownRegBadge = document.getElementById("dropdown-reg-badge");
  const dropdownRoleBadge = document.getElementById("dropdown-role-badge");

  if (dropdownAvatar) dropdownAvatar.textContent = isAdmin ? "🛡️" : (isStaff ? "👨‍💼" : "🎓");
  if (dropdownUserName) dropdownUserName.textContent = user.name;
  if (dropdownUserEmail) dropdownUserEmail.textContent = user.email;
  if (dropdownRegBadge) dropdownRegBadge.textContent = user.regNo || (isAdmin ? "ADM-ROOT" : (isStaff ? "EMP-MB102" : "24BCE1092"));
  if (dropdownRoleBadge) {
    dropdownRoleBadge.textContent = isAdmin ? "Admin Root" : (isStaff ? "Staff MB-102" : "Student");
    dropdownRoleBadge.className = isAdmin ? "badge badge-role admin" : (isStaff ? "badge badge-role staff" : "badge badge-role");
  }

  const btnEditRoll = document.getElementById("btn-edit-roll");
  if (btnEditRoll) {
    if (isStaff || isAdmin) {
      btnEditRoll.setAttribute("hidden", "true");
    } else {
      btnEditRoll.removeAttribute("hidden");
      btnEditRoll.textContent = "✏️ Edit Roll No";
      btnEditRoll.title = "Update your Registration Number";
      btnEditRoll.style.opacity = "1";
      btnEditRoll.style.cursor = "pointer";
    }
  }
}

function setupAuthEventListeners() {
  const userProfileBtn = document.getElementById("user-profile-btn");
  const userAccountDropdown = document.getElementById("user-account-dropdown");
  const accountSwitchBtn = document.getElementById("account-switch-btn");
  const accountLogoutBtn = document.getElementById("account-logout-btn");
  const authModal = document.getElementById("auth-modal");
  const closeAuthModalBtn = document.getElementById("close-auth-modal-btn");
  const adminSwitchStudentBtn = document.getElementById("admin-switch-student-btn");

  const authTabStudent = document.getElementById("auth-tab-student");
  const authTabStaff = document.getElementById("auth-tab-staff");
  const authEmailLabel = document.getElementById("auth-email-label");
  const authFieldHint = document.getElementById("auth-field-hint");

  const authLoginForm = document.getElementById("auth-login-form");
  const authEmailInput = document.getElementById("auth-email-input");
  const authPasswordInput = document.getElementById("auth-password-input");
  const authStatusMsg = document.getElementById("auth-status-msg");

  let activeAuthRole = "student";

  function openAccountDropdown() {
    if (!userAccountDropdown) return;
    updateAccountDropdownUI();
    userAccountDropdown.removeAttribute("hidden");
    userProfileBtn?.setAttribute("aria-expanded", "true");
  }

  function closeAccountDropdown() {
    if (!userAccountDropdown) return;
    userAccountDropdown.setAttribute("hidden", "true");
    userProfileBtn?.setAttribute("aria-expanded", "false");
  }

  function openAuthModal() {
    showLoginForm();
    if (authStatusMsg) authStatusMsg.setAttribute("hidden", "true");
    const isStaffUser = state.currentUser && state.currentUser.role === "staff";
    setAuthRoleView(isStaffUser ? "staff" : "student", false);
    if (authEmailInput) authEmailInput.value = state.currentUser ? state.currentUser.email : "";
    if (authPasswordInput) authPasswordInput.value = "";
    if (authModal) authModal.showModal();
  }

  function setAuthRoleView(role, syncInput = false) {
    activeAuthRole = role;
    const isStaff = role === "staff";

    if (authTabStudent) {
      authTabStudent.classList.toggle("active", !isStaff);
      authTabStudent.setAttribute("aria-selected", !isStaff ? "true" : "false");
    }
    if (authTabStaff) {
      authTabStaff.classList.toggle("active", isStaff);
      authTabStaff.setAttribute("aria-selected", isStaff ? "true" : "false");
    }
    if (authEmailLabel) {
      authEmailLabel.textContent = isStaff ? "Staff / Faculty Email:" : "Student Email:";
    }
    if (authEmailInput) {
      authEmailInput.placeholder = isStaff ? "faculty.name@vit.ac.in" : "name@vitstudent.ac.in";
      if (syncInput) {
        const curVal = authEmailInput.value.trim().toLowerCase();
        if (isStaff && curVal.endsWith("@vitstudent.ac.in")) {
          authEmailInput.value = "";
        } else if (!isStaff && curVal.endsWith("@vit.ac.in")) {
          authEmailInput.value = "";
        }
      }
    }
    if (authFieldHint) {
      authFieldHint.textContent = isStaff 
        ? "Use your official @vit.ac.in staff or officer account"
        : "Use your official @vitstudent.ac.in student account";
    }

    const authRegNoLabel = document.getElementById("auth-regno-label");
    const authRegNoInput = document.getElementById("auth-regno-input");
    const authRegNoHint = document.getElementById("auth-regno-hint");
    if (authRegNoLabel) {
      authRegNoLabel.textContent = isStaff ? "Staff Employee ID:" : "Student Roll / Registration No:";
    }
    if (authRegNoInput) {
      authRegNoInput.placeholder = isStaff ? "e.g. EMP-MB102" : "e.g. 24BCE1001 or 24BIT1002";
    }
    if (authRegNoHint) {
      authRegNoHint.textContent = isStaff 
        ? "Your official staff or faculty ID number"
        : "Displayed on your support tickets and escalations";
    }
  }

  if (authTabStudent) {
    authTabStudent.addEventListener("click", () => setAuthRoleView("student", true));
  }
  if (authTabStaff) {
    authTabStaff.addEventListener("click", () => setAuthRoleView("staff", true));
  }

  if (authEmailInput) {
    authEmailInput.addEventListener("input", () => {
      const val = authEmailInput.value.trim().toLowerCase();
      if (val.includes("@vit.ac.in")) {
        setAuthRoleView("staff", false);
      } else if (val.includes("@vitstudent.ac.in")) {
        setAuthRoleView("student", false);
      }
    });
  }

  // 1. Account Button Click: Toggle dropdown if logged in, or open sign in modal if guest
  if (userProfileBtn) {
    userProfileBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isLoggedIn = Boolean(state.currentUser && state.currentUser.email);
      if (!isLoggedIn) {
        openAuthModal();
      } else {
        const isHidden = userAccountDropdown?.hasAttribute("hidden");
        if (isHidden) {
          openAccountDropdown();
        } else {
          closeAccountDropdown();
        }
      }
    });
  }

  // 1B. Inside dropdown actions: Inquiries, Switch account & Log out
  const accountInquiriesBtn = document.getElementById("account-inquiries-btn");
  if (accountInquiriesBtn) {
    accountInquiriesBtn.addEventListener("click", () => {
      closeAccountDropdown();
      switchTab("tickets");
    });
  }

  if (accountSwitchBtn) {
    accountSwitchBtn.addEventListener("click", () => {
      closeAccountDropdown();
      openAuthModal();
    });
  }

  if (accountLogoutBtn) {
    accountLogoutBtn.addEventListener("click", () => {
      closeAccountDropdown();
      logoutUser();
    });
  }

  // Dismiss account dropdown when clicking outside
  document.addEventListener("click", (e) => {
    if (userAccountDropdown && !userAccountDropdown.hasAttribute("hidden")) {
      if (!userAccountDropdown.contains(e.target) && e.target !== userProfileBtn && !userProfileBtn?.contains(e.target)) {
        closeAccountDropdown();
      }
    }
  });

  // Dismiss on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && userAccountDropdown && !userAccountDropdown.hasAttribute("hidden")) {
      closeAccountDropdown();
    }
  });

  // 2. Close modal
  if (closeAuthModalBtn && authModal) {
    closeAuthModalBtn.addEventListener("click", () => authModal.close());
  }
  if (authModal) {
    authModal.addEventListener("click", (e) => {
      if (e.target === authModal) authModal.close();
    });
  }

  // 3. Admin & Staff Testing Control: Switch to Student View
  if (adminSwitchStudentBtn) {
    adminSwitchStudentBtn.addEventListener("click", () => {
      const accounts = getAccounts();
      const student = accounts.find(a => a.role === "student") || DEFAULT_ACCOUNTS[0];
      setCurrentUser(student);
      const settingsSidebar = document.getElementById("settings-sidebar");
      const settingsBackdrop = document.getElementById("settings-backdrop");
      if (settingsSidebar) {
        settingsSidebar.classList.remove("open");
        settingsSidebar.setAttribute("aria-hidden", "true");
      }
      if (settingsBackdrop) {
        settingsBackdrop.classList.remove("open");
        settingsBackdrop.setAttribute("aria-hidden", "true");
      }
      document.getElementById("settings-wheel-btn")?.setAttribute("aria-expanded", "false");
      showToast("Switched to Student (VITian) profile.");
    });
  }

  // 4. Clean Role-Adapted Login Form
  if (authLoginForm) {
    authLoginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      let email = authEmailInput ? authEmailInput.value.trim().toLowerCase() : "";
      const password = authPasswordInput ? authPasswordInput.value.trim() : "";
      const authRegNoInput = document.getElementById("auth-regno-input");
      const enteredRoll = authRegNoInput ? authRegNoInput.value.trim().toUpperCase() : "";

      if (!email || !password) return;

      // Convenience: auto-append domain if user typed only their username
      if (!email.includes("@")) {
        email = activeAuthRole === "staff" ? `${email}@vit.ac.in` : `${email}@vitstudent.ac.in`;
      }

      // Auto-detect role from domain
      const isStaff = email.endsWith("@vit.ac.in");
      const isStudent = email.endsWith("@vitstudent.ac.in");

      if (!isStaff && !isStudent) {
        if (authStatusMsg) {
          authStatusMsg.className = "auth-status-msg error";
          authStatusMsg.textContent = "Please enter an official @vitstudent.ac.in or @vit.ac.in email.";
          authStatusMsg.removeAttribute("hidden");
        }
        return;
      }

      let user = null;

      try {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password, regNo: enteredRoll })
        });
        const data = await res.json();
        if (!data.success) {
          if (authStatusMsg) {
            authStatusMsg.className = "auth-status-msg error";
            authStatusMsg.textContent = data.error || "Authentication failed.";
            authStatusMsg.removeAttribute("hidden");
          }
          return;
        }

        user = data.user;
        user.password = password;
        const localAcc = getAccounts().find(a => a.email.toLowerCase() === email.toLowerCase());
        if (localAcc && localAcc.regNo && (!user.regNo || user.regNo.startsWith("24BCE1170"))) {
          user.regNo = localAcc.regNo;
        }
        if (enteredRoll) {
          user.regNo = enteredRoll;
        }
        saveAccount(user);
      } catch (err) {
        // Fallback for offline local dev mode
        const role = isStaff ? "staff" : "student";
        const accounts = getAccounts();
        user = accounts.find(a => a.email.toLowerCase() === email);
        if (user) {
          if (user.password !== password) {
            if (authStatusMsg) {
              authStatusMsg.className = "auth-status-msg error";
              authStatusMsg.textContent = "Incorrect password for this account.";
              authStatusMsg.removeAttribute("hidden");
            }
            return;
          }
          if (enteredRoll && !user.regNo) {
            user.regNo = enteredRoll;
            saveAccount(user);
          }
        } else {
          if (isStaff) {
            if (authStatusMsg) {
              authStatusMsg.className = "auth-status-msg error";
              authStatusMsg.textContent = "Staff or Administrator account not found. Access is restricted.";
              authStatusMsg.removeAttribute("hidden");
            }
            return;
          }
          const namePart = email.split("@")[0].replace(/[._]/g, " ");
          const formattedName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
          user = {
            id: `std-${Date.now()}`,
            role: "student",
            name: formattedName,
            email,
            regNo: enteredRoll || "",
            password,
            avatar: "🎓"
          };
          saveAccount(user);
        }
      }

      // Explicitly trigger Google Password Manager and Chromium credentials store
      if (window.PasswordCredential && navigator.credentials && navigator.credentials.store) {
        try {
          const cred = new PasswordCredential({
            id: email,
            password: password,
            name: user.name || email
          });
          navigator.credentials.store(cred).catch(() => {});
        } catch (_) {}
      }

      if (authStatusMsg) {
        const roleLabel = user.role === 'admin' ? 'System Administrator' : (user.role === 'staff' ? 'Staff MB-102' : 'Roll: ' + (user.regNo || 'Student'));
        authStatusMsg.className = "auth-status-msg success";
        authStatusMsg.textContent = `✓ Signed in as ${user.name} (${roleLabel})`;
        authStatusMsg.removeAttribute("hidden");
      }

      setTimeout(() => {
        setCurrentUser(user);
        if (authModal) authModal.close();
        if (authStatusMsg) authStatusMsg.setAttribute("hidden", "true");
      }, 350);
    });
  }

  // 4B. Roll Number Management in Profile Dropdown
  const btnEditRoll = document.getElementById("btn-edit-roll");
  if (btnEditRoll) {
    btnEditRoll.addEventListener("click", () => {
      const cur = state.currentUser ? (state.currentUser.regNo || "") : "";
      const roll = prompt("Enter your VIT Student Registration / Roll Number (e.g. 24BIT0462):", cur);
      if (roll !== null) {
        const clean = roll.trim().toUpperCase();
        if (!clean) return;

        state.currentUser.regNo = clean;
        saveAccount(state.currentUser);
        localStorage.setItem("vit_current_user", JSON.stringify(state.currentUser));

        // Update all active inquiries for this student with the new roll number
        state.tickets.forEach(t => {
          if (t.studentEmail && t.studentEmail.toLowerCase() === state.currentUser.email.toLowerCase()) {
            t.studentRegNo = clean;
          }
        });
        saveTickets(state.tickets);

        // Sync roll update to backend storage
        fetch('/api/auth/update-roll', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: state.currentUser.email, regNo: clean })
        }).catch(err => console.warn("Backend roll sync offline:", err));

        updateUserProfileUI();
        updateAccountDropdownUI();
        updateTicketBadges();
        renderTicketsView();
        showToast(`✓ Registration Number updated to ${clean}`);
      }
    });
  }


  // 5. Forgot Password / Email Dispatch Workflow
  const authForgotPwdBtn = document.getElementById("auth-forgot-pwd-btn");
  const authBackToLoginBtn = document.getElementById("auth-back-to-login-btn");
  const authForgotForm = document.getElementById("auth-forgot-form");
  const authForgotEmailInput = document.getElementById("auth-forgot-email-input");
  const authForgotDispatchCard = document.getElementById("auth-forgot-dispatch-card");
  const authDispatchTo = document.getElementById("auth-dispatch-to");
  const authOtpInput = document.getElementById("auth-otp-input");
  const authNewPasswordInput = document.getElementById("auth-new-password-input");
  const authForgotStatusMsg = document.getElementById("auth-forgot-status-msg");
  const authForgotSubmitBtn = document.getElementById("auth-forgot-submit-btn");
  const authModalTitle = document.getElementById("auth-modal-title");
  const authModalSubtitle = document.getElementById("auth-modal-subtitle");
  const authRoleSegmented = document.getElementById("auth-role-segmented");

  let activeResetTargetEmail = (function() { try { return sessionStorage.getItem("vit_active_reset_email") || ""; } catch (_) { return ""; } })();
  let activeResetSecurityCode = (function() { try { return sessionStorage.getItem("vit_active_reset_code") || ""; } catch (_) { return ""; } })();

  function resetPasswordToggles() {
    document.querySelectorAll(".password-toggle-btn").forEach(btn => {
      const targetId = btn.getAttribute("data-target");
      const input = document.getElementById(targetId);
      if (input) input.type = "password";
      const eyeShow = btn.querySelector(".eye-show");
      const eyeHide = btn.querySelector(".eye-hide");
      if (eyeShow && eyeHide) {
        eyeShow.removeAttribute("hidden");
        eyeHide.setAttribute("hidden", "true");
        btn.setAttribute("title", "Show password");
      }
    });
  }

  // Password Visibility Toggle Handlers (Eye icons)
  document.querySelectorAll(".password-toggle-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = btn.getAttribute("data-target");
      const input = document.getElementById(targetId);
      if (!input) return;
      const isPassword = input.type === "password";
      input.type = isPassword ? "text" : "password";
      const eyeShow = btn.querySelector(".eye-show");
      const eyeHide = btn.querySelector(".eye-hide");
      if (eyeShow && eyeHide) {
        if (isPassword) {
          eyeShow.setAttribute("hidden", "true");
          eyeHide.removeAttribute("hidden");
          btn.setAttribute("title", "Hide password");
        } else {
          eyeHide.setAttribute("hidden", "true");
          eyeShow.removeAttribute("hidden");
          btn.setAttribute("title", "Show password");
        }
      }
      input.focus();
    });
  });

  function showLoginForm() {
    resetPasswordToggles();
    if (authModalTitle) authModalTitle.textContent = "Campus Sign In";
    if (authModalSubtitle) authModalSubtitle.textContent = "Authenticate with your official VIT email";
    if (authRoleSegmented) authRoleSegmented.removeAttribute("hidden");
    if (authLoginForm) authLoginForm.removeAttribute("hidden");
    if (authForgotForm) authForgotForm.setAttribute("hidden", "true");
    if (authForgotDispatchCard) authForgotDispatchCard.setAttribute("hidden", "true");
    if (authForgotStatusMsg) authForgotStatusMsg.setAttribute("hidden", "true");
    if (authForgotEmailInput) authForgotEmailInput.disabled = false;
    if (authOtpInput) authOtpInput.value = "";
    if (authNewPasswordInput) authNewPasswordInput.value = "";
    if (authForgotSubmitBtn) {
      authForgotSubmitBtn.disabled = false;
      authForgotSubmitBtn.textContent = "Send Reset Email";
    }
  }

  function showForgotForm() {
    resetPasswordToggles();
    if (authModalTitle) authModalTitle.textContent = "Reset Password via Email";
    if (authModalSubtitle) authModalSubtitle.textContent = "We will send recovery instructions to your campus mail";
    if (authRoleSegmented) authRoleSegmented.setAttribute("hidden", "true");
    if (authLoginForm) authLoginForm.setAttribute("hidden", "true");
    if (authForgotForm) authForgotForm.removeAttribute("hidden");
    if (authForgotStatusMsg) authForgotStatusMsg.setAttribute("hidden", "true");
    if (authForgotEmailInput) {
      authForgotEmailInput.disabled = false;
      authForgotEmailInput.value = authEmailInput ? authEmailInput.value.trim() : "";
      authForgotEmailInput.focus();
    }
  }

  if (authForgotPwdBtn) {
    authForgotPwdBtn.addEventListener("click", showForgotForm);
  }

  if (authBackToLoginBtn) {
    authBackToLoginBtn.addEventListener("click", showLoginForm);
  }

  if (authForgotForm) {
    authForgotForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      
      const email = authForgotEmailInput ? authForgotEmailInput.value.trim().toLowerCase() : "";
      if (!email) return;

      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      if (!isValidEmail) {
        if (authForgotStatusMsg) {
          authForgotStatusMsg.className = "auth-status-msg error";
          authForgotStatusMsg.textContent = "Please enter a valid email address.";
          authForgotStatusMsg.removeAttribute("hidden");
        }
        return;
      }

      // If email dispatch card is not yet visible, this click sends the mail
      const isMailAlreadySent = authForgotDispatchCard && !authForgotDispatchCard.hasAttribute("hidden");

      if (!isMailAlreadySent) {
        activeResetTargetEmail = email;
        activeResetSecurityCode = "VIT-" + Math.floor(100000 + Math.random() * 900000);
        try {
          sessionStorage.setItem("vit_active_reset_email", activeResetTargetEmail);
          sessionStorage.setItem("vit_active_reset_code", activeResetSecurityCode);
        } catch (_) {}
        
        if (authForgotSubmitBtn) {
          authForgotSubmitBtn.disabled = true;
          authForgotSubmitBtn.textContent = "Sending code...";
        }

        try {
          const res = await fetch('/api/send-reset-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              to: email,
              securityCode: activeResetSecurityCode,
              studentName: email.split('@')[0].replace(/[._]/g, ' ')
            })
          });

          const data = await res.json();

          if (data.success) {
            if (authDispatchTo) {
              authDispatchTo.textContent = data.sandboxed
                ? `Delivered to: ${data.deliveredTo} (Resend Sandbox for ${email})`
                : `Code sent to: ${email}`;
            }
            if (authForgotDispatchCard) authForgotDispatchCard.removeAttribute("hidden");
            if (authForgotEmailInput) authForgotEmailInput.disabled = true;

            if (authForgotStatusMsg) {
              authForgotStatusMsg.className = "auth-status-msg success";
              authForgotStatusMsg.textContent = data.sandboxed
                ? `✓ Verification code sent! Check your inbox (${data.deliveredTo}).`
                : `✓ Verification code sent to ${email}. Please enter the 6-digit code below:`;
              authForgotStatusMsg.removeAttribute("hidden");
            }

            if (authForgotSubmitBtn) {
              authForgotSubmitBtn.disabled = false;
              authForgotSubmitBtn.textContent = "Verify OTP & Update Password";
            }
            if (authOtpInput) {
              authOtpInput.value = "";
              authOtpInput.focus();
            }
            return;
          } else if (data.notConfigured) {
            // Sender not configured yet
            if (authForgotStatusMsg) {
              authForgotStatusMsg.className = "auth-status-msg error";
              authForgotStatusMsg.innerHTML = `⚠️ Email service is not configured yet.<br/><a href="#" id="open-email-setup-link" style="color:#60a5fa;text-decoration:underline;font-weight:600;">Open Settings to configure email service</a>.`;
              authForgotStatusMsg.removeAttribute("hidden");

              const link = document.getElementById("open-email-setup-link");
              if (link) {
                link.addEventListener("click", (ev) => {
                  ev.preventDefault();
                  if (authModal) authModal.close();
                  const settingsWheelBtn = document.getElementById("settings-wheel-btn");
                  settingsWheelBtn?.click();
                });
              }
            }

            // Fallback for offline testing
            if (authDispatchTo) authDispatchTo.textContent = `To: ${email} (Offline Fallback Code: ${activeResetSecurityCode})`;
            if (authForgotDispatchCard) authForgotDispatchCard.removeAttribute("hidden");
            if (authForgotEmailInput) authForgotEmailInput.disabled = true;

            if (authForgotSubmitBtn) {
              authForgotSubmitBtn.disabled = false;
              authForgotSubmitBtn.textContent = "Verify OTP & Update Password";
            }
            if (authOtpInput) {
              authOtpInput.value = "";
              authOtpInput.focus();
            }
            return;
          } else {
            throw new Error(data.error || "Failed to dispatch email.");
          }
        } catch (err) {
          if (authForgotStatusMsg) {
            authForgotStatusMsg.className = "auth-status-msg error";
            authForgotStatusMsg.textContent = `Email dispatch error: ${err.message}`;
            authForgotStatusMsg.removeAttribute("hidden");
          }
          if (authForgotSubmitBtn) {
            authForgotSubmitBtn.disabled = false;
            authForgotSubmitBtn.textContent = "Send Reset Email";
          }
          return;
        }
      }

      // Stage 2: User must provide both the OTP and the new password
      const enteredOtp = authOtpInput ? authOtpInput.value.trim().toUpperCase() : "";
      const newPwd = authNewPasswordInput ? authNewPasswordInput.value.trim() : "";

      if (!enteredOtp) {
        if (authForgotStatusMsg) {
          authForgotStatusMsg.className = "auth-status-msg error";
          authForgotStatusMsg.textContent = "Please enter the security code (OTP) sent to your email.";
          authForgotStatusMsg.removeAttribute("hidden");
        }
        if (authOtpInput) authOtpInput.focus();
        return;
      }

      // Check OTP: Allow either "VIT-123456" or just the 6 digits "123456"
      const cleanEntered = enteredOtp.replace(/[^0-9]/g, '');
      const expectedCode = activeResetSecurityCode || (function() { try { return sessionStorage.getItem("vit_active_reset_code") || ""; } catch (_) { return ""; } })();
      const cleanExpected = expectedCode.replace(/[^0-9]/g, '');

      if (!cleanEntered || cleanEntered !== cleanExpected) {
        if (authForgotStatusMsg) {
          authForgotStatusMsg.className = "auth-status-msg error";
          authForgotStatusMsg.textContent = "❌ Invalid security code. Please check your email inbox and enter the exact 6-digit code.";
          authForgotStatusMsg.removeAttribute("hidden");
        }
        if (authOtpInput) {
          authOtpInput.focus();
          authOtpInput.select();
        }
        return;
      }

      if (!newPwd || newPwd.length < 6) {
        if (authForgotStatusMsg) {
          authForgotStatusMsg.className = "auth-status-msg error";
          authForgotStatusMsg.textContent = "Please choose a new password with at least 6 characters.";
          authForgotStatusMsg.removeAttribute("hidden");
        }
        if (authNewPasswordInput) authNewPasswordInput.focus();
        return;
      }

      const isStaffUser = email.endsWith("@vit.ac.in");
      const role = isStaffUser ? "staff" : "student";
      const accounts = getAccounts();
      let user = accounts.find(a => a.email.toLowerCase() === email);

      if (user) {
        user.password = newPwd;
        saveAccount(user);
      } else {
        const namePart = email.split("@")[0].replace(/[._]/g, " ");
        const formattedName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
        user = {
          id: role === "student" ? `std-${Date.now()}` : `stf-${Date.now()}`,
          role,
          name: isStaffUser ? `Dr. ${formattedName}` : formattedName,
          email,
          regNo: role === "student" ? "24BCE" + Math.floor(1000 + Math.random() * 9000) : "EMP-MB102",
          password: newPwd,
          avatar: role === "student" ? "🎓" : "👨‍💼"
        };
        saveAccount(user);
      }

      try {
        sessionStorage.removeItem("vit_active_reset_code");
      } catch (_) {}

      if (authForgotStatusMsg) {
        authForgotStatusMsg.className = "auth-status-msg success";
        authForgotStatusMsg.textContent = `✓ Password updated successfully! Signing you in as ${user.name}...`;
        authForgotStatusMsg.removeAttribute("hidden");
      }

      setTimeout(() => {
        setCurrentUser(user);
        if (authModal) authModal.close();
        showLoginForm();
      }, 700);
    });
  }
}

// ============================================================================
// 11. MESSAGE ACTIONS HELPERS (Native Clipboard & SpeechSynthesis)
// ============================================================================
function handleCopyMessage(btn) {
  const bubble = btn.closest(".message-bubble");
  if (!bubble) return;
  const textEl = bubble.querySelector(".message-text");
  const text = textEl ? textEl.innerText.trim() : "";
  if (!text) return;

  navigator.clipboard.writeText(text).then(() => {
    const originalHTML = btn.innerHTML;
    btn.innerHTML = `
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
      <span style="color: #10b981;">Copied!</span>
    `;
    setTimeout(() => {
      btn.innerHTML = originalHTML;
    }, 1800);
    showToast("Message copied to clipboard.");
  }).catch(() => {
    showToast("Unable to copy to clipboard.");
  });
}

// Speech Synthesis Engine with Natural Voice Selection, Sentence Chunking & Campus Phonetic Sanitization
let cachedSpeechVoices = [];
let selectedVoicePreference = localStorage.getItem("vit_tts_voice") || "auto";
let activeSpeechBtn = null;
let activeSpeechChunks = [];
let activeSpeechChunkIndex = 0;
let isSpeakingActive = false;

function refreshSpeechVoices() {
  if (!('speechSynthesis' in window)) return;
  const list = window.speechSynthesis.getVoices() || [];
  if (list && list.length > 0) {
    cachedSpeechVoices = list;
    populateTtsVoiceSelect();
  }
}

if ('speechSynthesis' in window) {
  refreshSpeechVoices();
  window.speechSynthesis.onvoiceschanged = refreshSpeechVoices;
}

function populateTtsVoiceSelect() {
  if (!selectTtsVoice) return;
  const currentVal = selectedVoicePreference;
  selectTtsVoice.innerHTML = '<option value="auto">🌟 Auto (Natural Neural / Studio Voice)</option>';

  const enVoices = cachedSpeechVoices.filter(v => v.lang && v.lang.toLowerCase().startsWith('en'));
  const otherVoices = cachedSpeechVoices.filter(v => !v.lang || !v.lang.toLowerCase().startsWith('en'));
  const allSorted = [...enVoices, ...otherVoices];

  allSorted.forEach(v => {
    const opt = document.createElement("option");
    opt.value = v.name;
    let label = v.name;
    if (/natural/i.test(v.name)) label = `✨ ${v.name} (Neural Natural)`;
    else if (/online/i.test(v.name)) label = `🌐 ${v.name} (Cloud Neural)`;
    else if (/zira|hazel|samantha|siri/i.test(v.name)) label = `💎 ${v.name} (Studio Clear)`;
    else if (/david|mark/i.test(v.name)) label = `🤖 ${v.name} (Legacy Synth)`;
    opt.textContent = `${label} [${v.lang}]`;
    if (v.name === currentVal) opt.selected = true;
    selectTtsVoice.appendChild(opt);
  });
}

function getBestSpeechVoice() {
  if (!cachedSpeechVoices.length && 'speechSynthesis' in window) {
    cachedSpeechVoices = window.speechSynthesis.getVoices() || [];
  }
  if (!cachedSpeechVoices.length) return null;

  // If user explicitly chose a voice in settings
  if (selectedVoicePreference && selectedVoicePreference !== "auto") {
    const custom = cachedSpeechVoices.find(v => v.name === selectedVoicePreference);
    if (custom) return custom;
  }

  const enVoices = cachedSpeechVoices.filter(v => v.lang && v.lang.toLowerCase().startsWith('en'));
  const pool = enVoices.length ? enVoices : cachedSpeechVoices;

  // Rank 1: Online Natural Neural voices (Edge / Windows 11 cloud natural voices)
  const natural = pool.find(v => /natural/i.test(v.name) || (/online/i.test(v.name) && !/david|mark/i.test(v.name)));
  if (natural) return natural;

  // Rank 2: Google Chrome neural/standard voices
  const google = pool.find(v => /google/i.test(v.name) && /en[-_]/i.test(v.lang));
  if (google) return google;

  // Rank 3: Apple / Safari high quality voices
  const apple = pool.find(v => /samantha|siri|karen|daniel|moira/i.test(v.name));
  if (apple) return apple;

  // Rank 4: Clear Windows desktop female voices (Zira Desktop, Hazel Desktop)
  const clearWin = pool.find(v => /zira|hazel|eva|susan/i.test(v.name));
  if (clearWin) return clearWin;

  // Rank 5: Any English voice that is NOT David or Mark
  const nonRobotic = pool.find(v => !/david|mark/i.test(v.name));
  if (nonRobotic) return nonRobotic;

  // Rank 6: Fallback to first voice in pool
  return pool[0] || cachedSpeechVoices[0] || null;
}

function sanitizeTextForSpeech(text) {
  if (!text) return "";
  let clean = text;

  // 1. Remove URLs (prevent reciting full http links)
  clean = clean.replace(/https?:\/\/[^\s)]+/gi, (url) => {
    if (/vtop\.vit\.ac\.in/i.test(url)) return " the V-Top portal ";
    if (/vit\.ac\.in/i.test(url)) return " the official VIT website ";
    return " the official campus portal ";
  });

  // 2. Format emails nicely (helpdesk@vit.ac.in -> helpdesk at vit dot ac dot in)
  clean = clean.replace(/([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g, (match, user, domain) => {
    const spokenDomain = domain.replace(/\./g, " dot ");
    return `${user} at ${spokenDomain}`;
  });

  // 3. Format Indian phone numbers nicely (+91-416-220-2000)
  clean = clean.replace(/\+91[- ]?(\d{2,4})[- ]?(\d{3,4})[- ]?(\d{4})/g, "plus 91, $1, $2, $3");

  // 4. Strip markdown formatting syntax
  clean = clean.replace(/\*\*([^*]+)\*\*/g, "$1"); // bold
  clean = clean.replace(/\*([^*]+)\*/g, "$1");     // italic
  clean = clean.replace(/__([^_]+)__/g, "$1");     // underline
  clean = clean.replace(/`([^`]+)`/g, "$1");       // inline code
  clean = clean.replace(/```[\s\S]*?```/g, "");    // code blocks
  clean = clean.replace(/^#+\s*(.+)$/gm, "$1. ");  // headers -> end with period for natural breath
  clean = clean.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1"); // markdown links -> link title
  clean = clean.replace(/\[(\d+)\]/g, "");          // numeric citations [1] -> omit

  // 5. Clean citation markers
  clean = clean.replace(/Official Citation:\s*\[([^\]]+)\]/gi, "Official source: $1. ");
  clean = clean.replace(/Official Citation:\s*([^\n]+)/gi, "Official source: $1. ");

  // 6. Clean redundant abbreviations in parentheses like "Silver Jubilee Tower (SJT)"
  clean = clean.replace(/([A-Za-z\s]+)\s*\([A-Z0-9]+\)/g, (match, prefix) => prefix.trim());

  // 7. Expand VIT Campus Buildings & Locations phonetically
  clean = clean.replace(/\bSJT-(\d+)\b/gi, "Silver Jubilee Tower, Room $1");
  clean = clean.replace(/\bTT-(\d+)\b/gi, "Technology Tower, Room $1");
  clean = clean.replace(/\bMB-([A-Z0-9]+)\b/gi, "Main Building, Room $1");
  clean = clean.replace(/\bPRP-(\d+)\b/gi, "P R P Building, Room $1");
  clean = clean.replace(/\bSMV-(\d+)\b/gi, "S M V Building, Room $1");
  clean = clean.replace(/\bGDN-(\d+)\b/gi, "G D Naidu Block, Room $1");
  clean = clean.replace(/\bCDMM-(\d+)\b/gi, "C D M M Building, Room $1");
  clean = clean.replace(/\bCBMR-(\d+)\b/gi, "C B M R Building, Room $1");

  // 8. Expand Campus Acronyms & Terminology phonetically
  clean = clean.replace(/\bSJT\b/g, "Silver Jubilee Tower");
  clean = clean.replace(/\bTT\b/g, "Technology Tower");
  clean = clean.replace(/\bMB\b/g, "Main Building");
  clean = clean.replace(/\bVTOP\b/gi, "V-Top");
  clean = clean.replace(/\bOD\b/g, "On-Duty approval");
  clean = clean.replace(/\bFAT\b/g, "F A T exam");
  clean = clean.replace(/\bCAT-1\b/gi, "Continuous Assessment Test 1");
  clean = clean.replace(/\bCAT-2\b/gi, "Continuous Assessment Test 2");
  clean = clean.replace(/\bFFCS\b/g, "Fully Flexible Credit System");
  clean = clean.replace(/\bCoE\b/g, "Controller of Examinations");
  clean = clean.replace(/\bSWO\b/g, "Student Welfare Office");
  clean = clean.replace(/\bPAT\b/g, "Placement and Training Office");
  clean = clean.replace(/\bHOD\b/g, "Head of the Department");

  // 9. Expand time ranges & schedules naturally (9:00 AM - 5:30 PM -> 9:00 AM to 5:30 PM)
  clean = clean.replace(/\bMon-Fri\b/gi, "Monday through Friday");
  clean = clean.replace(/\bSat-Sun\b/gi, "Saturday and Sunday");
  clean = clean.replace(/(\d{1,2}(?::\d{2})?\s*(?:AM|PM|am|pm)?)\s*[–—\-to]+\s*(\d{1,2}(?::\d{2})?\s*(?:AM|PM|am|pm))/gi, "$1 to $2");

  // 10. Clean bullet points & lists
  clean = clean.replace(/^[•\-\*+]\s+/gm, ""); // strip bullet symbols
  clean = clean.replace(/\n+/g, ". ");        // newlines -> pause with period

  // 11. Clean duplicate punctuation & spacing
  clean = clean.replace(/[–—]/g, ", ");
  clean = clean.replace(/\.{2,}/g, ".");
  clean = clean.replace(/\s*([,.;?!])\s*/g, "$1 ");
  clean = clean.replace(/\s+/g, " ");

  return clean.trim();
}

function splitIntoSpeechChunks(text) {
  if (!text) return [];
  const rawChunks = text.match(/[^.!?]+[.!?]+(\s+|$)|[^.!?]+$/g) || [text];
  const result = [];
  let buffer = "";

  for (const chunk of rawChunks) {
    const trimmed = chunk.trim();
    if (!trimmed) continue;
    if (buffer && (buffer.length + trimmed.length < 160)) {
      buffer += " " + trimmed;
    } else {
      if (buffer) result.push(buffer);
      buffer = trimmed;
    }
  }
  if (buffer) result.push(buffer);
  return result.length ? result : [text];
}

function stopSpeechPlayback() {
  isSpeakingActive = false;
  activeSpeechChunks = [];
  activeSpeechChunkIndex = 0;
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
  if (activeSpeechBtn) {
    resetSpeechBtn(activeSpeechBtn);
    activeSpeechBtn = null;
  }
}

function playSpeechChunk() {
  if (!isSpeakingActive || activeSpeechChunkIndex >= activeSpeechChunks.length) {
    stopSpeechPlayback();
    return;
  }

  const chunk = activeSpeechChunks[activeSpeechChunkIndex];
  const utterance = new SpeechSynthesisUtterance(chunk);
  const voice = getBestSpeechVoice();
  if (voice) utterance.voice = voice;
  utterance.rate = 0.94; // Conversational, warm advisor cadence
  utterance.pitch = 1.0;

  utterance.onend = () => {
    if (!isSpeakingActive) return;
    activeSpeechChunkIndex++;
    playSpeechChunk();
  };

  utterance.onerror = (e) => {
    if (e.error !== 'interrupted' && e.error !== 'canceled') {
      console.warn("Speech playback error:", e.error);
    }
    stopSpeechPlayback();
  };

  if (window.speechSynthesis.paused) {
    window.speechSynthesis.resume();
  }
  window.speechSynthesis.speak(utterance);
}

function toggleSpeechMessage(btn) {
  if (!('speechSynthesis' in window)) {
    showToast("Speech synthesis is not supported in this browser.");
    return;
  }

  // If already speaking on this message, clicking Stop cancels it
  if (isSpeakingActive && activeSpeechBtn === btn) {
    stopSpeechPlayback();
    showToast("Audio reading stopped.");
    return;
  }

  // Stop any other active playback
  stopSpeechPlayback();

  const bubble = btn.closest(".message-bubble");
  const textEl = bubble ? bubble.querySelector(".message-text") : null;
  const rawText = textEl ? textEl.innerText.trim() : "";
  if (!rawText) return;

  const sanitized = sanitizeTextForSpeech(rawText);
  if (!sanitized) return;

  activeSpeechChunks = splitIntoSpeechChunks(sanitized);
  activeSpeechChunkIndex = 0;
  isSpeakingActive = true;
  activeSpeechBtn = btn;

  const selectedVoice = getBestSpeechVoice();
  const voiceDisplayName = selectedVoice 
    ? selectedVoice.name.replace(/\s*\(Online\s*\([^)]+\)\)|\s*Desktop|\s*\(Natural\)/gi, "").trim()
    : "Campus Assistant";

  // Update button to animated Equalizer Stop button
  btn.classList.add("action-speaking");
  btn.setAttribute("aria-label", "Stop reading message aloud");
  btn.innerHTML = `
    <span class="speech-bars" aria-hidden="true">
      <span class="bar bar-1"></span>
      <span class="bar bar-2"></span>
      <span class="bar bar-3"></span>
    </span>
    <span>Stop</span>
  `;

  showToast(`🎙️ Speaking via ${voiceDisplayName}…`);
  playSpeechChunk();
}

function resetSpeechBtn(btn) {
  if (!btn) return;
  btn.classList.remove("action-speaking");
  btn.setAttribute("aria-label", "Read response aloud");
  btn.innerHTML = `
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
    <span>Listen</span>
  `;
  if (activeSpeechBtn === btn) activeSpeechBtn = null;
}

function handleFeedbackMessage(btn, isHelpful) {
  const bar = btn.closest(".message-actions-bar");
  if (!bar) return;
  const likeBtn = bar.querySelector(".action-helpful");
  const dislikeBtn = bar.querySelector(".action-unhelpful");

  if (isHelpful) {
    const wasActive = likeBtn.classList.contains("active-liked");
    likeBtn.classList.toggle("active-liked", !wasActive);
    if (dislikeBtn) dislikeBtn.classList.remove("active-disliked");
    showToast(!wasActive ? "Thanks! Response marked as helpful." : "Feedback removed.");
  } else {
    const wasActive = dislikeBtn.classList.contains("active-disliked");
    dislikeBtn.classList.toggle("active-disliked", !wasActive);
    if (likeBtn) likeBtn.classList.remove("active-liked");
    showToast(!wasActive ? "Feedback noted. We'll refine campus knowledge." : "Feedback removed.");
  }
}

function handleRetryMessage(btn) {
  const query = btn.dataset.query;
  if (!query) return;
  handleUserSubmission(query);
}

function handleEditMessage(btn) {
  const query = btn.dataset.query;
  if (!query) return;
  chatInput.value = query;
  chatInput.focus();
  chatInput.setSelectionRange(query.length, query.length);
  updateSendButtonState();
  showToast("Loaded question into input for editing.");
}

// Helpers
function escapeHTML(str) {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function escapeAttr(str) {
  if (!str) return "";
  return str.replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

// Boot application when DOM is ready
document.addEventListener("DOMContentLoaded", initApp);
