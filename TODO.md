1. ~~Setup MongoDB database~~
1. ~~Setup MongoDB prisma~~
1. ~~Setup Google auth with NextAuth~~
1. Define MongoDB Schema
1. Setup Navbar
  - Logo
  - User Image
  - User Name
  - Signout
1. Add validation on amount to only be a number
1. Correct TypeScript errors
1. Allow for shared "ledgers"
1. [UI] Add Transactions
  - Expense or Income (Default to Income)
  - Amount
  - Location
  - Date (Optional, current is default, but allow for future planning)
  - Note (Optional)
  - Should be editable
  - Should be deleteable (Soft delete, with confirmation)
1. [Backend] Add Transcations
  - Type (Income/Expense)
  - Amount ($123.45)
  - Location (Target)
  - Date (Datetime)
  - Note (Text/String)
  - User
- [UI] Features
  - Daily/Weekly/Monthly Recap
    - Locations & Income/Expense
  - List past X transcations sortable by date/amount
  - Clickable on `Location` to view spending per `Location`
      - Last X transcations
      - Total sum
      - Same chart availability
  - Charts by type
    - Day over day
    - Week over week
    - Month over month
    - Year over year
  - Pending Transcations
  - Total Balance