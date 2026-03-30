const express = require('express');
const verifyToken = require('../../../middleware/validateTokenMiddleware');
const router = express.Router();

router.use(verifyToken);

router.post("/task", (req, res) => {
  /** 
   * Separate file that will create

    Table Users {
      user_id uuid [primary key]
      first_name varchar(50) [not null]
      last_name varchar(50) [not null]
    }

    Table Tasks {
      task_id uuid [primary key]
      title varchar(200) [not null]
      description text
      status varchar [not null]
      is_completed boolean [default: false]
      parent_task_id uuid [ref: > Tasks.task_id]
      assignee_id uuid [ref: > Users.user_id]
      created_at timestamp [default: `now()`]
      due_date timestamp
      completed_at timestamp
    }

  */
  console.log(req.body);
  console.log("Created task: test");
})

module.exports = router;