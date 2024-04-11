### TODO

1. [ ] Fix Transactions by name with spaces...
1. [ ] Add sum for all transactions
1. [ ] Re-enable strictness
   - Solve the Avatar img/string issue
1. [ ] Fix scrolling on all transactions page
1. [ ] Define MongoDB Schema
1. Allow for shared "ledgers"
1. [UI] Add Transactions
   - [x] Expense or Income (Default to Expense)
   - [x] Amount
   - [x] Location
   - [x] Date (Optional, current is default, but allow for future planning)
   - Note (Optional)
   - Should be editable
   - Should be deleteable (Soft delete, with confirmation)
1. [Backend] Add transactions
   - [x] Type (Income/Expense)
   - [x] Amount ($123.45)
   - [x] Location (Target)
   - [x] Date (Datetime)
   - Note (Text/String)
   - [x] User

- [UI] Features
  - Daily/Weekly/Monthly Recap
    - Locations & Income/Expense
  - List past X transactions sortable by date/amount
  - Clickable on `Location` to view spending per `Location`
    - Last X transactions
    - Total sum
    - Same chart availability
  - Charts by type
    - Day over day
    - Week over week
    - Month over month
    - Year over year
  - Pending transactions
  - [x] Total Balance

### Complete

- [x] Setup MongoDB database
- [x] Setup MongoDB prisma
- [x] Setup Google auth with NextAuth
- [x] Add validation on amount to only be a number
- [x] Fix `type` on transactions always needing to be selected

1. [x] Setup Navbar
   - ~~Logo~~
   - [x]User Image
   - [x]User Name
   - [x] Signout
