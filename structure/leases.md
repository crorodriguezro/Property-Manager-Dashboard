### 3.1 Leases List Page (`/leases`)
1. Page Header
    1. Title: "Leases"
    2. Action Button: "+ Create Lease"
2. Lease Status Tabs
    1. Active Leases (with count)
    2. Expiring Soon (with count)
    3. Expired
    4. Draft
3. Search & Filters Bar
    1. Search Input (tenant name, unit, property)
    2. Filter Dropdown: Property
    3. Filter Dropdown: Lease Type (All, Fixed Term, Month-to-Month)
    4. Date Range Filter (by start/end date)
    5. Sort Dropdown (End Date, Start Date, Rent Amount)
4. Alert Banner (if applicable)
    1. "X leases expiring in the next 30 days"
    2. View List Button
5. Leases Table
    1. Lease Row
        1. Property/Unit
        2. Tenant Name (with avatar)
        3. Lease Type Badge
        4. Start Date
        5. End Date
        6. Days Remaining (or status)
        7. Monthly Rent
        8. Status Badge (Active, Expiring Soon, Expired)
        9. Actions Menu
            1. View Lease
            2. Download PDF
            3. Send Renewal Notice
            4. Renew Lease
            5. Terminate Lease
            6. Edit Lease
6. Pagination Controls

### 3.2 Lease Detail Page (`/leases/:id`)
1. Page Header
    1. Back Button (← Back to Leases)
    2. Property & Unit Name
    3. Status Badge
    4. Action Buttons
        1. Download PDF
        2. Send to Tenant
        3. More Actions
            1. Renew Lease
            2. Terminate Lease
            3. Edit Lease
2. Lease Status Alert (if applicable)
    1. "Expires in X days" warning
    2. Renewal Action Button
3. Lease Information Card
    1. Lease Overview
        1. Lease Type
        2. Lease Status
        3. Start Date
        4. End Date
        5. Duration
        6. Created Date
    2. Tenant Information
        1. Tenant Name (clickable)
        2. Email
        3. Phone
    3. Property Information
        1. Property Name (clickable)
        2. Unit Number (clickable)
        3. Address
4. Financial Terms Card
    1. Monthly Rent
    2. Security Deposit
        1. Amount
        2. Payment Status
        3. Refund Status (if applicable)
    3. Late Fee Terms
        1. Amount
        2. Grace Period
    4. Rent Due Date (day of month)
    5. Payment Method
5. Lease Terms Section
    1. Lease Document Preview/Embed
    2. Key Terms Summary
        1. Pet Policy
        2. Smoking Policy
        3. Sublease Policy
        4. Maintenance Responsibilities
    3. Special Conditions (if any)
6. Signatures Section
    1. Signature Status
        1. Landlord Signature
            1. Name
            2. Date
            3. Status (Signed/Pending)
        2. Tenant Signature
            1. Name
            2. Date
            3. Status (Signed/Pending)
    2. Request Signature Button (if pending)
7. Lease History Timeline
    1. Timeline Event
        1. Event Type (Created, Signed, Renewed, Modified, Terminated)
        2. Date
        3. Performed By
        4. Details

### 3.3 Create Lease Wizard (`/leases/new`)
1. Wizard Header
    1. Title: "Create New Lease"
    2. Close/Cancel Button
    3. Progress Indicator
        1. Step 1: Property & Tenant
        2. Step 2: Lease Terms
        3. Step 3: Financial Terms
        4. Step 4: Additional Terms
        5. Step 5: Review & Generate

#### Step 1: Property & Tenant
1. Property Selection
    1. Select Property Dropdown (required)
    2. Select Unit Dropdown (required)
    3. Unit Details Display
        1. Unit Type
        2. Square Footage
        3. Current Status
2. Tenant Selection
    1. Option: Select Existing Tenant
        1. Tenant Dropdown/Search
    2. Option: Add New Tenant
        1. Quick Add Tenant Form
            1. Name
            2. Email
            3. Phone
3. Navigation
    1. Cancel Button
    2. Next Button

#### Step 2: Lease Terms
1. Lease Type
    1. Radio Options
        1. Fixed Term Lease
        2. Month-to-Month
2. Lease Dates
    1. Start Date Picker (required)
    2. End Date Picker (required for fixed term)
    3. Duration Display (auto-calculated)
3. Renewal Options
    1. Auto-Renewal Checkbox
    2. Notice Period (if auto-renewal)
4. Navigation
    1. Back Button
    2. Next Button

#### Step 3: Financial Terms
1. Rent Information
    1. Monthly Rent Amount (required)
    2. Rent Due Date (day of month)
    3. First Month Rent
        1. Full Amount
        2. Prorated (with calculation)
2. Deposits
    1. Security Deposit Amount
    2. Pet Deposit (if applicable)
    3. Other Deposits
3. Fees
    1. Late Fee
        1. Amount
        2. Grace Period (days)
    2. NSF/Returned Check Fee
    3. Other Fees
4. Utilities Included
    1. Checkbox List
        1. Water
        2. Electric
        3. Gas
        4. Internet
        5. Trash
5. Navigation
    1. Back Button
    2. Next Button

#### Step 4: Additional Terms
1. Lease Policies
    1. Pet Policy
        1. Radio: Allowed/Not Allowed
        2. If Allowed: Pet Details Fields
            1. Number of Pets
            2. Type/Breed Restrictions
            3. Pet Deposit/Fee
    2. Smoking Policy
        1. Radio: Allowed/Not Allowed
    3. Sublease Policy
        1. Radio: Allowed/Not Allowed/With Permission
2. Maintenance Responsibilities
    1. Landlord Responsibilities (checklist)
    2. Tenant Responsibilities (checklist)
3. Special Conditions
    1. Text Area for custom terms
4. Lease Template
    1. Select Lease Template Dropdown
    2. Preview Template Button
5. Navigation
    1. Back Button
    2. Next: Review Button

#### Step 5: Review & Generate
1. Lease Summary
    1. Property & Tenant Summary
    2. Lease Terms Summary
    3. Financial Terms Summary
    4. Additional Terms Summary
    5. Edit Links (for each section)
2. Lease Document Preview
    1. Generated Lease PDF Preview
    2. Download Draft Button
3. Signature Options
    1. Electronic Signature
        1. Send for e-signature checkbox
        2. Signers list
    2. Print & Sign
        1. Print lease button
4. Final Actions
    1. Back Button
    2. Save as Draft Button
    3. Generate & Send for Signature Button
    4. Generate Lease Button

### 3.4 Renew Lease Page (`/leases/:id/renew`)
1. Page Header
    1. Title: "Renew Lease"
    2. Current Lease Info Display
        1. Property/Unit
        2. Tenant
        3. Current Lease End Date
2. Renewal Options
    1. Option 1: New Fixed Term
        1. New Start Date (pre-filled: day after current end)
        2. New End Date
        3. Duration Display
    2. Option 2: Convert to Month-to-Month
        1. Start Date (pre-filled)
3. Updated Terms
    1. New Monthly Rent
        1. Current Rent Display
        2. New Rent Input
        3. Increase/Decrease Display
    2. Security Deposit Adjustment (if any)
    3. Updated Terms/Policies (if any)
4. Renewal Notice
    1. Message to Tenant Text Area
    2. Attach Documents Option
5. Actions
    1. Cancel Button
    2. Save Draft Button
    3. Send Renewal Offer Button
