### 1.1 Properties List Page (`/properties`)
1. Page Header
    1. Title: "Properties"
    2. Action Button: "+ Add Property"
2. Search & Filters Bar
    1. Search Input (search by name/address)
    2. Filter Dropdown: Property Type (All, Residential, Commercial, Mixed)
    3. Filter Dropdown: Status (All, Fully Occupied, Partially Occupied, Vacant)
    4. Sort Dropdown (Name, Units, Occupancy)
3. Properties Grid/List
    1. Property Row
        1. Property Image
        2. Property Name and below Address
        4. Property Type Badge
        5. Units Summary
            1. Total Units
            2. Occupied Units
            3. Vacant Units
        6. Monthly Revenue
4. Pagination Controls
    1. Previous/Next Buttons
    2. Page Number Display
    3. Items per page selector

### 1.2 Property Detail Page (`/properties/:id`)
1. Page Header
    1. Back Button (← Back to Properties)
    2. Property Name
    3. Address
    4. Action Buttons
        1. Edit Property
        2. More Actions Menu (Archive, Delete)
2. Property Image Gallery
    1. Main Image Display
    2. Thumbnail Carousel
    3. Upload New Photos Button
3. Tab Navigation
    1. Overview Tab (active by default)
    2. Units Tab
    3. Tenants Tab
    4. Financials Tab
    5. Documents Tab
    6. Maintenance Tab

#### 1.2.1 Overview Tab
1. Property Information Card
    1. Property Details
        1. Property Type
        2. Year Built
        3. Total Square Footage
        4. Parking Spaces
        5. Amenities List
    2. Owner Information
        1. Owner Name
        2. Owner Contact
        3. Ownership %
2. Quick Stats Cards
    1. Total Units
    2. Occupancy Rate (with percentage bar)
    3. Monthly Revenue
    4. Average Rent
3. Property Description
    1. Description Text Area
    2. Edit Button

#### 1.2.2 Units Tab
1. Tab Header
    1. Add Unit Button
    2. Search Units Input
    3. Filter: Unit Status (All, Occupied, Vacant, Under Maintenance)
2. Units Table
    1. Unit Row
        1. Unit Number
        2. Unit Type (Bedrooms/Bathrooms)
        3. Square Footage
        4. Rent Amount
        5. Tenant Name (if occupied)
        6. Status Badge (Occupied, Vacant, Notice Given)
        7. Actions Menu
            1. View Details
            2. Edit Unit
            3. View Tenant
            4. Mark as Vacant
            5. Delete Unit
3. Unit Summary Footer
    1. Total Units Count
    2. Occupied Count
    3. Vacant Count

#### 1.2.3 Tenants Tab
1. Active Tenants List
    1. Tenant Card
        1. Tenant Photo/Avatar
        2. Tenant Name
        3. Unit Number
        4. Move-in Date
        5. Lease End Date
        6. Rent Amount
        7. Payment Status Badge
        8. View Tenant Button
2. Vacant Units Section
    1. List of Vacant Units
    2. Post Listing Button (for each unit)

#### 1.2.4 Financials Tab
1. Financial Summary Cards
    1. Total Income (current month)
    2. Total Expenses (current month)
    3. Net Income (current month)
    4. Year-to-Date Revenue
2. Income Chart
    1. Month Selector
    2. Line/Bar Chart (last 6 months)
    3. Legend (Income, Expenses, Net)
3. Recent Transactions Table
    1. Transaction Row
        1. Date
        2. Description
        3. Category
        4. Unit/Tenant
        5. Amount (colored: green for income, red for expense)
4. Export Reports Button
    1. Export PDF
    2. Export Excel

#### 1.2.5 Documents Tab
1. Document Upload Area
    1. Drag & Drop Zone
    2. Browse Files Button
    3. Allowed File Types Info
2. Document Categories
    1. Category Tabs (All, Leases, Insurance, Tax Documents, Other)
3. Documents List
    1. Document Row
        1. File Icon (by type)
        2. Document Name
        3. Category Badge
        4. Upload Date
        5. File Size
        6. Actions Menu
            1. Download
            2. Preview
            3. Rename
            4. Delete

### 1.3 Add/Edit Property Page (`/properties/new` or `/properties/:id/edit`)
1. Page Header
    1. Title: "Add New Property" or "Edit Property"
    2. Cancel Button
    3. Save Button
2. Form Sections
    1. Basic Information
        1. Property Name Input (required)
        2. Property Type Select (required)
        3. Address Fields
            1. Street Address
            2. City
            3. State/Province
            4. Zip/Postal Code
            5. Country
    2. Property Details
        1. Year Built
        2. Total Square Footage
        3. Lot Size
        4. Parking Spaces
        5. Number of Floors
    3. Amenities
        1. Checkbox List
            1. Pool
            2. Gym
            3. Laundry
            4. Elevator
            5. Security System
            6. Pet Friendly
    4. Owner Information (optional)
        1. Owner Select/Add New
        2. Ownership Percentage
    5. Property Images
        1. Image Upload Area
        2. Uploaded Images Preview
        3. Set Primary Image
    6. Description
        1. Rich Text Editor
3. Form Actions
    1. Cancel Button
    2. Save as Draft Button
    3. Save & Continue Button