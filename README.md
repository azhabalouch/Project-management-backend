# Project Management Backend

Backend for a comprehensive project management application with projects, tasks, calendar events, and daily to-do lists.

## Features

- **Projects**: Create, read, update, and delete projects with descriptions and colors
- **Tasks**: Manage tasks with project associations, priorities, and subtasks
- **Calendar**: Create and manage calendar events for monthly organizing
- **Daily To-Do Lists**: Separate daily to-do lists with date filtering

## API Endpoints

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login user
- `POST /auth/logout` - Logout user
- `POST /auth/verify` - Verify authentication token

### Projects
- `POST /project/project/create` - Create a new project
  - Body: `{ name, description, color }`
- `GET /project/project/get` - Get all projects for user
- `PATCH /project/project/patch` - Update a project
  - Body: `{ projectId, name?, description?, color? }`
- `DELETE /project/project/delete` - Delete a project
  - Body: `{ projectId }`

### Tasks
- `POST /user/task/create` - Create a new task
  - Body: `{ title, description, status, isCompleted, projectId, priority, subtasks[], dueDate }`
- `GET /user/task/get` - Get all tasks for user
- `PATCH /user/task/patch` - Update a task
  - Body: `{ taskId, title?, description?, status?, isCompleted?, priority?, dueDate? }`
- `DELETE /user/task/delete` - Delete a task
  - Body: `{ taskId }`
- `GET /user/task/history` - Get task history

### Task Subtasks
- `POST /user/task/subtask/subtask/add` - Add a subtask to a task
  - Body: `{ taskId, subtask: { text } }`
- `PATCH /user/task/subtask/subtask/update` - Update a subtask
  - Body: `{ taskId, subtaskId, completed }`
- `DELETE /user/task/subtask/subtask/delete` - Delete a subtask
  - Body: `{ taskId, subtaskId }`

### Calendar Events
- `POST /calendar/event/create` - Create a new event
  - Body: `{ title, description, startDate, endDate, allDay, location, color, recurrence }`
- `GET /calendar/event/get` - Get events (optional query params: `?month=1&year=2024`)
- `PATCH /calendar/event/patch` - Update an event
  - Body: `{ eventId, title?, description?, startDate?, endDate?, etc. }`
- `DELETE /calendar/event/delete` - Delete an event
  - Body: `{ eventId }`

### Daily To-Do Lists
- `POST /todo/todo/create` - Create a new todo item
  - Body: `{ text, completed, priority, date }`
- `GET /todo/todo/get` - Get todos (optional query param: `?date=2024-01-15`)
- `PATCH /todo/todo/patch` - Update a todo item
  - Body: `{ todoId, text?, completed?, priority? }`
- `DELETE /todo/todo/delete` - Delete a todo item
  - Body: `{ todoId }`

## Database Structure

### Firestore Collections

```
users/
  {userId}/
    projects/
      {projectId}/
        - name
        - description
        - color
        - createdAt
        - updatedAt
    tasks/
      {taskId}/
        - title
        - description
        - status
        - isCompleted
        - projectId
        - priority
        - subtasks[] (array of objects with id, text, completed, createdAt)
        - createdAt
        - updatedAt
        - dueDate
    events/
      {eventId}/
        - title
        - description
        - startDate
        - endDate
        - allDay
        - location
        - color
        - recurrence
        - createdAt
        - updatedAt
    todos/
      {todoId}/
        - text
        - completed
        - priority
        - date
        - createdAt
        - updatedAt
```

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables in `.env` file

3. Add Firebase service account key in `serviceAccountKey.js`

4. Start the server:
```bash
node server.js
```

The server will run on `http://localhost:3000`
