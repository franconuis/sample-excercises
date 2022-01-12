import pandas as pd
import pyodbc

api_host = 'mstr'
api_key = 'XXXXXXXXXXXXXXXXXXX'

data = pd.read_csv (r'C:\Temp\sample-exercise.csv')   
df = pd.DataFrame(data)

print(df)

# Connect to SQL Server
conn = pyodbc.connect('Driver={SQL Server};'
                      'Server=Franco\SQLEXPRESS;'
                      'Database=test_database;'
                      'Trusted_Connection=yes;')
cursor = conn.cursor()

# Create Table
cursor.execute('''
		CREATE TABLE products (
			product_id int primary key,
			product_name nvarchar(50),
			price int
			)
               ''')

# Insert DataFrame to Table
for row in df.itertuples():
    cursor.execute('''
                INSERT INTO products (email, title, body)
                VALUES (?,?,?)
                ''',
                row.email, 
                row.title,
                row.body
                )
conn.commit()