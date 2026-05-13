# 📋 Join - Kanban Project Management Tool

Welcome to the help page for **Join**, your guide to using our kanban project management tool. Here, we'll provide an overview of what **Join** is, how it can benefit you, and how to use it.

## 🤔 What is Join?

**Join** is a kanban-based project management tool designed and built by a group of dedicated students as part of their web development bootcamp at the Developer Akademie.

Kanban, a Japanese term meaning "billboard", is a highly effective method to visualize work, limit work-in-progress, and maximize efficiency (or flow). **Join** leverages the principles of kanban to help users manage their tasks and projects in an intuitive, visual interface.

> ⚠️ **Important Note:** **Join** is designed as an educational exercise and is not intended for extensive business usage. While we strive to ensure the best possible user experience, we cannot guarantee consistent availability, reliability, accuracy, or other aspects of quality regarding **Join**.

## 🚀 How to Use Join

Here is a step-by-step guide on how to use **Join**:

### 1️⃣ Exploring the Board

When you log in to **Join**, you'll find a default board. This board represents your project and contains four default lists:
- **To Do** - Tasks that need to be completed
- **In Progress** - Tasks currently being worked on
- **Await feedback** - Tasks waiting for feedback
- **Done** - Completed tasks

### 2️⃣ Creating Contacts

In **Join**, you can add contacts to collaborate on your projects:
- Go to the **"Contacts"** section
- Click on **"New contact"**
- Fill in the required information
- Once added, these contacts can be assigned tasks and they can interact with the tasks on the board

### 3️⃣ Adding Cards

Now that you've added your contacts, you can start adding cards. Cards represent individual tasks:
- Click the **"+"** button under the appropriate list
- Create a new card
- Fill in the task details:
  - Task name
  - Description
  - Due date
  - Assigned to
  - etc.

### 4️⃣ Moving Cards

As the task moves from one stage to another:
- Simply drag and drop the card from one list to another
- This reflects the current status of the task on the board

### 5️⃣ Deleting Cards

Once a task is completed, you can either:
- Move it to the **"Done"** list, or
- Delete it

> ⚠️ **Caution:** Deleting a card will permanently remove it from the board. This action is irreversible!

Remember that using **Join** effectively requires consistent updates from you and your team to ensure the board reflects the current state of your project.

## 📩 n8n Request Workflow

External requests are processed through an automated **n8n** workflow before they appear on the board. The workflow listens to incoming messages, checks the daily request limit, and then creates or rejects the task depending on the result.

### Workflow Overview

1. **IMAP Trigger**
  - Watches the request mailbox for new incoming emails.
  - The incoming message is used as the workflow input.

2. **Daily Limit Check**
  - Calculates the current day key in the `Europe/Berlin` time zone.
  - Loads the current daily counter from Firebase.
  - If the limit is reached, the workflow sends a limit reply and moves the message out of the inbox.

3. **AI Analysis**
  - The email content is sent to the AI agent.
  - The agent checks whether the message is a real task request.
  - If the request is not valid, the workflow sends a rejection email and archives the message.

4. **Task Creation Path**
  - Valid requests are normalized into a task payload.
  - The task is stored in Firebase with the status `triage`.
  - The daily counter is increased.
  - A success reply is sent back to the sender.
  - The message is moved from **Inbox** to **In progress** and then the **Inbox** label is removed.

5. **Retry and Error Handling**
  - Failed AI attempts are retried up to the configured retry count.
  - After the final retry, the workflow sends an error reply.
  - The message is then moved to **In progress** and removed from **Inbox**.

### External Task Status Updates

When an externally created task is moved on the board, a webhook can notify the original sender about the new status. The webhook URL is configured in `script.js` and is used by the board to inform the n8n workflow about status changes such as moving a task to **To do**, **In progress**, **Await feedback**, or **Done**.

## ❓ Questions?

Have more questions about **Join**? Feel free to contact us at m.arnoldy@outlook.de. We're here to help you!

---

**Enjoy using Join!** 🎉
