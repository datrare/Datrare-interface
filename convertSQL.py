import json

# Read in the JSON data
with open('./public/json/metadata_rank_zkBoys.json', 'r') as f:
    data = json.load(f)

# Loop through each data point and create an SQL insert statement
sql_statements = []
for item in data:
    sql = "INSERT INTO collections_data (Datrare, description, edition, image, name, scores, rank) VALUES ('{}','{}', {}, '{}', '{}', {}, {});".format(
        item['DatRare'],
        item['description'],
        item['edition'],
        item['image'],
        item['name'],
        item['scores'],
        item['rank']
    )
    sql_statements.append(sql)

# Write the SQL statements to a new file
with open('output_zkBoys.sql', 'w') as f:
    f.write('\n'.join(sql_statements))
