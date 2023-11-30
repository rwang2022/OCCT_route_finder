def extract_unique_stops(file_path):
    unique_stops = set()

    with open(file_path, 'r') as file:
        for line in file:
            stops = [stop.strip() for stop in line.split(',')]
            unique_stops.update(stops)

    return list(unique_stops)

# Replace 'basic_info.txt' with the correct path to your file
file_path = 'basic_info.txt'
unique_stops = extract_unique_stops(file_path)

print("Unique Stops:")
for stop in unique_stops:
    print(stop)

print(unique_stops)

unique_stops = ['Riverside & Columbus', 'Town Square Mall (Walmart)', 'of places', 'A lot', 'Oakdale Commons', 'Floral & Main', 'Leaves UDC', 'Returns to Mohawk', 'Leroy & Murray', 'Leaves Downtown', 'Parkway Plaza (Target)', 'Leaves Rafuse', 'sorry im lazy', 'ITC', 'Susquehanna', 'State & Hawley', 'Main & Floral', 'UClub', 'Washington & Lehigh', 'Mountainview', 'Leroy & Murray UClub (BY REQUEST)', 'Wegmans', 'on campus', 'UClub (BY REQUEST)', 'UClub (After 1 AM)', 'Parkway Plaza', 'Returns to Lower Campus', 'Arrives on Campus', 'Returns to Campus', 'Leaves Union', 'Arrives Downtown', 'Leaves Mohawk', 'Meadows & Hayes', 'UClub (Before 1 AM)', 'Hillside', 'Arrives at UDC', 'Main & Murray', 'Pharmacy School']