import json

json_file_path = "./public/json/metadata_rank_zksyncbird.json"  # replace with your file path

with open(json_file_path, "r") as f:
    data = json.load(f)

# check if the loaded data is a list
if isinstance(data, list):
    for element in data:
        # add the "DatRare" attribute to each element
        element["DatRare"] = "zksyncbird"
elif isinstance(data, dict):
    # add the "DatRare" attribute to the top-level dictionary
    data["DatRare"] = "zksyncbird"

with open(json_file_path, "w") as f:
    json.dump(data, f, indent=4)
