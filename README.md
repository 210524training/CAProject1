# TRMS - React
## Project Description
TRMS, or Tuition Reimbursement Management System, is a full-stack web application that allows employees to submit requests for reimbursements for courses, events, and certifications. These requests can then be approved or rejected by the employee's direct supervisor, department head, and a benefits coordinator, while the employee is able to track the status of their requests.

## Technologies Used:
- JavaScript
- Express.js
- DynamoDB
- React
- HTML
- CSS
- Redux
- TypeScript

## Features:
- Log In or Register For An Account
- File Reimbursement Forms
- Approve Forms and Send Messages Between Different User Roles

To Do List:
- Implement Automatic Form Clearing And Alerts To Confirm Successful Updates
- Improve Presentation Of Form Details
- Implement Check To Ensure Reimbursement Forms Are Filed At Least 2 Weeks In Advance
- Implement Year-To-Date Reimbursement Tracking For Employees
- Implement File Uploads

## Getting Started:
Note: Running this application requires the use of an Amazon Web Services Account.

Clone the repository using the following command:
- `git clone https://github.com/210524training/CAProject1.git`

Install the necessary dependencies in both the front and backend folders using the following command:
- `npm install`

Start the application by running `npm start` in both the front and backend folders.
The application frontend will run on Port 3000, while the backend will listen on Port 4000.

## Usage:
The initial screen will include links for both registering and logging in.
Once an account has been created, and a user is logged in, navigation tabs will appear to allow for filing applications and reviewing applications.
To create an application, simply navigate to the filing screen and complete the form that is presented.
Once an application is created, it should appear on the review screen.
Additional actions, such as sending messages to other users associated with the application, can be taken by completing the forms beneath the application display table.
Note: The user roles Supervisor, BenCo, and DeptHead must be assigned manually to users through the DynamoDB console.

## License:
This project uses the following license: [MIT](https://github.com/210524training/CAProject1/blob/main/LICENSE).


