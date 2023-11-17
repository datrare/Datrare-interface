import json

with open('./public/json/metadata_rank_shnoise.json', 'r') as f:
    metadata = json.load(f)

for item in metadata:
    if 'image' in item:
        item['image'] = item['image'].replace('ar://', 'https://arweave.net/')

with open('./public/json/metadata_rank_shnoise.json', 'w') as f:
    json.dump(metadata, f, indent=4)
