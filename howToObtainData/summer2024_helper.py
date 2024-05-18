# Define the input string
input_string = """
Leaves Union, Floral & Main, Main & Murray, Arrives at UDC
Leaves UDC, Leroy & Murray, Riverside & Columbus, Returns to Campus
Leaves Union, Riverside & Columbus, Leroy & Murray, Arrives at UDC
Leaves UDC, Main & Murray, Floral & Main, Returns to Campus
Leaves Rafuse, Parkway Plaza (Target), Town Square Mall (Walmart), Returns to Campus
Leaves Mohawk, UClub, Washington & Lehigh
Leaves Union, Hillside, Mohawk, ITC, UClub
Leaves Union, Floral & Main, Main & Murray, Arrives at UDC
Leaves UDC, Leroy & Murray, Riverside & Columbus, Returns to Campus
Leaves Union, Riverside & Columbus, Leroy & Murray, Arrives at UDC
Leaves UDC, Main & Murray, Floral & Main, Returns to Campus
Leaves Mohawk, UClub, Washington & Lehigh
"""

print(f"input_string: {input_string}")

# Split the input string into individual lines
lines = input_string.strip().split('\n')

print(f"lines[0]: {lines[0]}")

# Initialize an empty set to store unique stops
unique_stops = set()

# Iterate over each line and extract the stops
for line in lines:
    stops = line.split(', ')
    for stop in stops:
        # Remove the "Leaves" or "Arrives at" or "Returns to" part if present
        unique_stops.add(stop)

# Convert the set to a sorted list
unique_stops_list = sorted(unique_stops)

# Print the unique stops
print("Unique Stops:")
for stop in unique_stops_list:
    print(stop)
