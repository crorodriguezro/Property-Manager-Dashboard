# Property Management API Endpoints

## Overview
This document outlines the required API endpoints for the property management system based on the frontend components (`create-property-wizard.tsx`, `properties-list.tsx`, `property-detail.tsx`).

## Core Property Endpoints

### 1. GET /api/properties
**Purpose**: Retrieve list of properties for the properties list page

**Response**: Array of property summaries
```json
[
  {
    "id": "string",
    "name": "string", 
    "address": "string",
    "type": "unifamiliar|multifamiliar|comercial",
    "activeLeases": "number",
    "occupiedUnits": "number", 
    "totalUnits": "number",
    "monthlyRevenue": "number",
    "image": "string (optional)"
  }
]
```

**Query Parameters**:
- `page` (optional): Page number for pagination
- `limit` (optional): Items per page
- `search` (optional): Search query for property name/address
- `type` (optional): Filter by property type
- `sort` (optional): Sort field (name, revenue, occupancy)

### 2. GET /api/properties/:id
**Purpose**: Retrieve detailed property information

**Response**: Full property object with nested data
```json
{
  "id": "string",
  "name": "string",
  "address": "string", 
  "type": "string",
  "yearBuilt": "number",
  "squareFeet": "number",
  "bedrooms": "number",
  "bathrooms": "number", 
  "parkingSpaces": "number",
  "purchasePrice": "number",
  "currentValue": "number",
  "description": "string",
  "amenities": ["string"],
  "units": [
    {
      "id": "string",
      "name": "string",
      "type": "string",
      "bedrooms": "number",
      "bathrooms": "number", 
      "squareMeters": "number",
      "rent": "number",
      "status": "Ocupada|Vacante"
    }
  ],
  "leases": [
    {
      "id": "string",
      "tenant": "string",
      "unit": "string",
      "startDate": "string",
      "endDate": "string", 
      "rent": "number",
      "status": "Activo|Expirado|Cancelado"
    }
  ],
  "maintenance": [
    {
      "id": "string",
      "date": "string",
      "description": "string",
      "status": "Pendiente|Completado|En Progreso",
      "cost": "number"
    }
  ],
  "documents": [
    {
      "id": "string",
      "name": "string",
      "category": "Legal|Financiero|Mantenimiento",
      "uploadDate": "string",
      "size": "string",
      "url": "string"
    }
  ]
}
```

### 3. POST /api/properties
**Purpose**: Create new property from wizard

**Request Body**:
```json
{
  "propertyName": "string",
  "propertyType": "unifamiliar|multifamiliar|comercial", 
  "address": {
    "address1": "string",
    "address2": "string (optional)",
    "city": "string",
    "state": "string", 
    "postalCode": "string",
    "country": "string"
  },
  "details": {
    "yearBuilt": "string",
    "squareMeters": "string", 
    "lotSize": "string",
    "parkingSpaces": "string"
  },
  "description": "string (optional)",
  "units": [
    {
      "name": "string",
      "bedrooms": "string", 
      "bathrooms": "string",
      "size": "string",
      "marketRent": "string",
      "note": "string (optional)"
    }
  ]
}
```

**Response**: Created property object with generated ID

### 4. PUT /api/properties/:id
**Purpose**: Update property details

**Request Body**: Same structure as POST but all fields optional for partial updates

**Response**: Updated property object

### 5. DELETE /api/properties/:id
**Purpose**: Delete property

**Response**: Success confirmation

## Unit Management Endpoints

### 6. POST /api/properties/:id/units
**Purpose**: Add unit to existing property

**Request Body**:
```json
{
  "name": "string",
  "bedrooms": "number",
  "bathrooms": "number",
  "squareFeet": "number", 
  "rent": "number",
  "type": "string"
}
```

### 7. PUT /api/properties/:id/units/:unitId
**Purpose**: Update unit details

**Request Body**: Same as above, partial updates allowed

### 8. DELETE /api/properties/:id/units/:unitId
**Purpose**: Remove unit from property

## Document Management Endpoints

### 9. POST /api/properties/:id/documents
**Purpose**: Upload document to property

**Content-Type**: multipart/form-data

**Form Fields**:
- `file`: File to upload
- `category`: Document category
- `name`: Document name (optional, can use filename)

### 10. DELETE /api/properties/:id/documents/:docId
**Purpose**: Delete document

## Lease Management Endpoints

### 11. GET /api/properties/:id/leases
**Purpose**: Get leases for a property

### 12. POST /api/properties/:id/leases
**Purpose**: Create new lease for property

**Request Body**:
```json
{
  "tenantId": "string",
  "unitId": "string", 
  "startDate": "string",
  "endDate": "string",
  "rent": "number",
  "deposit": "number",
  "terms": "string"
}
```

## Payment Management Endpoints

### 13. GET /api/properties/:id/payments
**Purpose**: Get payment history for property

### 14. POST /api/properties/:id/payments
**Purpose**: Record new payment

**Request Body**:
```json
{
  "leaseId": "string",
  "amount": "number",
  "date": "string",
  "type": "Renta|Depósito|Multa",
  "method": "Efectivo|Transferencia|Cheque"
}
```

## Maintenance Endpoints

### 15. GET /api/properties/:id/maintenance
**Purpose**: Get maintenance records for property

### 16. POST /api/properties/:id/maintenance
**Purpose**: Create maintenance request

**Request Body**:
```json
{
  "description": "string",
  "priority": "Baja|Media|Alta|Urgente",
  "estimatedCost": "number",
  "unitId": "string (optional)"
}
```

### 17. PUT /api/properties/:id/maintenance/:maintenanceId
**Purpose**: Update maintenance status

**Request Body**:
```json
{
  "status": "Pendiente|En Progreso|Completado|Cancelado",
  "actualCost": "number",
  "notes": "string"
}
```

## Error Responses
All endpoints should return appropriate HTTP status codes:
- `200`: Success
- `201`: Created
- `400`: Bad Request (validation errors)
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `500`: Internal Server Error

Error response format:
```json
{
  "error": "Error message",
  "details": "Additional error details (optional)"
}
```

## Authentication
All endpoints require authentication. Include JWT token in Authorization header:
```
Authorization: Bearer <token>
```

## Notes
- Property images should be handled via separate file upload service
- Consider implementing rate limiting for API endpoints
- Add proper input validation and sanitization
- Implement proper database relationships and foreign keys
- Consider using API versioning (e.g., /api/v1/properties) for future changes
