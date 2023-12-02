def find_lines_after_page(file_path):
    with open(file_path, 'r') as file:
        lines = file.readlines()

    result_lines = []

    for i in range(len(lines)):
        line = lines[i].strip()
        if line.startswith("PAGE"):
            # Check if there are at least 3 lines after a line containing "PAGE"
            if i + 3 < len(lines):
                for j in (lines[i + 3].strip()).split(", "):
                    result_lines.append()

    return result_lines

# Replace 'full info.txt' with the correct path to your file
file_path = 'full info.txt'
result = find_lines_after_page(file_path)
result2 = list(set(result))
result2.sort()

print("Lines 3 lines after lines containing 'PAGE':")
for line in result:
    print(line)
