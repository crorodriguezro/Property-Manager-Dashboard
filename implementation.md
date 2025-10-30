### 1.1 Properties List Page (`/properties`)
1. Page Header
    1. Title: h1
    2. Action Button: Button
2. Search & Filters Bar
    1. Search Input: Input
    2. Filter Dropdown: Select
    3. Filter Dropdown: Select
    4. Sort Dropdown: Select
3. Properties List
    1. Property Card: Row
        1. Property Image: img
        2. Property Name and below Address: p
        4. Property Type Badge: Badge
        5. Units Summary
            1. Total Units: p
            2. Occupied Units: p
            3. Vacant Units: p
        6. Monthly Revenue: p
4. Pagination Controls
    1. Previous/Next Buttons: Button
    2. Page Number Display: p
    3. Items per page selector: Select

### 1.2 Property Detail Page (`/properties/:id`)
1. Page Header
    1. Back Button: Button
    2. Property Name: h1
    3. Address: p
    4. Action Buttons
        1. Edit Property: Button
        2. More Actions Menu: DropdownMenu
2. Property Image Gallery
    1. Main Image Display: img
    2. Thumbnail Carousel: Carousel
    3. Upload New Photos Button: Button
3. Tab Navigation: Tabs
    1. Overview Tab
    2. Units Tab
    3. Tenants Tab
    4. Financials Tab
    5. Documents Tab
    6. Maintenance Tab

#### 1.2.1 Overview Tab
1. Property Information Card: Card
    1. Property Details
        1. Property Type: p
        2. Year Built: p
        3. Total Square Footage: p
        4. Parking Spaces: p
        5. Amenities List: ul
    2. Owner Information
        1. Owner Name: p
        2. Owner Contact: p
        3. Ownership %: p
2. Quick Stats Cards: Card
    1. Total Units: p
    2. Occupancy Rate: Progress
    3. Monthly Revenue: p
    4. Average Rent: p
3. Property Description
    1. Description Text Area: Textarea
    2. Edit Button: Button

#### 1.2.2 Units Tab
1. Tab Header
    1. Add Unit Button: Button
    2. Search Units Input: Input
    3. Filter: Select
2. Units Table: Table
    1. Unit Row
        1. Unit Number: p
        2. Unit Type: p
        3. Square Footage: p
        4. Rent Amount: p
        5. Tenant Name: p
        6. Status Badge: Badge
        7. Actions Menu: DropdownMenu
3. Unit Summary Footer
    1. Total Units Count: p
    2. Occupied Count: p
    3. Vacant Count: p

#### 1.2.3 Tenants Tab
1. Active Tenants List
    1. Tenant Card: Card
        1. Tenant Photo/Avatar: Avatar
        2. Tenant Name: p
        3. Unit Number: p
        4. Move-in Date: p
        5. Lease End Date: p
        6. Rent Amount: p
        7. Payment Status Badge: Badge
        8. View Tenant Button: Button
2. Vacant Units Section
    1. List of Vacant Units: ul
    2. Post Listing Button: Button

#### 1.2.4 Financials Tab
1. Financial Summary Cards: Card
    1. Total Income: p
    2. Total Expenses: p
    3. Net Income: p
    4. Year-to-Date Revenue: p
2. Income Chart: Chart
    1. Month Selector: Select
    2. Line/Bar Chart: Chart
    3. Legend: p
3. Recent Transactions Table: Table
    1. Transaction Row
        1. Date: p
        2. Description: p
        3. Category: p
        4. Unit/Tenant: p
        5. Amount: p
4. Export Reports Button: Button
    1. Export PDF: Button
    2. Export Excel: Button

#### 1.2.5 Documents Tab
1. Document Upload Area
    1. Drag & Drop Zone: div
    2. Browse Files Button: Button
    3. Allowed File Types Info: p
2. Document Categories: Tabs
3. Documents List: Table
    1. Document Row
        1. File Icon: Icon
        2. Document Name: p
        3. Category Badge: Badge
        4. Upload Date: p
        5. File Size: p
        6. Actions Menu: DropdownMenu

### 1.3 Add/Edit Property Page (`/properties/new` or `/properties/:id/edit`)
1. Page Header
    1. Title: h1
    2. Cancel Button: Button
    3. Save Button: Button
2. Form Sections: Form
    1. Basic Information
        1. Property Name Input: Input
        2. Property Type Select: Select
        3. Address Fields
            1. Street Address: Input
            2. City: Input
            3. State/Province: Input
            4. Zip/Postal Code: Input
            5. Country: Input
    2. Property Details
        1. Year Built: Input
        2. Total Square Footage: Input
        3. Lot Size: Input
        4. Parking Spaces: Input
        5. Number of Floors: Input
    3. Amenities: Checkbox
        1. Pool: Checkbox
        2. Gym: Checkbox
        3. Laundry: Checkbox
        4. Elevator: Checkbox
        5. Security System: Checkbox
        6. Pet Friendly: Checkbox
    4. Owner Information
        1. Owner Select/Add New: Select
        2. Ownership Percentage: Input
    5. Property Images
        1. Image Upload Area: div
        2. Uploaded Images Preview: img
        3. Set Primary Image: Button
    6. Description: Textarea
3. Form Actions
    1. Cancel Button: Button
    2. Save as Draft Button: Button
    3. Save & Continue Button: Button