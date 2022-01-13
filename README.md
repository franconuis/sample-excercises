This script inserts customer profiles in Gladly utilizing a CSV file in create/sample-excersize.csv.

The script transforms each row in the CSV file to a customer profile object, then uses the Gladly Create Customer API to create the profile on Gladly.

When a profile is successfully created, the script will log the success using console.log

When a profile fails to be created, the script will log the error using console.log, along with the HTTP status code received.
