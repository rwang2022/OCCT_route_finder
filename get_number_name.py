def parse_full_info(file_path):
    result_dict = {}

    with open(file_path, 'r', encoding='utf-8') as file:
        current_page = None
        lines_iter = iter(file)

        for line in file:
            if line.startswith('PAGE '):
                current_page = int(line.split()[1])
                next_three_lines = [next(file).strip() for _ in range(3)]
                result_dict[current_page] = next_three_lines

    return result_dict

if __name__ == "__main__":
    file_path = "full info.txt"
    parsed_dict = parse_full_info(file_path)

    print(parsed_dict)
