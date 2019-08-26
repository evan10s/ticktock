ticktock
=======

## How to Use

1. Create a new Google Apps Script project.  The easiest way is to make a new Google Sheet and then go to Tools > Script editor.
2. Copy Code.gs into the new file.
3. Fill in the required variables.
4. Click the play button to run the script once and give it the required authorizations to run.
5. In the toolbar click the clock-looking icon to access this project's triggers.
6. Create a new trigger with these settings: <br />
**Choose which function to run:** `wtHours` <br />
**Which runs at deployment:** `Head` <br />
**Select event source:** `Time-driven` <br />
**Select type of time based trigger:** `Week timer` <br />
**Select day of week:** `Sunday` <br />
**Select time of day:** `8am to 9am` (this is when you'll get the email with the previous week's hours.  Make sure that at this time, UTC is still on the same day as your timezone, or else weird things will happen). <br />
**Failure notification settings:** `Notify me immediately`

## Sample Output

>**2019-08-14:**<br />
9:49 PM-9:54 PM (test2)<br />
**2019-08-18:**<br />
9:03 PM-9:04 PM (testing)<br />
10:15 PM-10:22 PM

- If you enter something in the description field in Toggl, then it'll appear in parenthese after the time field.
- There's no support for time ranges overlapping days.  The best bet is to split the range at midnight so it's on two separate days, or just don't work that late.
