import os

# Function to parse the file and generate lines and unique stops
def parse_bus_routes(file_path: str):
    lines = []
    unique_stops_set = set()

    with open(file_path, 'r') as file:
        file_lines = file.readlines()

        i = 0
        while i < len(file_lines):
            line = file_lines[i].strip()

            # Check if the line matches the PAGE pattern
            if line.startswith('PAGE'):
                # The 3rd line after the PAGE line contains the stops
                stops_line_index = i + 3

                if stops_line_index < len(file_lines):
                    stops_line = file_lines[stops_line_index].strip()

                    # Add the stops line to the lines list
                    lines.append(stops_line)

                    # Split the stops and add each to the set of unique stops
                    stops = [stop.strip() for stop in stops_line.split(',')]
                    unique_stops_set.update(stops)

            i += 1

    # Convert the unique stops set to a sorted list
    unique_stops = sorted(unique_stops_set)

    return lines, unique_stops

from pathlib import Path
file_path = Path('./static/fall2025.txt').resolve()
print(file_path)

# Parse the file and generate the lists
if os.path.exists(file_path):
    lines, unique_stops = parse_bus_routes(str(file_path))
    
    # Output the results
    print(f'these are the results for {file_path}\n')
    print('const lines = ', lines)
    print('const uniqueStops = ', unique_stops)

    print("\nnow please go to /src/main.ts and update \nconst lines = ...\nconst uniqueStops =...\n")
else:
    print(f'File not found: {file_path}')
