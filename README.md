# Train Management System

## Overview
This is a train management system that allows users to view train schedules, book tickets, and manage reservations. The project includes an admin panel for managing train details, including adding, updating, and deleting train schedules.

## Features
- Users can browse train schedules.
- Book train tickets.
- Manage reservations.
- Admin panel to manage train details (add, update, delete schedules).

## Technologies Used
- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** MySQL
- **Authentication:** JWT

## Installation & Setup
### Prerequisites
Ensure you have the following installed:
- Node.js
- MySQL
- npm or yarn

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/train-management-system.git
   cd train-management-system
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up the database:
   - Create a MySQL database.
   - Configure database connection in the `.env` file.
4. Run the backend:
   ```sh
   npm run server
   ```
5. Run the frontend:
   ```sh
   npm start
   ```

## API Endpoints
### User Endpoints
- `GET /trains` - Fetch all train schedules.
- `POST /book-ticket` - Book a train ticket.
- `GET /reservations` - View user reservations.

### Admin Endpoints
- `POST /admin/add-train` - Add a new train schedule.
- `PUT /admin/update-train/:id` - Update an existing train schedule.
- `DELETE /admin/delete-train/:id` - Remove a train schedule.

## Future Enhancements
- Payment gateway integration.
- User authentication and profile management.
- Live train tracking system.


