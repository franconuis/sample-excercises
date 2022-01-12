# sample-excercises
ingest the 10 rows of data

•	When ingesting into Gladly, you should use API: https://developer.gladly.com/rest/#operation/createItem
o	"id" can be left blank (OK to have Gladly auto-generate)
o	Set customer.emailAddress to the email address in the CSV row
o	Set content.type to CUSTOMER_ACTIVITY
o	Set content.title to the title in the CSV row
o	Set content.body to the body in the CSV row
o	Set activityType to EMAIL
o	Set sourceName to your first name (e.g.: Eliza)
o	Do not supply the ocurredAt timestamp or the link object
