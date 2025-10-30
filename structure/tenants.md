
### 2.1 Tenants List Page (`/tenants`)
1. Page Header
    1. Title: "Tenants"
    2. Action Buttons
        1. "+ Add Tenant"
        2. "Application Requests" (with badge count)
2. Search & Filters Bar
    1. Search Input (name, email, phone, unit)
    2. Filter Dropdown: Status (All, Active, Pending, Former)
    3. Filter Dropdown: Property
    4. Filter Dropdown: Lease Status (Active, Expiring Soon, Expired)
    5. Sort Dropdown (Name, Move-in Date, Rent Amount)
3. Tenants Table
    1. Tenant Row
        1. Tenant Avatar/Photo
        2. Tenant Name
        3. Email
        4. Phone
        5. Unit/Property
        6. Lease End Date
        7. Rent Amount
        8. Payment Status Badge (Current, Late, Outstanding)
        9. Actions Menu
            1. View Details
            2. Send Message
            3. View Lease
            4. Process Payment
            5. Edit Tenant
4. Pagination Controls

### 2.2 Tenant Detail Page (`/tenants/:id`)
1. Page Header
    1. Back Button (← Back to Tenants)
    2. Tenant Name
    3. Status Badge (Active, Former)
    4. Action Buttons
        1. Send Message
        2. Edit Tenant
        3. More Actions Menu
            1. Send Notice
            2. Terminate Lease
            3. Export Details
2. Tenant Information Card
    1. Profile Section
        1. Avatar/Photo
        2. Full Name
        3. Email
        4. Phone
        5. Emergency Contact
            1. Contact Name
            2. Contact Phone
            3. Relationship
    2. Current Residence
        1. Property Name
        2. Unit Number
        3. Move-in Date
        4. Lease End Date
        5. Monthly Rent
3. Tab Navigation
    1. Overview Tab
    2. Lease Tab
    3. Payments Tab
    4. Maintenance Tab
    5. Documents Tab
    6. Communication Tab

#### 2.2.1 Overview Tab
1. Lease Summary Card
    1. Lease Status Badge
    2. Current Lease Period
    3. Monthly Rent
    4. Security Deposit
    5. View Full Lease Button
2. Payment Summary Card
    1. Payment Status (Current/Late)
    2. Next Payment Due Date
    3. Outstanding Balance (if any)
    4. Last Payment Date/Amount
    5. View Payment History Button
3. Recent Activity Timeline
    1. Activity Item
        1. Activity Icon
        2. Activity Description
        3. Timestamp
        4. Related User (if any)

#### 2.2.2 Lease Tab
1. Active Lease Card
    1. Lease Document Preview
    2. Lease Details
        1. Lease Type (Fixed Term, Month-to-Month)
        2. Start Date
        3. End Date
        4. Monthly Rent
        5. Security Deposit
        6. Late Fee Terms
    3. Lease Actions
        1. Download Lease PDF
        2. View Full Lease
        3. Renew Lease
        4. Terminate Lease
2. Lease History
    1. Previous Lease Card (if any)
        1. Lease Period
        2. Unit
        3. View Details Button

#### 2.2.3 Payments Tab
1. Payment Summary Stats
    1. Total Paid (YTD)
    2. Average Payment Time
    3. Outstanding Balance
2. Payment History Table
    1. Payment Row
        1. Date
        2. Amount
        3. Payment Method
        4. Status Badge (Paid, Pending, Failed)
        5. Late Fee (if applicable)
        6. Receipt Actions
            1. View Receipt
            2. Download Receipt
            3. Send Receipt via Email
3. Outstanding Charges Section (if any)
    1. Charge Item
        1. Description
        2. Due Date
        3. Amount
        4. Process Payment Button

#### 2.2.4 Maintenance Tab
1. Maintenance Requests List
    1. Request Card
        1. Request Date
        2. Category
        3. Priority Badge
        4. Description (truncated)
        5. Status Badge
        6. Assigned Vendor (if any)
        7. View Details Button
2. Maintenance Summary
    1. Total Requests Count
    2. Average Resolution Time

#### 2.2.5 Documents Tab
1. Document Categories
    1. Lease Documents
    2. Application Documents
    3. Communication
    4. Other
2. Documents List
    1. Document Row
        1. File Icon
        2. Document Name
        3. Upload Date
        4. Uploaded By
        5. Actions
            1. Download
            2. Preview
            3. Delete

#### 2.2.6 Communication Tab
1. Message Thread
    1. Message Card
        1. Sender Avatar/Name
        2. Message Content
        3. Timestamp
        4. Attachments (if any)
2. New Message Form
    1. Message Text Area
    2. Attach File Button
    3. Send Button
3. Communication Log
    1. Email Notifications Sent
    2. SMS Sent
    3. In-app Messages

### 2.3 Tenant Applications Page (`/tenants/applications`)
1. Page Header
    1. Title: "Tenant Applications"
    2. Application Link Generator Button
2. Application Status Tabs
    1. New Applications (with badge count)
    2. Under Review
    3. Approved
    4. Rejected
3. Applications List
    1. Application Card
        1. Applicant Name
        2. Applied For (Unit/Property)
        3. Submission Date
        4. Application Status Badge
        5. Quick Info
            1. Desired Move-in Date
            2. Monthly Income
            3. Credit Score (if run)
        6. Actions
            1. View Application
            2. Run Screening
            3. Approve
            4. Reject
            5. Contact Applicant

### 2.4 Application Detail Page (`/tenants/applications/:id`)
1. Page Header
    1. Back Button
    2. Applicant Name
    3. Status Badge
    4. Action Buttons
        1. Approve Application
        2. Reject Application
        3. Request More Info
2. Application Progress Bar
    1. Steps: Submitted → Reviewed → Screened → Approved/Rejected
3. Applicant Information Section
    1. Personal Information
        1. Full Name
        2. Date of Birth
        3. Email
        4. Phone
        5. Current Address
    2. Employment Information
        1. Employer Name
        2. Job Title
        3. Employment Duration
        4. Monthly Income
        5. Supervisor Contact
    3. References
        1. Reference Card (multiple)
            1. Name
            2. Relationship
            3. Phone
            4. Email
    4. Additional Occupants
        1. Occupant Details (if any)
4. Screening Section
    1. Credit Check Results
        1. Credit Score
        2. Run Date
        3. View Full Report Button
    2. Background Check Results
        1. Criminal History
        2. Eviction History
        3. View Full Report Button
    3. Run Screening Button (if not yet done)
5. Documents Submitted
    1. Document List
        1. ID Document
        2. Proof of Income
        3. References
        4. Other
6. Notes Section
    1. Internal Notes Text Area
    2. Add Note Button
7. Decision Actions
    1. Approve & Create Lease Button
    2. Reject with Reason Form
    3. Request Additional Information

### 2.5 Add Tenant Page (`/tenants/new`)
1. Page Header
    1. Title: "Add New Tenant"
    2. Cancel Button
    3. Save Button
2. Form Sections
    1. Personal Information
        1. Full Name (required)
        2. Email (required)
        3. Phone (required)
        4. Date of Birth
        5. Profile Photo Upload
    2. Emergency Contact
        1. Contact Name
        2. Contact Phone
        3. Relationship
    3. Assignment
        1. Select Property (required)
        2. Select Unit (required)
        3. Move-in Date (required)
    4. Create Lease Option
        1. Checkbox: "Create lease now"
        2. If checked, show basic lease fields
            1. Lease Start Date
            2. Lease End Date
            3. Monthly Rent
            4. Security Deposit
3. Form Actions
    1. Cancel Button
    2. Save Tenant Button
    3. Save & Create Lease Button